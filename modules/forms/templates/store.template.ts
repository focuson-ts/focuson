import { applyMiddleware } from 'redux'
import { legacy_createStore, Store } from '@reduxjs/toolkit'
import { Context, emptyState, FState, identityL } from "./common";
import { defaultDateFn, errorMonad, errorPromiseMonad, fetchWithDelay, fetchWithPrefix, loggingFetchFn, safeArray, SimpleMessage, stringToSimpleMsg } from "@focuson/utils";
import { lensState, LensState } from "@focuson/state";
import { Reducer } from "react";
import { dispatchRestAndFetchCommands, FocusOnConfig, FocusOnContext, FocusOnDebug, HasFocusOnDebug, restCountL, traceL, makeProcessorsConfig} from "@focuson/focuson";
import { Lens, Lenses, massTransform, Transform } from "@focuson/lens";
import { pageSelectionlens, preMutateForPages, simpleMessagesL, removeOldMessages } from "@focuson/pages";
import { newFetchers } from "./fetchers";
import { restDetails, restUrlMutator } from "./rests";
import { pages } from "./pages";
import { RestCommand, RestCommandAndTxs, restL } from "@focuson/rest";
import { config, context, start } from "./config";

export interface FocusOnSetMainAction<S> {
  type: 'setMain',
  s: S;
  team: string;
  reason: any;
}

function isFocusOnSetMainAction<S> ( f: any ): f is FocusOnSetMainAction<S> {
  return f.type === 'setMain'
}

