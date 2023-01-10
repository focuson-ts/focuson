import { NameAnd } from "@focuson-nw/utils";
import { FocusedProps } from "@focuson-nw/pages";


export interface UnpaidCardOrMisuseItemsProps<S,C> extends FocusedProps<S, number, C>{
  id: string;
}

export function UnpaidCardOrMisuseItems<S, C> ( { state }: UnpaidCardOrMisuseItemsProps<S,  C> ) {
  return <p>I got here with {state.optJson ()}</p>
}