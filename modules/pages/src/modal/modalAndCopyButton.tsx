import { LensProps, LensState, LensState2 } from "@focuson/state";
import { Lens } from "@focuson/lens";
import { CommonModalButtonProps, ModalButtonProps } from "./modalButton";


export interface ModalAndCopyButtonProps<S, Full, Data> extends  CommonModalButtonProps<S> {
  from: LensState<S, Data>,
  to: LensState<S, Data>
}
/** This is used when the modal button needs to edit a copy of the data and has such behavior as 'save' and 'cancel'.
 * The data is copied to a temporary place by this button. The modal points to the temporary place
 * Cancel just closes the modal. Save either has a post action or copies back
 *
 * When this is done typically the 'fromApi' data is held in a 'full domain' and the temporary place is under the full
 */
export function ModalAndCopyButton<S, Full, Data> ( { id, text, modal, modalL, from, to }: ModalAndCopyButtonProps<S, Full, Data> ) {
  function onClick () {
    return () => {
      const fromJson: Data|undefined = from.optJson ()
      if ( modalL ) to.useOtherAsWell ( modalL ).setTwoValues ( fromJson, modal )
      else throw Error ( `Using ModalAndCopyButton  ${text} ${modal} ${from.optional.description} ${to.optional.description} without context` )
    }
  }
  return <button id={id} onClick={onClick ()}>{text}</button>

}