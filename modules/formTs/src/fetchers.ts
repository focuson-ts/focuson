import * as pageDomains from './pageDomains';
import * as domains from './domains';
import * as common from './common';
import { FetcherTree,  } from "@focuson/fetcher";
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { commonIds, identityL } from './common';
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type get
export function OccupationAndIncomeDetailsDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, pageDomains.OccupationAndIncomeSummaryPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, pageDomains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeDetailsDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.OccupationAndIncomeDetailsDDDomain>(),
     'OccupationAndIncomeSummary',
     'fromApi', fdLens, commonIds, {},["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],[],
      Lenses.identity< pageDomains.OccupationAndIncomeSummaryPageDomain> ().focusQuery ( 'fromApi' ),
     '/customer/occupation/v2/occupationIncomeDetails?{query}')
}
//fetcher type get
export function EAccountsSummaryDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, pageDomains.EAccountsSummaryPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, pageDomains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),
     'EAccountsSummary',
     'fromApi', fdLens, commonIds, {},["accountId"],["customerId"],
      Lenses.identity< pageDomains.EAccountsSummaryPageDomain> ().focusQuery ( 'fromApi' ),
     '/api/accountsSummary?{query}')
}
//fetcher type get
export function ChequeCreditbooksDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, pageDomains.ChequeCreditbooksPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, pageDomains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.ChequeCreditbooksDDDomain>(),
     'ChequeCreditbooks',
     'fromApi', fdLens, commonIds, {},["accountId","applRef","brandRef","customerId"],[],
      Lenses.identity< pageDomains.ChequeCreditbooksPageDomain> ().focusQuery ( 'fromApi' ),
     '/api/chequeCreditBooks?{query}')
}
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
    OccupationAndIncomeDetailsDDFetcher<common.FState> ( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    EAccountsSummaryDDFetcher<common.FState> ( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    ChequeCreditbooksDDFetcher<common.FState> ( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds )
],
children: []}