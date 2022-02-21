import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";
import { Input } from "./Input";


export interface LabelAndInputProps<S> extends CommonStateProps<S, string> {
  label: string;
  pageMode: PageMode
}

export function LabelAndInput<S> ( { label, state, pageMode }: LabelAndInputProps<S> ) {
  return <div><label>{label}</label><Input state={state} pageMode={pageMode}/></div>
}