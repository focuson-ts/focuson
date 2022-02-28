import { OneRestDetails, RestDetails } from "@focuson/rest"
import { NameAndLens } from "@focuson/template"
import * as pageDomains from "./pageDomains"
import * as domains from "./domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses } from "@focuson/lens"
import { commonIds, FState } from "./common";

export function OccupationAndIncomeDetails_OccupationAndIncomeRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.OccupationAndIncomeDetailsPageDomain, domains.OccupationAndIncomeDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.OccupationAndIncomeDetailsPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.OccupationAndIncomeDetailsPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/oneOccupationAndIncome?{query}"
  }
}

export function EAccountsSummary_CreatePlanDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.EAccountsSummaryPageDomain, domains.CreatePlanDDDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.EAccountsSummaryPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  ["createPlanId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/createPlan/{createPlanId}?{query}"
  }
}

export function EAccountsSummary_EAccountsSummaryDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.EAccountsSummaryPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId"],
    resourceId:  ["customerId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountsSummary?{query}"
  }
}

export function ETransfer_ETransferDataDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.ETransferPageDomain, domains.ETransferDataDDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.ETransferPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.ETransferPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/eTransfers?{query}"
  }
}

export function CreateEAccount_CreateEAccountDataDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.CreateEAccountPageDomain, domains.CreateEAccountDataDDDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.CreateEAccountPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.CreateEAccountPageDomain>().focusQuery('editing'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  ["createPlanId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/createEAccount/{createPlanId}?{query}"
  }
}

export const restDetails: RestDetails<FState, SimpleMessage> = {
   OccupationAndIncomeDetails_OccupationAndIncomeRestDetails: OccupationAndIncomeDetails_OccupationAndIncomeRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_CreatePlanDDRestDetails: EAccountsSummary_CreatePlanDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_EAccountsSummaryDDRestDetails: EAccountsSummary_EAccountsSummaryDDRestDetails(commonIds, defaultDateFn),
   ETransfer_ETransferDataDRestDetails: ETransfer_ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount_CreateEAccountDataDDRestDetails: CreateEAccount_CreateEAccountDataDDRestDetails(commonIds, defaultDateFn)

}
