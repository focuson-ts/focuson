import * as common from '../common';
import * as domains from '../ChequeCreditbooks/ChequeCreditbooks.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function ChequeCreditbooksDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<FState, domains.ChequeCreditbooksPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDDDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ChequeCreditbooksDDDomain>(),
     'ChequeCreditbooks',
     'fromApi', fdLens, commonIds, localIds,["accountId","applRef","brandRef","customerId"],[],
      Lenses.identity< domains.ChequeCreditbooksPageDomain> ().focusQuery('fromApi'),
     '/api/chequeCreditBooks?{query}')
}