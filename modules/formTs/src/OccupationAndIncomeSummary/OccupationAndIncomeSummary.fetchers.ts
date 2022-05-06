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
//If you have a compilation here it might be because of the 'local' params in OccupationAndIncomeSummary.rest[additionalInformationRD].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.AdditionalInformationDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AdditionalInformationDomain>(),
     'OccupationAndIncomeSummary',
     '~/additionalInformation', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From OccupationAndIncomeSummary.rest[additionalInformationRD].targetFromPath ~/additionalInformation Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('additionalInformation'),
     '/customer/occupation/v2/additionalInfo?{query}')
}
//fetcher type true
export function BusinessDetailsMainFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in OccupationAndIncomeSummary.rest[businessDetailsRD].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.BusinessDetailsMainDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.BusinessDetailsMainDomain>(),
     'OccupationAndIncomeSummary',
     '~/businessDetails', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From OccupationAndIncomeSummary.rest[businessDetailsRD].targetFromPath ~/businessDetails Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('businessDetails'),
     '/customer/occupation/v2/businessDetails?{query}')
}
//fetcher type true
export function DropdownsFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in OccupationAndIncomeSummary.rest[dropdownsRD].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.DropdownsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.DropdownsDomain>(),
     'OccupationAndIncomeSummary',
     '~/dropdowns', fdLens, commonIds, localIds,[],[],
      //From OccupationAndIncomeSummary.rest[dropdownsRD].targetFromPath ~/dropdowns Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('dropdowns'),
     '/customer/occupation/v2/occupationDetails?{query}')
}
//fetcher type true
export function OccupationAndIncomeFullDomainFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in OccupationAndIncomeSummary.rest[occupationAndIncomeRD].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OccupationAndIncomeFullDomainDomain>(),
     'OccupationAndIncomeSummary',
     '~/fromApi', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From OccupationAndIncomeSummary.rest[occupationAndIncomeRD].targetFromPath ~/fromApi Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('fromApi'),
     '/customer/occupation/v2/occupationIncomeDetails?{query}')
}
//fetcher type true
export function OtherIncomeResponseFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in OccupationAndIncomeSummary.rest[otherSourcesOfIncomeRD].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OtherIncomeResponseDomain>(),
     'OccupationAndIncomeSummary',
     '~/otherSourcesOfIncome', fdLens, commonIds, localIds,["accountId","applRef","brandRef","clientRef"],[],
      //From OccupationAndIncomeSummary.rest[otherSourcesOfIncomeRD].targetFromPath ~/otherSourcesOfIncome Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('otherSourcesOfIncome'),
     '/customer/occupation/v2/otherIncome?{query}')
}