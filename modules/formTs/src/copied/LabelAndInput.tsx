import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";
import { Input } from "./Input";


export interface LabelAndInputProps<S, Context> extends CommonStateProps<S, string, Context> {
  label: string;
}

export function LabelAndInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, Context> ) {
  return <div><label>{label}</label><Input state={state} mode={mode}/></div>
}