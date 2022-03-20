import { OneRestDetails } from "@focuson/rest"
import * as domains from "../AccountOverview/AccountOverview.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"
export function AccountOverview_AccountAllFlagsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountAllFlagsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('accountFlags'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/flags?{query}"
  }
}

export function AccountOverview_ArrearsDetailsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.ArrearsDetailsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {startDate: Lenses.identity< domains.AccountOverviewPageDomain>().focusQuery('currentSelectedExcessHistory').focusQuery('start')}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('arrearsDetails'),
    cd, fdd,
    ids: ["accountId","customerId","startDate"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/arrearsDetails?{query}"
  }
}

export function AccountOverview_AccountOverviewHistoryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewHistoryDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessHistory'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/excessHistory?{query}"
  }
}

export function AccountOverview_AccountOverviewExcessInfoRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewExcessInfoDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('excessInfo'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/excessInfo?{query}"
  }
}

export function AccountOverview_AccountOverviewRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('main'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview?{query}"
  }
}

export function AccountOverview_AccountOverviewReasonRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.AccountOverviewPageDomain, domains.AccountOverviewReasonDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.AccountOverviewPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('AccountOverview'),
    dLens: Lenses.identity<domains.AccountOverviewPageDomain>().focusQuery('reason'),
    cd, fdd,
    ids: ["accountId","customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/api/accountOverview/reason?{query}"
  }
}
