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
  return <>{Object.entries ( enums ).map ( ( [ key, value ] ) => {
    const checked = state.optJson () === value
    const cssChecked = checked ? 'checked' : ''

    const disabled = mode === 'view'
    const cssDisabled = disabled ? 'disabled' : ''
    
    return <div className={`radio-container ${cssChecked} ${cssDisabled}`} onClick={() => state.setJson ( value, reasonFor ( 'Radio', 'onClick', id ) )} key={key}>
      <input id={id + value} onChange={() => {}} checked={checked} value={state.optJson ()} type='radio' name={id} disabled={disabled} aria-label={ariaLabel}/>
      <span className="checkmark"></span>
      <Label state={state} htmlFor={key} label={value}/>
    </div>
  } )}</>
}

export interface LabelAndRadioProps<S, T, Context> extends RadioProps<S, T, Context> {
  label: string;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
}
export function LabelAndRadio<S, T, Context extends FocusOnContext<S>> ( props: LabelAndRadioProps<S, string, Context> ) {
  const { label, name } = props
  return <div className="labelRadioButton"><Label state={props.state} htmlFor={name} label={label}/><span className="d-flex-inline"><Radio {...props}/></span></div>
}
