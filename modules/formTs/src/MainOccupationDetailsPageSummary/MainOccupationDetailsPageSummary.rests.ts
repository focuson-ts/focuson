import { OneRestDetails } from "@focuson/rest"
import * as domains from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"

import { FState } from "../common"

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function MainOccupationDetailsPageSummary_AdditionalInfoFirstRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.AdditionalInfoFirstDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.MainOccupationDetailsPageSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is additionalInfoFirstRD and the path specified is ~/fromApi/additionalInfoFirst
    dLens: Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('additionalInfoFirst'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/additionalInfoFirst?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function MainOccupationDetailsPageSummary_AdditionalInfoSecondRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.AdditionalInfoSecondDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.MainOccupationDetailsPageSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is additionalInfoSecondRD and the path specified is ~/fromApi/additionalInfoSecond
    dLens: Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('additionalInfoSecond'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/additionalInfoSecond?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function MainOccupationDetailsPageSummary_OccupationAndIncomeFullDomainRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.OccupationAndIncomeFullDomainDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.MainOccupationDetailsPageSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is occupationAndIncomeRD and the path specified is ~/fromApi/occupationAndIncome
    dLens: Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('occupationAndIncome'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationIncomeDetails?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function MainOccupationDetailsPageSummary_ListOccupationsRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.ListOccupationsDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.MainOccupationDetailsPageSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is occupationsListRD and the path specified is ~/fromApi/occupationsList
    dLens: Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('occupationsList'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/occupationsList?{query}"
  }
}

//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs
export function MainOccupationDetailsPageSummary_OtherIncomeResponseRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.MainOccupationDetailsPageSummaryPageDomain, domains.OtherIncomeResponseDomain, SimpleMessage> {
  const fdd: NameAndLens<domains.MainOccupationDetailsPageSummaryPageDomain> = {}
  return {
    fdLens: Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'),
//A compilation error is often because you have specified a path in the rest that does not exist. The rest name is otherSourcesOfIncomeRD and the path specified is ~/fromApi/otherSourcesOfIncome
    dLens: Lenses.identity<domains.MainOccupationDetailsPageSummaryPageDomain>().focusQuery('fromApi').focusQuery('otherSourcesOfIncome'),
    cd, fdd,
    ids: ["customerId"],
    resourceId:  [],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],
    url: "/customer/occupation/v2/otherIncome?{query}"
  }
}
