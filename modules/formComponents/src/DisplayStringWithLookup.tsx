import { CommonStateProps } from "./common";
import { NameAnd, safeString } from "@focuson/utils";
import { PageSelectionContext, replaceTextUsingPath } from "@focuson/pages";


export interface DisplayStringWithLookupProps<S, C> extends CommonStateProps<S, string , C> {
  lookup: NameAnd<string>
  ifUndefined?: string;
  className?: string
}

export function DisplayStringWithLookup<S, C extends PageSelectionContext<S>> ( { id, state, lookup, ifUndefined, className }: DisplayStringWithLookupProps<S, C> ) {
  const displayKey = state.optJson ()
  const displayValue = displayKey ? lookup?.[ displayKey ] : undefined
  const string = displayValue ? displayValue : (ifUndefined ? ifUndefined : '')
  let realDisplayValue = string?.includes ( '{' ) ? replaceTextUsingPath ( state, safeString ( string ) ) : string;
  return <div id={id} className={className} dangerouslySetInnerHTML={{ __html: realDisplayValue }}/>

}