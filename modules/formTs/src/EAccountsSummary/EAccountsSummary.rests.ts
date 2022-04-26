import { OneRestDetails } from "@focuson/rest"
import * as domains from "../EAccountsSummary/EAccountsSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function EAccountsSummary_CreatePlanRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.CreatePlanDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is createPlanRestD and the path specified is ~/tempCreatePlan
    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  ["createPlanId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/createPlan?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function EAccountsSummary_EAccountsSummaryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is eAccountsSummary and the path specified is ~/fromApi
    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId"],
    resourceId:  ["customerId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountsSummary?{query}"
  }
}
