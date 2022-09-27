import { makeInputChangeTxs } from "./labelAndInput";
import { FocusOnContext } from "@focuson/focuson";
import { LensState, reasonFor } from "@focuson/state";
import { InputChangeCommands } from "@focuson/rest";
import { disabledFrom } from "@focuson/utils";


export type InputSelectFn = <S, T, Context extends FocusOnContext<S>> ( state: LensState<S, T, Context>, id: string, value: T, parentState: LensState<S, any, Context> | undefined, onChange: undefined | InputChangeCommands | InputChangeCommands[], changesCanExecute: boolean | undefined ) => void

export const defaultInputSelectFn: InputSelectFn = <S, T, Context extends FocusOnContext<S>> ( state: LensState<S, T, Context>, id: string, value: T, parentState: LensState<S, any, Context> | undefined, onChange: undefined | InputChangeCommands | InputChangeCommands[], changesCanExecute: boolean | undefined ) => {
  const changeTxs = changesCanExecute ? makeInputChangeTxs ( id, parentState, onChange ) : []
  return state.massTransform ( reasonFor ( 'Input', 'onChange', id ) ) ( [ state.optional, () => value ], ...changeTxs );
}


export interface StringProps<T> { // T is the type that we are displaying/editing. V is the value expected by the target. boolean if a checkbox, but otherwise a string
  transformer: ( s: string ) => T,
  type: string;
  default: T | undefined;
  selectFn: InputSelectFn
}
export function isStringProps<T> ( p: TransformerProps<T> ): p is StringProps<T> {
  const a: any = p
  return a.type
}
export interface CheckboxProps<T> { // T is the type that we are displaying/editing. V is the value expected by the target. boolean if a checkbox, but otherwise a string
  transformer: ( b: boolean ) => T,
  checkbox: ( t: T | undefined ) => boolean
  default: T | undefined;
  selectFn: InputSelectFn
}
export function isCheckboxProps<T> ( p: TransformerProps<T> ): p is CheckboxProps<T> {
  const a: any = p
  return a.checkbox
}

export type TransformerProps<T> = StringProps<T> | CheckboxProps<T>


export const StringTransformer: StringProps<string> = { transformer: s => s, type: 'text', default: '', selectFn: defaultInputSelectFn }
export const NumberTransformer: StringProps<number> = { transformer: s => Number ( s ), type: 'number', default: undefined, selectFn: defaultInputSelectFn }
export const BooleanTransformer: CheckboxProps<boolean> = { transformer: s => s === true, default: false, checkbox: b => !!b, selectFn: defaultInputSelectFn }
export const BooleanYNTransformer: CheckboxProps<string> = { transformer: s => s ? 'Y' : 'N', default: 'N', checkbox: b => b === 'Y', selectFn: defaultInputSelectFn }
