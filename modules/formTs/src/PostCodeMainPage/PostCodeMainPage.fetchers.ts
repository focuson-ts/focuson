import * as common from '../common';
import * as domains from '../PostCodeMainPage/PostCodeMainPage.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function PostCodeDataFetcher(fdLens:Optional<FState, domains.PostCodeMainPagePageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {postcode: Lenses.identity< domains.PostCodeMainPagePageDomain>().focusQuery('postcode').focusQuery('search')}
  return pageAndTagFetcher<FState, domains.PostCodeMainPagePageDomain, domains.PostCodeDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.PostCodeDataDomain>(),
     'PostCodeMainPage',
     '~/postcode/searchResults', fdLens, commonIds, localIds,["postcode"],[],
      //From PostCodeMainPage.rest[postcode].targetFromPath ~/postcode/searchResults Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.PostCodeMainPagePageDomain>().focusQuery('postcode').focusQuery('searchResults'),
     '/api/postCode?{query}')
}