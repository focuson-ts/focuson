import { OneRestDetails } from "@focuson/rest"
import * as domains from "./domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeDetailsDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationIncomeDetails?{query}"
  }
}
