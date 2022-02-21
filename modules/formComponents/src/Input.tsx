import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";


export interface InputProps<S> extends CommonStateProps<S, string> {
  pageMode: PageMode
}

export function Input<S> ( { pageMode, state }: InputProps<S> ) {
  return <input type='text' readOnly={pageMode === 'view'} defaultValue={state.json ()}/>
}