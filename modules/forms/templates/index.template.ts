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


export const config: FocusOnConfig<{stateName}, Context, SimpleMessage> = {
  newFetchers,
  tagHolderL: identityL.focusQuery ( 'tags' ),
  restUrlMutator,
  /** How data is sent to/fetched from apis */
  fetchFn: {fetch},
  /**A hook that is called before anything else.  */
  preMutate: ( s: FState ) => s,
  /** A hook that is called after everything else.  */
  postMutate: ( s: FState ) => Promise.resolve ( s ),
  /** A last ditch error handler  */
  onError: ( s: FState, e: any ) => {
    console.error ( e );
    return s;
  },

  /** The lens to the current selected page */
  pageL: pageSelectionlens (),
  /** The list of all registered pages that can be displayed with SelectedPage  */
  pages,


  /** The list of all registered posters that can send data to the back end   */
  /** The collection of all registered fetchers that will get data from the back end */
  fetchers,
  messageL: simpleMessagesL (),
  stringToMsg: stringToSimpleMsg(() => new Date().toUTCString(), 'info'),
  restL: restL (),
  restDetails: restDetails,
  restCountL: restCountL(),
  maxRestCount: 5
}


let rootElement = getElement ( "root" );

console.log ( "set json" )

const pageModeFor: NameAnd<PageMode> = {
  OccupationAndIncomeDetails: 'view',
  EAccountsSummary: 'view',
  ETransfer: 'create',
  CreateEAccount: 'create'

}

let setJson = setJsonUsingNewFetchersUsingFlux<FState, Context, SimpleMessage> ( config, context, ( s: LensState<FState, FState, Context> ): void =>
  ReactDOM.render ( <div>
    <IndexPage state={s} dateFn={defaultDateFn}>
       <SelectedPage state={s}/>
    </IndexPage>
  </div>, rootElement ) )

setJson ( {
  ...emptyState,
  pageSelection: [ { pageName: '{firstPage}', firstTime: true, pageMode: {pageMode}, time: defaultDateFn() } ],
// @ts-ignore
  debug: {debug}
  // currentSelectedModalPage: 'EAccountsSummary_CreatePlan'
}, 'initial')


