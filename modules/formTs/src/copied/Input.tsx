import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";


export interface InputProps<S> extends CommonStateProps<S, string> {
}

export function Input<S> ( { mode, state }: InputProps<S> ) {
  return <input type='text' readOnly={mode === 'view'} defaultValue={state.json ()}/>
}