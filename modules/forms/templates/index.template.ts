import { SelectedPage } from "@focuson/pages";
import { getElement } from "@focuson/state";
import ReactDOM from "react-dom";
import {  {stateName}, identityL } from "./{commonFile}";
import { context } from "./config";
import { defaultDateFn } from "@focuson/utils";
import { IndexPage } from "@focuson/form_components";
import { config, start } from "./config";
import { focusOnMiddleware, FocusOnReducer, makeLs } from "./store";
import { applyMiddleware, combineReducers, legacy_createStore } from "@reduxjs/toolkit";
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
