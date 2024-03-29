import { LensState, reasonFor } from "@focuson/state";
import { findValidityDetails, fromPathGivenState, PageSelectionContext, pageState } from "@focuson/pages";
import { Lens, massTransform, Optional, Transform } from "@focuson/lens";
import { toArray } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "./common";
import { wrapWithErrors } from "@focuson/pages";


export interface SetStateButtonProps<S, T, C> extends CustomButtonType {
  id: string;
  label: string;
  state: LensState<S, T, C>;
  target: T
  enabledBy?: string[][]
}
export function SetStateButton<S, T, C> ( { id, label, state, buttonType, target, enabledBy }: SetStateButtonProps<S, T, C> ) {

  function onClick () {
    const txs: Transform<S, any>[] = [ [ state.optional, () => target ] ]
    if ( txs.length === 0 ) return
    state.massTransform ( reasonFor ( '}', 'onClick', id ) ) ( ...txs )
  }
  return wrapWithErrors ( id, enabledBy, [],(errorProps, error) =>
    <button id={id} {...errorProps} disabled={error} onClick={onClick} className={getButtonClassName ( buttonType )}>{label}</button> )

}