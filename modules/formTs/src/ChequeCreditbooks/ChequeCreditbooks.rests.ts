import { OneRestDetails } from "@focuson/rest"
import * as domains from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function ChequeCreditbooks_ChequeCreditbooksHistoryDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksHistoryDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ChequeCreditbooksPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.ChequeCreditbooksPageDomain>().focusQuery('temp'),
    cd, fdd,
    ids: ["accountId","applRef","brandRef","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/chequeCreditBooks?{query}"
  }
}
