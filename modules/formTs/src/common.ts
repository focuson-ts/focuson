import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'
import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';
import {  OnTagFetchErrorFn } from '@focuson/fetcher';
import { identityOptics,NameAndLens } from '@focuson/lens';
import { HasTagHolder } from '@focuson/template';
 import { HasRestCommands } from '@focuson/rest'
import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';
import { LensProps } from '@focuson/state';
import { pages } from "./pages";
import { MyCombined } from "@focuson/form_components";
import { HasHelloWorldPageDomain } from './HelloWorld/HelloWorld.domains';
import { HasAccountOverviewPageDomain } from './AccountOverview/AccountOverview.domains';
import { HasJointAccountPageDomain } from './JointAccount/JointAccount.domains';
import { HasOccupationAndIncomeSummaryPageDomain } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';
import { HasEAccountsSummaryPageDomain } from './EAccountsSummary/EAccountsSummary.domains';
import { HasETransferPageDomain } from './ETransfer/ETransfer.domains';
import { HasCreateEAccountPageDomain } from './CreateEAccount/CreateEAccount.domains';
import { HasChequeCreditbooksPageDomain } from './ChequeCreditbooks/ChequeCreditbooks.domains';
import { HasRepeatingPageDomain } from './Repeating/Repeating.domains';
import { HasPostCodeDemoPageDomain } from './PostCodeDemo/PostCodeDemo.domains';

export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,
  HasHelloWorldPageDomain,
  HasAccountOverviewPageDomain,
  HasJointAccountPageDomain,
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
  applRef?:string;
  brandRef?:string;
  createPlanId?:string;
  customerId?:string;
  usersRole?:string;
}
export const identityL = identityOptics<FState> ();
export const commonIdsL = identityL.focusQuery('CommonIds');
export const commonIds: NameAndLens<FState> = {
   accountId: commonIdsL.focusQuery('accountId'),
   applRef: commonIdsL.focusQuery('applRef'),
   brandRef: commonIdsL.focusQuery('brandRef'),
   createPlanId: commonIdsL.focusQuery('createPlanId'),
   customerId: commonIdsL.focusQuery('customerId'),
   usersRole: commonIdsL.focusQuery('usersRole')
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
export type Context = FocusOnContext<FState>
export const context: Context = {
   ...defaultPageSelectionAndRestCommandsContext<FState> ( pages, commonIds),
   combine: MyCombined
}
export const emptyState: FState = {
  CommonIds: {"applRef":"appref","createPlanId":"tbd","accountId":"accId","customerId":"custId","brandRef":"brandRef","usersRole":"user"},
  tags: {},
  messages: [],
  pageSelection: [{ pageName: 'HelloWorld', firstTime: true, pageMode: 'view' }],
  HelloWorld:{},
  restCommands: [],
      debug: { fetcherDebug: true, postDebug: false, selectedPageDebug: false, loadTreeDebug: false, showTracing: false, recordTrace: true }
  }