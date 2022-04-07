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
  const localIds = {}
  return pageAndTagFetcher<FState, domains.HelloWorldMainPagePageDomain, domains.HelloWorldDomainDataDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.HelloWorldDomainDataDomain>(),
     'HelloWorldMainPage',
     '~/fromApi', fdLens, commonIds, localIds,[],[],
      Lenses.identity<domains.HelloWorldMainPagePageDomain>().focusQuery('fromApi'),
     '/helloWorld?{query}')
}