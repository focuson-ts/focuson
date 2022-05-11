import * as common from '../common';
import * as domains from '../ListOfPaymentsPage/ListOfPaymentsPage.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function PrintRecordHistoryFetcher(fdLens:Optional<FState, domains.ListOfPaymentsPagePageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in ListOfPaymentsPage.rest[paymentHistory].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.ListOfPaymentsPagePageDomain, domains.PrintRecordHistoryDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.PrintRecordHistoryDomain>(),
     'ListOfPaymentsPage',
     '~/display', fdLens, commonIds, localIds,["accountId"],[],
      //From ListOfPaymentsPage.rest[paymentHistory].targetFromPath ~/display Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.ListOfPaymentsPagePageDomain>().focusQuery('display'),
     '/api/printrecordhistory?{query}')
}