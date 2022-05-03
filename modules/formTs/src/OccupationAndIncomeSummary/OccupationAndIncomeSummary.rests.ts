import { OneRestDetails } from "@focuson/rest"
import * as domains from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary_AdditionalInformationRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.AdditionalInformationDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
//From OccupationAndIncomeSummary.rest[additionalInformationRD].targetFromPath (~/additionalInformation). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('additionalInformation'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/additionalInfo?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary_BusinessDetailsMainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.BusinessDetailsMainDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
//From OccupationAndIncomeSummary.rest[businessDetailsRD].targetFromPath (~/businessDetails). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('businessDetails'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/businessDetails?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary_DropdownsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.DropdownsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
//From OccupationAndIncomeSummary.rest[dropdownsRD].targetFromPath (~/dropdowns). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('dropdowns'),
    cd, fdd,
    ids: [],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationDetails?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
//From OccupationAndIncomeSummary.rest[occupationAndIncomeRD].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('fromApi'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationIncomeDetails?{query}",
    states : {}
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function OccupationAndIncomeSummary_OtherIncomeResponseRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.OccupationAndIncomeSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.OccupationAndIncomeSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'),
//From OccupationAndIncomeSummary.rest[otherSourcesOfIncomeRD].targetFromPath (~/otherSourcesOfIncome). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
    dLens: Lenses.identity<domains.OccupationAndIncomeSummaryPageDomain>().focusQuery('otherSourcesOfIncome'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/otherIncome?{query}",
    states : {}
  }
}
