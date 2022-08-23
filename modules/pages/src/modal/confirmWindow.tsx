import { findClosePageTxs, ModalContext } from "./modalCommitAndCancelButton";
import { LensState, reasonFor } from "@focuson/state";
import { PageSelection, pageSelections, popPage } from "../pageSelection";
import { Transform } from "@focuson/lens";
import { DisplayArbitraryPageFn } from "../pageConfig";
import { replaceTextUsingPath } from "../replace";

interface ConfirmProps {
  pageName?: string;
  title?: string;
  className?: string
  messageText?: string
  confirmText?: string;
  cancelText?: string;

}
export interface ConfirmWindow extends ConfirmProps {
  type: 'window'
}
export function isConfirmWindow ( a: any ): a is ConfirmWindow {
  return a?.type === 'window'
}

export interface ConfirmWindowProps extends ConfirmProps {
  id: string;
}
export interface MakeConfirmCommitWindow<S, C> {
  state: LensState<S, any, C>,

  props: ConfirmWindowProps,
  id: string
  confirmId: string;
  confirm: ( e: any ) => void;
  cancelId: string;
  cancel: ( e: any ) => void
}
export const makeConfirmCommitWindow = <S, D, C extends ModalContext<S>> ( makeFn: ( makerProps: MakeConfirmCommitWindow<S, C> ) => JSX.Element ): DisplayArbitraryPageFn<S, D, C, ConfirmWindowProps> => ( state: LensState<S, D, C>, props: ConfirmWindowProps ) => {
  const id = 'confirm'
  const confirmId = id + '.confirm';
  const cancelId = id + '.cancel';
  function confirm ( e: any ) {

    const ps = pageSelections ( state );

    if ( ps.length < 2 ) throw Error ( `Software error in ConfirmCommitWindow,ps ${JSON.stringify ( ps )}\n\n${JSON.stringify ( state.main, null, 2 )}` )
    const thisPage = ps[ ps.length - 1 ]
    const action = thisPage.arbitraryParams.action
    if ( action === undefined ) throw Error ( `Software error in ConfirmCommitWindow, Expected action. ps ${JSON.stringify ( ps )}\n\n${JSON.stringify ( state.main, null, 2 )}` )
    if ( action === 'cancel' ) {
      const closePages: Transform<S, any> = [ state.context.pageSelectionL, ps => ps.slice ( 0, -2 ) ]
      state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', cancelId ) ) ( closePages )
      return
    }
    const thisPagetxs = findClosePageTxs ( `ConfirmCommitWindow ${id}`, state, thisPage, -1, [] )
    if ( thisPagetxs === undefined ) throw Error ( `Software error in ConfirmCommitWindow - this page\n${JSON.stringify ( state.main, null, 2 )}` )

    const modalPage = ps[ ps.length - 2 ]
    const modalPageTxs = findClosePageTxs ( `ConfirmCommitWindow ${id}`, state, modalPage, -2, [] )
    if ( modalPageTxs === undefined ) throw Error ( `Software error in ConfirmCommitWindow - last page\n${JSON.stringify ( state.main, null, 2 )}` )

    const pageCloseTx: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -2 ) ]
    state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', cancelId ) ) ( pageCloseTx, ...thisPagetxs, ...modalPageTxs )
  }

  function cancel ( e: any ) { state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', cancelId ) ) ( popPage ( state ) );}
  const e: JSX.Element = makeFn ( { state, id,props, confirm, confirmId, cancel, cancelId } )
  return e
};

//This needs to be a function so that it can be 'customised' to the relevant S,D and C. Without that it's always 'unknown'
export function ConfirmCommitWindow<S, D, C extends ModalContext<S>> () {
  return makeConfirmCommitWindow<S, D, C> ( makerProps => {
    const { confirm, confirmId, cancel, cancelId, props, state } = makerProps
    const { id,messageText, confirmText, cancelText, title, className } = props
    const realText = messageText ? replaceTextUsingPath ( state, messageText ) : 'Are you sure?'
    return <div id={id} className={className ? className : 'modalPopup-content show-modal confirm-window'}>
      {title && <h1>{replaceTextUsingPath ( state, title )}</h1>}
      <p>{realText}</p>
      <button id={confirmId} onClick={confirm}>{confirmText ? replaceTextUsingPath ( state, confirmText ) : 'OK'}</button>
      <button id={cancelId} onClick={cancel}>{cancelText ? replaceTextUsingPath ( state, cancelText ) : 'Cancel'}</button>
    </div>;
  } )
}
