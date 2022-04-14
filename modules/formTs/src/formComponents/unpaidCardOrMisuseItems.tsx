import { NameAnd } from "@focuson/utils";
import { FocusedProps } from "@focuson/pages";


export interface UnpaidCardOrMisuseItemsProps<S,C> extends FocusedProps<S, number, C>{
  id: string;
}

export function UnpaidCardOrMisuseItems<S, C> ( { state }: UnpaidCardOrMisuseItemsProps<S,  C> ) {
  return <p>I got here with {state.optJson ()}</p>
}