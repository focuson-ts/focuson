import { OneRestDetails } from "@focuson/rest"
import * as domains from "../ListOfPaymentsPage/ListOfPaymentsPage.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function ListOfPaymentsPage_PrintRecordHistoryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.ListOfPaymentsPagePageDomain, domains.PrintRecordHistoryDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.ListOfPaymentsPagePageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('ListOfPaymentsPage'),
//From ListOfPaymentsPage.rest[paymentHistory].targetFromPath (~/display). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.ListOfPaymentsPagePageDomain>().focusQuery('display'),
    cd, fdd,
    ids: ["accountId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/printrecordhistory?{query}",
    states : {}
  }
}
