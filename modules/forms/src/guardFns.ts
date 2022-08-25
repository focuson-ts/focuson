import { LensState } from "@focuson/state";

export interface HasValue{
  value: number
}
export function balanceZero<S,V extends HasValue, C>(s: LensState<S,V[], C>): boolean{
  const data = s.optJsonOr([])
  const balance = data.reduce((acc, v)=> acc + v.value, 0)
  return balance === 0
}