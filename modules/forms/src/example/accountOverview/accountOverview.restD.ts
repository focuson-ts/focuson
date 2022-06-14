// import { accountAllFlagsDataDD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessInfoDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";

import { ExampleRestD } from "../common";
import { RestParams, StringParam } from "../../common/restD";

// import { ExampleRestD } from "../common";
// import { commonParams } from "../eAccount/eAccountsSummary.restD";
import { accountAllFlagsDataDD, accountOverviewAgreementTypeDataD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessInfoDataD, accountOverviewOptOutDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";
import { commonIds } from "../commonIds";
// import { RestParams } from "@focuson/forms";

export const accountOverviewRestD: ExampleRestD = {
  params: commonIds,
  dataDD: accountOverviewDataD,
  url: '/api/accountOverview?{query}',
  actions: [ 'get' ],
  mutations: [
    {
      restAction: 'get', mutateBy:
        {
          type: 'manual', name: 'testForMessages', code: [ `
          String errorMsg = "the error message";
          String warningMsg = "the warning message";
          String infoMsg = "the info message";
          ` ], params: [
            { type: 'output', javaType: 'String', name: 'errorMsg', msgLevel: 'error' },
            { type: 'output', javaType: 'String', name: 'warningMsg', msgLevel: 'warning' },
            { type: 'output', javaType: 'String', name: 'infoMsg', msgLevel: 'info' }
          ]
        }
    }
  ]

}

export const accountOverviewExcessInfoRestD: ExampleRestD = {
  params: commonIds,
  dataDD: accountOverviewExcessInfoDataD,
  url: '/api/accountOverview/excessInfo?{query}',
  actions: [ 'get' ]
}

export const accountOverviewReasonRestD: ExampleRestD = {
  params: commonIds,
  dataDD: accountOverviewReasonDataD,
  url: '/api/accountOverview/reason?{query}',
  actions: [ 'get' ]
}

export const accountOverviewExcessHistoryRestD: ExampleRestD = {
  params: commonIds,
  dataDD: accountOverviewExcessHistoryDataD,
  url: '/api/accountOverview/excessHistory?{query}',
  actions: [ 'get' ]
}

export const arrearsDetailsParams: RestParams = {
  ...commonIds,
  startDate: { ...StringParam, lens: '~/currentSelectedExcessHistory/start', testValue: '2020-01-20' }
}

export const arrearsDetailsRestD: ExampleRestD = {
  params: arrearsDetailsParams,
  dataDD: arrearsDetailsDataD,
  url: '/api/accountOverview/arrearsDetails?{query}',
  actions: [ 'get' ]
}

export const accountFlagsRestDD: ExampleRestD = {
  params: commonIds,
  dataDD: accountAllFlagsDataDD,
  url: '/api/accountOverview/flags?{query}',
  actions: [ 'get' ]
}

export const accountOverviewOptOutRestDD: ExampleRestD = {
  params: commonIds,
  dataDD: accountOverviewOptOutDataD,
  url: '/api/accountOverview/optOut?{query}',
  actions: [ 'get' ]
}

export const accountOverviewAgreementTypeRestDD: ExampleRestD = {
  params: commonIds,
  dataDD: accountOverviewAgreementTypeDataD,
  url: '/api/accountOverview/agreementType?{query}',
  actions: [ 'get' ]
}