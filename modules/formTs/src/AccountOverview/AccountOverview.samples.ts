import * as domains from '../AccountOverview/AccountOverview.domains'

export const sampleAccountAllFlags0: domains.AccountAllFlagsDomain = 
{
  "flags": [
    {
      "flagName": "Terrorist",
      "flagValue": true
    },
    {
      "flagName": "MI6 wanted list",
      "flagValue": false
    },
    {
      "flagName": "This is a one line string",
      "flagValue": true
    }
  ]
}
export const sampleAccountAllFlagsList0: domains.AccountAllFlagsListDomain = 
[
  {
    "flagName": "Terrorist",
    "flagValue": true
  },
  {
    "flagName": "MI6 wanted list",
    "flagValue": false
  },
  {
    "flagName": "This is a one line string",
    "flagValue": true
  }
]
export const sampleAccountOneFlag0: domains.AccountOneFlagDomain = 
{
  "flagName": "Terrorist",
  "flagValue": true
}
export const sampleAccountOverview0: domains.AccountOverviewDomain = 
{
  "score": 123,
  "accountType": "checking",
  "drawDownDate": "2020-10-01",
  "repaymentDate": "2020-10-01",
  "propertyValue": 220000,
  "mul": 173750,
  "drawDownAmount": 90007,
  "criteria": [
    {
      "criteria": "Account Management"
    },
    {
      "criteria": "Affordability check failed"
    },
    {
      "criteria": "This is a one line string"
    }
  ],
  "zFlagSet": "N",
  "excessSixMonths": 123,
  "bouncedDDs12Months": 123,
  "unpaidCardOrMisuseItems": 123
}
export const sampleAccountOverviewCriteria0: domains.AccountOverviewCriteriaDomain = 
[
  {
    "criteria": "Account Management"
  },
  {
    "criteria": "Affordability check failed"
  },
  {
    "criteria": "This is a one line string"
  }
]
export const sampleAccountOverviewCriteriaLine0: domains.AccountOverviewCriteriaLineDomain = 
{
  "criteria": "Account Management"
}
export const sampleAccountOverviewExcessHistoryLine0: domains.AccountOverviewExcessHistoryLineDomain = 
{
  "start": "2020-10-01",
  "end": "2020-10-01",
  "consecutiveDays": 123
}
export const sampleAccountOverviewExcessInfo0: domains.AccountOverviewExcessInfoDomain = 
{
  "dayOfCurrentExcess": 123,
  "currentExcessOnAccount": 123,
  "currentPctExcess": 123,
  "dateOfLastCapitalization": "2020-10-01",
  "dateOfLastExcessFulfillment": "2020-10-01"
}
export const sampleAccountOverviewExcessLines0: domains.AccountOverviewExcessLinesDomain = 
[
  {
    "start": "2020-10-01",
    "end": "2020-10-01",
    "consecutiveDays": 123
  },
  {
    "start": "2022-14-01",
    "end": "2022-14-01",
    "consecutiveDays": 456
  },
  {
    "start": "2020-10-01",
    "end": "2020-10-01",
    "consecutiveDays": 123
  }
]
export const sampleAccountOverviewHistory0: domains.AccountOverviewHistoryDomain = 
{
  "history": [
    {
      "start": "2020-10-01",
      "end": "2020-10-01",
      "consecutiveDays": 123
    },
    {
      "start": "2022-14-01",
      "end": "2022-14-01",
      "consecutiveDays": 456
    },
    {
      "start": "2020-10-01",
      "end": "2020-10-01",
      "consecutiveDays": 123
    }
  ]
}
export const sampleAccountOverviewReason0: domains.AccountOverviewReasonDomain = 
{
  "reason": "Really good reason"
}
export const sampleArrearsDetails0: domains.ArrearsDetailsDomain = 
{
  "history": [
    {
      "collectionsDate": "2020-10-01",
      "creditedDate": "2020-10-01",
      "minPayment": 123,
      "contractualAmount": 123,
      "paymentType": "dd",
      "paymentReceived": 123,
      "shortfall": 123,
      "arrearsTotal": 123,
      "missedPayments": 123
    },
    {
      "collectionsDate": "2022-14-01",
      "creditedDate": "2022-14-01",
      "minPayment": 456,
      "contractualAmount": 456,
      "paymentType": "ddResubmit",
      "paymentReceived": 456,
      "shortfall": 456,
      "arrearsTotal": 456,
      "missedPayments": 456
    },
    {
      "collectionsDate": "2020-10-01",
      "creditedDate": "2020-10-01",
      "minPayment": 123,
      "contractualAmount": 123,
      "paymentType": "dd",
      "paymentReceived": 123,
      "shortfall": 123,
      "arrearsTotal": 123,
      "missedPayments": 123
    }
  ]
}
export const sampleArrearsDetailsLine0: domains.ArrearsDetailsLineDomain = 
{
  "collectionsDate": "2020-10-01",
  "creditedDate": "2020-10-01",
  "minPayment": 123,
  "contractualAmount": 123,
  "paymentType": "dd",
  "paymentReceived": 123,
  "shortfall": 123,
  "arrearsTotal": 123,
  "missedPayments": 123
}
export const sampleArrearsDetailsLines0: domains.ArrearsDetailsLinesDomain = 
[
  {
    "collectionsDate": "2020-10-01",
    "creditedDate": "2020-10-01",
    "minPayment": 123,
    "contractualAmount": 123,
    "paymentType": "dd",
    "paymentReceived": 123,
    "shortfall": 123,
    "arrearsTotal": 123,
    "missedPayments": 123
  },
  {
    "collectionsDate": "2022-14-01",
    "creditedDate": "2022-14-01",
    "minPayment": 456,
    "contractualAmount": 456,
    "paymentType": "ddResubmit",
    "paymentReceived": 456,
    "shortfall": 456,
    "arrearsTotal": 456,
    "missedPayments": 456
  },
  {
    "collectionsDate": "2020-10-01",
    "creditedDate": "2020-10-01",
    "minPayment": 123,
    "contractualAmount": 123,
    "paymentType": "dd",
    "paymentReceived": 123,
    "shortfall": 123,
    "arrearsTotal": 123,
    "missedPayments": 123
  }
]
export const sampleAccountAllFlags1: domains.AccountAllFlagsDomain = 
{
  "flags": [
    {
      "flagName": "MI6 wanted list",
      "flagValue": false
    },
    {
      "flagName": "Terrorist",
      "flagValue": true
    },
    {
      "flagName": "MI6 wanted list",
      "flagValue": false
    }
  ]
}
export const sampleAccountAllFlagsList1: domains.AccountAllFlagsListDomain = 
[
  {
    "flagName": "MI6 wanted list",
    "flagValue": false
  },
  {
    "flagName": "Terrorist",
    "flagValue": true
  },
  {
    "flagName": "MI6 wanted list",
    "flagValue": false
  }
]
export const sampleAccountOneFlag1: domains.AccountOneFlagDomain = 
{
  "flagName": "MI6 wanted list",
  "flagValue": false
}
export const sampleAccountOverview1: domains.AccountOverviewDomain = 
{
  "score": 456,
  "accountType": "savings",
  "drawDownDate": "2022-14-01",
  "repaymentDate": "2022-14-01",
  "propertyValue": 123,
  "mul": 123,
  "drawDownAmount": 123,
  "criteria": [
    {
      "criteria": "Affordability check failed"
    },
    {
      "criteria": "Account Management"
    },
    {
      "criteria": "Affordability check failed"
    }
  ],
  "zFlagSet": "X",
  "excessSixMonths": 456,
  "bouncedDDs12Months": 456,
  "unpaidCardOrMisuseItems": 456
}
export const sampleAccountOverviewCriteria1: domains.AccountOverviewCriteriaDomain = 
[
  {
    "criteria": "Affordability check failed"
  },
  {
    "criteria": "Account Management"
  },
  {
    "criteria": "Affordability check failed"
  }
]
export const sampleAccountOverviewCriteriaLine1: domains.AccountOverviewCriteriaLineDomain = 
{
  "criteria": "Affordability check failed"
}
export const sampleAccountOverviewExcessHistoryLine1: domains.AccountOverviewExcessHistoryLineDomain = 
{
  "start": "2022-14-01",
  "end": "2022-14-01",
  "consecutiveDays": 456
}
export const sampleAccountOverviewExcessInfo1: domains.AccountOverviewExcessInfoDomain = 
{
  "dayOfCurrentExcess": 456,
  "currentExcessOnAccount": 456,
  "currentPctExcess": 456,
  "dateOfLastCapitalization": "2022-14-01",
  "dateOfLastExcessFulfillment": "2022-14-01"
}
export const sampleAccountOverviewExcessLines1: domains.AccountOverviewExcessLinesDomain = 
[
  {
    "start": "2022-14-01",
    "end": "2022-14-01",
    "consecutiveDays": 456
  },
  {
    "start": "2020-10-01",
    "end": "2020-10-01",
    "consecutiveDays": 123
  },
  {
    "start": "2022-14-01",
    "end": "2022-14-01",
    "consecutiveDays": 456
  }
]
export const sampleAccountOverviewHistory1: domains.AccountOverviewHistoryDomain = 
{
  "history": [
    {
      "start": "2022-14-01",
      "end": "2022-14-01",
      "consecutiveDays": 456
    },
    {
      "start": "2020-10-01",
      "end": "2020-10-01",
      "consecutiveDays": 123
    },
    {
      "start": "2022-14-01",
      "end": "2022-14-01",
      "consecutiveDays": 456
    }
  ]
}
export const sampleAccountOverviewReason1: domains.AccountOverviewReasonDomain = 
{
  "reason": "This is a one line string"
}
export const sampleArrearsDetails1: domains.ArrearsDetailsDomain = 
{
  "history": [
    {
      "collectionsDate": "2022-14-01",
      "creditedDate": "2022-14-01",
      "minPayment": 456,
      "contractualAmount": 456,
      "paymentType": "ddResubmit",
      "paymentReceived": 456,
      "shortfall": 456,
      "arrearsTotal": 456,
      "missedPayments": 456
    },
    {
      "collectionsDate": "2020-10-01",
      "creditedDate": "2020-10-01",
      "minPayment": 123,
      "contractualAmount": 123,
      "paymentType": "dd",
      "paymentReceived": 123,
      "shortfall": 123,
      "arrearsTotal": 123,
      "missedPayments": 123
    },
    {
      "collectionsDate": "2022-14-01",
      "creditedDate": "2022-14-01",
      "minPayment": 456,
      "contractualAmount": 456,
      "paymentType": "ddResubmit",
      "paymentReceived": 456,
      "shortfall": 456,
      "arrearsTotal": 456,
      "missedPayments": 456
    }
  ]
}
export const sampleArrearsDetailsLine1: domains.ArrearsDetailsLineDomain = 
{
  "collectionsDate": "2022-14-01",
  "creditedDate": "2022-14-01",
  "minPayment": 456,
  "contractualAmount": 456,
  "paymentType": "ddResubmit",
  "paymentReceived": 456,
  "shortfall": 456,
  "arrearsTotal": 456,
  "missedPayments": 456
}
export const sampleArrearsDetailsLines1: domains.ArrearsDetailsLinesDomain = 
[
  {
    "collectionsDate": "2022-14-01",
    "creditedDate": "2022-14-01",
    "minPayment": 456,
    "contractualAmount": 456,
    "paymentType": "ddResubmit",
    "paymentReceived": 456,
    "shortfall": 456,
    "arrearsTotal": 456,
    "missedPayments": 456
  },
  {
    "collectionsDate": "2020-10-01",
    "creditedDate": "2020-10-01",
    "minPayment": 123,
    "contractualAmount": 123,
    "paymentType": "dd",
    "paymentReceived": 123,
    "shortfall": 123,
    "arrearsTotal": 123,
    "missedPayments": 123
  },
  {
    "collectionsDate": "2022-14-01",
    "creditedDate": "2022-14-01",
    "minPayment": 456,
    "contractualAmount": 456,
    "paymentType": "ddResubmit",
    "paymentReceived": 456,
    "shortfall": 456,
    "arrearsTotal": 456,
    "missedPayments": 456
  }
]
export const sampleAccountAllFlags2: domains.AccountAllFlagsDomain = 
{
  "flags": [
    {
      "flagName": "This is a one line string",
      "flagValue": true
    },
    {
      "flagName": "another one line string",
      "flagValue": false
    },
    {
      "flagName": "Terrorist",
      "flagValue": true
    }
  ]
}
export const sampleAccountAllFlagsList2: domains.AccountAllFlagsListDomain = 
[
  {
    "flagName": "This is a one line string",
    "flagValue": true
  },
  {
    "flagName": "another one line string",
    "flagValue": false
  },
  {
    "flagName": "Terrorist",
    "flagValue": true
  }
]
export const sampleAccountOneFlag2: domains.AccountOneFlagDomain = 
{
  "flagName": "This is a one line string",
  "flagValue": true
}
export const sampleAccountOverview2: domains.AccountOverviewDomain = 
{
  "score": 123,
  "accountType": "This is a one line string",
  "drawDownDate": "2020-10-01",
  "repaymentDate": "2020-10-01",
  "propertyValue": 456,
  "mul": 456,
  "drawDownAmount": 456,
  "criteria": [
    {
      "criteria": "This is a one line string"
    },
    {
      "criteria": "another one line string"
    },
    {
      "criteria": "Account Management"
    }
  ],
  "zFlagSet": "Y",
  "excessSixMonths": 123,
  "bouncedDDs12Months": 123,
  "unpaidCardOrMisuseItems": 123
}
export const sampleAccountOverviewCriteria2: domains.AccountOverviewCriteriaDomain = 
[
  {
    "criteria": "This is a one line string"
  },
  {
    "criteria": "another one line string"
  },
  {
    "criteria": "Account Management"
  }
]
export const sampleAccountOverviewCriteriaLine2: domains.AccountOverviewCriteriaLineDomain = 
{
  "criteria": "This is a one line string"
}
export const sampleAccountOverviewExcessHistoryLine2: domains.AccountOverviewExcessHistoryLineDomain = 
{
  "start": "2020-10-01",
  "end": "2020-10-01",
  "consecutiveDays": 123
}
export const sampleAccountOverviewExcessInfo2: domains.AccountOverviewExcessInfoDomain = 
{
  "dayOfCurrentExcess": 123,
  "currentExcessOnAccount": 123,
  "currentPctExcess": 123,
  "dateOfLastCapitalization": "2020-10-01",
  "dateOfLastExcessFulfillment": "2020-10-01"
}
export const sampleAccountOverviewExcessLines2: domains.AccountOverviewExcessLinesDomain = 
[
  {
    "start": "2020-10-01",
    "end": "2020-10-01",
    "consecutiveDays": 123
  },
  {
    "start": "2022-14-01",
    "end": "2022-14-01",
    "consecutiveDays": 456
  },
  {
    "start": "2020-10-01",
    "end": "2020-10-01",
    "consecutiveDays": 123
  }
]
export const sampleAccountOverviewHistory2: domains.AccountOverviewHistoryDomain = 
{
  "history": [
    {
      "start": "2020-10-01",
      "end": "2020-10-01",
      "consecutiveDays": 123
    },
    {
      "start": "2022-14-01",
      "end": "2022-14-01",
      "consecutiveDays": 456
    },
    {
      "start": "2020-10-01",
      "end": "2020-10-01",
      "consecutiveDays": 123
    }
  ]
}
export const sampleAccountOverviewReason2: domains.AccountOverviewReasonDomain = 
{
  "reason": "another one line string"
}
export const sampleArrearsDetails2: domains.ArrearsDetailsDomain = 
{
  "history": [
    {
      "collectionsDate": "2020-10-01",
      "creditedDate": "2020-10-01",
      "minPayment": 123,
      "contractualAmount": 123,
      "paymentType": "dd",
      "paymentReceived": 123,
      "shortfall": 123,
      "arrearsTotal": 123,
      "missedPayments": 123
    },
    {
      "collectionsDate": "2022-14-01",
      "creditedDate": "2022-14-01",
      "minPayment": 456,
      "contractualAmount": 456,
      "paymentType": "ddResubmit",
      "paymentReceived": 456,
      "shortfall": 456,
      "arrearsTotal": 456,
      "missedPayments": 456
    },
    {
      "collectionsDate": "2020-10-01",
      "creditedDate": "2020-10-01",
      "minPayment": 123,
      "contractualAmount": 123,
      "paymentType": "dd",
      "paymentReceived": 123,
      "shortfall": 123,
      "arrearsTotal": 123,
      "missedPayments": 123
    }
  ]
}
export const sampleArrearsDetailsLine2: domains.ArrearsDetailsLineDomain = 
{
  "collectionsDate": "2020-10-01",
  "creditedDate": "2020-10-01",
  "minPayment": 123,
  "contractualAmount": 123,
  "paymentType": "dd",
  "paymentReceived": 123,
  "shortfall": 123,
  "arrearsTotal": 123,
  "missedPayments": 123
}
export const sampleArrearsDetailsLines2: domains.ArrearsDetailsLinesDomain = 
[
  {
    "collectionsDate": "2020-10-01",
    "creditedDate": "2020-10-01",
    "minPayment": 123,
    "contractualAmount": 123,
    "paymentType": "dd",
    "paymentReceived": 123,
    "shortfall": 123,
    "arrearsTotal": 123,
    "missedPayments": 123
  },
  {
    "collectionsDate": "2022-14-01",
    "creditedDate": "2022-14-01",
    "minPayment": 456,
    "contractualAmount": 456,
    "paymentType": "ddResubmit",
    "paymentReceived": 456,
    "shortfall": 456,
    "arrearsTotal": 456,
    "missedPayments": 456
  },
  {
    "collectionsDate": "2020-10-01",
    "creditedDate": "2020-10-01",
    "minPayment": 123,
    "contractualAmount": 123,
    "paymentType": "dd",
    "paymentReceived": 123,
    "shortfall": 123,
    "arrearsTotal": 123,
    "missedPayments": 123
  }
]