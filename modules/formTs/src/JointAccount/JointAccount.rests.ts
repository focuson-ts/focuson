import { OneRestDetails } from "@focuson/rest"
import * as domains from "../JointAccount/JointAccount.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function JointAccount_pre_JointAccountRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.JointAccountPageDomain, domains.JointAccountDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.JointAccountPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('JointAccount'),
//From JointAccount.rest[jointAccount].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.JointAccountPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId","brandId","dbName"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/jointAccount?{query}",
    states : {}
  }
}
