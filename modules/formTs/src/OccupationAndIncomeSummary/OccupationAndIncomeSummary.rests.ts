import { OneRestDetails } from "@focuson/rest"
import * as domains from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeDetailsDDDomain, SimpleMessage> {
  const paramNameToLens = {...cd,postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')}
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  const localIds = {}
  return {
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('fromApi'),
    cd: paramNameToLens, fdd,
    ids: ["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationIncomeDetails?{query}"
  }
}

export function OccupationAndIncomeSummary_OtherIncomeResponseDDRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OtherIncomeResponseDDDomain, SimpleMessage> {
  const paramNameToLens = {...cd,postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')}
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  const localIds = {}
  return {
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('other'),
    cd: paramNameToLens, fdd,
    ids: ["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/otherIncome?{query}"
  }
}
