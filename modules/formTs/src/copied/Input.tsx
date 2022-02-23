import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";


export interface InputProps<S, Context> extends CommonStateProps<S, string, Context> {
}

export function Input<S, Context> ( { mode, state }: InputProps<S, Context> ) {
  return <input type='text' readOnly={mode === 'view'} defaultValue={state.json ()}/>
}