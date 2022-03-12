import { OneRestDetails } from "@focuson/rest"
import * as domains from "../PostCodeDemo/PostCodeDemo.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function PostCodeDemo_PostCodeDataRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.PostCodeDemoPageDomain> = {}
  return {
    dLens: Lenses.identity<domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('searchResults'),
    cd, fdd,
    ids: ["postcode"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/postCode?{query}"
  }
}
