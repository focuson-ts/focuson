import * as common from '../common';
import * as domains from '../PostCodeDemo/PostCodeDemo.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function PostCodeDataFetcher(fdLens:Optional<FState, domains.PostCodeDemoPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {postcode: Lenses.identity< domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('search')}
  return pageAndTagFetcher<FState, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.PostCodeDataDomain>(),
     'PostCodeDemo',
     '~/postcode/searchResults', fdLens, commonIds, localIds,["postcode"],[],
      Lenses.identity<domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('searchResults'),
     '/api/postCode?{query}')
}