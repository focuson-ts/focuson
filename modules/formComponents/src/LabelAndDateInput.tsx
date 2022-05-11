import { NameAnd, safeArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";
// import { cleanInputProps } from "./input";
import DatePicker from "react-datepicker";


export interface LabelAndDateProps<S, Context> extends CommonStateProps<S, string, Context> {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
  datesExcluded?: LensState<S,any[], Context>,
  fieldNameInHolidays?: string,
  workingDaysInPast?: number,
  workingDaysInFuture?: number,
}

export function LabelAndDateInput<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDateProps<S, Context> ) {
  const { state, ariaLabel, id, mode, label, name, buttons, readonly, datesExcluded, fieldNameInHolidays, workingDaysInPast, workingDaysInFuture } = props

  const datesToExclude = datesExcluded?.optJsonOr([]).map(d => d[fieldNameInHolidays? fieldNameInHolidays : 'holiday'])  

  const isHoliday = (date: any, dateList: any) => {
    return dateList.find((d:any) => new Date(d).toDateString() === date.toDateString());
  };

  const isExcluded = (date: any, dateList: any) => {
    return isWeekday(date) && !isHoliday(date, dateList)
  }

  const onChange = ( date: any ) => {
    if(date) state.setJson ( date.toDateString(), reasonFor ( 'LabelAndDate', 'onChange', id ) )
  };

  const isWeekday = (date: any) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  };

  const addDays = (date: Date, n: number) => {
    let count: number = 0
    let endDate: Date = date
    while(count < n){
      endDate = new Date(date.setDate(date.getDate() + 1))
      if(isWeekday(endDate)) count++
    }
    return endDate
  }
  const subDays = (date: Date, n: number) => {
    let count: number = 0
    let endDate: Date = date
    while(count < n){
      endDate = new Date(date.setDate(date.getDate() - 1))
      if(isWeekday(endDate)) count++
    }
    return endDate
  }
  
  const selectedDate = new Date(state.optJsonOr(new Date().toDateString())) // TODO: Turn default date into arg
  return (<div className='labelAndDate'>
      <Label state={state} htmlFor={name} label={label}/>
      {/* <input {...cleanInputProps ( props )} type='date' readOnly={mode === 'view' || readonly} onChange={onChange} value={state.optJsonOr ( '' )}/> */}
      <DatePicker selected={selectedDate} onChange={(date) => onChange(date)} filterDate={(date) => isExcluded(date, safeArray(datesToExclude))} 
      includeDateIntervals={[{ start: subDays(new Date(), workingDaysInPast?workingDaysInPast:0), end: addDays(new Date(), workingDaysInFuture?workingDaysInFuture:0) },]}
      // highlightDates={datesToExcludeAsDate}
      placeholderText="Select a weekday"/>
      {makeButtons ( props.allButtons, props.buttons )}
    </div>)
}
