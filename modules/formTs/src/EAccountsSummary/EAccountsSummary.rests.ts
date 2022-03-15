import { OneRestDetails } from "@focuson/rest"
import * as domains from "../EAccountsSummary/EAccountsSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"
export function EAccountsSummary_CreatePlanDDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.CreatePlanDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),
    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  ["createPlanId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/createPlan/{createPlanId}?{query}"
  }
}

export function EAccountsSummary_EAccountsSummaryDDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),
    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId"],
    resourceId:  ["customerId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountsSummary?{query}"
  }
}
