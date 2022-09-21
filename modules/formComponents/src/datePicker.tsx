import { NameAnd, safeArray } from "@focuson/utils";
import { CommonStateProps, LabelAlignment } from "./common";
import { format, parse } from 'date-fns';
import { LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { PageSelectionContext } from "@focuson/pages";
import { Label } from "./label";
import { makeButtons } from "./makeButtons";
import ReactDatePicker from "react-datepicker";


type DateFormat = string//'dd-MM/yyyy' | 'yyyy/MM/dd'
export interface DatePickerDetails {
  dateFilter: ( d: Date ) => boolean
}

export interface DateInfo {
  today: string;
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
  let result = parse ( date.replace ( /\//g, '-' ), format.replace ( /\//g, '-' ), new Date () );
  return isNaN ( result.getTime () ) ? [ `${prefix} Invalid date [${date}]. Use ${format}` ] : result;
};

type DateValidation = ( date: Date ) => string[]

const holidaysOK = <S, C> ( holidays: Date[], dateRange: DateRange<S, C> ): DateValidation => ( date: Date ): string[] => {
  if ( dateRange.allowHolidays !== false ) return []
  const found = holidays.find ( h => h.getTime () === date.getTime () )
  if ( found ) return [ 'is a holiday' ]
  return []
}

const weekEndsOk = <S, C> ( dateRange: DateRange<S, C> ): DateValidation => ( date: Date ): string[] => {
  if ( dateRange.allowWeekends !== false ) return []
  return [ 0, 6 ].includes ( date.getDay () ) ? [ 'is a weekend' ] : [];
}

const futureOk = <S, C> ( udi: UsableDateInfo, dateRange: DateRange<S, C> ): DateValidation => {
  const firstValidDate = firstAllowedDate ( udi.today, udi.holidays, dateRange )
  return date => {
    if ( !date ) return [ `Date is undefined` ]
    if ( isDateRangeInFuture ( dateRange ) ) {
      if ( firstValidDate === undefined ) {
        console.error ( 'error - undefined firstValidDate', udi, dateRange )
        throw Error ( `Cannot work out if date is in future because firstValidDate is undefined` )
      }
      return date.getTime () >= firstValidDate.getTime () ? [] : [ `is before first valid date` ]
    } else return []
  };
}
const pastOk = <S, C> ( dateRange: DateRange<S, C>, today: Date ): DateValidation => date => {
  if ( isDateRangeInPast ( dateRange ) ) {
    return date.getTime () <= today.getTime () ? [] : [ `is in the future` ]
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

export function validateDateInfo<S, C> ( dateInfo: DateInfo | undefined, targetJurisdiction: string | undefined, dateRange: DateRange<S, C>, debug?: boolean ): UsableDateInfo | string[] {
  if ( dateInfo === undefined ) return { today: new Date (), holidays: [], firstValidDate: undefined }
  const dateFormat = dateInfo.dateFormat;
  const [ holidayErrors, holidays ] = errorsAnd ( safeArray ( dateInfo.holidays ).filter ( h => h.jurisdiction === targetJurisdiction || targetJurisdiction === undefined )
    .map ( ( { date, jurisdiction }, i ) =>
      parseDate ( `holidays[${i}]`, dateFormat ) ( date ) ) )
  const [ todayErrors, todayDates ] = errorsAnd ( [ parseDate ( 'today', dateFormat ) ( dateInfo.today ) ] )
  const errors = [ ...todayErrors, ...holidayErrors ]
  if ( debug ) console.log ( 'validateDateInfo', dateInfo, errors )
  if ( errors.length > 0 ) return errors
  const today = todayDates[ 0 ]
  const firstValidDate = firstAllowedDate ( today, holidays, dateRange )
  return { holidays, today, firstValidDate }

}

export function firstAllowedDate<S, C> ( today: Date | undefined, holidays: Date[], dateRange: DateRange<S, C> ) {
  if ( isDateRangeInFuture ( dateRange ) ) {
    const checkDate = combine ( holidaysOK ( holidays, dateRange ), weekEndsOk ( dateRange ) )
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
function acceptDate<S, C> ( udi: UsableDateInfo, dateRange: DateRange<S, C> ): DateValidation {
  const { holidays, today } = udi
  return combine (
    futureOk ( udi, dateRange ),
    pastOk ( dateRange, today ),
    holidaysOK ( holidays, dateRange ),
    weekEndsOk ( dateRange ) )
}
export function acceptDateForTest<S, C> ( jurisdiction: string | undefined, dateInfo: DateInfo, dateRange: DateRange<S, C> ): DateValidation {
  const usableInfo = validateDateInfo ( dateInfo, jurisdiction, dateRange )
  if ( Array.isArray ( usableInfo ) ) throw new Error ( `Problem in dateInfo\n${JSON.stringify ( usableInfo )}` )
  return acceptDate ( usableInfo, dateRange )
}

interface InfoTheDatePickerNeeds {
  dateFilter: ( d: Date ) => boolean;
  holidays: Date[];
  defaultDate: Date | undefined;
}

export function calcInfoTheDatePickerNeeds<S, C> ( id: string, jurisdiction: string | undefined, dateInfo: DateInfo | undefined, dateFormat: DateFormat, dateRange: undefined | DateRange<S, C>, debug: boolean ): InfoTheDatePickerNeeds {
  const actualDateRange: DateRange<S, C> = dateRange ? dateRange : {}
  const usableInfo = validateDateInfo ( dateInfo, jurisdiction, actualDateRange )
  if ( Array.isArray ( usableInfo ) ) throw  new Error ( `Problem in dateInfo\n${JSON.stringify ( usableInfo )}` )
  let result = {
    dateFilter: noErrorsBooleanFn ( acceptDate ( usableInfo, actualDateRange ) ),
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
  const [ selectedDateErrors, date ] = errorsAndT ( parseDate ( `selectedDate`, dateFormat ) ( dateString ) )
  const scrollToDate = date ? date : defaultScrollToDate;
  return { date, scrollToDate, selectedDateErrors }
}

export interface DatePickerProps<S, C> extends CommonStateProps<S, string, C>, LabelAlignment {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  dateFormat: DateFormat;
  showMonthYearPicker?: boolean;
  dateRange?: DateRange<S, C>;
  jurisdiction?: LensState<S, string, C>;
  dateInfo?: LensState<S, DateInfo, C>;
}

export type DatePickerSelectFn = <S extends any>( id: string, debug: boolean, state: LensState<S, any, any> ) => ( eventName: SetJsonReasonEvent, date: string ) => void

export function defaultDatePickerOnCheck<S extends any> ( id: string, debug: boolean, state: LensState<S, any, any> ) {
  return ( eventName: SetJsonReasonEvent, date: string ) => {
    if ( debug ) console.log ( 'datePicker.defaultDatePickerOnCheck', id, date, debug )
    state.setJson ( date, reasonFor ( 'DatePicker', eventName, id ) )
  };
}
export function RawDatePicker<S extends any, C extends PageSelectionContext<S>> ( selectFn: DatePickerSelectFn ) {
  return ( props: DatePickerProps<S, C> ) => {
    const { state, jurisdiction, dateInfo, dateRange, name, label, id, mode, readonly, dateFormat, showMonthYearPicker } = props
    const main: any = state.main
    const debug = main?.debug?.dateDebug

    const { defaultDate, dateFilter, holidays } = calcInfoTheDatePickerNeeds ( id, jurisdiction?.optJson (), dateInfo?.optJson (), dateFormat, dateRange, debug )
    const { date, selectedDateErrors, scrollToDate } = selectedDate ( state, dateFormat, defaultDate )

    function onChange ( e: any/* probably a date or an array of dates if we are selecting a range (which we aren't)*/ ) {
      try {
        let formattedDate = e === undefined ? format ( e, dateFormat ) : undefined
        if ( debug ) console.log ( 'datePicker.onChange', id, e, dateFormat, formattedDate, debug )
        selectFn ( id, debug, state ) ( 'onChange', formattedDate )
        // state.setJson ( formattedDate, reasonFor ( 'DatePicker', 'onChange', id ) )
      } catch ( err ) {
        console.error ( "e is", e )
        throw err
      }
    }

    function onChangeRaw ( e: React.FocusEvent<HTMLInputElement> ) {
      const value = e.target?.value;
      if ( value !== undefined ) {
        if ( debug ) console.log ( 'datePicker.onChangeRaw', id, value, 'changed', e )
        selectFn ( id, debug, state ) ( 'changeRaw', value )
      }
    }
    let value = state.optJson ();
    if ( debug ) console.log ( 'datePicker', id, 'value', value, 'date', date )
    let error = selectedDateErrors.length > 0;
    // const ref=useRef<any>(null)

    return <div className={`labelAndDate ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      <Label state={state} htmlFor={name} label={label}/>
      <div className={`${props.buttons && props.buttons.length > 0 ? 'inputAndButtons' : ''} `}>
        <ReactDatePicker id={id}
          // customInputRef={ref}
                         dateFormat={dateFormat}
                         todayButton='Today'
                         openToDate={scrollToDate}
                         selected={error ? undefined : date}
                         onChange={( date ) => onChange ( date )}
                         filterDate={dateFilter}
                         showMonthYearPicker={showMonthYearPicker}
                         highlightDates={holidays}
                         readOnly={mode === 'view' || readonly}
                         className={error ? "red-border" : ""}
                         closeOnScroll={true}
                         onChangeRaw={onChangeRaw}
                         value={error ? value : undefined} // whats going on here? Well the value is read as a date. And the date picker might change it
                         placeholderText="Select a date"/>
        {makeButtons ( props )}
      </div>
    </div>
  };
}
export function DatePicker<S extends any, C extends PageSelectionContext<S>> ( props: DatePickerProps<S, C> ): JSX.Element {
  const selectFn: DatePickerSelectFn = defaultDatePickerOnCheck;
  return RawDatePicker<S, C> ( selectFn ) ( props );
}
