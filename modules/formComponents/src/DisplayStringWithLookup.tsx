import { CommonStateProps } from "./common";
import { NameAnd } from "@focuson/utils";


export interface DisplayStringWithLookupProps<S, C> extends CommonStateProps<S, string, C> {
  lookup: NameAnd<String>
  ifUndefined?: string;
  className? : string
}

export function DisplayStringWithLookup<S, C> ( { state, lookup, ifUndefined, className }: DisplayStringWithLookupProps<S, C> ) {
  const displayKey = state.optJson ()
  const displayValue = displayKey? lookup?.[ displayKey ] : undefined
  const realDisplayValue = displayValue ? displayValue : ifUndefined
  return <div className={className}>{realDisplayValue}</div>
}