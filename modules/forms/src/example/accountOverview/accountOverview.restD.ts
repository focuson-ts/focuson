// import { accountAllFlagsDataDD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessInfoDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";

import { ExampleRestD } from "../common";
import { commonParams } from "../eAccounts/eAccountsSummary.restD";
import { RestParams, StringParam } from "../../common/restD";

// import { ExampleRestD } from "../common";
// import { commonParams } from "../eAccount/eAccountsSummary.restD";
import { accountAllFlagsDataDD, accountOverviewAgreementTypeDataD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessInfoDataD, accountOverviewOptOutDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";
// import { RestParams } from "@focuson/forms";

export const accountOverviewRestD: ExampleRestD = {
  params: commonParams,
  dataDD: accountOverviewDataD,
  url: '/api/accountOverview?{query}',
  actions: [ 'get' ]
}

export const accountOverviewExcessInfoRestD: ExampleRestD = {
  params: commonParams,
  dataDD: accountOverviewExcessInfoDataD,
  url: '/api/accountOverview/excessInfo?{query}',
  actions: [ 'get' ]
}

export const accountOverviewReasonRestD: ExampleRestD = {
  params: commonParams,
  dataDD: accountOverviewReasonDataD,
  url: '/api/accountOverview/reason?{query}',
  actions: [ 'get' ]
}

export const accountOverviewExcessHistoryRestD: ExampleRestD = {
  params: commonParams,
  dataDD: accountOverviewExcessHistoryDataD,
  url: '/api/accountOverview/excessHistory?{query}',
  actions: [ 'get' ]
}

export const arrearsDetailsParams: RestParams = {
  ...commonParams,
  startDate: { ...StringParam, lens: '~/currentSelectedExcessHistory/start', testValue: '2020-01-20' }
}

export const arrearsDetailsRestD: ExampleRestD = {
  params: arrearsDetailsParams,
  dataDD: arrearsDetailsDataD,
  url: '/api/accountOverview/arrearsDetails?{query}',
  actions: [ 'get' ]
}

export const accountFlagsRestDD: ExampleRestD = {
  params: commonParams,
  dataDD: accountAllFlagsDataDD,
  url: '/api/accountOverview/flags?{query}',
  actions: [ 'get' ]
}

export const accountOverviewOptOutRestDD: ExampleRestD = {
  params: commonParams,
  dataDD: accountOverviewOptOutDataD,
  url: '/api/accountOverview/optOut?{query}',
  actions: [ 'get' ]
}

export const accountOverviewAgreementTypeRestDD: ExampleRestD = {
  params: commonParams,
  dataDD: accountOverviewAgreementTypeDataD,
  url: '/api/accountOverview/agreementType?{query}',
  actions: [ 'get' ]
}