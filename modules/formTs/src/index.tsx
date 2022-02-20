import { identityOptics, Lens } from "@focuson/lens";
import { allModelPageDetails, ModalPagesDetails, MultiPageDetails, pageSelectionlens, SelectedPage, PageSelection, selectionModalPageL, simpleMessagesPageConfig, SelectPage } from "@focuson/pages";
import { FocusOnConfig, setJsonForFocusOn } from "@focuson/focuson";
import { postCommandsL, Posters } from "@focuson/poster";
import { getElement, LensState, setJsonForFlux, LensProps } from "@focuson/state";
import ReactDOM from "react-dom";
import { FState } from "./common";
import { EAccountsSummaryDD, EAccountsSummaryPage } from "./render";
import { fetchWithDelay, fetchWithPrefix, loggingFetchFn, sortedEntries } from "@focuson/utils";
import { fetchers } from "./fetchers";
import { pages, modals } from "./pages";


const emptyState: FState = {
  CommonIds: { "accountId": "accId", "customerId": "custId" },
  tags: {},
  messages: [],
  pageSelection: { pageName: 'EAccountsSummary', firstTime: true },
  postCommands: [],
  debug: { selectedPageDebug: true, fetcherDebug: true }
}

export const posters: Posters<FState> = {}


const config: FocusOnConfig<FState> = {
  /** How data is sent to/fetched from apis */
  fetchFn: fetchWithDelay ( 2000, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) ),

  /**A hook that is called before anything else.  */
  preMutate: ( s: FState ) => s,
  /** A hook that is called after everything else.  */
  postMutate: ( s: FState ) => Promise.resolve ( s ),
  /** A last ditch error handler  */
  onError: ( s: FState, e: any ) => {
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
  fetchers
}


let rootElement = getElement ( "root" );

console.log ( "set json" )


let setJson = setJsonForFocusOn ( config, ( s: LensState<FState, FState> ): void =>
  ReactDOM.render ( <div>
    <ul>
      {sortedEntries ( pages ).map ( ( [ name, pd ] ) =>
        <li key={name}><SelectPage state={s} pageName={name} selectedPageLens={pageSelectionlens<FState> ()}/></li> )}
    </ul>
    <SelectedPage state={s} pages={pages} selectedPageL={pageSelectionlens<FState> ()}/>
    <pre>{JSON.stringify ( s.main, null, 2 )}</pre>
  </div>, rootElement ) )

setJson ( { ...emptyState, pageSelection: { pageName: 'ETransfer', firstTime: true }, } )


