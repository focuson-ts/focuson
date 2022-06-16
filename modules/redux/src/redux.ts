import { massTransform, Transform } from "@focuson/lens";
import { context, FState } from "exampleapp/src/common";
import { dispatchRestAndFetchCommands, FocusOnConfig, FocusOnContext, HasFocusOnDebug, traceL } from "@focuson/focuson";
import { errorMonad, errorPromiseMonad, safeArray } from "@focuson/utils";
import { preMutateForPages } from "@focuson/pages";
import { RestCommand, RestCommandAndTxs } from "@focuson/rest";
import { legacy_createStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { lensState } from "@focuson/state";


export interface FocusOnSetMainAction<S> {
  type: 'setMain',
  s: S;
  reason: any;
}

export function isFocusOnSetMainAction<S> ( f: any ): f is FocusOnSetMainAction<S> {
  return f.type === 'setMain'
}

export interface FocusOnMassTxsAction<S> {
  type: 'massTxs',
  s: S;
  txs: Transform<S, any>[]
}
export function isFocusOnMassTxsAction<S> ( f: any ): f is FocusOnMassTxsAction<S> {
  return f.type === 'massTxs'
}
export const FocusOnReducer: any = <S> ( state: S, action: any ) => {
// @ts-ignore
  const debug = state.debug?.reduxDebug
  if ( isFocusOnSetMainAction ( action ) ) return action.s;
  if ( isFocusOnMassTxsAction<FState> ( action ) ) {
    if ( debug ) console.log ( "FocusOnReducer- action is massTxs", action.type, action.txs.map ( t => [ t[ 0 ].description, t[ 1 ] ( t[ 0 ].getOption ( action.s ) ) ] ) )
    let result = massTransform ( action.s, ...action.txs );
    if ( debug ) console.log ( 'finished FocusOnReducer/massTxs', result )
    return result
  }
  if ( debug ) console.log ( 'in reducer. I dont know what action it is', action )
  return state
}

function traceTransform<S> ( trace: any, s: S ): Transform<S, any> [] {
  // @ts-ignore
  const debug: any = s.debug;
  return debug?.recordTrace ? [ [ traceL<S> (), old => [ ...old ? old : [], trace ] ] ] : [];
}
export const focusOnMiddleware = <S extends HasFocusOnDebug, C extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, C, MSGs>, context: C ) => ( store: any ) => ( dispatch: any ) => async ( action: any ) => {
  if ( !isFocusOnSetMainAction<S> ( action ) ) return dispatch ( action );

  const deleteRestCommands: Transform<S, any> = [ config.restL, () => [] ];
  const { preMutate, postMutate, onError } = config
  const { s, reason } = action
  const debug = s.debug?.restDebug === true || s.debug?.fetcherDebug || s.debug?.reduxDebug

  const restCommands = safeArray ( config.restL.getOption ( s ) )
  errorMonad ( s, debug, onError,
    [ 'preMutateForPages', preMutateForPages<S, C> ( context ) ],
    [ 'preMutate', preMutate ],
    [ 'dispatch pre rests', s => dispatch ( { type: 'massTxs', s, txs: [ ...traceTransform ( reason, s ), deleteRestCommands ], comment: 'dispatchPreRests' } ) ]//This updates the gui 'now' pre rest/fetcher goodness. We need to kill the rest commands to stop them being sent twice
  );
  const stateAfterImmediate = store.getState ()

  const focusOnDispatcher = ( preTxs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ): S => {
    dispatch ( { type: 'massTxs', txs: [ ...preTxs, ...rests.flatMap ( x => x.txs ) ], s: originalS, comment: 'fromFocusOnDispatcher' } )
    console.log ( 'ending focusonDistpatcher', store.getState () )
    return store.getState ();
  }
  let finalResultFn = ( start: S, restCommands: RestCommand[] ) => errorPromiseMonad ( onError ) (
    start, debug,
    [ 'dispatchRestAndFetchCommands', dispatchRestAndFetchCommands ( config, context, focusOnDispatcher ) ( restCommands ) ],
    [ 'postMutate', postMutate ]
  );
  const res = await finalResultFn ( stateAfterImmediate, restCommands )
  const restsLoaded = config.restCountL.getOption ( res )
  if ( debug ) console.log ( 'restsLoaded were ', restsLoaded, restsLoaded?.loopCount === 0 ? 'will stop looping' : 'need to loop' );
  const finalResult = restsLoaded?.loopCount === 0 ? res : finalResultFn ( res, [] )
  if ( debug ) console.log ( 'finalResult is ', finalResult );
  return res;
};

export const makeFocusOnReduxStore = <S extends HasFocusOnDebug, C extends FocusOnContext<S>,MSGs> ( config: FocusOnConfig<S, C, MSGs>, context: C ) =>
  legacy_createStore ( FocusOnReducer, undefined, applyMiddleware ( focusOnMiddleware ( config, context ) ) );


export function makeLs ( store: any, desc: string ) { return lensState ( store.getState (), ( s, reason ) => store.dispatch ( { type: 'setMain', s, reason } ), desc, context )}