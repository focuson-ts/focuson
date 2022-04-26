import { OneRestDetails } from "@focuson/rest"
import * as domains from "../JointAccount/JointAccount.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function JointAccount_JointAccountRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.JointAccountPageDomain, domains.JointAccountDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.JointAccountPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('JointAccount'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is jointAccount and the path specified is ~/fromApi
    dLens: Lenses.identity<domains.JointAccountPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId","brandId","dbName"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/jointAccount?{query}"
  }
}
