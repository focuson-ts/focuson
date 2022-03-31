import { ModalCancelButton } from "./modal/modalCommitAndCancelButton";
import { PageSelectionContext } from "./pageSelection";
import { LensProps, LensState } from "@focuson/state";

export function Loading<S, C extends PageSelectionContext<S>> ( state: LensState<S, any, C> ) {
  console.log ( 'In Loading', state )
  let pageSelections = state.context.pageSelectionL.getOption ( state.main );
  if ( pageSelections && pageSelections.length > 1 )
    return (<div><p>Loading</p><ModalCancelButton id='loading.cancel' state={state}/></div>)
  else
    return (<div><p>Loading</p></div>)
}