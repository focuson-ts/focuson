import * as common from '../common';
import * as domains from '../Repeating/Repeating.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function RepeatingWholeDataFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<FState, domains.RepeatingPageDomain>,commonIds: NameAndLens<FState>) {
  const ids = {...commonIds}
  return pageAndTagFetcher<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.RepeatingWholeDataDomain>(),
     'Repeating',
     'fromApi', fdLens, ids, {},["customerId"],[],
      Lenses.identity< domains.RepeatingPageDomain> ().focusQuery('fromApi'),
     '/api/repeating?{query}')
}