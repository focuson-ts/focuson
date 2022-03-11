import { OneRestDetails } from "@focuson/rest"
import * as domains from "../Repeating/Repeating.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function Repeating_RepeatingWholeDataRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.RepeatingPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/repeating?{query}"
  }
}
