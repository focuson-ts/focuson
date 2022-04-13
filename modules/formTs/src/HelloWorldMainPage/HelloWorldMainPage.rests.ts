import { OneRestDetails } from "@focuson/rest"
import * as domains from "../HelloWorldMainPage/HelloWorldMainPage.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function HelloWorldMainPage_HelloWorldDomainDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.HelloWorldMainPagePageDomain, domains.HelloWorldDomainDataDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.HelloWorldMainPagePageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('HelloWorldMainPage'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is restDataRD and the path specified is ~/fromApi
    dLens: Lenses.identity<domains.HelloWorldMainPagePageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: [],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/helloWorld?{query}"
  }
}
