import { DateFn, NameAnd } from "@focuson/utils";
import { LensState } from "@focuson/state";
import { CommonStateProps, LabelAlignment } from "./common";
import { parse } from 'date-fns';

//Approach...
//Make a 'dateFilter' and pass it...

export interface DatePickerDetails {
  dateFilter: ( d: Date ) => boolean
}

export interface DateInfo {
  today: string;
  holidays: Holidays[];
}
export interface Holidays {
  id: string;
  date: string
}

interface CommonDateRange {
  dateFormat: 'dd/MM/yyyy' | 'yyyy/MM/dd'
  allowsWeekends?: boolean;
  allowHolidays?: boolean;
}
export interface DateRangeInPast extends CommonDateRange {
  type: 'past'
}
export interface DateRangeInFuture extends CommonDateRange {
  type: 'future'
  minWorkingDaysBefore?: number;
}
export interface AnyDateRange extends CommonDateRange {
  defaultDay: 'today' | string
}
export type DateRange = DateRangeInPast | DateRangeInFuture | AnyDateRange

export interface LabelAndDateProps2<S, Context> extends CommonStateProps<S, string, Context>, LabelAlignment {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  dateRange?: DateRange
}
export const parseDate = ( format: string ) => ( date: string ): Date => {
  return parse ( date.replace ( /\//g, '-' ), format.replace ( /\//g, '-' ), new Date () )
};

// export const acceptData: ( dateRange: DateRange) =>(date: Date): boolean => {
//
// };