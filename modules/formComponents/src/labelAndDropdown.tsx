import { defaultDateFn, NameAnd, stringToSimpleMsg, toArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps, LabelAlignment } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";
import { inputCommandProcessors, ModalChangeCommands, modalCommandProcessors, processChangeCommandProcessor } from "@focuson/rest";
import { displayTransformsInState, Transform } from "@focuson/lens";
import { ChangeEvent } from "react";


export interface DropdownProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  parentState: LensState<S, any, Context>;
  enums: NameAnd<string>;
  readonly?: boolean
  buttons?: string[];
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
  onChange?: NameAnd<ModalChangeCommands | ModalChangeCommands[]>
}
export interface LabelAndDropdownProps<S, T, Context> extends DropdownProps<S, T, Context>, LabelAlignment {
  label: string;
  allButtons: NameAnd<JSX.Element>;
}

export function LabelAndDropdown<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDropdownProps<S, string, Context> ) {
  const { enums, state, ariaLabel, id, mode, label, name, buttons, readonly, pleaseSelect, size, required } = props
  let selected = state.optJson ();
  const hasValid = selected && Object.keys ( enums ).includes ( selected )
  return (<div className={`dropdown-container ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      <Label state={state} htmlFor={id} label={label}/>
      <div className={`${props.buttons && props.buttons.length > 0 ? 'dropdownAndButtons' : ''}`}>
        <Dropdown{...props} />{makeButtons ( props.allButtons, props.buttons )}
      </div>
    </div>
  )
}

export function Dropdown<S, T, Context extends FocusOnContext<S>> ( props: DropdownProps<S, string, Context> ) {
  const { enums,parentState, state, ariaLabel, id, mode, onChange, readonly, pleaseSelect, size, required } = props
  let selected = state.optJson ();
  if ( selected !== undefined && typeof selected !== 'string' ) throw new Error ( `Component ${id} has a selected value which isn't a string. It is ${JSON.stringify ( selected, null, 2 )}` )
  console.log ( 'selected', JSON.stringify ( selected ) )
  console.log ( 'enums', JSON.stringify ( enums ) )
  const hasValid = selected && Object.keys ( enums ).includes ( selected )
  const value = hasValid ? selected : undefined
  const cssValidInput = hasValid || required === false ? '' : ' invalid'
  let onChangeEventHandler = ( e: ChangeEvent<HTMLSelectElement> ) => {
    let newValue = e.target.value;
    const change = onChange?.[ newValue ]
    const { simpleMessagesL, pathToLens, } = state.context
    const config = { toPathTolens: pathToLens ( parentState.main, parentState.optional ), stringToMsg: stringToSimpleMsg ( defaultDateFn, 'info' ), messageL: simpleMessagesL };
    const changeTxs: Transform<S, any>[] = processChangeCommandProcessor ( `Modal button.${id}`, inputCommandProcessors ( config ) ( state.main ), toArray ( change ) )
    console.log ( `Dropdown $id}`, displayTransformsInState ( state.main, changeTxs ) )
    state.massTransform ( reasonFor ( 'LabelAndDropdown', 'onChange', id ) ) ( [ state.optional, () => newValue ], ...changeTxs );
  }
  return (
    <select className={`select ${cssValidInput}`} value={value} disabled={mode === 'view' || readonly} id={id} required={required} size={size} aria-label={ariaLabel} onChange={onChangeEventHandler}>
      {pleaseSelect && !hasValid && <option>{pleaseSelect}</option>}
      {
        Object.entries ( enums ).map ( ( [ value, name ], key ) => (
          <option key={key} value={value}>{name}</option>
        ) )}
    </select>
  )
}