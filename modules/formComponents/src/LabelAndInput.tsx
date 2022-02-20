import { CommonStateProps } from "./common";


export interface LabelAndInputProps<S> extends CommonStateProps<S, string> {
  label: string;
}

export function LabelAndInput<S> ( { label, state }: LabelAndInputProps<S> ) {
  return <div><label>{label}</label><input type='text' defaultValue={state.json ()}/></div>
}