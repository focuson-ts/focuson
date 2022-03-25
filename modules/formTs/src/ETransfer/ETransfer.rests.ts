import { OneRestDetails } from "@focuson/rest"
import * as domains from "../ETransfer/ETransfer.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"
export function ETransfer_ETransferDataDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.ETransferPageDomain, domains.ETransferDataDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ETransferPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('ETransfer'),
    dLens: Lenses.identity<domains.ETransferPageDomain>()state: fullState - ~/fromApi,
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/eTransfers?{query}"
  }
}
