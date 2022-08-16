import { findClosePageTxs, ModalContext } from "./modalCommitAndCancelButton";
import { LensState, reasonFor } from "@focuson/state";
import { PageSelection, pageSelections, popPage } from "../pageSelection";
import { Transform } from "@focuson/lens";
import { DisplayArbitraryPageFn } from "../pageConfig";


export interface ConfirmWindowProps {
  id: string;
  messageText?: string
  confirmText: string;
  cancelText: string;
}
export interface MakeConfirmCommitWindow<S, C> {
  state: LensState<S, any, C>,

  props: ConfirmWindowProps,
  confirmId: string;
  confirm: ( e: any ) => void;
  cancelId: string;
  cancel: ( e: any ) => void
}
export const makeConfirmCommitWindow = <S, D, C extends ModalContext<S>> ( makeFn: ( makerProps: MakeConfirmCommitWindow<S, C> ) => JSX.Element ): DisplayArbitraryPageFn<S, D, C, ConfirmWindowProps> => ( state: LensState<S, D, C>, props: ConfirmWindowProps ) => {
  const id = props.id
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
  const e: JSX.Element = makeFn ( { state, props, confirm, confirmId, cancel, cancelId } )
  return e
};

//This needs to be a function so that it can be 'customised' to the relevant S,D and C. Without that it's always 'unknown'
export function ConfirmCommitWindow<S, D, C extends ModalContext<S>> () {
  return makeConfirmCommitWindow<S, D, C> ( makerProps => {
    const { confirm, confirmId, cancel, cancelId, props } = makerProps
    const { id, messageText, confirmText, cancelText } = props
    const realText = messageText ? messageText : 'Are you sure?'
    return <div className='modalPopup-content show-modal confirm-window'>
      <p>Confirm window</p>
      {realText}
      <button id={confirmId} onClick={confirm}>{confirmText}</button>
      <button id={cancelId} onClick={cancel}>{cancelText}</button>
    </div>;
  } )
}
