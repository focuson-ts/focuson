import { NameAnd } from "@focuson/utils";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";

export interface RadioProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  enums: NameAnd<string>;
  defaultValue?: string
}

export function Radio<S, T, Context extends FocusOnContext<S>> ( { state, mode, enums, ariaLabel, id }: RadioProps<S, string, Context> ) {
  console.log ( state.optJson () )
  return <>{Object.entries ( enums ).map ( ( [ key, value ] ) => {
    console.log ( 'Key Value ===>', key + ' ' + value )
    return <span onClick={() => state.setJson ( value, reasonFor ( 'Radio', 'onClick', id ) )} key={key}>
      <input id={id + value} onChange={() => {}} checked={state.optJson () === value} value={state.optJson ()} type='radio' name={id} disabled={mode === 'view'} aria-label={ariaLabel}/>
      <Label state={state} htmlFor={key} label={value}/>
    </span>
  } )}</>
}

export interface LabelAndRadioProps<S, T, Context> extends RadioProps<S, T, Context> {
  label: string;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
}
export function LabelAndRadio<S, T, Context extends FocusOnContext<S>> ( props: LabelAndRadioProps<S, string, Context> ) {
  const { label, name } = props
  return <div><Label state={props.state} htmlFor={name} label={label}/><span><Radio {...props}/></span></div>
}
