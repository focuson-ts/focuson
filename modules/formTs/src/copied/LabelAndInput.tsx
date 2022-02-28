import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";
import { CheckboxInput, NumberInput, StringInput } from "./Input";


export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label: string;
}

export function LabelAndStringInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, string, Context> ) {
  return <div><label>{label}</label><StringInput state={state} mode={mode}/></div>
}
export function LabelAndNumberInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, number, Context> ) {
  return <div><label>{label}</label><NumberInput state={state} mode={mode}/></div>
}
export function LabelAndCheckboxInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, boolean, Context> ) {
  return <div><label>{label}</label><CheckboxInput state={state} mode={mode}/></div>
}