import { IndexPage, PageMode, pageSelectionlens, SelectedPage, SelectPage, simpleMessagesL } from "@focuson/pages";
import { FocusOnConfig, setJsonForFocusOn } from "@focuson/focuson";
import { getElement, LensState } from "@focuson/state";
import ReactDOM from "react-dom";
import { context, Context, emptyState, FState } from "./{commonFile}";
import { fetchWithDelay, fetchWithPrefix, loggingFetchFn, NameAnd, RestAction, SimpleMessage, sortedEntries } from "@focuson/utils";
import { fetchers } from "./{fetchersFile}";
import { pages } from "./{pagesFile}";
import { restL } from "@focuson/rest";
import { restDetails, restUrlMutator } from "./{restsFile}";
import { DebugState } from "@focuson/focuson";
import { commonIds } from "./common";


export const config: FocusOnConfig<{stateName}, Context, SimpleMessage> = {
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
  restL: restL (),
  restDetails: restDetails,
  namedOptionals: { }
}


let rootElement = getElement ( "root" );

console.log ( "set json" )

const pageModeFor: NameAnd<PageMode> = {
  OccupationAndIncomeDetails: 'view',
  EAccountsSummary: 'view',
  ETransfer: 'create',
  CreateEAccount: 'create'

}

let setJson = setJsonForFocusOn<{stateName}, Context, SimpleMessage> ( config, context, ( s: LensState<{stateName}, {stateName}, Context> ): void =>
  ReactDOM.render ( <div>
    <IndexPage state={s}>
  <SelectedPage state={s}/>
</IndexPage>
<DebugState state={s} config={config} commonIds={commonIds} />
</div>, rootElement ) )

setJson ( {
  ...emptyState,
  pageSelection: [ { pageName: '{firstPage}', firstTime: true, pageMode: 'view' } ],

// @ts-ignore
  debug: {debug}

  // currentSelectedModalPage: 'EAccountsSummary_CreatePlan'
}, 'initial')


