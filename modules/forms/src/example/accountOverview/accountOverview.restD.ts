import { accountAllFlagsDataDD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessInfoDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";

import { ExampleRestD } from "../common";
import { commonParams } from "../eAccounts/eAccountsSummary.restD";
import { RestParams, StringParam } from "../../common/restD";

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

export const arrearsDetailsCurrentRestD: ExampleRestD = {
  params: arrearsDetailsParams,
  dataDD: arrearsDetailsDataD,
  url: '/api/accountOverview/arrearsDetails/current?{query}',
  actions: [ 'get' ]
}
export const arrearsDetailsPreviousRestD: ExampleRestD = {
  namePrefix: 'previous',
  params: arrearsDetailsParams,
  dataDD: arrearsDetailsDataD,
  url: '/api/accountOverview/arrearsDetails/previous?{query}',
  actions: [ 'get' ]
}

export const accountFlagsRestDD: ExampleRestD = {
  params: commonParams,
  dataDD: accountAllFlagsDataDD,
  url: '/api/accountOverview/flags?{query}',
  actions: [ 'get' ]
}