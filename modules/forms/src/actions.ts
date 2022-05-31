import { LensState } from "@focuson/state";

export function approvePendingFees<S, C> ( s: LensState<S, any, C>, id: string ) {
  console.log ( "in approve pending fees" )
}
export function authoriseApprovedFees<S, C> ( s: LensState<S, any, C>, id: string ) {
  console.log ( "in authorise" )

}