import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'
import { defaultDateFn, HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import {  OnTagFetchErrorFn } from '@focuson/fetcher';
import { identityOptics } from '@focuson/lens';
import { HasTagHolder, NameAndLens } from '@focuson/template';
import { HasPostCommand } from '@focuson/poster';
import { commonTagFetchProps, defaultPageSelectionAndPostCommandsContext, PageSelectionAndPostCommandsContext, HasFocusOnDebug } from '@focuson/focuson';
import { LensProps } from '@focuson/state';
import { pages } from "./pages";
import * as pageDomains from './pageDomains';
export type Context = PageSelectionAndPostCommandsContext<FState>
export const context: Context = defaultPageSelectionAndPostCommandsContext<FState> ( pages )
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasPostCommand<FState,any>,HasFocusOnDebug,
 pageDomains.HasOccupationAndIncomeDetailsPageDomain,
 pageDomains.HasEAccountsSummaryPageDomain,
 pageDomains.HasETransferPageDomain,
 pageDomains.HasCreateEAccountPageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
customerId?:string;
accountId?:string;
createPlanId?:string;
}
export const identityL = identityOptics<FState> ();
export const commonIdsL = identityL.focusQuery('CommonIds');
export const commonIds: NameAndLens<FState> = {
   customerId: commonIdsL.focusQuery('customerId'),
   accountId: commonIdsL.focusQuery('accountId'),
   createPlanId: commonIdsL.focusQuery('createPlanId')
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
  CommonIds: {"customerId":"custId","accountId":"accId","createPlanId":"tbd"},
  tags: {},
  messages: [],
  pageSelection: [{ pageName: 'OccupationAndIncomeDetails', firstTime: true, pageMode: 'view' }],
  OccupationAndIncomeDetails:{},
  postCommands: [],
    debug: { selectedPageDebug: true, fetcherDebug: true }
  }