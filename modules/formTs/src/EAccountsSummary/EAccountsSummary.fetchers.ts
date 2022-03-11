import * as common from '../common';
import * as domains from '../EAccountsSummary/EAccountsSummary.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function EAccountsSummaryDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.EAccountsSummaryPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),
     'EAccountsSummary',
     'fromApi', fdLens, commonIds, {},["accountId"],["customerId"],
      Lenses.identity< domains.EAccountsSummaryPageDomain> ().focusQuery ( 'fromApi' ),
     '/api/accountsSummary?{query}')
}