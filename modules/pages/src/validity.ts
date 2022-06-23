import { focusPageClassName } from "./PageTemplate";
import { createSimpleMessage, DateFn, safeArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { HasSimpleMessageL } from "./simpleMessage";
import React, { useEffect, useRef } from "react";


export function getRefForDebounceLogic ( id: string, debounce: number | undefined ) {
  const ref = useRef<HTMLButtonElement> ( null );
}
export function getRefForValidateLogicToButton ( id: string, debug: boolean, validate: boolean | undefined, enabledBy: boolean | undefined, extraCondition?: boolean ): React.RefObject<HTMLButtonElement> {
  const ref = useRef<HTMLButtonElement> ( null );
  useEffect ( () => {
    if ( ref.current === null ) throw Error ( `Id ${id} has a ref which is null` )
    if ( validate === false ) {
      ref.current.disabled = enabledBy === false || extraCondition == false
      return
    }
    // console.log ( 'getRefForValidateLogicToButton', id, 'validate', validate)
    const valid = isValidToCommit ( focusPageClassName, debug )
    // console.log ( 'getRefForValidateLogicToButton - valid', id, valid )
    let disabled = enabledBy === false || !valid || extraCondition == false;
    // console.log ( 'getRefForValidateLogicToButton - disabled', id, disabled )
    ref.current.disabled = disabled
  } );
  return ref
}


export function findValidityForInput ( thisPage: Element, debug: boolean ): [ string, boolean ][] {
  const inputs = thisPage?.getElementsByTagName ( "input" )
  const result: [ string, boolean ][] = []
  if ( inputs ) {
    for ( var i = 0; i < inputs.length; i++ ) {
      const child = inputs[ i ];
      let id = child.getAttribute ( 'id' );
      let recordedId = id ? id : "noIdForThisElement"
      let validity = child.checkValidity ();
      if ( debug ) console.log ( 'findValidityForInput: ', id, validity )
      result.push ( [ recordedId, validity ] )
    }
  }
  return result
}
export function findValidityForSelect ( thisPage: Element, debug: boolean ): [ string, boolean ][] {
  const result: [ string, boolean ][] = []
  const selects = thisPage?.getElementsByTagName ( "select" )
  if ( selects ) {
    for ( var i = 0; i < selects.length; i++ ) {
      const child = selects[ i ];
      let id = child.getAttribute ( 'id' );
      let clazz = child.getAttribute ( 'class' );
      const valid = clazz.indexOf ( 'invalid' ) < 0
      let recordedId = id ? id : "noIdForThisElement"
      let thisResult: [ string, boolean ] = [ recordedId, valid ];
      if ( debug ) console.log ( 'findValidityForSelect: ', id, thisResult )
      result.push ( thisResult )
    }
  }
  return result
}
export function findValidityForRadio ( thisPage: Element, debug: boolean ): [ string, boolean ][] {
  const result: [ string, boolean ][] = []
  const radios = thisPage?.getElementsByClassName ( "radio-group-container" )
  if ( radios ) {
    for ( var i = 0; i < radios.length; i++ ) {
      const child = radios[ i ];
      let id = child.getAttribute ( 'id' );
      let clazz = child.getAttribute ( 'class' );
      const valid = clazz.indexOf ( 'invalid' ) < 0
      let recordedId = id ? id : "noIdForThisElement"
      let thisResult: [ string, boolean ] = [ recordedId, valid ];
      if ( debug ) console.log ( 'findValidityForRadio: ', id, thisResult )
      result.push ( thisResult )
    }
  }
  return result
}
export function findThisPageElement ( pageHolderClass: string ) {
  const allPages = document.getElementsByClassName ( pageHolderClass )
  const thisPage: Element | null = allPages.item ( allPages.length - 1 )
  return thisPage;
}
export function findValidityDetails ( pageHolderClass: string, debug: boolean ): [ string, boolean ][] {
  const thisPage = findThisPageElement ( pageHolderClass );
  if ( !thisPage ) return []
  return [ ...findValidityForInput ( thisPage, debug ),
    ...findValidityForSelect ( thisPage, debug ),
    ...findValidityForRadio ( thisPage, debug ) ]
}

export function isValidToCommit ( pageHolderClass: string, debug: boolean ): boolean {
  return findValidityDetails ( pageHolderClass, debug ).reduce ( ( acc: boolean, [ id, valid ] ) => acc && valid, true )
}

export function hasValidationErrorAndReport<S, C extends HasSimpleMessageL<S>> ( id: string, state: LensState<S, any, C>, dateFn: DateFn | undefined ): boolean {
  // @ts-ignore
  const debug = state.main?.debug?.validityDebug
  if ( !isValidToCommit ( focusPageClassName, debug ) ) {
    const message = "Cannot commit. Validation errors on\n" + findValidityDetails ( focusPageClassName, debug ).filter ( t => !t[ 1 ] ).map ( t => t[ 0 ] ).join ( "\n" );
    console.error ( message )
    const realDateFn = dateFn ? dateFn : () => new Date ().toISOString ()
    state.copyWithLens ( state.context.simpleMessagesL ).transform ( msgs => [ ...safeArray ( msgs ),
      createSimpleMessage ( 'warning', message, realDateFn () ) ], reasonFor ( 'ModalCommitButton', 'onClick', id, 'Validation failed' ) )
    return true
  }
  return false
}