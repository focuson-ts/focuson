import { focusPageClassName } from "./PageTemplate";
import { createSimpleMessage, DateFn, safeArray, safeString } from "@focuson-nw/utils";
import { LensState, reasonFor } from "@focuson-nw/state";
import { HasSimpleMessageL } from "./simpleMessage";
import React, { useEffect, useRef } from "react";
import { useRefs } from "./refControls";


export function getRefForDebounceLogic ( id: string, debounce: number | undefined ) {
  const ref = useRef<HTMLButtonElement> ( null );
}
export const getRefForValidateLogicToButton = <S> ( state: LensState<S, any, any> ) => ( id: string, debug: boolean, validate: boolean | undefined, errors: string[] | undefined, errorRef?: React.MutableRefObject<HTMLUListElement> ): React.RefObject<HTMLButtonElement> => {
  const ref = useRef<HTMLButtonElement> ( null );
  const canUseRefs = useRefs ( state );
  useEffect ( () => {
    if ( ref.current === null ) throw Error ( `Id ${id} has a ref which is null` )
    const validityDetails: [ string, string, boolean ][] = validate === false ? [] : findValidityDetails ( focusPageClassName, debug )
    const issues = validityDetails.filter ( v => v[ 2 ] === false ).map ( v => v[ 1 ] )
    let disabled = errors.length > 0 || issues.length > 0
    // console.log ( 'getRefForValidateLogicToButton - disabled', id, disabled )
    ref.current.disabled = disabled
    const issues_s = issues.length > 1 ? 's' : ''
    const errors_s = errors.length > 1 ? 's' : ''
    const errorsTitle = errors.length > 0 ? [ `<b>${errors.length} Guard${errors_s}:</b>` ] : []
    const issuesTitle = issues.length > 0 ? [ `<b>${issues.length} validation issue${issues_s}:</b>` ] : []
    const allErrors = disabled ? [ ...errorsTitle, ...errors, ...issuesTitle, ...issues ] : errors
    if ( errorRef ) {
      if ( canUseRefs )
        errorRef.current.innerHTML = allErrors.map ( e => `<li>${e}</li>` ).join ( '' )
    }
  }, [ state.main ] );
  return ref
};

export function findValidityForInput ( thisPage: Element, debug: boolean ): [ string, string, boolean ][] {
  const parents = thisPage?.getElementsByClassName ( 'labelValueButton' )
  const result: [ string, string, boolean ][] = []
  if ( parents ) {
    for ( var i = 0; i < parents.length; i++ ) {
      const inputs = parents.item ( i )?.getElementsByTagName ( "input" )
      const child = inputs.item ( 0 );
      if ( child ) {
        const id = child.getAttribute ( 'id' );
        const labelForValidation = child.getAttribute ( 'data-validationmessage' )
        const recordedId = id ? id : "noIdForThisElement"
        const clazz = child.className
        const error = clazz?.includes ( 'invalid' )
        const validity = error !== undefined || child.checkValidity ();
        if ( debug ) console.log ( 'findValidityForInput: ', id, validity )
        result.push ( [ recordedId, labelForValidation ? labelForValidation : id, validity ] )
      }
    }
  }
  return result
}
export function findValidityForDate ( thisPage: Element, debug: boolean ): [ string, string, boolean ][] {
  const datePickers = thisPage?.getElementsByClassName ( "labelAndDate" )
  const result: [ string, string, boolean ][] = []
  if ( datePickers ) {
    for ( var i = 0; i < datePickers.length; i++ ) {
      const datePicker = datePickers[ i ];
      const labelForValidation = datePicker.getAttribute ( 'data-validationmessage' )
      const dateError = datePicker.getAttribute ( 'data-error' )
      const isDateError = dateError && dateError.length > 0
      const child = datePicker.getElementsByTagName ( 'input' )?.[ 0 ]
      const id = child.getAttribute ( 'id' );
      const recordedId = id ? id : "noIdForThisElement"
      // console.log ( `child.isDateError`, id, dateError, isDateError )
      // console.log ( `child.setCustomValidity ( ${dateError} )` )
      child.setCustomValidity ( isDateError ? dateError : '' )

      const validity = child.checkValidity ();
      if ( debug ) console.log ( 'findValidityForDate: ', id, validity, child.validity, child.checkValidity () )
      result.push ( [ recordedId, labelForValidation ? labelForValidation : id, validity ] )
    }
  }
  return result
}
export function findValidityForSelect ( thisPage: Element, debug: boolean ): [ string, string, boolean ][] {
  const result: [ string, string, boolean ][] = []
  const selects = thisPage?.getElementsByTagName ( "select" )
  if ( selects ) {
    for ( var i = 0; i < selects.length; i++ ) {
      const child = selects[ i ];
      const id = child.getAttribute ( 'id' );
      const clazz = child.getAttribute ( 'class' );
      const valid = !clazz || clazz.indexOf ( 'invalid' ) < 0
      const recordedId = id ? id : "noIdForThisElement"
      const validationMessage = child.getAttribute ( 'data-validationmessage' )
      const thisResult: [ string, string, boolean ] = [ recordedId, validationMessage ? validationMessage : recordedId, valid ];
      if ( debug ) console.log ( 'findValidityForSelect: ', id, thisResult )
      result.push ( thisResult )
    }
  }
  return result
}
export function findValidityForRadio ( thisPage: Element, debug: boolean ): [ string, string, boolean ][] {
  const result: [ string, string, boolean ][] = []
  const radios = thisPage?.getElementsByClassName ( "radio-group-container" )
  if ( radios ) {
    for ( var i = 0; i < radios.length; i++ ) {
      const child = radios[ i ];
      let id = child.getAttribute ( 'id' );
      let clazz = child.getAttribute ( 'class' );
      const valid = !clazz || clazz.indexOf ( 'invalid' ) < 0
      let recordedId = id ? id : "noIdForThisElement"
      let labelForValidation = child.getAttribute ( 'labelforvalidation' )
      let thisResult: [ string, string, boolean ] = [ recordedId, labelForValidation ? labelForValidation : recordedId, valid ];
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
export function findValidityDetails ( pageHolderClass: string, debug: boolean ): [ string, string, boolean ][] {
  const thisPage = findThisPageElement ( pageHolderClass );
  if ( !thisPage ) return []
  return [ ...findValidityForInput ( thisPage, debug ),
    ...findValidityForSelect ( thisPage, debug ),
    ...findValidityForDate ( thisPage, debug ),
    ...findValidityForRadio ( thisPage, debug ) ]
}

export function isValidToCommit ( pageHolderClass: string, debug: boolean ): boolean {
  return findValidityDetails ( pageHolderClass, debug ).reduce ( ( acc: boolean, [ id, label, valid ] ) => acc && valid, true )
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