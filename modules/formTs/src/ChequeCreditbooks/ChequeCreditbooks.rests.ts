import { OneRestDetails } from "@focuson/rest"
import * as domains from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"
export function ChequeCreditbooks_ChequeCreditbooksDDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ChequeCreditbooksPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('ChequeCreditbooks'),
    dLens: Lenses.identity<domains.ChequeCreditbooksPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId","applRef","brandRef","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/chequeCreditBooks?{query}"
  }
}
