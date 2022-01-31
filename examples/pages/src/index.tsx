import { identityOptics } from "@focuson/lens";
import { HasPageSelection, HasSelectedModalPage, HasSimpleMessages, Loading, ModalPagesDetails, MultiPageDetails, PageConfig, pageSelectionlens, SelectedPage, SelectedPageDebug, SimpleMessages, simpleMessagesPageConfig } from "@focuson/pages";
import { getElement, LensState, setJsonForFlux } from "@focuson/state";
import ReactDOM from "react-dom";
import { HasSearch, SearchPage, SearchQueryModalPage } from "./searchPage";
import React from "react";


const modals: ModalPagesDetails<FullState> = {
  query: { lens: identityOptics<FullState> ().focusQuery ( 'search' ).focusQuery ( 'query' ), displayModalFn: SearchQueryModalPage }
}
type Modals = typeof modals

interface FullState extends HasSearch, HasSimpleMessages, HasSelectedModalPage, HasPageSelection<FullState>, SelectedPageDebug {}

function MyLoading(){
  return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FullState, string, Modals> ( modals, MyLoading )

export const pages: MultiPageDetails<FullState, Modals> = {
  search: { config: simpleMessagesConfig, lens: identityOptics<FullState> ().focusQuery ( 'search' ), pageFunction: SearchPage<FullState> (), initialValue: {} }
}


let rootElement = getElement ( "root" );
console.log("set json")
let setJson = setJsonForFlux ( 'fullstate', ( s: LensState<FullState, FullState> ): void =>
  ReactDOM.render ( <SelectedPage state={s} pages={pages} selectedPageL={pageSelectionlens<FullState, any> ()}/>, rootElement ) )

console.log("setting json")
setJson ( { messages: {}, pageSelection: { pageName: "search" }, search: { query: "", queryResults: [] },debug:{ selectedPageDebug: true }} )