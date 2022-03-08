import { OneRestDetails } from "@focuson/rest"
import * as domains from "./domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function ChequeCreditbooks_ChequeCreditbooksDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ChequeCreditbooksPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.ChequeCreditbooksPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId","applRef","brandRef","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/chequeCreditBooks?{query}"
  }
}
