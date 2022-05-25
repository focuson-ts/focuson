import { NameAnd, safeArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";
import DatePicker from "react-datepicker";
import { isValid, format } from 'date-fns';


export interface LabelAndDateProps<S, Context> extends CommonStateProps<S, string, Context> {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
  datesExcluded?: LensState<S,any[], Context>,
  fieldNameInHolidays?: string,
  workingDaysInPast?: number,
  workingDaysInFuture?: number,
  includeWeekends?: boolean,
  dateFormat?: string
}

export function LabelAndDateInput<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDateProps<S, Context> ) {
  const { state, ariaLabel, id, mode, label, name, buttons, readonly, datesExcluded, fieldNameInHolidays, workingDaysInPast, workingDaysInFuture, includeWeekends, dateFormat } = props

  const dateFormatL = dateFormat ? dateFormat : 'yyyy/MM/dd'

  const datesToExclude = datesExcluded?.optJsonOr([]).map(d => d[fieldNameInHolidays? fieldNameInHolidays : 'holiday'])
  const datesToExcludeAsDateType = safeArray(datesToExclude).map(d => new Date(d))

  const isHoliday = (date: Date, datesList: string[]) => {
    return datesList.find((d:string) => new Date(d).toDateString() === date.toDateString());
  };

  const isExcluded = (date: Date, datesList: string[]) => {
    return includeWeekends ? !isHoliday(date, datesList) : (isWeekday(date) && !isHoliday(date, datesList))
  }

  const onChange = ( date: any ) => {
    if(date) state.setJson ( format(date, dateFormatL), reasonFor ( 'LabelAndDate', 'onChange', id ) )
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  };

  const addDays = (date: Date, datesList: string[], n: number) => {
    let count: number = 0
    let newDate: Date = date
    while(count < n){
      newDate = new Date(date.setDate(date.getDate() + 1))
      if(isExcluded(newDate, datesList)) count++
    }
    return newDate
  }
  const subDays = (date: Date, datesList: string[], n: number) => {
    let count: number = 0
    let newDate: Date = date
    while(count < n){
      newDate = new Date(date.setDate(date.getDate() - 1))
      if(isExcluded(newDate, datesList)) count++
    }
    return newDate
  }

  const minDate = addDays(new Date(),safeArray(datesToExclude), workingDaysInFuture?workingDaysInFuture:0);

  const selectedDate = new Date(state.optJsonOr(new Date().toDateString()))
  let error = false

  if (!isValid(selectedDate)) {        
    error = true   
  } 

  return (<div className='labelAndDate'>
      <Label state={state} htmlFor={name} label={label}/>
      <div>
        <DatePicker 
        dateFormat={dateFormatL}
        todayButton="Select Today"
        selected={error ? null : selectedDate}
        onChange={(date) => onChange(date)} 
        filterDate={includeWeekends ? undefined : isWeekday}
        excludeDates={datesToExcludeAsDateType}
        minDate={minDate}
        highlightDates={datesToExcludeAsDateType}
        disabled={mode === 'view' || readonly}
        className={error ? "red-border" : ""}
        placeholderText="Select a date"/>
        {makeButtons ( props.allButtons, props.buttons )}
        {error && <div className="error-msg">Invalid Date: {state.optJsonOr('')}</div>}
      </div>
    </div>)
}
