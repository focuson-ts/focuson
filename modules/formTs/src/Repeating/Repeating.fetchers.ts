import * as common from '../common';
import * as domains from '../Repeating/Repeating.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function RepeatingWholeDataFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.RepeatingPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage>(
    common.commonFetch<S,  domains.RepeatingWholeDataDomain>(),
     'Repeating',
     'fromApi', fdLens, commonIds, {},["customerId"],[],
      Lenses.identity< domains.RepeatingPageDomain> ().focusQuery ( 'fromApi' ),
     '/api/repeating?{query}')
}