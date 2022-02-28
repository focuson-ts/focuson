import { NameAnd } from "@focuson/utils";
import { FocusedProps } from "../common";

export interface RadioProps<S, Context> extends FocusedProps<S, string, Context> {
  enums: NameAnd<string>;
}


export function Radio<S, Context> ( { state, mode, enums }: RadioProps<S, Context> ) {
  return <div className='outlined'><RadioRaw enums={enums} mode={mode} state={state}/></div>
}
function RadioRaw<S, Context> ( { state, mode, enums }: RadioProps<S, Context> ) {
  // const { state, mode } = props
  const groupName = state.optional.description
  const json= state.optJson()
  return <>{Object.entries ( enums ).map ( ( [ name, value ] ) =>
    <span>
      <input key={name} type="radio" id={name} name={groupName} value={name} readOnly={mode === 'view'} checked={json===value}/>
      <label htmlFor={name}>{value}</label>
    </span> )}</>
}

export interface LabelAndRadioProps<S, Context> extends RadioProps<S, Context> {
  label: string;
}
export function LabelAndRadio<S, Context> ( { state, mode, enums, label }: LabelAndRadioProps<S, Context> ) {
  return <div ><label>{label}</label><span className='outlined'><RadioRaw state={state} mode={mode} enums={enums}/></span></div>
}
