import { LensProps } from "@focuson/state";
import { replaceTextUsingPath } from "@focuson/focuson";
import { safeString } from "@focuson/utils";
import { PageSelectionContext } from "@focuson/pages";


export interface LabelProps<S, Context extends PageSelectionContext<S>> extends LensProps<S, any, Context> {
  label?: string,
  htmlFor?: string
}

export function Label<S, Context extends PageSelectionContext<S>> ( { state, label, htmlFor }: LabelProps<S, Context> ) {
  let string = label?.includes ( '{' ) ? replaceTextUsingPath ( state, safeString ( label ) ) : label;
  return <label htmlFor={htmlFor} className="input-label">{string}</label>
}

