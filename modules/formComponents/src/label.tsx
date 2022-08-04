import { LensProps } from "@focuson/state";
import { PageSelectionContext, replaceTextUsingPath } from "@focuson/pages";
import { safeString } from "@focuson/utils";


export interface LabelProps<S, Context extends PageSelectionContext<S>> extends LensProps<S, any, Context> {
  label?: string,
  htmlFor?: string
}

export function Label<S, Context extends PageSelectionContext<S>> ( { state, label, htmlFor }: LabelProps<S, Context> ) {
  let string = label?.includes ( '{' ) ? replaceTextUsingPath ( state, safeString ( label ) ) : label;
  return <label htmlFor={htmlFor} className="input-label" dangerouslySetInnerHTML={{ __html: string ? string : '' }}/>
}

