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
  dateFormat: DateFormat
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
  defaultDay?: string
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

const matchesHoliday = ( neededJurisdiction: string | undefined, neededDate: Date ) => ( h: UsableHolidays ) => {
  const { date, jurisdiction } = h
  let j = neededJurisdiction === undefined || neededJurisdiction === jurisdiction;
  let d = date.getTime () === neededDate.getTime ();
  let result = j && d;
  return result;
};
const holidaysOK = ( neededJurisdiction: string | undefined, holidays: UsableHolidays[] ): DateValidation => dateRange => ( neededDate: Date ): string[] => {
  if ( dateRange.allowHolidays !== false ) return []
  const found = holidays.find ( matchesHoliday ( neededJurisdiction, neededDate ) )
  if ( found ) return [ 'is a holiday' ]
  return []
}

const weekEndsOk: DateValidation = dateRange => ( date: Date ): string[] => {
  if ( dateRange.allowsWeekends !== false ) return []
  return [ 0, 6 ].includes ( date.getDay () ) ? [ 'is a weekend' ] : [];
}

const futureOk = ( jurisdiction: string | undefined, udi: UsableDateInfo ): DateValidation => dateRange => {
  const firstValidDate = firstAllowedDate ( jurisdiction, udi, dateRange )
  return date => {
    if ( isDateRangeInFuture ( dateRange ) ) {
      if ( firstValidDate === undefined ) {
        console.error ( 'error - undefined firstValidDate', udi, jurisdiction, dateRange )
        throw Error ( `Cannot work out if date is in future because firstValidDate is undefined` )
      }
      return date.getTime () >= firstValidDate.getTime () ? [] : [ `is before first valid date` ]
    } else return []
  };
}
const pastOk = ( today: Date ): DateValidation => dateRange => date => {
  if ( isDateRangeInPast ( dateRange ) ) {
    return date.getTime () <= today.getTime () ? [] : [ `is in the future` ]
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

export function validateDateInfo ( dateInfo: DateInfo | undefined ): UsableDateInfo | string[] {
  if ( dateInfo === undefined ) return { today: new Date (), holidays: [] }
  const dateFormat = dateInfo.dateFormat;
  const [ holidayErrors, holidays ] = errorsAnd ( safeArray ( dateInfo.holidays ).map ( ( { date, jurisdiction }, i ) =>
    map ( parseDate ( `holidays[${i}]`, dateFormat ) ( date ), date => ({ date, jurisdiction }) ) ) )
  const [ todayErrors, todayDates ] = errorsAnd ( [ parseDate ( 'today', dateFormat ) ( dateInfo.today ) ] )
  const errors = [ ...todayErrors, ...holidayErrors ]
  if ( errors.length > 0 ) return errors
  return { holidays, today: todayDates[ 0 ] }

}

export function firstAllowedDate<S, C> ( jurisdiction: string | undefined, udi: UsableDateInfo, dateRange: DateRange<S, C> ) {
  if ( isDateRangeInFuture ( dateRange ) ) {
    const checkDate = combine ( holidaysOK ( jurisdiction, udi.holidays ), weekEndsOk ) ( dateRange )
    if ( dateRange.minWorkingDaysBefore === undefined ) return udi.today
    if ( dateRange.minWorkingDaysBefore < 0 ) throw Error ( `Illegal argument: ${JSON.stringify ( dateRange )}` )
    const date = new Date ( udi.today.getTime () )
    var count = 0
    while ( true ) {
      const ok = checkDate ( date ).length === 0
      if ( ok && count >= dateRange.minWorkingDaysBefore )
        return date
      else {
        date.setDate ( date.getDate () + 1 )
        if ( ok ) count++
      }
    }
  }
}
function acceptDateWithUsable (  jurisdiction: string | undefined, udi: UsableDateInfo ): DateValidation {
  const { holidays, today } = udi
  return combine (
    futureOk ( jurisdiction, udi ),
    pastOk ( today ),
    holidaysOK ( jurisdiction, holidays ),
    weekEndsOk )
}
export function acceptDate ( jurisdiction: string | undefined, dateInfo: DateInfo ): DateValidation {
  const usableInfo = validateDateInfo ( dateInfo )
  if ( Array.isArray ( usableInfo ) ) throw new Error ( `Problem in dateInfo\n${JSON.stringify ( usableInfo )}` )
  return acceptDateWithUsable (  jurisdiction, usableInfo )
}