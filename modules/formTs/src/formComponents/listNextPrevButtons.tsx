import { LensState, reasonFor } from "@focuson/state";
import { or, safeArray, useOrDefault } from "@focuson/utils";

export interface ListButtonProps<S, C> {
  id: string;
  title: string;
  value: LensState<S, number, C>;
  list: LensState<S, any[], C>;
}
export function ListNextButton<S, C> ( { id, title, value, list }: ListButtonProps<S, C> ) {
  const index = value.optJson ()
  const i = index ? index : 0
  const listSize = safeArray ( list.optJson () ).length
  const disabled = index !== undefined && index >= listSize - 1
  return <button id={id} disabled={disabled} onClick={() => value.setJson ( i + 1, reasonFor ( 'ListNextButton', 'onClick', id ) )}>{title} </button>
}

export function ListPrevButton<S, C> ( { id, title, value, list }: ListButtonProps<S, C> ) {
  const index = value.optJson ()
  const i = index ? index : 0
  const disabled = index !== undefined && index <= 0
  return <button id={id} disabled={disabled} onClick={() => value.setJson ( i - 1, reasonFor ( 'ListPrevButton', 'onClick', id ) )}>{title}</button>
}