import * as common from '../common';
import * as domains from '../PostCodeDemo/PostCodeDemo.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function PostCodeDataFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.PostCodeDemoPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage>(
    common.commonFetch<S,  domains.PostCodeDataDomain>(),
     'PostCodeDemo',
     'postcode_searchResults', fdLens, commonIds, {},["customerId"],[],
      Lenses.identity< domains.PostCodeDemoPageDomain> ().focusQuery('postcode').focusQuery('searchResults'),
     '/api/postCode?{query}')
}