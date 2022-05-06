import * as common from '../common';
import * as domains from '../LinkedAccountDetails/LinkedAccountDetails.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function CollectionsListFetcher(fdLens:Optional<FState, domains.LinkedAccountDetailsPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in LinkedAccountDetails.rest[collectionHistoryList].params
  const localIds = {accountId: Lenses.identity< domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('mandate').focusQuery('accountId')}
  return pageAndTagFetcher<FState, domains.LinkedAccountDetailsPageDomain, domains.CollectionsListDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.CollectionsListDomain>(),
     'LinkedAccountDetails',
     '~/display/collectionHistory', fdLens, commonIds, localIds,["accountId","clientRef"],[],
      //From LinkedAccountDetails.rest[collectionHistoryList].targetFromPath ~/display/collectionHistory Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('collectionHistory'),
     '/api/collections/list?{query}')
}
//fetcher type true
export function CollectionSummaryFetcher(fdLens:Optional<FState, domains.LinkedAccountDetailsPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in LinkedAccountDetails.rest[collectionSummary].params
  const localIds = {accountId: Lenses.identity< domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('mandate').focusQuery('accountId')}
  return pageAndTagFetcher<FState, domains.LinkedAccountDetailsPageDomain, domains.CollectionSummaryDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.CollectionSummaryDomain>(),
     'LinkedAccountDetails',
     '~/display/collectionSummary', fdLens, commonIds, localIds,["accountId","clientRef"],[],
      //From LinkedAccountDetails.rest[collectionSummary].targetFromPath ~/display/collectionSummary Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('collectionSummary'),
     '/api/collections/summary?{query}')
}
//fetcher type true
export function MandateListFetcher(fdLens:Optional<FState, domains.LinkedAccountDetailsPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in LinkedAccountDetails.rest[searchMandate].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.LinkedAccountDetailsPageDomain, domains.MandateListDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.MandateListDomain>(),
     'LinkedAccountDetails',
     '~/selectMandateSearch/searchResults', fdLens, commonIds, localIds,["clientRef"],[],
      //From LinkedAccountDetails.rest[searchMandate].targetFromPath ~/selectMandateSearch/searchResults Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('selectMandateSearch').focusQuery('searchResults'),
     '/api/mandates/allForClient?{query}')
}