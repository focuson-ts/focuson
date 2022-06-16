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
import { makeLs, store } from "./store";



let rootElement = getElement ( "root" );
console.log ( "set json" )
store.subscribe ( () => {
  ReactDOM.render (
    <IndexPage state={makeLs ( 'indexPage' )} dateFn={defaultDateFn}>
  <SelectedPage state={makeLs ( 'selectedPage' )}/>
  </IndexPage>, rootElement )
} )
store.dispatch ( { type: 'setMain', s: start } )
