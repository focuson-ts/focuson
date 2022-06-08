import { focusPageClassName } from "./PageTemplate";
import { createSimpleMessage, DateFn, safeArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { HasSimpleMessageL } from "./simpleMessage";
import React, { useEffect, useRef } from "react";

export function getRefForValidateLogicToButton ( id: string, validate: boolean|undefined, enabledBy: boolean|undefined ): React.MutableRefObject<HTMLButtonElement> {
  const ref = useRef<HTMLButtonElement> ( null );
  useEffect ( () => {
    if ( validate === false ) {
      ref.current.disabled = false
      return
    }
    console.log ( 'getRefForValidateLogicToButton', id, 'validate', validate)
    const valid =  isValidToCommit ( focusPageClassName )
    console.log ( 'getRefForValidateLogicToButton - valid', id, valid )
    let disabled = enabledBy === false || !valid;
    console.log ( 'getRefForValidateLogicToButton - disabled', id, disabled )
    ref.current.disabled = disabled
  } );
  return ref
}


function findValidityForInput ( thisPage: Element, result: [ string, boolean ][] ) {
  const inputs = thisPage?.getElementsByTagName ( "input" )
  if ( inputs ) {
    for ( var i = 0; i < inputs.length; i++ ) {
      const child = inputs[ i ];
      let id = child.getAttribute ( 'id' );
      let recordedId = id ? id : "noIdForThisElement"
      result[ i ] = [ recordedId, child.checkValidity () ]
    }
  }
}
function findValidityForSelect ( thisPage: Element, result: [ string, boolean ][] ) {
  const selects = thisPage?.getElementsByTagName ( "select" )
  if ( selects ) {
    for ( var i = 0; i < selects.length; i++ ) {
      const child = selects[ i ];
      let id = child.getAttribute ( 'id' );
      let clazz = child.getAttribute ( 'class' );
      let recordedId = id ? id : "noIdForThisElement"
      let valid = !clazz.includes ( 'pleaseSelect' );
      result[ i ] = [ recordedId, valid ]
    }
  }
}
export function findValidityDetails ( pageHolderClass: string ): [ string, boolean ][] {
  const allPages = document.getElementsByClassName ( pageHolderClass )
  const thisPage: Element = allPages.item ( allPages.length - 1 )
  const result: [ string, boolean ][] = []
  findValidityForInput ( thisPage, result );
  findValidityForSelect ( thisPage, result );
  return result
}

export function isValidToCommit ( pageHolderClass: string ): boolean {
  return findValidityDetails ( pageHolderClass ).reduce ( ( acc: boolean, [ id, valid ] ) => acc && valid, true )
}

export function hasValidationErrorAndReport<S, C extends HasSimpleMessageL<S>> ( id: string, state: LensState<S, any, C>, dateFn: DateFn | undefined ): boolean {
  if ( !isValidToCommit ( focusPageClassName ) ) {
    const message = "Cannot commit. Validation errors on\n" + findValidityDetails ( focusPageClassName ).filter ( t => !t[ 1 ] ).map ( t => t[ 0 ] ).join ( "\n" );
    console.error ( message )
    const realDateFn = dateFn ? dateFn : () => new Date ().toISOString ()
    state.copyWithLens ( state.context.simpleMessagesL ).transform ( msgs => [ ...safeArray ( msgs ),
      createSimpleMessage ( 'warning', message, realDateFn () ) ], reasonFor ( 'ModalCommitButton', 'onClick', id, 'Validation failed' ) )
    return true
  }
  return false
}