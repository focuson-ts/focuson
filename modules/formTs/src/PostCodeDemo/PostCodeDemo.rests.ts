import { OneRestDetails } from "@focuson/rest"
import * as domains from "../PostCodeDemo/PostCodeDemo.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function PostCodeDemo_PostCodeNameAndAddressRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.PostCodeDemoPageDomain, domains.PostCodeNameAndAddressDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.PostCodeDemoPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('PostCodeDemo'),
    dLens: Lenses.identity<domains.PostCodeDemoPageDomain>().focusQuery('main'),
    cd, fdd,
    ids: [],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/address?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function PostCodeDemo_PostCodeDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.PostCodeDemoPageDomain> = {postcode: Lenses.identity< domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('search')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('PostCodeDemo'),
    dLens: Lenses.identity<domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('searchResults'),
    cd, fdd,
    ids: ["postcode"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/postCode?{query}"
  }
}
