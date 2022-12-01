import { closeOnePageTxs, findClosePageTxs, ModalContext } from "./modalCommitAndCancelButton";
import { LensState, reasonFor } from "@focuson/state";
import { fromPathGivenState, PageSelection, pageSelections, popPage } from "../pageSelection";
import { Transform } from "@focuson/lens";
import { DisplayArbitraryPageFn } from "../pageConfig";
import { replaceTextUsingPath } from "../replace";
import { ConfirmWindowChangeCommands, confirmWindowCommandProcessors, ModalChangeCommands, processChangeCommandProcessor, RestAndInputProcessorsConfig } from "@focuson/rest";
import { SimpleMessage, stringToSimpleMsg, toArray } from "@focuson/utils";

export interface ConfirmProps {
  pageName?: string;
  title?: string;
  className?: string
  messageText?: string
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  confirmCommands?: ConfirmWindowChangeCommands | ConfirmWindowChangeCommands[]
  cancelCommands?: ConfirmWindowChangeCommands | ConfirmWindowChangeCommands[]
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
export type ConfirmActions = 'confirm' | 'cancel' | 'justclose'

export interface MakeConfirmCommitWindow<S, C> {
  state: LensState<S, any, C>,

  props: ConfirmWindowProps,
  id: string
  confirmId: string;
  confirm: ( e: any ) => void;
  cancelId: string;
  closeId: string;
  cancel: ( e: any ) => void
}
export const closeTwoPagesTxs = <S, C extends ModalContext<S>> ( errorPrefix: string, state: LensState<S, any, C>, otherCommands: ModalChangeCommands[] ): Transform<S, any>[] => {
  const ps = pageSelections ( state );

  if ( ps.length < 2 ) throw Error ( `${errorPrefix} Software error in closeTwoPages,ps ${JSON.stringify ( ps )}\n\n${JSON.stringify ( state.main, null, 2 )}` )
  const thisPage = ps[ ps.length - 1 ]
  const thisPagetxs = findClosePageTxs ( errorPrefix, state, thisPage, -1, otherCommands )
  if ( thisPagetxs === undefined ) throw Error ( `${errorPrefix} Software error in ConfirmCommitWindow - this page\n${JSON.stringify ( state.main, null, 2 )}` )
  const modalPage = ps[ ps.length - 2 ]
  const modalPageTxs = findClosePageTxs ( errorPrefix, state, modalPage, -2, [] )
  if ( modalPageTxs === undefined ) throw Error ( `${errorPrefix} Software error in ConfirmCommitWindow - last page\n${JSON.stringify ( state.main, null, 2 )}` )
  const pageCloseTx: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => [ ...ps.slice ( 0, -2 ), ...([ ...thisPagetxs.newPages, ...modalPageTxs.newPages ]) ] ]
  return [ pageCloseTx, ...thisPagetxs.txs, ...modalPageTxs.txs ]
};

export const makeConfirmCommitWindow = <S, D, C extends ModalContext<S>> ( makeFn: ( makerProps: MakeConfirmCommitWindow<S, C> ) => JSX.Element ): DisplayArbitraryPageFn<S, D, C, ConfirmWindowProps> => ( state: LensState<S, D, C>, props: ConfirmWindowProps ) => {
  const id = 'confirm'
  const confirmId = id + '.confirm';
  const cancelId = id + '.cancel';
  const closeId = id + '.close';

  function makeProcessor () {
    const { simpleMessagesL, pathToLens, dateFn, pageSelectionL } = state.context
    const resultPathToLens = fromPathGivenState ( state )

    const config: RestAndInputProcessorsConfig<S, any, SimpleMessage, PageSelection,C> = {
      resultPathToLens, messageL: simpleMessagesL, pageSelectionL, toPathTolens: resultPathToLens,
      stringToMsg: stringToSimpleMsg ( dateFn ), s: state.main, dateFn, context: state.context
    }
    const processor = confirmWindowCommandProcessors ( config ) ( state.main );
    return processor
  }
  function confirm ( e: any ) {

    const ps = pageSelections ( state );

    if ( ps.length < 2 ) throw Error ( `Software error in ConfirmCommitWindow,ps ${JSON.stringify ( ps )}\n\n${JSON.stringify ( state.main, null, 2 )}` )
    const thisPage = ps[ ps.length - 1 ]
    const action = thisPage.arbitraryParams.action
    if ( action === undefined ) throw Error ( `Software error in ConfirmCommitWindow, Expected action. ps ${JSON.stringify ( ps )}\n\n${JSON.stringify ( state.main, null, 2 )}` )
    const commandTxs: Transform<S, any>[] = processChangeCommandProcessor ( `Confirm Window`, makeProcessor (), toArray ( props.confirmCommands ) )
    if ( action === 'cancel' ) {
      const closePages: Transform<S, any> = [ state.context.pageSelectionL, ps => ps.slice ( 0, -2 ) ]
      state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', confirmId ) ) ( closePages, ...commandTxs )
      return
    }
    if ( action === 'justclose' ) {
      const closePageTxs = closeOnePageTxs ( `ConfirmCommitWindow ${id}`, state, [] )
      state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', confirmId ) ) ( ...closePageTxs, ...commandTxs )
      return
    }
    const closePageTxs = closeTwoPagesTxs ( `ConfirmCommitWindow ${id}`, state, [] )
    state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', confirmId ) ) ( ...closePageTxs, ...commandTxs )
  }

  function cancel ( e: any ) {
    const commandTxs: Transform<S, any>[] = processChangeCommandProcessor ( `Confirm Window`, makeProcessor (), toArray ( props.cancelCommands ) )
    state.massTransform ( reasonFor ( 'ConfirmCommitWindow', 'onClick', cancelId ) ) ( popPage ( state ), ...commandTxs );
  }
  const e: JSX.Element = makeFn ( { state, id, props, confirm, confirmId, cancel, cancelId, closeId } )
  return e
};

//This needs to be a function so that it can be 'customised' to the relevant S,D and C. Without that it's always 'unknown'
export function ConfirmCommitWindow<S, D, C extends ModalContext<S>> () {
  return makeConfirmCommitWindow<S, D, C> ( makerProps => {
    const { confirm, confirmId, cancel, cancelId, closeId, props, state } = makerProps
    const { id, messageText, confirmText, cancelText, title, className, showCancelButton } = props
    // console.log ( 'ConfirmCommitWindow', messageText )
    const realText = messageText ? replaceTextUsingPath ( state, messageText ) : 'Are you sure?'
    const fullCancelText = cancelText ? replaceTextUsingPath ( state, cancelText ) : 'Cancel'
    const fullConfirmText = confirmText ? replaceTextUsingPath ( state, confirmText ) : 'OK'
    return <div id={id} className={className ? className : 'dialog confirm-window'}>
      <span className="sr-only">Start of Dialog Box</span>
      {title && title.length > 0 && <div className='header'>{title && <h3 className='dialog-header'>{replaceTextUsingPath ( state, title )}</h3>}</div>}
      <div className='dialog-text' dangerouslySetInnerHTML={{ __html: realText }}/>
      <div className='dialog-buttons'>
        <button id={confirmId} aria-label='ok' title={fullConfirmText} className="button primary-btn" onClick={confirm}>{fullConfirmText}</button>
        {showCancelButton !== false && <button id={cancelId} aria-label='cancel' title={fullCancelText} className="button secondary-btn" onClick={cancel}>{fullCancelText}</button>}
      </div>
      <span className="sr-only">End of Dialog Box</span>
    </div>;
  } )
}
