import { OneRestDetails, RestDetails } from "@focuson/rest"
import * as pageDomains from "./pageDomains"
import * as domains from "./domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"
import { commonIds, FState } from "./common";

export function OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeDetailsDDDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.OccupationAndIncomeSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationIncomeDetails?{query}"
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

export function ChequeCreditbooks_ChequeCreditbooksDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, pageDomains.ChequeCreditbooksPageDomain, domains.ChequeCreditbooksDDDomain, SimpleMessage> {
  const fdd: NameAndLens<pageDomains.ChequeCreditbooksPageDomain> = {}
  return {
    dLens: Lenses.identity<pageDomains.ChequeCreditbooksPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountId","applRef","brandRef","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/chequeCreditBooks?{query}"
  }
}

export const restDetails: RestDetails<FState, SimpleMessage> = {
   OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails: OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_CreatePlanDDRestDetails: EAccountsSummary_CreatePlanDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_EAccountsSummaryDDRestDetails: EAccountsSummary_EAccountsSummaryDDRestDetails(commonIds, defaultDateFn),
   ETransfer_ETransferDataDRestDetails: ETransfer_ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount_CreateEAccountDataDDRestDetails: CreateEAccount_CreateEAccountDataDDRestDetails(commonIds, defaultDateFn),
   ChequeCreditbooks_ChequeCreditbooksDDRestDetails: ChequeCreditbooks_ChequeCreditbooksDDRestDetails(commonIds, defaultDateFn)

}
