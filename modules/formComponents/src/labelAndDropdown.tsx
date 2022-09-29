import { disabledFrom, NameAnd, safeObject } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import {  } from "@focuson/focuson";
import { CommonStateProps, DropDownOnChangeProps, LabelAlignment } from "./common";
import { Label } from "./label";
import { makeInputChangeTxs } from "./labelAndInput";

import { ChangeEvent } from "react";
import { HasButtons, makeButtons } from "./makeButtons";
import { HasPathToLens, HasSimpleMessageL, PageSelectionContext } from "@focuson/pages";
import { HasRestCommandL } from "@focuson/rest";

export interface DropdownProps<S, T, Context> extends CommonStateProps<S, T, Context>, DropDownOnChangeProps<S, Context>, HasButtons {
  enums: NameAnd<string | undefined>;
  validationmessage?: string
  readonly?: boolean
  pleaseSelect?: string;
  size?: number;
  enabledBy?: string[][];
  required?: boolean;
}
export type ContextForDropdown<S> = PageSelectionContext<S> & HasRestCommandL<S> & HasSimpleMessageL<S> & HasPathToLens<S>

export interface LabelAndDropdownProps<S, T, Context> extends DropdownProps<S, T, Context>, LabelAlignment {
  label: string;
}

export function LabelAndDropdown<S, T, Context extends ContextForDropdown<S>> ( props: LabelAndDropdownProps<S, T, Context> ) {
  const { id, state, label, } = props
  const validationmessage = props.validationmessage ? props.validationmessage : label
  return (<div className={`dropdown-container ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      <Label state={state} htmlFor={id} label={label}/>
      <div className={`${props.buttons && props.buttons.length > 0 ? 'dropdownAndButtons' : ''}`}>
        <Dropdown{...props} validationmessage={validationmessage}/>{makeButtons ( props )}
      </div>
    </div>
  )
}
export function Dropdown<S, T, Context extends ContextForDropdown<S>> ( props: DropdownProps<S, T, Context> ) {
  const { enums, parentState, state, ariaLabel, id, mode, onChange, specificOnChange, readonly, pleaseSelect, size, required, enabledBy, validationmessage, regexForChange } = props
  let selected: any = state.optJson ();
  const statementDefined = !(selected === undefined || selected === null);
  if ( statementDefined && typeof selected !== 'string' ) throw new Error ( `Component ${id} has a selected value which isn't a string. It is ${JSON.stringify ( selected, null, 2 )}` )
  const hasValid = selected && Object.keys ( safeObject ( enums ) ).includes ( selected.toString () )
  const value = hasValid ? selected.toString () : undefined
  const cssValidInput = hasValid || required === false ? '' : ' invalid'
  const onChangeEventHandler = ( e: ChangeEvent<HTMLSelectElement> ) => {
    const newValue = e.target.value;
    const changeTxs = regexForChange===undefined || newValue.match ( regexForChange ) !== null ? [
      ...makeInputChangeTxs ( id, parentState, specificOnChange?.[ newValue ] ),
      ...makeInputChangeTxs ( id, parentState, onChange ), ]:[]
    state.massTransform ( reasonFor ( 'LabelAndDropdown', 'onChange', id ) ) ( [ state.optional, () => newValue ], ...changeTxs );
  }
  return (
    <select className={`select ${cssValidInput}`} value={value} data-validationmessage={validationmessage}
            disabled={mode === 'view' || readonly || disabledFrom ( enabledBy )} id={id} required={required} size={size} aria-label={ariaLabel} onChange={onChangeEventHandler}>
      {pleaseSelect && !hasValid && <option selected>{pleaseSelect}</option>}
      {Object.entries ( safeObject ( enums ) ).map ( ( [ value, name ], key ) => (
        <option key={key} value={value}>{name}</option>
      ) )}
    </select>
  )
}