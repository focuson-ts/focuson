import * as common from '../common';
import * as domains from '../ChequeCreditbooks/ChequeCreditbooks.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function ChequeCreditbooksFetcher(fdLens:Optional<FState, domains.ChequeCreditbooksPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.ChequeCreditbooksDomain>(),
     'ChequeCreditbooks',
     '~/fromApi', fdLens, commonIds, localIds,["accountId","applRef","brandRef","customerId"],[],
      //From ChequeCreditbooks.rest[chequeCreditBooks].targetFromPath ~/fromApi Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.ChequeCreditbooksPageDomain>().focusQuery('fromApi'),
     '/api/chequeCreditBooks?{query}')
}