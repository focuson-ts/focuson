import * as common from '../common';
import * as domains from '../AccountOverview/AccountOverview.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function AccountAllFlagsFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[accountFlags].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountAllFlagsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountAllFlagsDomain>(),
     'AccountOverview',
     '~/accountFlags', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[accountFlags].targetFromPath ~/accountFlags Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('accountFlags'),
     '/api/accountOverview/flags?{query}')
}
//fetcher type true
export function AccountOverviewAgreementTypeFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[agreementType].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewAgreementTypeDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewAgreementTypeDomain>(),
     'AccountOverview',
     '~/agreementType', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[agreementType].targetFromPath ~/agreementType Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('agreementType'),
     '/api/accountOverview/agreementType?{query}')
}
//fetcher type true
export function ArrearsDetailsFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[arrearsDetails].params
  const localIds = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ArrearsDetailsDomain>(),
     'AccountOverview',
     '~/arrearsDetails', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef","startDate"],[],
      //From AccountOverview.rest[arrearsDetails].targetFromPath ~/arrearsDetails Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetails'),
     '/api/accountOverview/arrearsDetails?{query}')
}
//fetcher type true
export function AccountOverviewHistoryFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[excessHistory].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewHistoryDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewHistoryDomain>(),
     'AccountOverview',
     '~/excessHistory', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[excessHistory].targetFromPath ~/excessHistory Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessHistory'),
     '/api/accountOverview/excessHistory?{query}')
}
//fetcher type true
export function AccountOverviewExcessInfoFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[excessInfo].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewExcessInfoDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewExcessInfoDomain>(),
     'AccountOverview',
     '~/excessInfo', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[excessInfo].targetFromPath ~/excessInfo Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessInfo'),
     '/api/accountOverview/excessInfo?{query}')
}
//fetcher type true
export function AccountOverviewFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[main].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewDomain>(),
     'AccountOverview',
     '~/main', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[main].targetFromPath ~/main Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('main'),
     '/api/accountOverview?{query}')
}
//fetcher type true
export function AccountOverviewOptOutFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[optOut].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewOptOutDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewOptOutDomain>(),
     'AccountOverview',
     '~/optOut', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[optOut].targetFromPath ~/optOut Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('optOut'),
     '/api/accountOverview/optOut?{query}')
}
//fetcher type true
export function AccountOverviewReasonFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in AccountOverview.rest[reason].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewReasonDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewReasonDomain>(),
     'AccountOverview',
     '~/reason', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From AccountOverview.rest[reason].targetFromPath ~/reason Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('reason'),
     '/api/accountOverview/reason?{query}')
}