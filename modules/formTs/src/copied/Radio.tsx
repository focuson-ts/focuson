import { NameAnd } from "@focuson/utils";
import { FocusedProps } from "../common";
import { Input } from "./Input";

export interface RadioProps<S> extends FocusedProps<S, string> {
  enums: NameAnd<string>;
}


export function Radio<S> ( { state, mode, enums }: RadioProps<S> ) {
  return <div className='outlined'><RadioRaw enums={enums} mode={mode} state={state}/></div>
}
function RadioRaw<S> ( { state, mode, enums }: RadioProps<S> ) {
  // const { state, mode } = props
  const groupName = state.optional.description
  const json= state.optJson()
  return <>{Object.entries ( enums ).map ( ( [ name, value ] ) =>
    <span>
      <input key={name} type="radio" id={name} name={groupName} value={name} readOnly={mode === 'view'} checked={json===value}/>
      <label htmlFor={name}>{value}</label>
    </span> )}</>
}

export interface LabelAndRadioProps<S> extends RadioProps<S> {
  label: string;
}
export function LabelAndRadio<S> ( { state, mode, enums, label }: LabelAndRadioProps<S> ) {
  return <div ><label>{label}</label><span className='outlined'><RadioRaw state={state} mode={mode} enums={enums}/></span></div>
}
