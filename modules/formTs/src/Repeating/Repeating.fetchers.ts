import * as common from '../common';
import * as domains from '../Repeating/Repeating.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function RepeatingWholeDataFetcher(fdLens:Optional<FState, domains.RepeatingPageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in Repeating.rest[repeating].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.RepeatingWholeDataDomain>(),
     'Repeating',
     '~/fromApi', fdLens, commonIds, localIds,["clientRef"],[],
      //From Repeating.rest[repeating].targetFromPath ~/fromApi Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),
     '/api/repeating?{query}')
}