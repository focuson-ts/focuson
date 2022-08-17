import { ModalCancelButton, ModalContext } from "./modal/modalCommitAndCancelButton";
import { LensState } from "@focuson/state";

export function Loading<S, C extends ModalContext<S>> ( state: LensState<S, any, C> ) {
  let pageSelections = state.context.pageSelectionL.getOption ( state.main );
  if ( pageSelections && pageSelections.length > 1 )
    return (<div><p>Loading</p><ModalCancelButton id='loading.cancel' state={state}/></div>)
  else
    return (<div><p>Loading</p></div>)
}