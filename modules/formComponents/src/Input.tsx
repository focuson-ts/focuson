import { CommonStateProps } from "./common";


export interface InputProps<S, Context> extends CommonStateProps<S, string, Context> {
}

export function Input<S, Context> ( { mode, state }: InputProps<S, Context> ) {
  return <input type='text' readOnly={mode === 'view'} defaultValue={state.json ()}/>
}