import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'
import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';
import {  OnTagFetchErrorFn } from '@focuson/fetcher';
import { identityOptics,NameAndLens } from '@focuson/lens';
import { HasTagHolder } from '@focuson/template';
 import { HasRestCommands } from '@focuson/rest'
import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';
import { LensProps } from '@focuson/state';
import { pages } from "./pages";
import { MyCombined } from "./copied/MyCombined";
import { HasAccountOverviewPageDomain } from './AccountOverview/AccountOverview.domains';
import { HasOccupationAndIncomeSummaryPageDomain } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';
import { HasEAccountsSummaryPageDomain } from './EAccountsSummary/EAccountsSummary.domains';
import { HasETransferPageDomain } from './ETransfer/ETransfer.domains';
import { HasCreateEAccountPageDomain } from './CreateEAccount/CreateEAccount.domains';
import { HasChequeCreditbooksPageDomain } from './ChequeCreditbooks/ChequeCreditbooks.domains';
import { HasRepeatingPageDomain } from './Repeating/Repeating.domains';
import { HasPostCodeDemoPageDomain } from './PostCodeDemo/PostCodeDemo.domains';

export type Context = FocusOnContext<FState>
export const context: Context = {
   ...defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
   combine: MyCombined
}
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,
  HasAccountOverviewPageDomain,
  HasOccupationAndIncomeSummaryPageDomain,
  HasEAccountsSummaryPageDomain,
  HasETransferPageDomain,
  HasCreateEAccountPageDomain,
  HasChequeCreditbooksPageDomain,
  HasRepeatingPageDomain,
  HasPostCodeDemoPageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
  accountId?:string;
  customerId?:string;
  createPlanId?:string;
  applRef?:string;
  brandRef?:string;
}
export const identityL = identityOptics<FState> ();
export const commonIdsL = identityL.focusQuery('CommonIds');
export const commonIds: NameAndLens<FState> = {
   accountId: commonIdsL.focusQuery('accountId'),
   customerId: commonIdsL.focusQuery('customerId'),
   createPlanId: commonIdsL.focusQuery('createPlanId'),
   applRef: commonIdsL.focusQuery('applRef'),
   brandRef: commonIdsL.focusQuery('brandRef')
}
export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{
  mode: PageMode;
  id: string;
  buttons: NameAnd<JSX.Element>
}
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
export const emptyState: FState = {
  CommonIds: {"accountId":"accId","customerId":"custId","createPlanId":"tbd","applRef":"appref","brandRef":"brandRef"},
  tags: {},
  messages: [],
  pageSelection: [{ pageName: 'AccountOverview', firstTime: true, pageMode: 'view' }],
  AccountOverview:{},
  restCommands: [],
    debug: { selectedPageDebug: true, fetcherDebug: true }
  }