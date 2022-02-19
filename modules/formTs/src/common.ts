import {HasSimpleMessages, SimpleMessage, HasPageSelection} from '@focuson/pages'
import { LensState } from '@focuson/state';
import { defaultDateFn } from '@focuson/utils';
import { commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn } from '@focuson/fetcher';
import { Lens, Lenses } from '@focuson/lens';


import { tagOps } from '@focuson/template';
import * as pageDomains from './pageDomains';
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,
 pageDomains.HasEAccountsSummaryPageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
accountId?:string;
customerId?:string;
}
export const commonIdLens = Lenses.identity<FState> ().focusOn ( 'CommonIds' )
export const commonIdOps = tagOps ( commonIdLens, { failSilently: false } )
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}