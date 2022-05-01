import { OneRestDetails } from "@focuson/rest"
import * as domains from "../AccountOverview/AccountOverview.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountAllFlagsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountAllFlagsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[accountFlags].targetFromPath (~/accountFlags). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('accountFlags'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/flags?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewAgreementTypeRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewAgreementTypeDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[agreementType].targetFromPath (~/agreementType). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('agreementType'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/agreementType?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_ArrearsDetailsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[arrearsDetails].targetFromPath (~/arrearsDetails). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetails'),
    cd, fdd,
    ids: ["accountId","customerId","startDate"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/arrearsDetails?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewHistoryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewHistoryDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[excessHistory].targetFromPath (~/excessHistory). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessHistory'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/excessHistory?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewExcessInfoRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewExcessInfoDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[excessInfo].targetFromPath (~/excessInfo). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessInfo'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/excessInfo?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[main].targetFromPath (~/main). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('main'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewOptOutRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewOptOutDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[optOut].targetFromPath (~/optOut). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('optOut'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/optOut?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewReasonRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewReasonDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//From AccountOverview.rest[reason].targetFromPath (~/reason). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('reason'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/reason?{query}",
    states : {}
  }
}
