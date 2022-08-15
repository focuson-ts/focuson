import { findClosePageTxs, ModalContext } from "./modalCommitAndCancelButton";
import { LensProps, reasonFor } from "@focuson/state";
import { currentPageSelectionTail, PageSelection, pageSelections, popPage } from "../pageSelection";
import { Transform } from "@focuson/lens";

export interface ConfirmWindowProps {
  id: string;
  text?: string
  confirmText: string;
  cancelText: string;
}


export const ConfirmCommitWindow = ( { id, text, confirmText, cancelText }: ConfirmWindowProps ) => <S, C extends ModalContext<S>> ( { state }: LensProps<S, any, C> ): JSX.Element => {
  const confirmId = id + '.confirm';
  const cancelId = id + '.cancel';

  function confirm ( e: any ) {
    const ps = pageSelections ( state );
    if ( ps.length < 2 ) throw Error ( `Software error in ConfirmCommitWindow,ps ${JSON.stringify ( ps )}\n\n${JSON.stringify ( state.main, null, 2 )}` )
    const thisPage = ps[ ps.length - 1 ]
    const thisPagetxs = findClosePageTxs ( `ConfirmCommitWindow ${id}`, state, thisPage, -1, [] )
    if ( thisPagetxs === undefined ) throw Error ( `Software error in ConfirmCommitWindow - this page\n${JSON.stringify ( state.main, null, 2 )}` )

    const modalPage = ps[ ps.length - 2 ]
    const modalPageTxs = findClosePageTxs ( `ConfirmCommitWindow ${id}`, state, modalPage, -2, [] )
    if ( modalPageTxs === undefined ) throw Error ( `Software error in ConfirmCommitWindow - last page\n${JSON.stringify ( state.main, null, 2 )}` )

    const pageCloseTx: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -2 ) ]
    state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', cancelId ) ) ( pageCloseTx, ...modalPageTxs, ...thisPagetxs )
  }

  function cancel ( e: any ) { state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', cancelId ) ) ( popPage ( state ) );}
  const realText = text ? text : 'Are you sure?'
  return <div className='confirm-window'>
    <p>Confirm window</p>
    {realText}
    <button id={confirmId} onClick={confirm}>{confirmText}</button>
    <button id={cancelId} onClick={cancel}>{cancelText}</button>
  </div>
};