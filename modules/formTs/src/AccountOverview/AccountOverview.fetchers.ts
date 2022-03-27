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
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountAllFlagsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountAllFlagsDomain>(),
     'AccountOverview',
     '~/accountFlags', fdLens, commonIds, localIds,["accountId","customerId"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('accountFlags'),
     '/api/accountOverview/flags?{query}')
}
//fetcher type true
export function currentArrearsDetailsFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ArrearsDetailsDomain>(),
     'AccountOverview',
     '~/arrearsDetailsCurrent', fdLens, commonIds, localIds,["accountId","customerId","startDate"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetailsCurrent'),
     '/api/accountOverview/arrearsDetails/current?{query}')
}
//fetcher type true
export function previousArrearsDetailsFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ArrearsDetailsDomain>(),
     'AccountOverview',
     '~/arrearsDetailsPrevious', fdLens, commonIds, localIds,["accountId","customerId","startDate"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetailsPrevious'),
     '/api/accountOverview/arrearsDetails/previous?{query}')
}
//fetcher type true
export function AccountOverviewHistoryFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewHistoryDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewHistoryDomain>(),
     'AccountOverview',
     '~/excessHistory', fdLens, commonIds, localIds,["accountId","customerId"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessHistory'),
     '/api/accountOverview/excessHistory?{query}')
}
//fetcher type true
export function AccountOverviewExcessInfoFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewExcessInfoDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewExcessInfoDomain>(),
     'AccountOverview',
     '~/excessInfo', fdLens, commonIds, localIds,["accountId","customerId"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessInfo'),
     '/api/accountOverview/excessInfo?{query}')
}
//fetcher type true
export function AccountOverviewFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewDomain>(),
     'AccountOverview',
     '~/main', fdLens, commonIds, localIds,["accountId","customerId"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('main'),
     '/api/accountOverview?{query}')
}
//fetcher type true
export function AccountOverviewReasonFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewReasonDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewReasonDomain>(),
     'AccountOverview',
     '~/reason', fdLens, commonIds, localIds,["accountId","customerId"],[],
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('reason'),
     '/api/accountOverview/reason?{query}')
}