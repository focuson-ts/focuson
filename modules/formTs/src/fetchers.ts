import * as pageDomains from './pageDomains';
import * as domains from './domains';
import * as common from './common';
import { FetcherTree, HasTagHolder, pageAndTagFetcher } from "@focuson/fetcher";
import { TagOps } from "@focuson/template";
import { HasPageSelection, HasSimpleMessages, SimpleMessage } from "@focuson/pages";
export function EAccountsSummaryDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection & pageDomains.HasEAccountsSummaryPageDomain>(tagOps: TagOps<S,common.CommonIds>) {
  return pageAndTagFetcher<S, pageDomains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),
     'eAccountsSummary',
     'fromApi',
     (s) => s.focusQuery('fromApi'),
     tagOps.tags('accountId', 'customerId'),
     tagOps.getReqFor('/api/accountsSummary?{query}',undefined,'accountId', 'customerId'))
}
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
   EAccountsSummaryDDFetcher<common.FState>(common.commonIdOps)
],
children: []}