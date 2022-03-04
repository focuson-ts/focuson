import { IndexPage, PageMode, pageSelectionlens, SelectedPage, SelectPage, simpleMessagesL } from "@focuson/pages";
import { FocusOnConfig, setJsonForFocusOn } from "@focuson/focuson";
import { postCommandsL, Posters } from "@focuson/poster";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { context, Context, emptyState, FState } from "./common";
import { fetchWithDelay, fetchWithPrefix, loggingFetchFn, NameAnd, SimpleMessage, sortedEntries } from "@focuson/utils";
import { fetchers } from "./fetchers";
import { pages } from "./pages";
import { restL } from "@focuson/rest";
import { restDetails } from "./rests";
import { DebugState } from "@focuson/focuson";
import { commonIds } from "../../formTs/src/common";
const config: FocusOnConfig<FState, Context, SimpleMessage> = {
  /** How data is sent to/fetched from apis */
  fetchFn: fetchWithDelay ( 1000, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) ),
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
<DebugState state={s} config={config} commonIds={commonIds} />
</div>, rootElement ) )
setJson ( {
  ...emptyState,
  pageSelection: [ { pageName: 'OccupationAndIncomeSummary', firstTime: true, pageMode: 'view' } ],
// @ts-ignore
  debug: { restDebug: true }
  // currentSelectedModalPage: 'EAccountsSummary_CreatePlan'
} )