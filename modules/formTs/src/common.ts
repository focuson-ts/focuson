import { fromPathFromRaw, HasPageSelection, PageMode ,PageSelectionContext, pageSelectionlens} from '@focuson/pages'
import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';
import {  OnTagFetchErrorFn } from '@focuson/fetcher';
import { identityOptics,NameAndLens, Optional } from '@focuson/lens';
import { HasTagHolder } from '@focuson/template';
 import { HasRestCommands } from '@focuson/rest'
import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';
import { LensProps } from '@focuson/state';
import { pages } from "./pages";
import { MyCombined } from "@focuson/form_components";
import { HasHelloWorldMainPagePageDomain } from './HelloWorldMainPage/HelloWorldMainPage.domains';
import { HasListOfPaymentsPagePageDomain } from './ListOfPaymentsPage/ListOfPaymentsPage.domains';
import { HasLinkedAccountDetailsPageDomain } from './LinkedAccountDetails/LinkedAccountDetails.domains';
import { HasAccountOverviewPageDomain } from './AccountOverview/AccountOverview.domains';
import { HasJointAccountPageDomain } from './JointAccount/JointAccount.domains';
import { HasOccupationAndIncomeSummaryPageDomain } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';
import { HasEAccountsSummaryPageDomain } from './EAccountsSummary/EAccountsSummary.domains';
import { HasETransferPageDomain } from './ETransfer/ETransfer.domains';
import { HasCreateEAccountPageDomain } from './CreateEAccount/CreateEAccount.domains';
import { HasChequeCreditbooksPageDomain } from './ChequeCreditbooks/ChequeCreditbooks.domains';
import { HasRepeatingPageDomain } from './Repeating/Repeating.domains';
import { HasPostCodeMainPagePageDomain } from './PostCodeMainPage/PostCodeMainPage.domains';

export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,
  HasHelloWorldMainPagePageDomain,
  HasListOfPaymentsPagePageDomain,
  HasLinkedAccountDetailsPageDomain,
  HasAccountOverviewPageDomain,
  HasJointAccountPageDomain,
  HasOccupationAndIncomeSummaryPageDomain,
  HasEAccountsSummaryPageDomain,
  HasETransferPageDomain,
  HasCreateEAccountPageDomain,
  HasChequeCreditbooksPageDomain,
  HasRepeatingPageDomain,
  HasPostCodeMainPagePageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
  accountId?:string;
  applRef?:string;
  brandRef?:string;
  clientRef?:string;
  createPlanId?:string;
  customerId?:string;
  dbName?:string;
  employeeType?:string;
  usersRole?:string;
}
export const identityL = identityOptics<FState> ();
export const commonIdsL = identityL.focusQuery('CommonIds');
export const commonIds: NameAndLens<FState> = {
   accountId: commonIdsL.focusQuery('accountId'),
   applRef: commonIdsL.focusQuery('applRef'),
   brandRef: commonIdsL.focusQuery('brandRef'),
   clientRef: commonIdsL.focusQuery('clientRef'),
   createPlanId: commonIdsL.focusQuery('createPlanId'),
   customerId: commonIdsL.focusQuery('customerId'),
   dbName: commonIdsL.focusQuery('dbName'),
   employeeType: commonIdsL.focusQuery('employeeType'),
   usersRole: commonIdsL.focusQuery('usersRole')
}
export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{
  mode: PageMode;
  id: string;
  label?:string;
  allButtons: NameAnd<JSX.Element>;
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
export const pathToLens: ( s: FState ) => ( path: string ) => Optional<FState, any> =
    fromPathFromRaw ( pageSelectionlens<FState> (), pages )
export const emptyState: FState = {
  CommonIds: {"dbName":"mock","clientRef":"custId","applRef":"appref","createPlanId":"tbd","accountId":"123","brandRef":"brandRef","customerId":"custId","employeeType":"basic","usersRole":"user"},
  tags: {},
  messages: [],
  pageSelection: [{ pageName: 'HelloWorldMainPage', firstTime: true, pageMode: 'view' }],
  HelloWorldMainPage:{},
  restCommands: [],
  debug: {"fetcherDebug":true,"restDebug":false,"selectedPageDebug":false,"loadTreeDebug":false,"showTracing":false,"recordTrace":true,"tagFetcherDebug":false,"accordions":[]}
  }