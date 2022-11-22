import { NameAnd, safeArray } from "@focuson/utils";
import { CommonStateProps, InputOnChangeProps, LabelAlignment } from "./common";
import { format, parse } from 'date-fns';
import { LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { ModalContext } from "@focuson/pages";
import { Label } from "./label";
import { makeButtons } from "./makeButtons";
import ReactDatePicker from "react-datepicker";
import { useEffect } from "react";
import { CustomError, setEdited } from "./CustomError";
import { Transform } from "@focuson/lens";
import { makeInputChangeTxs } from "./labelAndInput";


type DateFormat = string//'dd-MM/yyyy' | 'yyyy/MM/dd'
export interface DatePickerDetails {
  dateFilter: ( d: Date ) => boolean
}

export interface DateInfo {
  today: string;
  serverNow: string;
  holidays: Holidays[];
  dateFormat: string
}

export interface Holidays {
  date: string;
  jurisdiction: string;

}
export interface UsableDateInfo {
  today: Date;
  firstValidDate: Date | undefined
  holidays: Date[];
}
interface CommonDateRange<S, C> {
  allowWeekends?: boolean;
  allowHolidays?: boolean;
  defaultDay?: boolean
}
export interface DateRangeInPast<S, C> extends CommonDateRange<S, C> {
  type: 'past'
}
function isDateRangeInPast<S, C> ( d: DateRange<S, C> ): d is DateRangeInPast<S, C> {
  const a: any = d
  return a.type === 'past'
}
export interface DateRangeInFuture<S, C> extends CommonDateRange<S, C> {
  type: 'future'
  minWorkingDaysBefore?: number;
}
function isDateRangeInFuture<S, C> ( d: DateRange<S, C> ): d is DateRangeInFuture<S, C> {
  const a: any = d
  return a.type === 'future'
}
export interface AnyDateRange<S, C> extends CommonDateRange<S, C> {
}
export type DateRange<S, C> = DateRangeInPast<S, C> | DateRangeInFuture<S, C> | AnyDateRange<S, C>


export const parseDate = ( prefix: string, format: string ) => ( date: string ): Date | string[] => {
  if ( typeof date !== 'string' ) throw new Error ( `${prefix}. parseDate called with non string. Type is ${typeof date}. Value is ${JSON.stringify ( date )}` )
  let result = parse ( date.replace ( /\//g, '-' ), format.replace ( /\//g, '-' ), new Date () );
  return isNaN ( result.getTime () ) ? [ `${prefix}Please use date format ${format.toLowerCase ()}` ] : result;
};

type DateValidation = ( date: Date ) => string[]
interface DateErrorMessageOptionals {
  isInPast?: string;
  isWeekend?: string
  isHoliday?: string
  beforeFirstValid?: string
}
export interface DateErrorMessage {
  isInPast: string;
  isWeekend: string
  isHoliday: string
  beforeFirstValid: string
}
export const defaultDateErrorMessage: DateErrorMessage = {
  beforeFirstValid: "before first valid date",
  isHoliday: 'is a holiday',
  isWeekend: 'is a weekend',
  isInPast: `is in the future`
}

const holidaysOK = <S, C> ( holidays: Date[], dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage ): DateValidation => ( date: Date ): string[] => {
  if ( dateRange.allowHolidays !== false || !date ) return []
  const found = holidays.find ( h => h.getTime () === date.getTime () )
  if ( found ) return [ dateErrorMessage.isHoliday ]
  return []
}

const weekEndsOk = <S, C> ( dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage ): DateValidation => ( date: Date ): string[] => {
  if ( dateRange.allowWeekends !== false || !date ) return []
  return [ 0, 6 ].includes ( date.getDay () ) ? [ dateErrorMessage.isWeekend ] : [];
}

const futureOk = <S, C> ( udi: UsableDateInfo, dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage ): DateValidation => {
  const firstValidDate = firstAllowedDate ( udi.today, udi.holidays, dateRange, dateErrorMessage )
  return date => {
    if ( date && isDateRangeInFuture ( dateRange ) ) {
      if ( firstValidDate === undefined ) {
        console.error ( 'error - undefined firstValidDate', udi, dateRange )
        throw Error ( `Cannot work out if date is in future because firstValidDate is undefined` )
      }
      return date.getTime () >= firstValidDate.getTime () ? [] : [ dateErrorMessage.beforeFirstValid ]
    } else return []
  };
}
const pastOk = <S, C> ( dateRange: DateRange<S, C>, today: Date, dateErrorMessage: DateErrorMessage ): DateValidation => date => {
  if ( date && isDateRangeInPast ( dateRange ) ) {
    return date.getTime () <= today.getTime () ? [] : [ dateErrorMessage.isInPast ]
  } else return []
}

function combine ( ...fns: DateValidation[] ): DateValidation {
  return date => fns.flatMap ( fn => fn ( date ) )
}
export function errorsAnd<T> ( ds: (T | string[])[] ): [ string[], T[] ] {
  const errors = ds.flatMap ( e => Array.isArray ( e ) ? e : [] )
  const ts = ds.flatMap ( d => Array.isArray ( d ) ? [] : [ d ] )
  return [ errors, ts ]
}
export function errorsAndT<T> ( d: (T | string[]) ): [ string[], T | undefined ] {
  if ( Array.isArray ( d ) ) return [ d, undefined ]
  return [ [], d ]
}
function map<T> ( d: Date | string[], fn: ( d: Date ) => T ): T | string[] {
  if ( Array.isArray ( d ) ) return d
  return fn ( d )
}
const noErrorsBooleanFn = <T extends any> ( fn: ( t: T ) => string[] ): ( t: T ) => boolean => t => fn ( t ).length === 0;
const errorsBooleanFn = <T extends any> ( fn: ( t: T ) => string[] ): ( t: T ) => boolean => t => fn ( t ).length > 0;

export function validateDateInfo<S, C> ( dateInfo: DateInfo | undefined, targetJurisdiction: string | undefined, dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage, debug?: boolean ): UsableDateInfo | string[] {
  if ( dateInfo === undefined ) return { today: new Date (), holidays: [], firstValidDate: undefined }
  const dateFormat = dateInfo.dateFormat;
  const [ holidayErrors, holidays ] = errorsAnd ( safeArray ( dateInfo.holidays ).filter ( h => h.jurisdiction === targetJurisdiction || targetJurisdiction === undefined )
    .map ( ( { date, jurisdiction }, i ) =>
      parseDate ( `holidays[${i}]: `, dateFormat ) ( date ) ) )
  const [ todayErrors, todayDates ] = errorsAnd ( [ parseDate ( '', dateFormat ) ( dateInfo.today ) ] )
  const errors = [ ...todayErrors, ...holidayErrors ]
  if ( debug ) console.log ( 'validateDateInfo', dateInfo, errors )
  if ( errors.length > 0 ) return errors
  const today = todayDates[ 0 ]
  const firstValidDate = firstAllowedDate ( today, holidays, dateRange, dateErrorMessage )
  return { holidays, today, firstValidDate }

}

export function firstAllowedDate<S, C> ( today: Date | undefined, holidays: Date[], dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage ) {
  if ( isDateRangeInFuture ( dateRange ) ) {
    const checkDate = combine ( holidaysOK ( holidays, dateRange, dateErrorMessage ), weekEndsOk ( dateRange, dateErrorMessage ) )
    if ( dateRange.minWorkingDaysBefore === undefined ) return today
    if ( dateRange.minWorkingDaysBefore < 0 ) throw Error ( `Illegal argument: ${JSON.stringify ( dateRange )}` )
    if ( today === undefined ) throw Error ( `` )
    const date = new Date ( today.getTime () )
    var count = 0
    while ( true ) {
      const ok = checkDate ( date ).length === 0
      if ( ok && count >= dateRange.minWorkingDaysBefore )
        return date
      else {
        date.setDate ( date.getDate () + 1 )
        if ( ok ) count = count + 1
      }
    }
  }
}
function acceptDate<S, C> ( udi: UsableDateInfo, dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage ): DateValidation {
  const { holidays, today } = udi
  return combine (
    futureOk ( udi, dateRange, dateErrorMessage ),
    pastOk ( dateRange, today, dateErrorMessage ),
    holidaysOK ( holidays, dateRange, dateErrorMessage ),
    weekEndsOk ( dateRange, dateErrorMessage ) )
}
export function acceptDateForTest<S, C> ( jurisdiction: string | undefined, dateInfo: DateInfo, dateRange: DateRange<S, C>, dateErrorMessage: DateErrorMessage ): DateValidation {
  const usableInfo = validateDateInfo ( dateInfo, jurisdiction, dateRange, dateErrorMessage )
  if ( Array.isArray ( usableInfo ) ) throw new Error ( `Problem in dateInfo\n${JSON.stringify ( usableInfo )}` )
  return acceptDate ( usableInfo, dateRange, dateErrorMessage )
}

interface InfoTheDatePickerNeeds {
  dateAcceptor: ( d: Date ) => string[]
  dateFilter: ( d: Date ) => boolean;
  holidays: Date[];
  defaultDate: Date | undefined;
}

export function calcInfoTheDatePickerNeeds<S, C> ( id: string, jurisdiction: string | undefined, dateInfo: DateInfo | undefined, dateFormat: DateFormat, dateRange: undefined | DateRange<S, C>, dateErrorMessage: DateErrorMessage, debug: boolean ): InfoTheDatePickerNeeds {
  const actualDateRange: DateRange<S, C> = dateRange ? dateRange : {}
  const usableInfo = validateDateInfo ( dateInfo, jurisdiction, actualDateRange, dateErrorMessage )
  if ( Array.isArray ( usableInfo ) ) throw  new Error ( `Problem in dateInfo\n${JSON.stringify ( usableInfo )}` )
  const dateAcceptor = acceptDate ( usableInfo, actualDateRange, dateErrorMessage )
  let result: InfoTheDatePickerNeeds = {
    dateAcceptor,
    dateFilter: noErrorsBooleanFn ( acceptDate ( usableInfo, actualDateRange, dateErrorMessage ) ),
    defaultDate: usableInfo.firstValidDate ? usableInfo.firstValidDate : usableInfo.today,
    holidays: usableInfo.holidays
  };
  if ( debug ) console.log ( 'calcInfoTheDatePickerNeeds', id, dateInfo, result, )
  return result
}

interface SelectedDate {
  date: Date | undefined;
  scrollToDate: Date | undefined
  selectedDateErrors: string[]
}
function selectedDate<S, C> ( state: LensState<S, string, C>, dateFormat: string, defaultScrollToDate: Date | undefined ): SelectedDate {
  const dateString = state.optJson ()
  if ( dateString === undefined ) return ({ date: undefined, scrollToDate: defaultScrollToDate, selectedDateErrors: [] })
  const [ selectedDateErrors, date ] = errorsAndT ( parseDate ( ``, dateFormat ) ( dateString ) )
  const scrollToDate = date ? date : defaultScrollToDate;
  return { date, scrollToDate, selectedDateErrors }
}

export interface DatePickerProps<S, C> extends CommonStateProps<S, string, C>, InputOnChangeProps<S, C>, LabelAlignment {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  dateFormat: DateFormat;
  showMonthYearPicker?: boolean;
  dateRange?: DateRange<S, C>;
  jurisdiction?: LensState<S, string, C>;
  dateInfo?: LensState<S, DateInfo, C>;
  dateErrorMessage?: DateErrorMessageOptionals
}

export type DatePickerSelectFn = <S extends any, C extends ModalContext<S>>( debug: boolean, props: DatePickerProps<S, C> ) => ( eventName: SetJsonReasonEvent, date: string | undefined ) => void

export const defaultDatePickerWithExtraTxs = <S extends any, C extends ModalContext<S>> ( txs: ( props: DatePickerProps<S, C>, value: string | undefined ) => Transform<S, any>[] ) => ( debug: boolean, props: DatePickerProps<S, C> ) =>
  ( eventName: SetJsonReasonEvent, date: string | undefined ) => {
    const { id, state, onChange, parentState, regexForChange } = props
    const {} = state.context

    const changeTxs = regexForChange === undefined || (date && date.match ( regexForChange ) !== null) ? makeInputChangeTxs ( id, parentState, onChange ) : []
    if ( debug ) console.log ( 'datePicker.defaultDatePickerOnCheck', id, 'date', date )
    state.massTransform ( reasonFor ( 'DatePicker', eventName, id ) ) ( [ state.optional, () => date ], ...txs ( props, date ), ...changeTxs )
  };
export const defaultDatePickerOnCheck: DatePickerSelectFn = defaultDatePickerWithExtraTxs ( () => [] )
function myformat ( e: any, dateFormat: string ) {
  try {
    return format ( e, dateFormat );
  } catch ( e ) {
    return undefined
  }
}
export function RawDatePicker<S extends any, C extends ModalContext<S>> ( selectFn: DatePickerSelectFn ) {
  return ( props: DatePickerProps<S, C> ) => {
    const { state, jurisdiction, dateInfo, dateRange, name, label, id, mode, readonly, dateFormat, showMonthYearPicker, required, dateErrorMessage } = props
    const main: any = state.main
    const debug = main?.debug?.dateDebug

    const { defaultDate, dateFilter, holidays, dateAcceptor } = calcInfoTheDatePickerNeeds ( id, jurisdiction?.optJson (), dateInfo?.optJson (), dateFormat, dateRange,
      { ...defaultDateErrorMessage, ...dateErrorMessage }, debug )
    const { date, selectedDateErrors, scrollToDate } = selectedDate ( state, dateFormat, defaultDate )

    function onChange ( e: any/* probably a date or an array of dates if we are selecting a range (which we aren't)*/ ) {
      try {
        const formattedDate = e === undefined ? undefined : myformat ( e, dateFormat )
        if ( debug ) console.log ( 'datePicker.onChange', id, 'e', typeof e, e, 'dateFormat', dateFormat, 'formattedDate', formattedDate )
        setEdited ( e?.target, formattedDate )
        selectFn ( debug, props ) ( 'onChange', formattedDate )
        // state.setJson ( formattedDate, reasonFor ( 'DatePicker', 'onChange', id ) )
      } catch ( err ) {
        console.error ( "e is", e )
        throw err
      }
    }

    function onChangeRaw ( e: React.FocusEvent<HTMLInputElement> ) {
      const value = e.target?.value;
      if ( value !== undefined ) {
        setEdited ( e?.target , e?.target?.value)
        if ( debug ) console.log ( 'datePicker.onChangeRaw', id, value, 'changed', e )
        selectFn ( debug, props ) ( 'changeRaw', value )
      }
    }
    const value = state.optJson ();
    function findErrorsFrom ( value: string | undefined ): string[] {
      if ( !value ) return required !== false && !readonly ? [ `Date is required` ] : []
      const valueAsDate = parseDate ( ``, dateFormat ) ( value )
      if ( Array.isArray ( valueAsDate ) ) return valueAsDate
      const result = dateAcceptor ( valueAsDate );
      return result
    }
    const errorFromValue = findErrorsFrom ( value )
    const dateError = errorFromValue.length > 0 ? errorFromValue.join ( ", " ) : undefined
    if ( debug ) console.log ( 'datePicker', id, 'value', value, 'date', date, 'errorFromValue', errorFromValue )
    const error = selectedDateErrors.length > 0 || (dateError !== undefined);
    //@ts-ignore - because react doesn't understand currying so thinks this isn't being called inside a function component
    useEffect ( () => {
      const current: any = document.getElementById ( id )
      if ( current?.setCustomValidity ) current.setCustomValidity ( error ? dateError : '' )
    } )
    return <div data-error={dateError} className={`labelAndDate ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      <Label state={state} htmlFor={name} label={label}/>
      <div className={`${props.buttons && props.buttons.length > 0 ? 'inputAndButtons' : ''} `}>
        <ReactDatePicker id={id}
                         dateFormat={dateFormat}
                         todayButton='Today'
                         openToDate={scrollToDate}
                         selected={error ? undefined : date}
                         onChange={( date ) => onChange ( date )}
                         filterDate={dateFilter}
                         showMonthYearPicker={showMonthYearPicker}
                         highlightDates={holidays}
                         readOnly={mode === 'view' || readonly}
                         className={dateError ? "red-border" : ""}
                         closeOnScroll={true}
                         onChangeRaw={onChangeRaw}
                         value={error ? value : undefined} // whats going on here? Well the value is read as a date. And the date picker might change it
                         placeholderText="Select a date"/>
        {makeButtons ( props )}
      </div>
      <CustomError id={props.id} validationMessage={dateError} error={error}/>
    </div>
  };
}
export function DatePicker<S extends any, C extends ModalContext<S>> ( props: DatePickerProps<S, C> ): JSX.Element {
  const selectFn: DatePickerSelectFn = defaultDatePickerOnCheck;
  return RawDatePicker<S, C> ( selectFn ) ( props );
}

// export function DatePickerWithExtraTransformations