import { identityOptics, Lens } from "@focuson/lens";
import { allModelPageDetails, HasPageSelection, HasSelectedModalPage, HasSimpleMessages, ModalPagesDetails, MultiPageDetails, PageSelection, pageSelectionlens, SelectedPage, selectionModalPageL, SelectPage, simpleMessagesPageConfig } from "@focuson/pages";
import { getElement, LensProps, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { SearchPage, SearchQueryModalPage } from "./search/searchPage";
import React from "react";
import { FocusOnConfig, HasFocusOnDebug, setJsonForFocusOn } from "@focuson/focuson";
import { HasPostCommand, postCommandsL, Posters } from "@focuson/poster";
import { fetchWithDelay, fetchWithPrefix, loggingFetchFn, sortedEntries } from "@focuson/utils";
import { HasSearch } from "./search/fullSearchDomain";
import { fetchers } from "./fetchers";


const modals: ModalPagesDetails<FullState> = {
  query: { lens: identityOptics<FullState> ().focusQuery ( 'search' ).focusQuery ( 'query' ), displayModalFn: SearchQueryModalPage }
}
type Modals = typeof modals

export interface FullState extends HasSearch, HasSimpleMessages, HasSelectedModalPage, HasPageSelection, HasFocusOnDebug, HasPostCommand<FullState, any> {}


function MyLoading () {
  return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FullState, string, Modals> ( modals, MyLoading )

export const pages: MultiPageDetails<FullState, Modals> = {
  search: { config: simpleMessagesConfig, lens: identityOptics<FullState> ().focusQuery ( 'search' ), pageFunction: SearchPage<FullState> (), initialValue: {} }
}

export const posters: Posters<FullState> = {}


const config: FocusOnConfig<FullState> = {
  /** How data is sent to/fetched from apis */
  fetchFn: fetchWithDelay ( 2000, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) ),

  /**A hook that is called before anything else.  */
  preMutate: ( s: FullState ) => s,
  /** A hook that is called after everything else.  */
  postMutate: ( s: FullState ) => Promise.resolve ( s ),
  /** A last ditch error handler  */
  onError: ( s: FullState, e: any ) => {
    console.error ( e );
    return s
  },

  /** The lens to the current selected page */
  pageL: pageSelectionlens (),
  /** The list of all registered pages that can be displayed with SelectedPage  */
  pages,

  /** The lens to the currently selected modal page*/
  modalL: selectionModalPageL (),
  /** The list of all registered modal pages   */
  modals: allModelPageDetails ( modals ),

  /** The lens to the list of PostCommands*/
  postL: postCommandsL (),
  /** The list of all registered posters that can send data to the back end   */
  posters,

  /** The collection of all registered fetchers that will get data from the back end */
  fetchers: fetchers ()
}


let rootElement = getElement ( "root" );
console.log ( "set json" )
let setJson = setJsonForFocusOn ( config, ( s: LensState<FullState, FullState> ): void =>
  ReactDOM.render ( <SelectedPage state={s} pages={pages} selectedPageL={pageSelectionlens<FullState> ()}/>, rootElement ) )

console.log ( "setting json" )
setJson ( { messages: [], pageSelection: { pageName: "search", pageMode: 'edit' }, search: { query: "phil", queryResults: [] }, debug: { selectedPageDebug: false, fetcherDebug: true }, postCommands: [] } )