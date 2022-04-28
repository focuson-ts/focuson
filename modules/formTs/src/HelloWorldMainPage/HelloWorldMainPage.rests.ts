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
//From HelloWorldMainPage.rest[restDataRD].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.HelloWorldMainPagePageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: [],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/helloWorld?{query}"
  }
}
