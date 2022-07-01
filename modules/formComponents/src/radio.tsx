import { NameAnd } from "@focuson/utils";
import { CommonStateProps, LabelAlignment } from "./common";
import { Label } from "./label";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";

export interface RadioProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment {
  enums: NameAnd<string>;
  defaultValue?: string
}

export function Radio<S, T, Context extends FocusOnContext<S>> ( { state, mode, enums, ariaLabel, id, labelPosition, required }: RadioProps<S, string, Context> ) {
  let selected = state.optJson ();
  const hasValid = selected && Object.values ( enums ).includes ( selected )
  const cssValidInput = hasValid || !required ? '' : ' invalid'

  return <div className={`radio-group-container ${cssValidInput}`} id={id}>{Object.entries ( enums ).map ( ( [ key, value ] ) => {
    const checked = state.optJson () === value
    const cssChecked = checked ? 'checked' : ''

    const disabled = mode === 'view'
    const cssDisabled = disabled ? 'disabled' : ''

    let onClick = () => state.setJson ( key, reasonFor ( 'Radio', 'onClick', id ) );
    return <div className={`radio-container ${labelPosition == 'Horizontal' ? 'd-flex-inline' : ''} ${cssChecked} ${cssDisabled}`} onClick={onClick} key={key}>
      <input id={id + value} onChange={() => {}} checked={checked} value={state.optJson ()} type='radio' name={id} disabled={disabled} aria-label={ariaLabel} required={required}/>
      <span className="checkmark"></span>
      <Label state={state} htmlFor={id + value} label={value}/>
    </div>
  } )}</div>
}

export interface LabelAndRadioProps<S, T, Context> extends RadioProps<S, T, Context> {
  label: string;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
}
export function LabelAndRadio<S, T, Context extends FocusOnContext<S>> ( props: LabelAndRadioProps<S, string, Context> ) {
  const { label, name } = props
  return <div className="labelRadioButton"><Label state={props.state} htmlFor={name} label={label}/><Radio {...props}/></div>
}
