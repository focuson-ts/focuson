import { OneRestDetails } from "@focuson/rest"
import * as domains from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function ChequeCreditbooks_ChequeCreditbooksRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ChequeCreditbooksPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('ChequeCreditbooks'),
//From ChequeCreditbooks.rest[chequeCreditBooks].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.ChequeCreditbooksPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId","applRef","brandRef","clientRef"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/chequeCreditBooks?{query}",
    states : {"cancel":{"url":"/api/chequeCreditBooks/cancel?{query}"},"revalidate":{"url":"/api/chequeCreditBooks/revalidate?{query}"}}
  }
}
