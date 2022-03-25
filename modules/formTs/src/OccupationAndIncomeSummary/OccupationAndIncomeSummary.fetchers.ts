import * as common from '../common';
import * as domains from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function AdditionalInformationFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.AdditionalInformationDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AdditionalInformationDomain>(),
     'OccupationAndIncomeSummary',
     '~/additionalInformation', fdLens, commonIds, localIds,["customerId"],[],
      lens: pageState - ~/additionalInformation,
     '/customer/occupation/v2/additionalInfo?{query}')
}
//fetcher type true
export function BusinessDetailsMainFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.BusinessDetailsMainDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.BusinessDetailsMainDomain>(),
     'OccupationAndIncomeSummary',
     '~/businessDetails', fdLens, commonIds, localIds,["customerId"],[],
      lens: pageState - ~/businessDetails,
     '/customer/occupation/v2/businessDetails?{query}')
}
//fetcher type true
export function DropdownsFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.DropdownsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.DropdownsDomain>(),
     'OccupationAndIncomeSummary',
     '!/dropdowns', fdLens, commonIds, localIds,["customerId"],[],
      lens: pageState - !/dropdowns,
     '/customer/occupation/v2/occupationDetails?{query}')
}
//fetcher type true
export function OccupationAndIncomeFullDomainFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OccupationAndIncomeFullDomainDomain>(),
     'OccupationAndIncomeSummary',
     '~/fromApi', fdLens, commonIds, localIds,["customerId"],[],
      lens: pageState - ~/fromApi,
     '/customer/occupation/v2/occupationIncomeDetails?{query}')
}
//fetcher type true
export function OtherIncomeResponseFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OtherIncomeResponseDomain>(),
     'OccupationAndIncomeSummary',
     '~/otherSourcesOfIncome', fdLens, commonIds, localIds,["customerId"],[],
      lens: pageState - ~/otherSourcesOfIncome,
     '/customer/occupation/v2/otherIncome?{query}')
}