import * as common from '../common';
import * as domains from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function AdditionalInfoFirstFetcher(fdLens:Optional<FState, domains.MainOccupationDetailsPageSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.AdditionalInfoFirstDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AdditionalInfoFirstDomain>(),
     'MainOccupationDetailsPageSummary',
     '~/fromApi/additionalInfoFirst', fdLens, commonIds, localIds,["customerId"],[],
      Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('additionalInfoFirst'),
     '/customer/occupation/v2/additionalInfoFirst?{query}')
}
//fetcher type true
export function AdditionalInfoSecondFetcher(fdLens:Optional<FState, domains.MainOccupationDetailsPageSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.AdditionalInfoSecondDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.AdditionalInfoSecondDomain>(),
     'MainOccupationDetailsPageSummary',
     '~/fromApi/additionalInfoSecond', fdLens, commonIds, localIds,["customerId"],[],
      Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('additionalInfoSecond'),
     '/customer/occupation/v2/additionalInfoSecond?{query}')
}
//fetcher type true
export function OccupationAndIncomeFullDomainFetcher(fdLens:Optional<FState, domains.MainOccupationDetailsPageSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OccupationAndIncomeFullDomainDomain>(),
     'MainOccupationDetailsPageSummary',
     '~/fromApi/occupationAndIncome', fdLens, commonIds, localIds,["customerId"],[],
      Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('occupationAndIncome'),
     '/customer/occupation/v2/occupationIncomeDetails?{query}')
}
//fetcher type true
export function ListOccupationsFetcher(fdLens:Optional<FState, domains.MainOccupationDetailsPageSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.ListOccupationsDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ListOccupationsDomain>(),
     'MainOccupationDetailsPageSummary',
     '~/fromApi/occupationsList', fdLens, commonIds, localIds,["customerId"],[],
      Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('occupationsList'),
     '/customer/occupation/v2/occupationsList?{query}')
}
//fetcher type true
export function OtherIncomeResponseFetcher(fdLens:Optional<FState, domains.MainOccupationDetailsPageSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OtherIncomeResponseDomain>(),
     'MainOccupationDetailsPageSummary',
     '~/fromApi/otherSourcesOfIncome', fdLens, commonIds, localIds,["customerId"],[],
      Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('otherSourcesOfIncome'),
     '/customer/occupation/v2/otherIncome?{query}')
}