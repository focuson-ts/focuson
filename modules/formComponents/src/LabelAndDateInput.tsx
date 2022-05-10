import { NameAnd } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";
import { cleanInputProps } from "./input";
import DatePicker from "react-datepicker";


export interface LabelAndDateProps<S, Context> extends CommonStateProps<S, string, Context> {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
  datesExcluded?: string[]
}

export function LabelAndDateInput<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDateProps<S, Context> ) {
  const { state, ariaLabel, id, mode, label, name, buttons, readonly } = props

  // const datesExcluded = [new Date('2022-05-09'), new Date('2022-05-04'), new Date('2022-05-17'), new Date('2022-05-20'), new Date('2022-05-26'), new Date('2022-05-27')]
  const datesExcluded = ['2022-05-30','2022-05-04','2022-05-17','2022-05-20','2022-05-26','2022-05-27']
  // const datesExcluded = ['30-05-2022','04-05-2022','17-05-2022','20-05-2022','26-05-2022','27-05-2022']
  
  const onChange = ( date: any ) => {
    // console.log('LabelAndDateInput2', date)
    state.setJson ( date, reasonFor ( 'LabelAndDate', 'onChange', id ) )};

  const isWeekday = (date: any) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isHoliday = (date: any, datesExcluded: any) => {
    return datesExcluded.find((d:any) => new Date(d).toDateString() === date.toDateString());
    // return datesExcluded.find((d:any) => d.getTime() === date.getTime());
  };

  const isExcluded = (date: any, datesExcluded: any) => {
    return isWeekday(date) && !isHoliday(date, datesExcluded)
  }

  return (<div className='labelAndDate'>
      <Label state={state} htmlFor={name} label={label}/>
      {/* <input {...cleanInputProps ( props )} type='date' readOnly={mode === 'view' || readonly} onChange={onChange} value={state.optJsonOr ( '' )}/> */}
      <DatePicker selected={new Date()} onChange={(date) => onChange(date)} filterDate={(date) => isExcluded(date, datesExcluded)} placeholderText="Select a weekday"/>
      {makeButtons ( props.allButtons, props.buttons )}
    </div>)
}
