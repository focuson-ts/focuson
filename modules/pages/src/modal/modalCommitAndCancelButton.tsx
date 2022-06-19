import { currentPageSelectionTail, fromPathGivenState, mainPage, PageSelection, PageSelectionContext, popPage } from "../pageSelection";
import { LensProps, LensState, reasonFor } from "@focuson/state";
import { DateFn, safeArray } from "@focuson/utils";
import { Optional, Transform } from "@focuson/lens";
import { HasRestCommandL, RestCommand } from "@focuson/rest";
import { getRefForValidateLogicToButton, hasValidationErrorAndReport } from "../validity";
import { HasSimpleMessageL } from "../simpleMessage";
import { CustomButtonType, getButtonClassName } from "../common";
import React from "react";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context>, CustomButtonType {
  id: string;
  enabledBy?: boolean;
  dateFn?: DateFn;
  text?: string
}
interface ModalCommitButtonProps<S, C> extends ModalCommitCancelButtonProps<S, C> {
  validate?: boolean
}
export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { id, state, text, buttonType }: ModalCommitCancelButtonProps<S, Context> ) {
  let onClick = () => state.massTransform ( reasonFor ( 'ModalCancelButton', 'onClick', id ) ) ( popPage ( state ) );
  return <button className={getButtonClassName ( buttonType )} id={id} onClick={onClick}>{text ? text : 'Cancel'}</button>
}


function findFocusL<S, Context extends PageSelectionContext<S>> ( errorPrefix: string, state: LensState<S, any, Context>, fromPath: ( path: string ) => Optional<S, any>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ) {
  const mp: PageSelection = mainPage ( state, adjustPages )
  const pages = state.context.pages
  if ( mp.focusOn ) return fromPath ( mp.focusOn )
  const onePage = pages[ mp.pageName ]
  if ( onePage === undefined ) throw Error ( `${errorPrefix} cannot find details for main page '${mp.pageName}'. Legal names are [${Object.keys ( pages )}]` )
  if ( onePage.pageType !== 'MainPage' ) throw new Error ( `${errorPrefix} page ${mp.pageName} should be a MainPage but is a ${onePage.pageType}` )
  return onePage.lens
}
export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasRestCommandL<S> & HasSimpleMessageL<S>> ( { state, id, dateFn, validate, enabledBy, text, buttonType }: ModalCommitButtonProps<S, Context> ) {
  const ref = getRefForValidateLogicToButton ( id, validate, enabledBy )
  function onClick () {
    const now = new Date ()
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return

    const lastPage = currentPageSelectionTail ( state )
    const rest = lastPage?.rest;
    const copyOnClose = lastPage?.copyOnClose

    const pathForTo = fromPathGivenState ( state, ps => ps.slice ( 0, -1 ) );
    const pathForFrom = fromPathGivenState ( state );

    const focusLensForFrom = findFocusL ( `ModalCommitButton for ${id}`, state, pathForFrom )
    const focusLensForTo = findFocusL ( `ModalCommitButton for ${id}`, state, pathForFrom, ps => ps.slice ( 0, -1 ) )
    function findSetLengthOnClose () {
      let toLengthOnClose = lastPage?.setToLengthOnClose;
      if ( toLengthOnClose === undefined ) return []
      const setToLengthOnCloseArrayL = pathForTo ( toLengthOnClose?.array )
      const setToLengthOnCloseVariableL = pathForTo ( toLengthOnClose?.variable )
      const setToLengthOnCloseTx: Transform<S, any>[] = [ [ setToLengthOnCloseVariableL, () => {
        let length = setToLengthOnCloseArrayL.getOption ( state.main )?.length;
        // console.log ( 'setToLengthOnCloseTx', 'array', setToLengthOnCloseArrayL.description, 'var', setToLengthOnCloseVariableL.description, length )
        return length;
      } ] ]
      return setToLengthOnCloseTx;
    }

    const pageTransformer: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
    const restTransformers: Transform<S, any>[] = rest ? [ [ state.context.restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ] : []

    const copyOnCloseTxs: Transform<S, any>[] = safeArray ( copyOnClose ).map ( ( { from, to } ) =>
      [ to ? pathForTo ( to ) : focusLensForTo, () => (from ? pathForFrom ( from ) : focusLensForFrom).getOption ( state.main ) ] )
    if ( lastPage ) {
      state.massTransform ( reasonFor ( 'ModalCommit', 'onClick', id ) ) ( pageTransformer, ...restTransformers, ...copyOnCloseTxs, ...findSetLengthOnClose () )
    } else
      console.error ( 'ModalCommit button called and bad state.', lastPage )
  }
  return <button ref={ref} className={getButtonClassName ( buttonType )} id={id} onClick={onClick}>{text ? text : 'Commit'}</button>
}