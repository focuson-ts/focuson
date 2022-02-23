import { allModelPageDetails, PageMode, pageSelectionlens, SelectedPage, selectionModalPageL, SelectPage } from "@focuson/pages";
import { FocusOnConfig, setJsonForFocusOn } from "@focuson/focuson";
import { postCommandsL, Posters } from "@focuson/poster";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { context, Context, emptyState, FState } from "./common";
import { fetchWithDelay, fetchWithPrefix, loggingFetchFn, NameAnd, sortedEntries } from "@focuson/utils";
import { fetchers } from "./fetchers";
import { pages } from "./pages";
import { modals } from "./modals";



export const posters: Posters<FState> = {}



const config: FocusOnConfig<FState, Context> = {
  /** How data is sent to/fetched from apis */
  fetchFn: fetchWithDelay ( 1000, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) ),
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

const pageModeFor: NameAnd<PageMode> = {
  OccupationAndIncomeDetails: 'view',
  EAccountsSummary: 'view',
  ETransfer: 'create',
  CreateEAccount: 'create'

}

let setJson = setJsonForFocusOn ( config, context, ( s: LensState<FState, FState, Context> ): void =>
  ReactDOM.render ( <div>
    <ul>
      {sortedEntries ( pages ).map ( ( [ name, pd ] ) =>
        <li key={name}><SelectPage state={s} pageName={name} pageMode={pageModeFor[ name ]} selectedPageLens={pageSelectionlens<FState> ()}/></li> )}
    </ul>
    <SelectedPage state={s} pages={pages} selectedPageL={pageSelectionlens<FState> ()}/>
    {/*<pre>{JSON.stringify ( s.main, null, 2 )}</pre>*/}
  </div>, rootElement ) )

setJson ( {
  ...emptyState,
  pageSelection: { pageName: 'ETransfer', firstTime: true, pageMode: 'view' }

  // currentSelectedModalPage: 'EAccountsSummary_CreatePlan'
} )


