import { ModalCancelButton, ModalContext } from "./modal/modalCommitAndCancelButton";
import { LensState } from "@focuson-nw/state";
import {HosLoader} from "@focuson-nw/form_components/dist/src/hosLoader";

export function Loading<S, C extends ModalContext<S>> ( state: LensState<S, any, C> ) {
  let pageSelections = state.context.pageSelectionL.getOption ( state.main );
  return <HosLoader className={undefined} msg={undefined} button={undefined} onClick={undefined} />
}