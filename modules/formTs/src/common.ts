import { HasPageSelection, HasSelectedModalPage, HasSimpleMessages, SimpleMessage, PageMode } from '@focuson/pages'
import { defaultDateFn } from '@focuson/utils';
import { commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn } from '@focuson/fetcher';
import { Lenses } from '@focuson/lens';
import { tagOps } from '@focuson/template';
import { HasPostCommand } from '@focuson/poster';
import { HasFocusOnDebug } from '@focuson/focuson';
import { LensProps } from '@focuson/state';
import * as pageDomains from './pageDomains';
export type Context = {}
export const context: Context = {}
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasSelectedModalPage,HasPostCommand<FState,any>,HasFocusOnDebug,
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
export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{
  mode: PageMode;
}
export const commonIdLens = Lenses.identity<FState> ().focusOn ( 'CommonIds' )
export const commonIdOps = tagOps ( commonIdLens, { failSilently: false } )
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
export const emptyState: FState = {
  CommonIds: {"customerId":"custId","accountId":"accId","createPlanId":"tbd"},
  tags: {},
  messages: [],
  pageSelection: { pageName: 'OccupationAndIncomeDetails', firstTime: true, pageMode: 'view' },
  OccupationAndIncomeDetails:{},
  postCommands: [],
    debug: { selectedPageDebug: true, fetcherDebug: true }
  }