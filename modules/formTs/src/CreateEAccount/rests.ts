import { OneRestDetails } from "@focuson/rest"
import * as domains from "./domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function CreateEAccount_CreateEAccountDataDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.CreateEAccountPageDomain, domains.CreateEAccountDataDDDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.CreateEAccountPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.CreateEAccountPageDomain>().focusQuery('editing'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  ["createPlanId"],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/createEAccount/{createPlanId}?{query}"
  }
}
