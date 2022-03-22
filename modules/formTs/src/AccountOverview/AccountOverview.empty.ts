import * as domains from '../AccountOverview/AccountOverview.domains'

export const emptyAccountAllFlags:domains.AccountAllFlagsDomain =
  {
    "flags": [
      {
        "flagName": "",
        "flagValue": false
      }
    ]
  }
export const emptyAccountAllFlagsList:domains.AccountAllFlagsListDomain =
  [
    {
      "flagName": "",
      "flagValue": false
    }
  ]
export const emptyAccountOneFlag:domains.AccountOneFlagDomain =
  {
    "flagName": "",
    "flagValue": false
  }
export const emptyAccountOverview:domains.AccountOverviewDomain =
  {
    "score": 0,
    "accountType": "savings",
    "drawDownDate": "2022-1-1",
    "repaymentDate": "2022-1-1",
    "propertyValue": 0,
    "mul": 0,
    "drawDownAmount": 0,
    "criteria": [
      {
        "criteria": ""
      }
    ],
    "zFlagSet": "",
    "excessSixMonths": 0,
    "bouncedDDs12Months": 0,
    "unpaidCardOrMisuseItems": 0
  }
export const emptyAccountOverviewCriteria:domains.AccountOverviewCriteriaDomain =
  [
    {
      "criteria": ""
    }
  ]
export const emptyAccountOverviewCriteriaLine:domains.AccountOverviewCriteriaLineDomain =
  {
    "criteria": ""
  }
export const emptyAccountOverviewExcessHistoryLine:domains.AccountOverviewExcessHistoryLineDomain =
  {
    "start": "2022-1-1",
    "end": "2022-1-1",
    "consecutiveDays": 0
  }
export const emptyAccountOverviewExcessInfo:domains.AccountOverviewExcessInfoDomain =
  {
    "dayOfCurrentExcess": 0,
    "currentExcessOnAccount": 0,
    "currentPctExcess": 0,
    "dateOfLastCapitalization": "2022-1-1",
    "dateOfLastExcessFulfillment": "2022-1-1"
  }
export const emptyAccountOverviewExcessLines:domains.AccountOverviewExcessLinesDomain =
  [
    {
      "start": "2022-1-1",
      "end": "2022-1-1",
      "consecutiveDays": 0
    }
  ]
export const emptyAccountOverviewHistory:domains.AccountOverviewHistoryDomain =
  {
    "history": [
      {
        "start": "2022-1-1",
        "end": "2022-1-1",
        "consecutiveDays": 0
      }
    ]
  }
export const emptyAccountOverviewReason:domains.AccountOverviewReasonDomain =
  {
    "reason": ""
  }
export const emptyArrearsDetails:domains.ArrearsDetailsDomain =
  {
    "history": [
      {
        "collectionsDate": "2022-1-1",
        "creditedDate": "2022-1-1",
        "minPayment": 0,
        "contractualAmount": 0,
        "paymentType": "",
        "paymentReceived": 0,
        "shortfall": 0,
        "arrearsTotal": 0,
        "missedPayments": 0
      }
    ]
  }
export const emptyArrearsDetailsLine:domains.ArrearsDetailsLineDomain =
  {
    "collectionsDate": "2022-1-1",
    "creditedDate": "2022-1-1",
    "minPayment": 0,
    "contractualAmount": 0,
    "paymentType": "",
    "paymentReceived": 0,
    "shortfall": 0,
    "arrearsTotal": 0,
    "missedPayments": 0
  }
export const emptyArrearsDetailsLines:domains.ArrearsDetailsLinesDomain =
  [
    {
      "collectionsDate": "2022-1-1",
      "creditedDate": "2022-1-1",
      "minPayment": 0,
      "contractualAmount": 0,
      "paymentType": "",
      "paymentReceived": 0,
      "shortfall": 0,
      "arrearsTotal": 0,
      "missedPayments": 0
    }
  ]