import { LensState } from "@focuson/state";
import { CommonModalButtonProps } from "./modalButton";
import { pageAndSet, PageSelectionContext } from "../pageSelection";


export interface ModalAndCopyButtonProps<S, Data, Context> extends CommonModalButtonProps {
  from: LensState<S, Data, Context>,
  to: LensState<S, Data, Context>
}
/** This is used when the modal button needs to edit a copy of the data and has such behavior as 'save' and 'cancel'.
 * The data is copied to a temporary place by this button. The modal points to the temporary place
 * Cancel just closes the modal. Save either has a post action or copies back
 *
 * When this is done typically the 'fromApi' data is held in a 'full domain' and the temporary place is under the full
 */
export function ModalAndCopyButton<S, Data, Context extends PageSelectionContext<S>> ( { id, text, pageMode, modal, from, to }: ModalAndCopyButtonProps<S, Data, Context> ) {
  const onClick = () => pageAndSet<S, Context, Data> ( from, 'popup', { pageName: modal, firstTime: true, pageMode }, to.optional, from.json () );
  return <button id={id} onClick={onClick}>{text}</button>
}