import * as common from '../common';
import * as domains from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function OccupationAndIncomeDetailsDDFetcher(fdLens:Optional<FState, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeDetailsDDDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.OccupationAndIncomeDetailsDDDomain>(),
     'OccupationAndIncomeSummary',
     'fromApi', fdLens, commonIds, localIds,["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],[],
      Lenses.identity< domains.OccupationAndIncomeSummaryPageDomain> ().focusQuery('fromApi'),
     '/customer/occupation/v2/occupationIncomeDetails?{query}')
}