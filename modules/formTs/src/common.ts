import { HasPageSelection, HasSelectedModalPage, HasSimpleMessages, SimpleMessage } from '@focuson/pages'
import { defaultDateFn } from '@focuson/utils';
import { commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn } from '@focuson/fetcher';
import { Lenses } from '@focuson/lens';
import { tagOps } from '@focuson/template';
import { HasPostCommand } from '@focuson/poster';
import { HasFocusOnDebug } from '@focuson/focuson';
import * as pageDomains from './pageDomains';
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasSelectedModalPage,HasPostCommand<FState,any>,HasFocusOnDebug,
 pageDomains.HasEAccountsSummaryPageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
accountId?:string;
createPlanId?:string;
customerId?:string;
}
export const commonIdLens = Lenses.identity<FState> ().focusOn ( 'CommonIds' )
export const commonIdOps = tagOps ( commonIdLens, { failSilently: false } )
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
export const emptyState: FState = {
  CommonIds: {"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
  tags: {},
  messages: [],
  pageSelection: { pageName: 'eAccountsSummary' },
  eAccountsSummary:{},
  postCommands: [],
    debug: { selectedPageDebug: true, fetcherDebug: true }
  }