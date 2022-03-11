import * as common from '../common';
import * as domains from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function OccupationAndIncomeDetailsDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeDetailsDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.OccupationAndIncomeDetailsDDDomain>(),
     'OccupationAndIncomeSummary',
     'fromApi', fdLens, commonIds, {},["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],[],
      Lenses.identity< domains.OccupationAndIncomeSummaryPageDomain> ().focusQuery('fromApi'),
     '/customer/occupation/v2/occupationIncomeDetails?{query}')
}