import { LensState, reasonFor } from "@focuson/state";
import { findValidityDetails, fromPathGivenState, PageSelectionContext, pageState } from "@focuson/pages";
import { Lens, massTransform, Optional, Transform } from "@focuson/lens";
import { toArray } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "./common";


export interface DeleteStateButtonProps<S, C>  extends CustomButtonType{
  id: string;
  label: string;
  states: LensState<S, any, C>[];

}
export function DeleteStateButton<S, C > ( { id, label, states, buttonType }: DeleteStateButtonProps<S, C> ) {
  
  function onClick () {
    const txs: Transform<S, any>[] = states.map ( s => [ s.optional, () => undefined ] )
    if ( txs.length === 0 ) return
    states[ 0 ].massTransform ( reasonFor ( 'DeleteStateButton', 'onClick', id ) ) ( ...txs )
  }
  return <button id={id} onClick={onClick} className={getButtonClassName(buttonType)}>{label}</button>

}