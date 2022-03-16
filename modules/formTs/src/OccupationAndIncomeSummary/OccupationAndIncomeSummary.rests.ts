import { OneRestDetails } from "@focuson/rest"
import * as domains from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"
export function OccupationAndIncomeSummary_AdditionalInformationRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.AdditionalInformationDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('additionalInformation'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/additionalInfo?{query}"
  }
}

export function OccupationAndIncomeSummary_BusinessDetailsMainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.BusinessDetailsMainDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('businessDetails'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/businessDetails?{query}"
  }
}

export function OccupationAndIncomeSummary_DropdownsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.DropdownsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('dropdowns'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationDetails?{query}"
  }
}

export function OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationIncomeDetails?{query}"
  }
}

export function OccupationAndIncomeSummary_OtherIncomeResponseRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('otherSourcesOfIncome'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/otherIncome?{query}"
  }
}
