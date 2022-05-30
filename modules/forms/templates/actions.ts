import { LensState, reasonFor } from "@focuson/state";


export function exampleActionThatBlowsAwayTheState<S, C> ( s: LensState<S, any, C>, id: string ) {
  s.setJson ( undefined, reasonFor ( 'ActionButton', 'onClick', id ) )
}