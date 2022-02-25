import { LensState } from "@focuson/state";
import { CommonModalButtonProps, transformsForModal } from "./modalButton";
import { PageSelectionContext } from "../pageSelection";
import { massTransform, Transform } from "@focuson/lens";


export interface ModalAndCopyButtonProps<S, Data, Context> extends CommonModalButtonProps<S, Data, Context> {
  from: LensState<S, Data, Context>,

}
/** This is used when the modal button needs to edit a copy of the data and has such behavior as 'save' and 'cancel'.
 * The data is copied to a temporary place by this button. The modal points to the temporary place
 * Cancel just closes the modal. Save either has a post action or copies back
 *
 * When this is done typically the 'fromApi' data is held in a 'full domain' and the temporary place is under the full
 */
export function ModalAndCopyButton<S, Data, Context extends PageSelectionContext<S>> ( props: ModalAndCopyButtonProps<S, Data, Context> ) {
  const { id, text, from, to } = props
  const onClick = () => {
    let copyTx: Transform<S, Data> = [ to.optional, ignore => from.json () ];
    console.log('copyTx', copyTx)
    console.log('copyJson', from.json())
    console.log('copy result', massTransform(to.main, copyTx))
    console.log('copy result2',to.optional.setOption(to.main, from.json()))
    console.log('copy result3',to.optional.transform(copyTx[1])(to.main))
    to.massTransform ( copyTx,
      ...transformsForModal<S, Data, Context> ( from.context, 'popup', props )
      )
  }

  return <button id={id} onClick={onClick}>{text}</button>
}