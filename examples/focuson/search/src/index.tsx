import { identityOptics } from "@focuson/lens";
import { MultiPageDetails, PageSelectionContext, pageSelectionlens, SelectedPage, simpleMessagesL, simpleMessagesPageConfig } from "@focuson/pages";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { SearchPage, SearchQueryModalPage } from "./search/searchPage";
import React from "react";
import { defaultPageSelectionContext, FocusOnConfig, HasFocusOnDebug, setJsonForFocusOn } from "@focuson/focuson";
import { defaultDateFn, fetchWithDelay, fetchWithPrefix, loggingFetchFn, RestAction, SimpleMessage } from "@focuson/utils";
import { SearchRequirements } from "./search/fullSearchDomain";
import { fetchers } from "./fetchers";
import { HasRestCommands, RestDetails, restL } from "@focuson/rest";

type Context = PageSelectionContext<FullState>
export interface FullState extends SearchRequirements, HasFocusOnDebug, HasRestCommands {}


function MyLoading () {
  return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FullState, string, Context> ( MyLoading )

export const pages: MultiPageDetails<FullState, Context> = {
  search: { pageType: "MainPage", config: simpleMessagesConfig, lens: identityOptics<FullState> ().focusQuery ( 'search' ), pageFunction: SearchPage<FullState, Context> (), initialValue: {}, pageMode: 'edit', namedOptionals: {} },
  query: { pageType: "ModalPage", config: simpleMessagesConfig, pageFunction: SearchQueryModalPage () }
}

export const restDetails: RestDetails<FullState, SimpleMessage> = {}


const config: FocusOnConfig<FullState, Context, SimpleMessage> = {
  restUrlMutator ( r: RestAction, url: string ): string { return url; },
  /** How data is sent to/fetched from apis */
  fetchFn: fetchWithDelay ( 2000, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) ),
  messageL: simpleMessagesL (),
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

  /** The lens to the list of RestCommands*/
  restL: restL (),
  /** The list of all registered rest commands that can send/get data to/from the back end   */
  restDetails,

  /** The collection of all registered fetchers that will get data from the back end */
  fetchers: fetchers ( defaultDateFn )
}
let rootElement = getElement ( "root" );
console.log ( "set json" )
let setJson = setJsonForFocusOn<FullState, Context, SimpleMessage> ( config, defaultPageSelectionContext ( pages ), ( s: LensState<FullState, FullState, PageSelectionContext<FullState>> ): void =>
  ReactDOM.render ( <SelectedPage state={s}/>, rootElement ) )

console.log ( "setting json" )
setJson ( {
  messages: [],
  tags: {},
  pageSelection: [ { pageName: "search", pageMode: 'edit' } ],
  search: { query: "phil", queryResults: [] },
  debug: { selectedPageDebug: false, fetcherDebug: true },
  restCommands: []
}, 'initialState' )