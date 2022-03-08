import { focusPageClassName } from "./PageTemplate";
import { createSimpleMessage, DateFn, safeArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { HasSimpleMessageL } from "./simpleMessage";

export function findValidityDetails ( pageHolderClass: string ): [ string, boolean ][] {
  const allPages = document.getElementsByClassName ( pageHolderClass )
  const thisPage = allPages.item ( allPages.length - 1 )
  console.log ( 'thisPage', !!thisPage )
  const inputs = thisPage?.getElementsByTagName ( "input" )
  console.log ( 'inputs', inputs?.length )
  const result: [ string, boolean ][] = []
  if ( inputs ) {
    for ( var i = 0; i < inputs.length; i++ ) {
      const child = inputs[ i ];
      let id = child.getAttribute ( 'id' );
      let recordedId = id ? id : "noIdForThisElement"
      result[ i ] = [ recordedId, child.checkValidity () ]
    }
  }
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