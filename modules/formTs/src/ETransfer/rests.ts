import { OneRestDetails } from "@focuson/rest"
import * as domains from "./domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function ETransfer_ETransferDataDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.ETransferPageDomain, domains.ETransferDataDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ETransferPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.ETransferPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/eTransfers?{query}"
  }
}
