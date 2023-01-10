import { LensState, reasonFor } from "@focuson-nw/state";
import { findValidityDetails, fromPathGivenState, PageSelectionContext, pageState } from "@focuson-nw/pages";
import { Lens, massTransform, Optional, Transform } from "@focuson-nw/lens";
import { toArray } from "@focuson-nw/utils";
import { CustomButtonType, getButtonClassName } from "./common";
import { wrapWithErrors } from "@focuson-nw/pages";


export interface DeleteStateButtonProps<S, C> extends CustomButtonType {
  id: string;
  label: string;
  states: LensState<S, any, C>[];
  enabledBy?: string[][];

}
export function DeleteStateButton<S, C> ( { id, label, states, buttonType, enabledBy }: DeleteStateButtonProps<S, C> ) {
  function onClick () {
    const txs: Transform<S, any>[] = states.map ( s => [ s.optional, () => undefined ] )
    if ( txs.length === 0 ) return
    states[ 0 ].massTransform ( reasonFor ( 'DeleteStateButton', 'onClick', id ) ) ( ...txs )
  }
  return wrapWithErrors ( id, enabledBy, [],(errorProps, error) =>
    <button id={id} {...errorProps} disabled={error} onClick={onClick} className={getButtonClassName ( buttonType )}>{label}</button> )

}