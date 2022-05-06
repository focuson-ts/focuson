import { OneRestDetails } from "@focuson/rest"
import * as domains from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function LinkedAccountDetails_CollectionsListRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.LinkedAccountDetailsPageDomain, domains.CollectionsListDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.LinkedAccountDetailsPageDomain> = {accountId: Lenses.identity< domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('mandate').focusQuery('accountId')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('LinkedAccountDetails'),
//From LinkedAccountDetails.rest[collectionHistoryList].targetFromPath (~/display/collectionHistory). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('collectionHistory'),
    cd, fdd,
    ids: ["accountId","clientRef"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/collections/list?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function LinkedAccountDetails_CollectionSummaryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.LinkedAccountDetailsPageDomain, domains.CollectionSummaryDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.LinkedAccountDetailsPageDomain> = {accountId: Lenses.identity< domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('mandate').focusQuery('accountId')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('LinkedAccountDetails'),
//From LinkedAccountDetails.rest[collectionSummary].targetFromPath (~/display/collectionSummary). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('collectionSummary'),
    cd, fdd,
    ids: ["accountId","clientRef"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/collections/summary?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function LinkedAccountDetails_CollectionItemRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.LinkedAccountDetailsPageDomain, domains.CollectionItemDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.LinkedAccountDetailsPageDomain> = {accountId: Lenses.identity< domains.LinkedAccountDetailsPageDomain>().focusQuery('display').focusQuery('mandate').focusQuery('accountId'),paymentId: Lenses.identity< domains.LinkedAccountDetailsPageDomain>().focusQuery('selectedCollectionItem').focusQuery('paymentId')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('LinkedAccountDetails'),
//From LinkedAccountDetails.rest[payments].targetFromPath (~/selectedCollectionItem). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('selectedCollectionItem'),
    cd, fdd,
    ids: ["accountId","clientRef","paymentId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/payment?{query}",
    states : {"cancel":{"url":"/api/payment/cancel?{query}"},"revalidate":{"url":"/api/payment/revalidate?{query}"}}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function LinkedAccountDetails_MandateListRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.LinkedAccountDetailsPageDomain, domains.MandateListDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.LinkedAccountDetailsPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('LinkedAccountDetails'),
//From LinkedAccountDetails.rest[searchMandate].targetFromPath (~/selectMandateSearch/searchResults). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.LinkedAccountDetailsPageDomain>().focusQuery('selectMandateSearch').focusQuery('searchResults'),
    cd, fdd,
    ids: ["clientRef"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/mandates/allForClient?{query}",
    states : {}
  }
}
