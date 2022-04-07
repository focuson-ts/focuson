import {  PageMode, pageSelectionlens, SelectedPage, simpleMessagesL } from "@focuson/pages";
import { FocusOnConfig, setJsonForFocusOn } from "@focuson/focuson";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { context, Context, emptyState, FState } from "./common";
import { fetchWithDelay, fetchWithPrefix, loggingFetchFn, NameAnd, RestAction, SimpleMessage, sortedEntries } from "@focuson/utils";
import { fetchers } from "./fetchers";
import { pages } from "./pages";
import { restL } from "@focuson/rest";
import { restDetails, restUrlMutator } from "./rests";
import { IndexPage } from "@focuson/form_components";
export const config: FocusOnConfig<FState, Context, SimpleMessage> = {
  restUrlMutator,
  /** How data is sent to/fetched from apis */
  fetchFn: fetchWithDelay ( 1, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) ),
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
  restL: restL (),
  restDetails: restDetails
}
let rootElement = getElement ( "root" );
console.log ( "set json" )
const pageModeFor: NameAnd<PageMode> = {
  OccupationAndIncomeDetails: 'view',
  EAccountsSummary: 'view',
  ETransfer: 'create',
  CreateEAccount: 'create'
}
let setJson = setJsonForFocusOn<FState, Context, SimpleMessage> ( config, context, ( s: LensState<FState, FState, Context> ): void =>
  ReactDOM.render ( <div>
    <IndexPage state={s}>
       <SelectedPage state={s}/>
    </IndexPage>
  </div>, rootElement ) )
setJson ( {
  ...emptyState,
  pageSelection: [ { pageName: 'HelloWorldMainPage', firstTime: true, pageMode: 'view' } ],
// @ts-ignore
  debug: {"fetcherDebug":true,"restDebug":false,"selectedPageDebug":false,"loadTreeDebug":false,"showTracing":false,"recordTrace":true}
  // currentSelectedModalPage: 'EAccountsSummary_CreatePlan'
}, 'initial')