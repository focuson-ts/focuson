import * as common from '../common';
import * as domains from '../HelloWorldMainPage/HelloWorldMainPage.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function HelloWorldDomainDataFetcher(fdLens:Optional<FState, domains.HelloWorldMainPagePageDomain>,commonIds: NameAndLens<FState>) {
//If you have a compilation here it might be because of the 'local' params in HelloWorldMainPage.rest[restDataRD].params
  const localIds = {}
  return pageAndTagFetcher<FState, domains.HelloWorldMainPagePageDomain, domains.HelloWorldDomainDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.HelloWorldDomainDataDomain>(),
     'HelloWorldMainPage',
     '~/fromApi', fdLens, commonIds, localIds,[],[],
      //From HelloWorldMainPage.rest[restDataRD].targetFromPath ~/fromApi Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
      Lenses.identity<domains.HelloWorldMainPagePageDomain>().focusQuery('fromApi'),
     '/helloWorld?{query}')
}