import { NameAnd } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { Transform } from "@focuson/lens";
import { FocusOnContext } from "@focuson/focuson";
import { FocusedProps } from "@focuson/pages";
import { LabelAndNumberInput } from "./labelAndInput";
import { Label } from "./label";
import { CustomButtonType, getButtonClassName } from "./common";

export interface PlusMinusButtonsAndInputProps<S, C> extends FocusedProps<S, number, C>, CustomButtonType {
  id: string,
  label: string,
  allButtons: NameAnd<JSX.Element>,
  required: boolean,
  min: number,
  max?: number,
  flags: LensState<S, any[], C>
}

const modifyFlags = (flagValue: boolean)=>(flags: any[]) => {
  const i = flags.findIndex(f => f['flagName'] == "misuse")
  return i < 0 ? [...flags, { flagName: "misuse", flagValue }] : [...flags.slice(0, i), { flagName: "misuse", flagValue }, ...flags.slice(i+1)]
}
function modifyNumber(old: number, fn: (x: number) => number) {
  const newValue = fn(old)
  return newValue < 0 ? 0 : newValue
}

export function PlusMinusButtonsAndInput<S, C>({ state, id, label, allButtons, required, min, flags, buttonType }: PlusMinusButtonsAndInputProps<S, FocusOnContext<S>>) {
  
  const onClick = (fn: (x: number) => number) => () => {    
    const newNumber = modifyNumber(state.optJsonOr(0), fn)
    const transforms: Transform<S, any>[] = [
      [state.optional, () => newNumber],
      [flags.optional, modifyFlags(newNumber!=0)]
    ]
    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (...transforms)
  }

  return <>
    <div className="labelValueButton">
      <Label state={state} htmlFor={id} label={label}/>
      <div className="d-flex-inline">
        <button className={getButtonClassName(buttonType)} id={`${id}.minus`} title="Minus" onClick={onClick(x => x - 1)}>-</button>
        <LabelAndNumberInput id={id} allButtons={allButtons} required={required} min={min} state={state} mode='view' noLabel={true}/>
        <button className={getButtonClassName(buttonType)} id={`${id}.plus`} title="Plus" onClick={onClick(x => x + 1)}>+</button>
      </div>
    </div>
  </>
}