import { OneRestDetails } from "@focuson/rest"
import * as domains from "../CreateEAccount/CreateEAccount.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function CreateEAccount__CreateEAccountDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.CreateEAccountPageDomain, domains.CreateEAccountDataDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.CreateEAccountPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('CreateEAccount'),
    dLens: Lenses.identity<domains.CreateEAccountPageDomain>().focusQuery('editing'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  ["createPlanId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/createEAccount/?{query}"
  }
}
