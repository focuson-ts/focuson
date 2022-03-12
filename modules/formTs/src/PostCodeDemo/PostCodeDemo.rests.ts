import { OneRestDetails } from "@focuson/rest"
import * as domains from "../PostCodeDemo/PostCodeDemo.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

export function PostCodeDemo_PostCodeDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage> {
  const paramNameToLens = {...cd,postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')}
  const fdd: NameAndLens<domains.PostCodeDemoPageDomain> = {}
  const localIds = {postcode: Lenses.identity< domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('search')}
  return {
    dLens: Lenses.identity<domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('searchResults'),
    cd: paramNameToLens, fdd,
    ids: ["postcode"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/postCode?{query}"
  }
}
