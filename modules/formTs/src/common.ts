import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'
import { defaultDateFn, HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import {  OnTagFetchErrorFn } from '@focuson/fetcher';
import { identityOptics } from '@focuson/lens';
import { HasTagHolder, NameAndLens } from '@focuson/template';
 import { HasRestCommands } from '@focuson/rest'
import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, PageSelectionAndRestCommandsContext, HasFocusOnDebug } from '@focuson/focuson';
import { LensProps } from '@focuson/state';
import { pages } from "./pages";
import * as pageDomains from './pageDomains';
export type Context = PageSelectionAndRestCommandsContext<FState>
export const context: Context = defaultPageSelectionAndRestCommandsContext<FState> ( pages )
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,
 pageDomains.HasOccupationAndIncomeSummaryPageDomain,
 pageDomains.HasEAccountsSummaryPageDomain,
 pageDomains.HasETransferPageDomain,
 pageDomains.HasCreateEAccountPageDomain,
 pageDomains.HasChequeCreditbooksPageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
accountSeq?:string;
applicationRef?:string;
brandRef?:string;
vbAccountSeq?:string;
vbAccountType?:string;
accountId?:string;
createPlanId?:string;
customerId?:string;
applRef?:string;
}
export const identityL = identityOptics<FState> ();
export const commonIdsL = identityL.focusQuery('CommonIds');
export const commonIds: NameAndLens<FState> = {
   accountSeq: commonIdsL.focusQuery('accountSeq'),
   applicationRef: commonIdsL.focusQuery('applicationRef'),
   brandRef: commonIdsL.focusQuery('brandRef'),
   vbAccountSeq: commonIdsL.focusQuery('vbAccountSeq'),
   vbAccountType: commonIdsL.focusQuery('vbAccountType'),
   accountId: commonIdsL.focusQuery('accountId'),
   createPlanId: commonIdsL.focusQuery('createPlanId'),
   customerId: commonIdsL.focusQuery('customerId'),
   applRef: commonIdsL.focusQuery('applRef')
}
export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{
  mode: PageMode;
}
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
export const emptyState: FState = {
  CommonIds: {"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType","accountId":"accId","createPlanId":"tbd","customerId":"custId","applRef":"appref"},
  tags: {},
  messages: [],
  pageSelection: [{ pageName: 'OccupationAndIncomeSummary', firstTime: true, pageMode: 'view' }],
  OccupationAndIncomeSummary:{},
  restCommands: [],
    debug: { selectedPageDebug: true, fetcherDebug: true }
  }