import {  PageMode, pageSelectionlens, SelectedPage, simpleMessagesL } from "@focuson/pages";
import { FocusOnConfig, setJsonForFocusOn, setJsonUsingNewFetchersUsingFlux,restCountL } from "@focuson/focuson";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { context, Context, emptyState, FState, pathToLens } from "./{commonFile}";
import { defaultDateFn, fetchWithDelay, fetchWithPrefix, loggingFetchFn, NameAnd, RestAction, SimpleMessage, sortedEntries, stringToSimpleMsg } from "@focuson/utils";
import { fetchers } from "./{fetchersFile}";
import { pages } from "./{pagesFile}";
import { restL } from "@focuson/rest";
import { restDetails, restUrlMutator } from "./{restsFile}";
import { IndexPage } from "@focuson/form_components";
import { newFetchers } from "./fetchers";
import { identityL } from "./common";
import { config, start } from "./config";
import { focusOnMiddleware, FocusOnReducer, makeLs } from "./store";
import { applyMiddleware, legacy_createStore, combineReducers } from "@reduxjs/toolkit";
import { Lenses } from '@focuson/lens'

export const combineAll = combineReducers ( {
  Rocket: FocusOnReducer ( identityL )
} )
export const store: any = legacy_createStore ( combineAll, undefined, applyMiddleware ( focusOnMiddleware ( config, context, Lenses.identity<any> ().focusOn ( 'Rocket' ) ) ) );
let rootElement = getElement ( "root" );
console.log ( "set json" )
store.subscribe ( () => {
  console.log ( "store.subscribe-render" )
  ReactDOM.render (
    <IndexPage state={makeLs<{stateName}> ( store, 'Rocket' )} dateFn={defaultDateFn}>
  <SelectedPage state={makeLs<{stateName}> ( store, 'Rocket' )}/>
  </IndexPage>, rootElement )
} )

console.log ( "dispatching" )
store.dispatch ( { type: 'setMain', s: start } )
console.log ( "dispatched" )
