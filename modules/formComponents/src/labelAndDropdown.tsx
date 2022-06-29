import { NameAnd, safeObject } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps, DropDownOnChangeProps, LabelAlignment } from "./common";
import { Label } from "./label";
import { makeButtons, makeInputChangeTxs } from "./labelAndInput";

import { ChangeEvent } from "react";

export interface DropdownProps<S, T, Context> extends CommonStateProps<S, T, Context>, DropDownOnChangeProps<S, Context> {
  enums: NameAnd<string>;
  readonly?: boolean
  buttons?: string[];
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
}
export interface LabelAndDropdownProps<S, T, Context> extends DropdownProps<S, T, Context>, LabelAlignment {
  label: string;
  allButtons: NameAnd<JSX.Element>;
}

export function LabelAndDropdown<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDropdownProps<S, string, Context> ) {
  const { id, state, label } = props

  return (<div className={`dropdown-container ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      <Label state={state} htmlFor={id} label={label}/>
      <div className={`${props.buttons && props.buttons.length > 0 ? 'dropdownAndButtons' : ''}`}>
        <Dropdown{...props} />{makeButtons ( props.allButtons, props.buttons )}
      </div>
    </div>
  )
}
export function Dropdown<S, T, Context extends FocusOnContext<S>> ( props: DropdownProps<S, string, Context> ) {
  const { enums, parentState, state, ariaLabel, id, mode, onChange, specificOnChange, readonly, pleaseSelect, size, required } = props
  let selected = state.optJson ();
  if ( selected !== undefined && typeof selected !== 'string' ) throw new Error ( `Component ${id} has a selected value which isn't a string. It is ${JSON.stringify ( selected, null, 2 )}` )
  const hasValid = selected && Object.keys (safeObject(enums) ).includes ( selected )
  const value = hasValid ? selected : undefined
  const cssValidInput = hasValid || required === false ? '' : ' invalid'
  const onChangeEventHandler = ( e: ChangeEvent<HTMLSelectElement> ) => {
    const newValue = e.target.value;
    state.massTransform ( reasonFor ( 'LabelAndDropdown', 'onChange', id ) ) (
      [ state.optional, () => newValue ],
      ...makeInputChangeTxs ( id, parentState, specificOnChange?.[ newValue ] ),
      ...makeInputChangeTxs ( id, parentState, onChange ),
    );
  }
  return (
    <select className={`select ${cssValidInput}`} value={value} disabled={mode === 'view' || readonly} id={id} required={required} size={size} aria-label={ariaLabel} onChange={onChangeEventHandler}>
      {pleaseSelect && !hasValid && <option>{pleaseSelect}</option>}
      {Object.entries (safeObject( enums )).map ( ( [ value, name ], key ) => (
        <option key={key} value={value}>{name}</option>
      ) )}
    </select>
  )
}