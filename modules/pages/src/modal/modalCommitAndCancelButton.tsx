import { applyPageOps, currentPageSelectionTail, fromPathGivenState, mainPage, PageSelection, PageSelectionContext, pageSelections, popPage, popTwoPages } from "../pageSelection";
import { LensProps, lensState, LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { HasDataFn, safeArray, safeString, SimpleMessage, stringToSimpleMsg, toArray } from "@focuson/utils";
import { Optional, Transform } from "@focuson/lens";
import { HasRestCommandL, ModalChangeCommands, modalCommandProcessors, ModalProcessorsConfig, processChangeCommandProcessor, RestCommand } from "@focuson/rest";
import { getRefForValidateLogicToButton, hasValidationErrorAndReport } from "../validity";
import { HasSimpleMessageL } from "../simpleMessage";
import { CustomButtonType, getButtonClassName } from "../common";
import React from "react";
import { isMainPageDetails } from "../pageConfig";
import { replaceTextUsingPath } from "../replace";
import { HasTagHolderL } from "@focuson/template";
import { closeTwoPagesTxs, ConfirmActions, ConfirmProps, ConfirmWindow, isConfirmWindow } from "./confirmWindow";
import { wrapWithErrors } from "../errors";

export interface ModalContext<S> extends PageSelectionContext<S>, HasRestCommandL<S>, HasSimpleMessageL<S>, HasTagHolderL<S>, HasDataFn {}


export const confirmIt = <S, C extends PageSelectionContext<S>> ( state: LensState<S, any, C>, c: boolean | string | undefined ) => {
  if ( c === undefined || c === false ) return true
  const rawText = (typeof c === 'string') ? c : 'Are you sure'
  const text = rawText?.includes ( '{' ) ? replaceTextUsingPath ( state, safeString ( rawText ) ) : rawText;
  return window.confirm ( text )
};

interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context>, CustomButtonType {
  id: string;
  enabledBy?: string[][];
  text?: string
  confirm?: string | boolean | ConfirmWindow;
  closeTwoWindowsNotJustOne?: boolean;

}
interface ModalCommitButtonProps<S, C> extends ModalCommitCancelButtonProps<S, C> {
  change?: ModalChangeCommands | ModalChangeCommands[];
  validate?: boolean
}
function canClosePages<S, Context extends PageSelectionContext<S>> ( id, state: LensState<S, any, Context>, closeTwoWindowsNotJustOne: boolean ): [ boolean, string ] {
  const pages = pageSelections ( state )
  const result: [ boolean, string ] = [ closeTwoWindowsNotJustOne ? pages.length <= 2 : pages.length <= 1, 'Not enough pages open to close' ];
  return result;
}

export function openConfirmWindowTxs<S, Context extends ModalContext<S>> ( confirm: ConfirmProps, action: ConfirmActions, changeOnClose: ModalChangeCommands[], state: LensState<S, any, Context>, component: string, id: string, event: SetJsonReasonEvent, rest?: RestCommand ): Transform<S, any>[] {
  const { pageName } = confirm
  const realPageName = pageName ? pageName : 'confirm'
  const ps: PageSelection = { pageName: realPageName, focusOn: '~', changeOnClose, arbitraryParams: { ...confirm, action }, time: state.context.dateFn (), pageMode: 'view', rest }
  const openTx: Transform<S, any> = [ state.context.pageSelectionL, applyPageOps ( 'popup', ps ) ]
  return [ openTx ]
}

export function openConfirmWindow<S, Context extends ModalContext<S>> ( confirm: ConfirmProps, action: ConfirmActions, changeOnClose: ModalChangeCommands[], state: LensState<S, any, Context>, component: string, id: string, event: SetJsonReasonEvent, rest?: RestCommand ) {
  state.massTransform ( reasonFor ( component, event, id ) ) ( ...openConfirmWindowTxs ( confirm, action, changeOnClose, state, component, id, event, rest ) )
}

export function ModalCancelButton<S, Context extends ModalContext<S>> ( { id, state, text, buttonType, confirm, enabledBy, closeTwoWindowsNotJustOne }: ModalCommitCancelButtonProps<S, Context> ) {
  let onClick = () => {
    if ( isConfirmWindow ( confirm ) ) {
      openConfirmWindow ( confirm, 'cancel', [], state, 'ModalCancelButton', id, 'onClick' );
      return
    }
    if ( confirmIt ( state, confirm ) )
      if ( closeTwoWindowsNotJustOne )
        state.massTransform ( reasonFor ( 'ModalCancelButton', 'onClick', id ) ) ( popTwoPages ( state ) );
      else
        state.massTransform ( reasonFor ( 'ModalCancelButton', 'onClick', id ) ) ( popPage ( state ) );
  }
  const canClick = canClosePages ( id, state, closeTwoWindowsNotJustOne );

  return wrapWithErrors ( id, enabledBy, [ canClick ], ( errorProps, error ) =>
    <button className={getButtonClassName ( buttonType )} id={id} {...errorProps} disabled={error} onClick={onClick}>{text ? text : 'Cancel'} </button> )
}


function findFocusL<S, Context extends PageSelectionContext<S>> ( errorPrefix: string, state: LensState<S, any, Context>, fromPath: ( path: string ) => Optional<S, any>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ) {
  const lastPage = currentPageSelectionTail ( state )
  if ( lastPage.focusOn ) return fromPath ( lastPage.focusOn )
  const mp: PageSelection = mainPage ( state, adjustPages )
  const pages = state.context.pages
  const onePage = pages[ mp.pageName ]
  if ( onePage === undefined ) throw Error ( `${errorPrefix} cannot find details for main page '${mp.pageName}'. Legal names are [${Object.keys ( pages )}]` )
  if ( !isMainPageDetails ( onePage ) ) throw new Error ( `${errorPrefix} page ${mp.pageName} should be a MainPage but is a ${onePage.pageType}` )
  return onePage.lens
}

function findSetLengthOnClose<S> ( lastPage: PageSelection, main: S, toPathTolens: ( path: string ) => Optional<S, any> ): Transform<S, any>[] {
  let toLengthOnClose = lastPage?.setToLengthOnClose;
  if ( toLengthOnClose === undefined ) return []
  const setToLengthOnCloseArrayL = toPathTolens ( toLengthOnClose?.array )
  const setToLengthOnCloseVariableL = toPathTolens ( toLengthOnClose?.variable )
  return [ [ setToLengthOnCloseVariableL, () => setToLengthOnCloseArrayL.getOption ( main )?.length ] ];
}


/** This finds all transforms except the actual 'close the page'
 * This is because we might be calling it twice in cases like 'modal confirm windows'
 */
export function findClosePageTxs<S, C extends PageSelectionContext<S> & HasRestCommandL<S> & HasSimpleMessageL<S> & HasTagHolderL<S> & HasDataFn> (
  errorPrefix: string,
  state: LensState<S, any, C>,
  pageToClose: PageSelection,
  pageOffset: number, // typically -1 if we are closing the last page. -2 if we are closing the page before that.
  otherCommands: ModalChangeCommands[] ): Transform<S, any>[] | undefined {
  const { dateFn, pageSelectionL, restL, tagHolderL, simpleMessagesL } = state.context
  if ( !pageToClose ) return undefined
  const rest = pageToClose?.rest;
  const copyOnClose = pageToClose?.copyOnClose

  const toPathTolens = fromPathGivenState ( state, ps => ps.slice ( 0, -1 ) );
  const fromPathTolens = fromPathGivenState ( state );

  const focusLensForFrom = findFocusL ( errorPrefix, state, fromPathTolens, ps => pageOffset >= -1 ? ps : ps.slice ( 0, pageOffset + 1 ) )
  const focusLensForTo = findFocusL ( errorPrefix, state, toPathTolens, ps => ps.slice ( 0, pageOffset ) )
  const restTransformers: Transform<S, any>[] = rest ? [ [ restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ] : []
  const copyOnCloseTxs: Transform<S, any>[] = safeArray ( copyOnClose ).map ( ( { from, to } ) =>
    [ to ? toPathTolens ( to ) : focusLensForTo, () => (from ? fromPathTolens ( from ) : focusLensForFrom).getOption ( state.main ) ] )


  const config: ModalProcessorsConfig<S, SimpleMessage> = {
    pageNameFn: ( s: S ) => mainPage ( lensState<S, C> ( s, () => {throw Error ()}, '', state.context ) ).pageName,
    tagHolderL,
    stringToMsg: stringToSimpleMsg ( dateFn, 'info' ),
    fromPathTolens,
    toPathTolens,
    defaultL: focusLensForTo,
    messageL: simpleMessagesL,
    s: state.main
  };

  const changeCommands = [ ...toArray ( pageToClose.changeOnClose ), ...otherCommands ];
  const changeTxs = processChangeCommandProcessor ( errorPrefix, modalCommandProcessors ( config ) ( state.main ), changeCommands )
  return [ ...restTransformers, ...copyOnCloseTxs, ...findSetLengthOnClose ( pageToClose, state.main, toPathTolens ), ...changeTxs ]
}


export function closeOnePageTxs<S, Context extends ModalContext<S>> ( errorPrefix: string, state: LensState<S, any, Context>, change: ModalChangeCommands[] ): Transform<S, any>[] {
  const { pageSelectionL } = state.context
  const pageToClose = currentPageSelectionTail ( state )
  const txs = findClosePageTxs ( errorPrefix, state, pageToClose, -1, toArray ( change ) )
  if ( !txs ) return undefined
  const pageCloseTx: Transform<S, any> = [ pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
  return [ ...txs, pageCloseTx ];
}
export function ModalCommitButton<S, Context extends ModalContext<S>> ( c: ModalCommitButtonProps<S, Context> ) {
  const { id, state, validate, confirm, enabledBy, buttonType, change, text, closeTwoWindowsNotJustOne } = c
  const { dateFn, pageSelectionL } = state.context
  function onClick () {
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    if ( isConfirmWindow ( confirm ) ) {
      openConfirmWindow ( confirm, 'confirm', toArray ( c.change ), state, 'ModalCommitButton', id, 'onClick' );
      return
    }
    if ( !confirmIt ( state, confirm ) ) return
    const pageCloseTxs = closeTwoWindowsNotJustOne ?
      closeTwoPagesTxs ( `ModalCommit ${id}`, state, toArray ( change ) ) :
      closeOnePageTxs ( `ModalCommit ${id}`, state, toArray ( change ) );
    if ( pageCloseTxs.length > 0 )
      state.massTransform ( reasonFor ( 'ModalCommit', 'onClick', id ) ) ( ...pageCloseTxs )
    else
      console.error ( 'ModalCommit button called and bad state: No last page', )
  }
  // @ts-ignore
  const debug = state.main?.debug?.validityDebug
  return wrapWithErrors ( id, enabledBy, [ canClosePages ( id, state, closeTwoWindowsNotJustOne ) ], ( props, error, errorRef, allErrors ) =>
    <button ref={getRefForValidateLogicToButton ( state ) ( id, debug, validate, allErrors, errorRef )}
            disabled={error} {...props}
            className={getButtonClassName ( buttonType )}
            id={id} onClick={onClick}>{text ? text : 'Commit'}</button> )
}
