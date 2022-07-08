import { NameAnd, safeArray } from "@focuson/utils";
import { CommonStateProps, LabelAlignment } from "./common";
import { parse } from 'date-fns';
import { LensState } from "@focuson/state";

//Approach...
//Make a 'dateFilter' and pass it...

export interface DatePickerDetails {
  dateFilter: ( d: Date ) => boolean
}

export interface DateInfo {
  dateFormat: string
  today: string;
  holidays: Holidays[];
}

export interface Holidays {
  id: string;
  date: string;
  jurisdiction: string;
}

interface CommonDateRange<S,C> {
  jurisdiction?: LensState<S, string, C>;
  holidays?:  LensState<S, string, C>;
  dateFormat: 'dd/MM/yyyy' | 'yyyy/MM/dd'
  allowsWeekends?: boolean;
  allowHolidays?: boolean;
  defaultDay: 'today' | string
}
export interface DateRangeInPast<S,C> extends CommonDateRange<S,C> {
  type: 'past'
}
function isDateRangeInPast<S,C> ( d: DateRange<S,C> ): d is DateRangeInPast<S,C> {
  const a: any = d
  return a.type === 'past'
}
export interface DateRangeInFuture<S,C> extends CommonDateRange<S,C> {
  type: 'future'
  minWorkingDaysBefore?: number;
}
function isDateRangeInFuture <S,C>( d: DateRange<S,C> ): d is DateRangeInFuture<S,C> {
  const a: any = d
  return a.type === 'future'
}
export interface AnyDateRange<S,C> extends CommonDateRange<S,C> {
}
export type DateRange<S,C> = DateRangeInPast<S,C> | DateRangeInFuture<S,C> | AnyDateRange<S,C>

export interface LabelAndDateProps2<S, C> extends CommonStateProps<S, string, C>, LabelAlignment {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  dateRange?: DateRange<S,C>
}
export const parseDate = ( format: string ) => ( date: string ): Date => {
  return parse ( date.replace ( /\//g, '-' ), format.replace ( /\//g, '-' ), new Date () )
};

type DateValidation = <S,C>( dateRange: DateRange<S,C> ) => ( date: Date ) => string[]

const holidaysOK = ( holidays: Date[] ): DateValidation => dateRange  => ( date: Date ): string[] => {
  if ( dateRange.allowsWeekends ) return []
  if ( holidays.includes ( date ) ) return [ 'is a holiday' ]
  return []
}

const weekEndsOk: DateValidation =  dateRange => ( date: Date ): string[] => {
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

export function acceptDate ( { dateFormat, holidays, today }: DateInfo ): DateValidation {
  const holidayDates = safeArray ( holidays ).map ( h => parseDate ( dateFormat ) ( h.date ) )
  const todayDate = parseDate ( dateFormat ) ( today )
  return combine (
    holidaysOK ( holidayDates ),
    futureOk ( todayDate ),
    pastOk ( todayDate ),
    weekEndsOk )
}