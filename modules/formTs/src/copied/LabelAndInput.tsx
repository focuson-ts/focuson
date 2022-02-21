import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";
import { Input } from "./Input";


export interface LabelAndInputProps<S> extends CommonStateProps<S, string> {
  label: string;
}

export function LabelAndInput<S> ( { label, state, mode }: LabelAndInputProps<S> ) {
  return <div><label>{label}</label><Input state={state} mode={mode}/></div>
}