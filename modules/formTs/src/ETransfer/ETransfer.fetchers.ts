import * as common from '../common';
import * as domains from '../ETransfer/ETransfer.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function HolidayDataFetcher(fdLens:Optional<FState, domains.ETransferPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in ETransfer.rest[holidays].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.ETransferPageDomain, domains.HolidayDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.HolidayDataDomain>(),
     'ETransfer',
     '~/holidays', fdLens, commonIds, localIds,[],[],
      //From ETransfer.rest[holidays].targetFromPath ~/holidays Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.ETransferPageDomain>().focusQuery('holidays'),
     '/api/holidays')
}