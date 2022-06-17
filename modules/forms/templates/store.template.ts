import { applyMiddleware } from 'redux'
import { legacy_createStore, Store } from '@reduxjs/toolkit'
import { Context, context, emptyState, FState, identityL } from "./common";
import { defaultDateFn, errorMonad, errorPromiseMonad, fetchWithDelay, fetchWithPrefix, loggingFetchFn, safeArray, SimpleMessage, stringToSimpleMsg } from "@focuson/utils";
import { lensState } from "@focuson/state";
import { Reducer } from "react";
import { dispatchRestAndFetchCommands, FocusOnConfig, FocusOnContext, FocusOnDebug, HasFocusOnDebug, restCountL, traceL } from "@focuson/focuson";
import { massTransform, Transform } from "@focuson/lens";
import { pageSelectionlens, preMutateForPages, simpleMessagesL } from "@focuson/pages";
import { fetchers, newFetchers } from "./fetchers";
import { restDetails, restUrlMutator } from "./rests";
import { pages } from "./pages";
import { RestCommand, RestCommandAndTxs, restL } from "@focuson/rest";
import { config } from "./config";


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
const FocusOnReducer: any = ( state: FState, action: any ) => {
  if ( isFocusOnSetMainAction ( action ) ) {
    console.log ( "in reducer", action )
    console.log ( "in reducer.s", action.s )
    return action.s;
  }
  if ( isFocusOnMassTxsAction<FState> ( action ) ) {
    console.log ( "FocusOnReducer- action is massTxs", action.type, action.txs.map ( t => [ t[ 0 ].description, t[ 1 ] ( t[ 0 ].getOption ( action.s ) ) ] ) )
    // @ts-ignore
    console.log ( "in reducer.comment for mass txs", action.comment )
    let result = massTransform ( action.s, ...action.txs );
    console.log ( 'finished FocusOnReducer/massTxs', result )
    return result
  }
  console.log ( 'in reducer. I dont know what action it is', action )
  return state
}


function traceTransform<S> ( trace: any, s: S ): Transform<S, any> [] {
  // @ts-ignore
  const debug: any = s.debug;
  return debug?.recordTrace ? [ [ traceL<S> (), old => [ ...old ? old : [], trace ] ] ] : [];
}

const focusOnMiddleware = <S extends HasFocusOnDebug, C extends FocusOnContext<S>> ( config: FocusOnConfig<S, any, C>, context: C ) => ( store: any ) => ( dispatch: any ) => async ( action: any ) => {
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
  const stateAfterImmediate = store.getState()
  console.log ( 'stateAfterImmediate', stateAfterImmediate )

  const focusOnDispatcher = ( preTxs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ): S => {
    dispatch ( { type: 'massTxs', txs: [ ...preTxs, ...rests.flatMap ( x => x.txs ) ], s: originalS, comment: 'fromFocusOnDispatcher' } )
    console.log ( 'ending focusonDistpatcher', store.getState () )
    return store.getState ();
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

//@ts-ignore
export const store: Store<FState> = legacy_createStore ( FocusOnReducer, undefined, applyMiddleware ( focusOnMiddleware ( config, context ) ) );


export function makeLs ( desc: string ) { return lensState ( store.getState (), ( s, reason ) => store.dispatch ( { type: 'setMain', s, reason } ), desc, context )}
