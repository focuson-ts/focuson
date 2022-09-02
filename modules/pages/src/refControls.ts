import { LensState } from "@focuson/state";


export function useRefs ( state: LensState<any, any, any> ): boolean {
  return state.main.useRefs
}