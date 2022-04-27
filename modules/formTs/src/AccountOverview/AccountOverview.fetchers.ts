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
      //From AccountOverview.display.targetFromPath ~/accountFlags
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('accountFlags'),
     '/api/accountOverview/flags?{query}')
}
//fetcher type true
export function AccountOverviewAgreementTypeFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewAgreementTypeDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewAgreementTypeDomain>(),
     'AccountOverview',
     '~/agreementType', fdLens, commonIds, localIds,["accountId","customerId"],[],
      //From AccountOverview.display.targetFromPath ~/agreementType
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('agreementType'),
     '/api/accountOverview/agreementType?{query}')
}
//fetcher type true
export function ArrearsDetailsFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ArrearsDetailsDomain>(),
     'AccountOverview',
     '~/arrearsDetails', fdLens, commonIds, localIds,["accountId","customerId","startDate"],[],
      //From AccountOverview.display.targetFromPath ~/arrearsDetails
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetails'),
     '/api/accountOverview/arrearsDetails?{query}')
}
//fetcher type true
export function AccountOverviewHistoryFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewHistoryDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewHistoryDomain>(),
     'AccountOverview',
     '~/excessHistory', fdLens, commonIds, localIds,["accountId","customerId"],[],
      //From AccountOverview.display.targetFromPath ~/excessHistory
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
      //From AccountOverview.display.targetFromPath ~/excessInfo
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
      //From AccountOverview.display.targetFromPath ~/main
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('main'),
     '/api/accountOverview?{query}')
}
//fetcher type true
export function AccountOverviewOptOutFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewOptOutDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewOptOutDomain>(),
     'AccountOverview',
     '~/optOut', fdLens, commonIds, localIds,["accountId","customerId"],[],
      //From AccountOverview.display.targetFromPath ~/optOut
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('optOut'),
     '/api/accountOverview/optOut?{query}')
}
//fetcher type true
export function AccountOverviewReasonFetcher(fdLens:Optional<FState, domains.AccountOverviewPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewReasonDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AccountOverviewReasonDomain>(),
     'AccountOverview',
     '~/reason', fdLens, commonIds, localIds,["accountId","customerId"],[],
      //From AccountOverview.display.targetFromPath ~/reason
      Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('reason'),
     '/api/accountOverview/reason?{query}')
}