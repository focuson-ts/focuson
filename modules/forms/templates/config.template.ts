import { simpleMessagesL } from "@focuson/pages";
import { defaultPageSelectionAndRestCommandsContext, FocusOnConfig, restCountL } from "@focuson/focuson";
import { commonIds, Context, emptyState, FState } from "./{commonFile}";
import { defaultDateFn, fetchWithDelay, fetchWithPrefix, loggingFetchFn, loadingCursorFetch, SimpleMessage, stringToSimpleMsg } from "@focuson/utils";
import { restDetails, restUrlMutator } from "./{restsFile}";
import { newFetchers } from "./{fetchersFile}";
import { pages } from "./{pagesFile}";
import {MyCombined} from '@focuson/form_components';


export const context: Context = {
  ...defaultPageSelectionAndRestCommandsContext<FState> ( pages, commonIds, newFetchers, restDetails, defaultDateFn ),
  combine: MyCombined
}
export const config: FocusOnConfig<{stateName}, Context, SimpleMessage> = {
  newFetchers,
  tagHolderL: context.tagHolderL,
  restUrlMutator,
  /** How data is sent to/fetched from apis */
  fetchFn: {fetch},
  /**A hook that is called before anything else.  */
  preMutate: ( s: {stateName} ) => s,
  /** A hook that is called after everything else.  */
  postMutate: ( s: {stateName} ) => Promise.resolve ( s ),
  /** A last ditch error handler  */
  onError: ( s: {stateName}, e: any ) => {
    console.error ( e );
    return s;
  },

  /** The lens to the current selected page */
  pageL: context.pageSelectionL,
  /** The list of all registered pages that can be displayed with SelectedPage  */
  pages: context.pages,
  // fetchers,
  messageL: simpleMessagesL (),
  stringToMsg: stringToSimpleMsg(() => new Date().toUTCString(), 'info'),
  restL: context.restL,
  restDetails: restDetails,
  restCountL: restCountL(),
  maxRestCount: 5000,
  mockJwt: false
}


export const start: {stateName} = {
  ...emptyState,
  pageSelection: [ { pageName: '{firstPage}', firstTime: true, pageMode: {pageMode}, time: defaultDateFn() } ],
// @ts-ignore
  debug: {debug}
  // currentSelectedModalPage: 'EAccountsSummary_CreatePlan'
}


