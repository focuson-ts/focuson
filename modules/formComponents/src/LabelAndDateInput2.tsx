import { NameAnd, safeArray } from "@focuson/utils";
import { CommonStateProps, LabelAlignment } from "./common";
import { parse } from 'date-fns';
import { LensState } from "@focuson/state";

type DateFormat = 'dd/MM/yyyy' | 'yyyy/MM/dd'
export interface DatePickerDetails {
  dateFilter: ( d: Date ) => boolean
}

export interface DateInfo {
  today: string;
  holidays: Holidays[];
}

export interface Holidays {
  date: string;
  jurisdiction: string;
}
export interface UsableDateInfo {
  today: Date;
  holidays: UsableHolidays[];
}
export interface UsableHolidays {
  date: Date;
  jurisdiction: string;

}
interface CommonDateRange<S, C> {
  dateInfo?: LensState<S, any[], C>;
  dateFormat: DateFormat
  allowsWeekends?: boolean;
  allowHolidays?: boolean;
  defaultDay?:  string
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

export interface LabelAndDateProps2<S, C> extends CommonStateProps<S, string, C>, LabelAlignment {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  dateFormat: DateFormat;
  dateRange?: DateRange<S, C>
}
export const parseDate = ( prefix: string, format: string ) => ( date: string ): Date | string[] => {
  let result = parse ( date.replace ( /\//g, '-' ), format.replace ( /\//g, '-' ), new Date () );
  return isNaN ( result.getTime () ) ? [ `${prefix} Invalid date [${date}]. Use ${format}` ] : result;
};

type DateValidation = <S, C>( dateRange: DateRange<S, C> ) => ( date: Date ) => string[]

const holidaysOK = ( neededJurisdiction: string, holidays: UsableHolidays[] ): DateValidation => dateRange => ( neededDate: Date ): string[] => {
  if ( dateRange.allowsWeekends ) return []
  const found = holidays.find ( ( { jurisdiction, date } ) => (neededJurisdiction === undefined || neededJurisdiction === jurisdiction) && date === neededDate )
  if ( found ) return [ 'is a holiday' ]
  return []
}

const weekEndsOk: DateValidation = dateRange => ( date: Date ): string[] => {
  if ( dateRange.allowsWeekends ) return []
  return [ 0, 6 ].includes ( date.getDay () ) ? [ 'is a weekend' ] : [];
}

const futureOk = ( today: Date ): DateValidation => dateRange => {
  const firstValidDate = today
  return date => {
    if ( isDateRangeInFuture ( dateRange ) ) {
      return date.getTime () > firstValidDate.getTime () ? [] : [ `is before first valid date` ]
    } else return []
  };
}
const pastOk = ( today: Date ): DateValidation => dateRange => date => {
  if ( isDateRangeInPast ( dateRange ) ) {
    return date.getTime () < today.getTime () ? [] : [ `is in the future` ]
  } else return []
}

function combine ( ...fns: DateValidation[] ): DateValidation {
  return dateRange => date => fns.flatMap ( fn => fn ( dateRange ) ( date ) )
}
export function errorsAnd<T> ( ds: (T | string[])[] ): [ string[], T[] ] {
  const errors = ds.flatMap ( e => Array.isArray ( e ) ? e : [] )
  const ts = ds.flatMap ( d => Array.isArray ( d ) ? [] : [ d ] )
  return [ errors, ts ]
}
function map<T> ( d: Date | string[], fn: ( d: Date ) => T ): T | string[] {
  if ( Array.isArray ( d ) ) return d
  return fn ( d )
}

export function validateDateInfo ( dateFormat: DateFormat, dateInfo: DateInfo | undefined ): UsableDateInfo | string[] {
  if ( dateInfo === undefined ) return { today: new Date (), holidays: [] }
  const [ holidayErrors, holidays ] = errorsAnd ( safeArray ( dateInfo.holidays ).map ( ( { date, jurisdiction }, i ) =>
    map ( parseDate ( `holidays[${i}]`, dateFormat ) ( date ), date => ({ date, jurisdiction }) ) ) )
  const [ todayErrors, todayDates ] = errorsAnd ( [ parseDate ( 'today', dateFormat ) ( dateInfo.today ) ] )
  const errors = [ ...todayErrors, ...holidayErrors ]
  if ( errors.length > 0 ) return errors
  return { holidays, today: todayDates[ 0 ] }

}

export function acceptDate ( dateFormat: DateFormat, jurisdiction: string, dateInfo: DateInfo ): DateValidation {
  const usableInfo = validateDateInfo ( dateFormat, dateInfo )
  if ( Array.isArray ( usableInfo ) ) throw new Error ( `Problem in dateInfo\n${JSON.stringify ( usableInfo )}` )
  const { holidays, today } = usableInfo
  return combine (
    holidaysOK ( jurisdiction, holidays ),
    futureOk ( today ),
    pastOk ( today ),
    weekEndsOk )
}