import { OneRestDetails } from "@focuson/rest"
import * as domains from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary__AdditionalInformationRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.AdditionalInformationDomain, SimpleMessage> {
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

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary__BusinessDetailsMainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.BusinessDetailsMainDomain, SimpleMessage> {
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

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary__DropdownsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.DropdownsDomain, SimpleMessage> {
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

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary__OccupationAndIncomeFullDomainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage> {
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

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary__OtherIncomeResponseRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage> {
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
