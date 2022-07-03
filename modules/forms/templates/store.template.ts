import { applyMiddleware } from 'redux'
import { legacy_createStore, Store } from '@reduxjs/toolkit'
import { Context, context, emptyState, FState, identityL } from "./common";
import { defaultDateFn, errorMonad, errorPromiseMonad, fetchWithDelay, fetchWithPrefix, loggingFetchFn, safeArray, SimpleMessage, stringToSimpleMsg } from "@focuson/utils";
import { lensState } from "@focuson/state";
import { Reducer } from "react";
import { dispatchRestAndFetchCommands, FocusOnConfig, FocusOnContext, FocusOnDebug, HasFocusOnDebug, restCountL, traceL } from "@focuson/focuson";
import { Lens, massTransform, Transform } from "@focuson/lens";
import { pageSelectionlens, preMutateForPages, simpleMessagesL } from "@focuson/pages";
import {  newFetchers } from "./fetchers";
import { restDetails, restUrlMutator } from "./rests";
import { pages } from "./pages";
import { RestCommand, RestCommandAndTxs, restL } from "@focuson/rest";
import { config,start } from "./config";


export interface FocusOnSetMainAction<S> {
  type: 'setMain',
  s: S;
  reason: any;
}

function isFocusOnSetMainAction<S> ( f: any ): f is FocusOnSetMainAction<S> {
  return f.type === 'setMain'
}

export interface FocusOnMassTxsAction<S> {
  type: 'massTxs',
  s: S;
  txs: Transform<S, any>[]
}
function isFocusOnMassTxsAction<S> ( f: any ): f is FocusOnMassTxsAction<S> {
  return f.type === 'massTxs'
}
export const FocusOnReducer: any = <BigState, S> ( rootLens: Lens<BigState, S> ) => ( state: BigState, action: any ) => {
  if (state===undefined)return start
  console.log ( 'FocusOnReducer-state', state )
  console.log ( 'FocusOnReducer-action', action )
  if ( isFocusOnSetMainAction<S> ( action ) ) {
    console.log ( "it is a setMain", action )
    return rootLens.set ( state, action.s );
  }
  if ( isFocusOnMassTxsAction<S> ( action ) ) {
    console.log ( "FocusOnReducer- action is massTxs", action.type, action.txs.map ( t => [ t[ 0 ].description, t[ 1 ] ( t[ 0 ].getOption ( action.s ) ) ] ) )
    // @ts-ignore
    console.log ( "in reducer.comment for mass txs", action.comment )
    let result: S = massTransform<S> ( action.s, ...action.txs );
    console.log ( 'finished FocusOnReducer/massTxs', result )
    let withRootLens = rootLens.set ( state, result );
    console.log ( 'finished FocusOnReducer/withRootLens', withRootLens )
    return withRootLens
  }
  console.log ( 'in reducer. I dont know what action it is', action )
  return state
}
function traceTransform<S> ( trace: any, s: S ): Transform<S, any> [] {
  // @ts-ignore
  const debug: any = s.debug;
  return debug?.recordTrace ? [ [ traceL<S> (), old => [ ...old ? old : [], trace ] ] ] : [];
}
export const focusOnMiddleware = <BigState, S extends HasFocusOnDebug, C extends FocusOnContext<S>> ( config: FocusOnConfig<S, any, SimpleMessage>, context: C, rootLens: Lens<BigState, S> ) => ( store: any ) => ( dispatch: any ) => async ( action: any ) => {
  console.log ( 'focusOnMiddleware', action )
  if ( !isFocusOnSetMainAction<S> ( action ) ) {
    console.log ( 'focusOnMiddleware - not setMain so will return after dispatching it on' )
    return dispatch ( action );
  }
  const deleteRestCommands: Transform<S, any> = [ config.restL, () => [] ];
  const { preMutate, postMutate, onError } = config
  const { s, reason } = action
  const debug = s.debug?.restDebug === true
  const restCommands = safeArray ( config.restL.getOption ( s ) )
  let start: S = errorMonad ( s, debug, onError,
    [ 'preMutateForPages', preMutateForPages<S, C> ( context ) ],
    [ 'preMutate', preMutate ],
    [ 'dispatch pre rests', s => dispatch ( { type: 'massTxs', s, txs: [ ...traceTransform ( reason, s ), deleteRestCommands ], comment: 'dispatchPreRests' } ) ]//This updates the gui 'now' pre rest/fetcher goodness. We need to kill the rest commands to stop them being sent twice
  );
  // return start;
  console.log ( 'start', start )
  const stateAfterImmediate = rootLens.get ( store.getState () )
  console.log ( 'stateAfterImmediate', stateAfterImmediate )
  const focusOnDispatcher = ( preTxs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ): S => {
    dispatch ( { type: 'massTxs', txs: [ ...preTxs, ...rests.flatMap ( x => x.txs ) ], s: originalS, comment: 'fromFocusOnDispatcher' } )
    console.log ( 'ending focusOnDispatcher (full state)', store.getState () )
    return rootLens.get(store.getState ());
  }
  let finalResultFn = ( start: S, restCommands: RestCommand[] ) => errorPromiseMonad ( onError ) (
    start, debug,
    [ 'dispatchRestAndFetchCommands',
      s =>
        dispatchRestAndFetchCommands ( config, context, focusOnDispatcher ) ( restCommands ) ( s ) ],
    [ 'postMutate', postMutate ]
  );
  const res = await finalResultFn ( stateAfterImmediate, restCommands )
  const restsLoaded = config.restCountL.getOption ( res )
  console.log ( 'restsLoaded were ', restsLoaded, restsLoaded?.loopCount === 0 ? 'will stop looping' : 'need to loop' );
  const finalResult = restsLoaded?.loopCount === 0 ? res : await finalResultFn ( res, [] )
  console.log ( 'finalResult is ', finalResult );
  return res;
};
export function makeLs<S> ( store: Store<S>, child: string ) {
  // @ts-ignore
  return lensState ( store.getState ()[child], ( s, reason ) => store.dispatch ( { type: 'setMain', s, reason } ), child, context )
}