import { OneRestDetails } from "@focuson/rest"
import * as domains from "../Repeating/Repeating.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function Repeating__RepeatingWholeDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.RepeatingPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('Repeating'),
    dLens: Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/repeating?{query}"
  }
}