export interface FocusOnMassTxsAction<S> {
  type: 'massTxs',
  s: S;
  team: string;
  txs: Transform<S, any>[]
}
function isFocusOnMassTxsAction<S> ( f: any ): f is FocusOnMassTxsAction<S> {
  return f.type === 'massTxs'
}
export const {teamName}Reducer: any = <BigState, S> ( rootLens: Lens<BigState, S>, showDebugButton?: boolean ) => ( state: BigState, action: any ) => {
  if ( state === undefined ) return {...start, environment:  {showDebugButton}}
  // @ts-ignore
  const debug = rootLens.get ( state )?.debug?.reduxDebug === true
  if ( debug ) console.log ( ' {teamName}Reducer-action', action )
  // if ( debug ) console.log ( '  FocusOnReducer', state )
  if ( isFocusOnSetMainAction<S> ( action ) && action.team=== '{teamName}' ) {
    return rootLens.set ( state, action.s );
  }
  if ( isFocusOnMassTxsAction<S> ( action ) && action.team=== '{teamName}' ) {
    if ( debug ) console.log ( "   {teamName}Reducer- action is massTxs", action.type, action.txs.map ( t => [ t[ 0 ].description, t[ 1 ] ( t[ 0 ].getOption ( action.s ) ) ] ) )
    if ( action.txs.length === 0 ) {
      if (debug) console.log ( "  nothing to do..." );
      return state
    }
    let result: S = massTransform<S> ( action.s, ...action.txs );
    if ( debug ) console.log ( '  finished FocusOnReducer/massTxs', result )
    let withRootLens = rootLens.set ( state, result );
    return withRootLens
  }
  if ( debug ) console.log ( '{teamName}Reducer. Not processing', action )
  return state
}
function traceTransform<S> ( trace: any, s: S ): Transform<S, any> [] {
  // @ts-ignore
  const debug: any = s.debug;
  return debug?.recordTrace ? [ [ traceL<S> (), old => [ ...old ? old : [], trace ] ] ] : [];
}
export const focusOnMiddlewareFor{teamName} = <BigState, S extends HasFocusOnDebug, C extends FocusOnContext<S>> ( config: FocusOnConfig<S, any, SimpleMessage>, context: C, rootLens: Lens<BigState, S> , delayBeforeMessagesRemoved?: number) => ( store: any ) => ( dispatch: any ) => async ( action: any ) => {
  if ( !isFocusOnSetMainAction<S> ( action ) ) return dispatch ( action );
  if ( action.team !== '{teamName}' ) return dispatch ( action )
  const clearCount: Transform<S, any> = [ config.restCountL, () => undefined ]
  const deleteRestCommands: Transform<S, any> = [ config.restL, () => [] ];
  const { preMutate, postMutate, onError } = config
  const { s, reason } = action
  // @ts-ignore
  const debug = s.debug?.reduxDebug === true
  if ( debug ) console.log ( 'focusOnMiddleware', action )
  const restCommands = safeArray ( config.restL.getOption ( s ) )
  const processorsConfig = makeProcessorsConfig ( s, context );
  let start: S = errorMonad ( s, debug, onError,
    [ 'preMutateForPages', preMutateForPages<S, C> ( context,processorsConfig ) ],
    ['removeOldMessage',  removeOldMessages<S> ( context.dateFn,  context.simpleMessagesL, delayBeforeMessagesRemoved )],
    [ 'preMutate', preMutate ],
    [ 'dispatch pre rests', s => dispatch ( { type: 'massTxs', s, team: '{teamName}', txs: [ ...traceTransform ( reason, s ), deleteRestCommands, clearCount ], comment: 'dispatchPreRests' } ) ]//This updates the gui 'now' pre rest/fetcher goodness. We need to kill the rest commands to stop them being sent twice
  );
  // return start;
  const stateAfterImmediate = rootLens.get ( store.getState () )
  const focusOnDispatcher = ( preTxs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ): S => {
    dispatch ( { type: 'massTxs', team: '{teamName}',txs: [ ...preTxs, ...rests.flatMap ( x => x.txs ) ], s: originalS, comment: 'fromFocusOnDispatcher' } )
    if ( debug ) console.log ( 'ending focusOnDispatcher (full state)', store.getState () )
    return rootLens.get ( store.getState () );
  }
  let result = await dispatchRestAndFetchCommands ( config, context, focusOnDispatcher ) ( restCommands ) ( () => rootLens.get ( store.getState () ) );
  const restsLoaded = config.restCountL.getOption ( result )
  if ( debug ) {
    console.log ( 'restsLoaded were ', restsLoaded, restsLoaded === undefined || restsLoaded?.loopCount === 0 ? 'no need to loop' : 'need to loop' );
  }
  if ( restsLoaded ) {
    result = await dispatchRestAndFetchCommands ( config, context, focusOnDispatcher ) ( [] ) ( () => rootLens.get ( store.getState () ) );
    const restsLoaded2 = config.restCountL.getOption ( result )
    if ( debug ) {
      console.log ( 'second restsLoaded were ', restsLoaded2, restsLoaded.loopCount === restsLoaded2?.loopCount ? 'will stop looping' : 'need to loop' );
    }
  }
  return result
  //
  // let finalResultFn = ( start: S, restCommands: RestCommand[] ) => errorPromiseMonad ( onError ) (
  //   start, debug,
  //   [ 'dispatchRestAndFetchCommands',  s => dispatchRestAndFetchCommands ( config, context, focusOnDispatcher ) ( restCommands ) ( s ) ],
  //   [ 'postMutate', postMutate ]
  // );
  // const res = await finalResultFn ( stateAfterImmediate, restCommands )
  // const restsLoaded = config.restCountL.getOption ( res )
  // if ( debug ) console.log ( 'restsLoaded were ', restsLoaded, restsLoaded?.loopCount === 0 ? 'will stop looping' : 'need to loop' );
  // const finalResult = restsLoaded?.loopCount === 0 ? res : await finalResultFn ( res, [] )
  // if ( debug ) console.log ( 'focusOnMiddleware - finalResult is ', finalResult );
  // return res;
};
export function makeLs<S> ( store: Store<S>, team: string ) {
  function currentState<D,C> ( ls: LensState<S, D, C> ): LensState<S,D,C> {
    const currentMain: any = store.getState ();
    const newMain = currentMain[ team ];
    return ls.copyWithNewMain(newMain)
  }
  let value: any = store.getState ();
  return lensState ( value[ team ], ( s, reason ) => store.dispatch ( { type: 'setMain', s, team, reason } ), team, { ...context, currentState } )
}