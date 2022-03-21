import { LensProps } from "@focuson/state";
import { FocusOnContext, replaceTextUsingPath } from "@focuson/focuson";
import { safeString } from "@focuson/utils";


export interface LabelProps<S, Context extends FocusOnContext<S>> extends LensProps<S, any, Context> {
  label?: string,
  htmlFor?: string
}

export function Label<S, Context extends FocusOnContext<S>> ( { state, label, htmlFor }: LabelProps<S, Context> ) {
  return <label htmlFor={htmlFor}>{replaceTextUsingPath ( state,safeString(label) )}</label>
}
