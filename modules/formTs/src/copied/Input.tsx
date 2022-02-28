import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";


export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
}

export function StringInput<S, Context> ( { mode, state }: InputProps<S, string, Context> ) {
  return <input type='text' readOnly={mode === 'view'} defaultValue={state.json ()}/>
}
export function NumberInput<S, Context> ( { mode, state }: InputProps<S, number, Context> ) {
  return <input type='text' readOnly={mode === 'view'} defaultValue={state.json ()}/>
}
export function CheckboxInput<S, Context> ( { mode, state }: InputProps<S, boolean, Context> ) {
  return <input type='checkbox' readOnly={mode === 'view'} checked={state.json ()}/>
}