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
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is accountFlags and the path specified is ~/accountFlags
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('accountFlags'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/flags?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_ArrearsDetailsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is arrearsDetailsCurrent and the path specified is ~/arrearsDetailsCurrent
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetailsCurrent'),
    cd, fdd,
    ids: ["accountId","customerId","startDate"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/arrearsDetails/current?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_previous_ArrearsDetailsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is arrearsDetailsPrevious and the path specified is ~/arrearsDetailsPrevious
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetailsPrevious'),
    cd, fdd,
    ids: ["accountId","customerId","startDate"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/arrearsDetails/previous?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewHistoryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewHistoryDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is excessHistory and the path specified is ~/excessHistory
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessHistory'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/excessHistory?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewExcessInfoRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewExcessInfoDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is excessInfo and the path specified is ~/excessInfo
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessInfo'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/excessInfo?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is main and the path specified is ~/main
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('main'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function AccountOverview_AccountOverviewReasonRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewReasonDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is reason and the path specified is ~/reason
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('reason'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/reason?{query}"
  }
}
