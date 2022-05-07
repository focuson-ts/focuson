import { OneRestDetails } from "@focuson/rest"
import * as domains from "../PostCodeMainPage/PostCodeMainPage.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function PostCodeMainPage_PostCodeNameAndAddressRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.PostCodeMainPagePageDomain, domains.PostCodeNameAndAddressDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.PostCodeMainPagePageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('PostCodeMainPage'),
//From PostCodeMainPage.rest[address].targetFromPath (~/main). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.PostCodeMainPagePageDomain>().focusQuery('main'),
    cd, fdd,
    ids: [],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/address?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function PostCodeMainPage_PostCodeSearchResponseRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.PostCodeMainPagePageDomain, domains.PostCodeSearchResponseDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.PostCodeMainPagePageDomain> = {postcode: Lenses.identity< domains.PostCodeMainPagePageDomain>().focusQuery('postcode').focusQuery('search')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('PostCodeMainPage'),
//From PostCodeMainPage.rest[postcode].targetFromPath (~/postcode/searchResults). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.PostCodeMainPagePageDomain>().focusQuery('postcode').focusQuery('searchResults'),
    cd, fdd,
    ids: ["dbName","postcode"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/postCode?{query}",
    states : {}
  }
}
