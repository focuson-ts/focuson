import { CommonStateProps } from "./common";
import { NameAnd } from "@focuson/utils";


export interface DisplayStringWithLookupProps<S, C> extends CommonStateProps<S, string , C> {
  lookup: NameAnd<string>
  ifUndefined?: string;
  className?: string
}

export function DisplayStringWithLookup<S, C> ( { id, state, lookup, ifUndefined, className }: DisplayStringWithLookupProps<S, C> ) {
  const displayKey = state.optJson ()
  const displayValue = displayKey ? lookup?.[ displayKey ] : undefined
  const realDisplayValue = displayValue ? displayValue : (ifUndefined ? ifUndefined : '')
  return <div id={id} className={className} dangerouslySetInnerHTML={{ __html: realDisplayValue }}/>

}