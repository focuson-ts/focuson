import * as pageDomains from './pageDomains';
import * as domains from './domains';
import * as common from './common';
import { FetcherTree, HasTagHolder, pageAndTagFetcher } from "@focuson/fetcher";
import { TagOps } from "@focuson/template";
import { HasPageSelection, HasSimpleMessages, SimpleMessage } from "@focuson/pages";
export function OccupationAndIncomeFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection & pageDomains.HasOccupationAndIncomeDetailsPageDomain>(tagOps: TagOps<S,common.CommonIds>) {
  return pageAndTagFetcher<S, pageDomains.OccupationAndIncomeDetailsPageDomain, domains.OccupationAndIncomeDomain, SimpleMessage>(
    common.commonFetch<S,  domains.OccupationAndIncomeDomain>(),
     'OccupationAndIncomeDetails',
     'fromApi',
     (s) => s.focusQuery('fromApi'),
     tagOps.tags('customerId'),
     tagOps.getReqFor('/api/oneOccupationAndIncome?{query}',undefined,'customerId'))
}
export function EAccountsSummaryDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection & pageDomains.HasEAccountsSummaryPageDomain>(tagOps: TagOps<S,common.CommonIds>) {
  return pageAndTagFetcher<S, pageDomains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),
     'EAccountsSummary',
     'fromApi',
     (s) => s.focusQuery('fromApi'),
     tagOps.tags('accountId', 'customerId'),
     tagOps.getReqFor('/api/accountsSummary?{query}',undefined,'accountId', 'customerId'))
}
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
   OccupationAndIncomeFetcher<common.FState>(common.commonIdOps),
   EAccountsSummaryDDFetcher<common.FState>(common.commonIdOps)
],
children: []}