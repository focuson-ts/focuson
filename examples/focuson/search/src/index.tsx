import { identityOptics } from "@focuson/lens";
import { HasPageSelection, MultiPageDetails, PageSelectionContext, pageSelectionlens, SelectedPage, simpleMessagesPageConfig } from "@focuson/pages";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { SearchPage, SearchQueryModalPage } from "./search/searchPage";
import React from "react";
import { defaultPageSelectionContext, FocusOnConfig, HasFocusOnDebug, setJsonForFocusOn } from "@focuson/focuson";
import { HasPostCommand, postCommandsL, Posters } from "@focuson/poster";
import { fetchWithDelay, fetchWithPrefix, HasSimpleMessages, loggingFetchFn } from "@focuson/utils";
import { HasSearch, SearchRequirements } from "./search/fullSearchDomain";
import { fetchers } from "./fetchers";
import { HasTagHolder } from "@focuson/template";

type Context = PageSelectionContext<FullState>
export interface FullState extends SearchRequirements, HasFocusOnDebug, HasPostCommand<FullState, any> {}


function MyLoading () {
  return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FullState, string, Context> ( MyLoading )

export const pages: MultiPageDetails<FullState, Context> = {
  search: { config: simpleMessagesConfig, lens: identityOptics<FullState> ().focusQuery ( 'search' ), pageFunction: SearchPage<FullState, Context> (), initialValue: {} },
  query: { config: simpleMessagesConfig, lens: identityOptics<FullState> ().focusQuery ( 'search' ).focusQuery ( 'query' ), pageFunction: SearchQueryModalPage (), modal: true }
}

export const posters: Posters<FullState> = {}


const config: FocusOnConfig<FullState, Context> = {
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

  /** The lens to the list of PostCommands*/
  postL: postCommandsL (),
  /** The list of all registered posters that can send data to the back end   */
  posters,

  /** The collection of all registered fetchers that will get data from the back end */
  fetchers: fetchers ()
}
type Config = typeof config

let rootElement = getElement ( "root" );
console.log ( "set json" )
let setJson = setJsonForFocusOn<Config, FullState, Context> ( config, defaultPageSelectionContext ( pages ), ( s: LensState<FullState, FullState, PageSelectionContext<FullState>> ): void =>
  ReactDOM.render ( <SelectedPage state={s} />, rootElement ) )

console.log ( "setting json" )
setJson ( { messages: [],
  tags:{},
  pageSelection: [ { pageName: "search", pageMode: 'edit' } ],
  search: { query: "phil", queryResults: [] },
  debug: { selectedPageDebug: false, fetcherDebug: true },
  postCommands: [] } )