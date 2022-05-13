import { NameAnd } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";


export interface LabelAndDropdownProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label: string;
  enums: NameAnd<string>;
  readonly?: boolean
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
}

export function LabelAndDropdown<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDropdownProps<S, string, Context> ) {
  const { enums, state, ariaLabel, id, mode, label, name, buttons, readonly, pleaseSelect, size, required } = props
  let selected = state.optJson ();
  const selectedName = Object.entries ( enums ).filter ( ( [ value, name ] ) => selected && name === enums[ selected ] )
  return (<div className='labelDropdown'>
      <Label state={state} htmlFor={name} label={label}/>
      <select className='dropdown' value={state.optJson ()} disabled={mode === 'view' || readonly} id={id} required={required} size={size} aria-label={ariaLabel} onChange={( e ) =>
        state.setJson ( e.target.value, reasonFor ( 'LabelAndDropdown', 'onChange', id ) )}>
        {pleaseSelect ? <option disabled>{pleaseSelect}</option> : <></>}
        {
          Object.entries ( enums ).map ( ( [ value, name ], key ) => (
            <option key={key} value={value}>{name}</option>
          ) )}
      </select>{makeButtons ( props.allButtons, props.buttons )}
    </div>
  )
}