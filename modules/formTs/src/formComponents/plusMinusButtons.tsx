import { LensState, reasonFor } from "@focuson/state";

export interface PlusMinusProps<S, C> {
  id: string;
  title: string;
  value: LensState<S, number, C>;
  min: number,
  max: number  
}
export function PlusButton<S, C> ( { id, title, value, min, max }: PlusMinusProps<S, C> ) {
  const index = value.optJson ()
  const i = index ? index : 0  
  const disabled = index !== undefined && index >= max
  return <button id={id} disabled={disabled} onClick={() => value.setJson ( i + 1, reasonFor ( 'PlusButton', 'onClick', id ) )}>{title} </button>
}

export function MinusButton<S, C> ( { id, title, value, min, max }: PlusMinusProps<S, C> ) {
  const index = value.optJson ()
  const i = index ? index : 0
  const disabled = index !== undefined && index <= min
  return <button id={id} disabled={disabled} onClick={() => value.setJson ( i - 1, reasonFor ( 'MinusButton', 'onClick', id ) )}>{title}</button>
}
