import { OneRestDetails } from "@focuson/rest"
import * as domains from "../ETransfer/ETransfer.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function ETransfer_ETransferDataDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.ETransferPageDomain, domains.ETransferDataDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ETransferPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('ETransfer'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is eTransfer and the path specified is ~/fromApi
    dLens: Lenses.identity<domains.ETransferPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/eTransfers?{query}"
  }
}
