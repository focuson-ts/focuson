import { LensState } from "@focuson-nw/state";


export function useRefs ( state: LensState<any, any, any> ): boolean {
  return state.main.useRefs
}