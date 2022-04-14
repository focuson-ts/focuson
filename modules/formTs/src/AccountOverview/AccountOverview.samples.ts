import * as domains from '../AccountOverview/AccountOverview.domains'

export const sampleAccountAllFlags0: domains.AccountAllFlagsDomain = 
{
  "flags": [
    {
      "flagName": "Capitalised",
      "flagValue": true
    },
    {
      "flagName": "Contigent Obligations",
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
    "flagName": "Capitalised",
    "flagValue": true
  },
  {
    "flagName": "Contigent Obligations",
    "flagValue": false
  },
  {
    "flagName": "This is a one line string",
    "flagValue": true
  }
]
export const sampleAccountOneFlag0: domains.AccountOneFlagDomain = 
{
  "flagName": "Capitalised",
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
  "excessSixMonths": 1,
  "bouncedDDs12Months": 3,
  "unpaidCardOrMisuseItems": 0,
  "currentBalance": 123,
  "currentInterestRate": 12,
  "facilities": {
    "facilities": [
      {
        "facility": 1234,
        "changeDate": "23-03-2022",
        "unApproved": true,
        "reason": "some reason",
        "amount": 2345
      },
      {
        "facility": 123,
        "changeDate": "2020-10-01",
        "unApproved": true,
        "reason": "someString",
        "amount": 123
      },
      {
        "facility": 456,
        "changeDate": "2022-14-01",
        "unApproved": false,
        "reason": "anotherString",
        "amount": 456
      }
    ]
  },
  "highBalance": 1000,
  "lowBalance": 23,
  "pctOfFacility": 27,
  "eightyPctFacility": 800,
  "eightyFivePctFacility": 234
}
export const sampleAccountOverviewAgreementType0: domains.AccountOverviewAgreementTypeDomain = 
{
  "agreementType": "checking",
  "transactionHeading": "option1"
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
export const sampleAccountOverviewFacilities0: domains.AccountOverviewFacilitiesDomain = 
{
  "facilities": [
    {
      "facility": 1234,
      "changeDate": "23-03-2022",
      "unApproved": true,
      "reason": "some reason",
      "amount": 2345
    },
    {
      "facility": 123,
      "changeDate": "2020-10-01",
      "unApproved": true,
      "reason": "someString",
      "amount": 123
    },
    {
      "facility": 456,
      "changeDate": "2022-14-01",
      "unApproved": false,
      "reason": "anotherString",
      "amount": 456
    }
  ]
}
export const sampleAccountOverviewFacilitiesLine0: domains.AccountOverviewFacilitiesLineDomain = 
{
  "facility": 1234,
  "changeDate": "23-03-2022",
  "unApproved": true,
  "reason": "some reason",
  "amount": 2345
}
export const sampleAccountOverviewFacilitiesLines0: domains.AccountOverviewFacilitiesLinesDomain = 
[
  {
    "facility": 1234,
    "changeDate": "23-03-2022",
    "unApproved": true,
    "reason": "some reason",
    "amount": 2345
  },
  {
    "facility": 123,
    "changeDate": "2020-10-01",
    "unApproved": true,
    "reason": "someString",
    "amount": 123
  },
  {
    "facility": 456,
    "changeDate": "2022-14-01",
    "unApproved": false,
    "reason": "anotherString",
    "amount": 456
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
export const sampleAccountOverviewOptOut0: domains.AccountOverviewOptOutDomain = 
{
  "optOut": [
    {
      "optedOut": true,
      "addrLine5": "someString",
      "changedBy": "someString",
      "changedDate": "2020-10-01"
    },
    {
      "optedOut": false,
      "addrLine5": "anotherString",
      "changedBy": "anotherString",
      "changedDate": "2022-14-01"
    },
    {
      "optedOut": true,
      "addrLine5": "someString",
      "changedBy": "someString",
      "changedDate": "2020-10-01"
    }
  ]
}
export const sampleAccountOverviewOptOutLine0: domains.AccountOverviewOptOutLineDomain = 
{
  "optedOut": true,
  "addrLine5": "someString",
  "changedBy": "someString",
  "changedDate": "2020-10-01"
}
export const sampleAccountOverviewOptOutLines0: domains.AccountOverviewOptOutLinesDomain = 
[
  {
    "optedOut": true,
    "addrLine5": "someString",
    "changedBy": "someString",
    "changedDate": "2020-10-01"
  },
  {
    "optedOut": false,
    "addrLine5": "anotherString",
    "changedBy": "anotherString",
    "changedDate": "2022-14-01"
  },
  {
    "optedOut": true,
    "addrLine5": "someString",
    "changedBy": "someString",
    "changedDate": "2020-10-01"
  }
]
export const sampleAccountOverviewReason0: domains.AccountOverviewReasonDomain = 
{
  "reason": "Second charge case"
}
export const sampleArrearsDetails0: domains.ArrearsDetailsDomain = 
{
  "details": [
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
      "flagName": "Contigent Obligations",
      "flagValue": false
    },
    {
      "flagName": "Capitalised",
      "flagValue": true
    },
    {
      "flagName": "Contigent Obligations",
      "flagValue": false
    }
  ]
}
export const sampleAccountAllFlagsList1: domains.AccountAllFlagsListDomain = 
[
  {
    "flagName": "Contigent Obligations",
    "flagValue": false
  },
  {
    "flagName": "Capitalised",
    "flagValue": true
  },
  {
    "flagName": "Contigent Obligations",
    "flagValue": false
  }
]
export const sampleAccountOneFlag1: domains.AccountOneFlagDomain = 
{
  "flagName": "Contigent Obligations",
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
  "excessSixMonths": 2,
  "bouncedDDs12Months": 1,
  "unpaidCardOrMisuseItems": 123,
  "currentBalance": 563,
  "currentInterestRate": 1,
  "facilities": {
    "facilities": [
      {
        "facility": 123,
        "changeDate": "2020-10-01",
        "unApproved": true,
        "reason": "someString",
        "amount": 123
      },
      {
        "facility": 123,
        "changeDate": "2020-10-01",
        "unApproved": true,
        "reason": "someString",
        "amount": 123
      },
      {
        "facility": 456,
        "changeDate": "2022-14-01",
        "unApproved": false,
        "reason": "anotherString",
        "amount": 456
      }
    ]
  },
  "highBalance": 2000,
  "lowBalance": 6354,
  "pctOfFacility": 12,
  "eightyPctFacility": 8000,
  "eightyFivePctFacility": 456
}
export const sampleAccountOverviewAgreementType1: domains.AccountOverviewAgreementTypeDomain = 
{
  "agreementType": "mixed",
  "transactionHeading": "option2"
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
export const sampleAccountOverviewFacilities1: domains.AccountOverviewFacilitiesDomain = 
{
  "facilities": [
    {
      "facility": 123,
      "changeDate": "2020-10-01",
      "unApproved": true,
      "reason": "someString",
      "amount": 123
    },
    {
      "facility": 123,
      "changeDate": "2020-10-01",
      "unApproved": true,
      "reason": "someString",
      "amount": 123
    },
    {
      "facility": 456,
      "changeDate": "2022-14-01",
      "unApproved": false,
      "reason": "anotherString",
      "amount": 456
    }
  ]
}
export const sampleAccountOverviewFacilitiesLine1: domains.AccountOverviewFacilitiesLineDomain = 
{
  "facility": 123,
  "changeDate": "2020-10-01",
  "unApproved": true,
  "reason": "someString",
  "amount": 123
}
export const sampleAccountOverviewFacilitiesLines1: domains.AccountOverviewFacilitiesLinesDomain = 
[
  {
    "facility": 123,
    "changeDate": "2020-10-01",
    "unApproved": true,
    "reason": "someString",
    "amount": 123
  },
  {
    "facility": 123,
    "changeDate": "2020-10-01",
    "unApproved": true,
    "reason": "someString",
    "amount": 123
  },
  {
    "facility": 456,
    "changeDate": "2022-14-01",
    "unApproved": false,
    "reason": "anotherString",
    "amount": 456
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
export const sampleAccountOverviewOptOut1: domains.AccountOverviewOptOutDomain = 
{
  "optOut": [
    {
      "optedOut": false,
      "addrLine5": "anotherString",
      "changedBy": "anotherString",
      "changedDate": "2022-14-01"
    },
    {
      "optedOut": true,
      "addrLine5": "someString",
      "changedBy": "someString",
      "changedDate": "2020-10-01"
    },
    {
      "optedOut": false,
      "addrLine5": "anotherString",
      "changedBy": "anotherString",
      "changedDate": "2022-14-01"
    }
  ]
}
export const sampleAccountOverviewOptOutLine1: domains.AccountOverviewOptOutLineDomain = 
{
  "optedOut": false,
  "addrLine5": "anotherString",
  "changedBy": "anotherString",
  "changedDate": "2022-14-01"
}
export const sampleAccountOverviewOptOutLines1: domains.AccountOverviewOptOutLinesDomain = 
[
  {
    "optedOut": false,
    "addrLine5": "anotherString",
    "changedBy": "anotherString",
    "changedDate": "2022-14-01"
  },
  {
    "optedOut": true,
    "addrLine5": "someString",
    "changedBy": "someString",
    "changedDate": "2020-10-01"
  },
  {
    "optedOut": false,
    "addrLine5": "anotherString",
    "changedBy": "anotherString",
    "changedDate": "2022-14-01"
  }
]
export const sampleAccountOverviewReason1: domains.AccountOverviewReasonDomain = 
{
  "reason": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
}
export const sampleArrearsDetails1: domains.ArrearsDetailsDomain = 
{
  "details": [
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
      "flagName": "Capitalised",
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
    "flagName": "Capitalised",
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
  "excessSixMonths": 3,
  "bouncedDDs12Months": 0,
  "unpaidCardOrMisuseItems": 456,
  "currentBalance": 234,
  "currentInterestRate": 2,
  "facilities": {
    "facilities": [
      {
        "facility": 456,
        "changeDate": "2022-14-01",
        "unApproved": false,
        "reason": "anotherString",
        "amount": 456
      },
      {
        "facility": 123,
        "changeDate": "2020-10-01",
        "unApproved": true,
        "reason": "someString",
        "amount": 123
      },
      {
        "facility": 456,
        "changeDate": "2022-14-01",
        "unApproved": false,
        "reason": "anotherString",
        "amount": 456
      }
    ]
  },
  "highBalance": 123,
  "lowBalance": 123,
  "pctOfFacility": 123,
  "eightyPctFacility": 123,
  "eightyFivePctFacility": 123
}
export const sampleAccountOverviewAgreementType2: domains.AccountOverviewAgreementTypeDomain = 
{
  "agreementType": "option1",
  "transactionHeading": "option3"
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
export const sampleAccountOverviewFacilities2: domains.AccountOverviewFacilitiesDomain = 
{
  "facilities": [
    {
      "facility": 456,
      "changeDate": "2022-14-01",
      "unApproved": false,
      "reason": "anotherString",
      "amount": 456
    },
    {
      "facility": 123,
      "changeDate": "2020-10-01",
      "unApproved": true,
      "reason": "someString",
      "amount": 123
    },
    {
      "facility": 456,
      "changeDate": "2022-14-01",
      "unApproved": false,
      "reason": "anotherString",
      "amount": 456
    }
  ]
}
export const sampleAccountOverviewFacilitiesLine2: domains.AccountOverviewFacilitiesLineDomain = 
{
  "facility": 456,
  "changeDate": "2022-14-01",
  "unApproved": false,
  "reason": "anotherString",
  "amount": 456
}
export const sampleAccountOverviewFacilitiesLines2: domains.AccountOverviewFacilitiesLinesDomain = 
[
  {
    "facility": 456,
    "changeDate": "2022-14-01",
    "unApproved": false,
    "reason": "anotherString",
    "amount": 456
  },
  {
    "facility": 123,
    "changeDate": "2020-10-01",
    "unApproved": true,
    "reason": "someString",
    "amount": 123
  },
  {
    "facility": 456,
    "changeDate": "2022-14-01",
    "unApproved": false,
    "reason": "anotherString",
    "amount": 456
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
export const sampleAccountOverviewOptOut2: domains.AccountOverviewOptOutDomain = 
{
  "optOut": [
    {
      "optedOut": true,
      "addrLine5": "someString",
      "changedBy": "someString",
      "changedDate": "2020-10-01"
    },
    {
      "optedOut": false,
      "addrLine5": "anotherString",
      "changedBy": "anotherString",
      "changedDate": "2022-14-01"
    },
    {
      "optedOut": true,
      "addrLine5": "someString",
      "changedBy": "someString",
      "changedDate": "2020-10-01"
    }
  ]
}
export const sampleAccountOverviewOptOutLine2: domains.AccountOverviewOptOutLineDomain = 
{
  "optedOut": true,
  "addrLine5": "someString",
  "changedBy": "someString",
  "changedDate": "2020-10-01"
}
export const sampleAccountOverviewOptOutLines2: domains.AccountOverviewOptOutLinesDomain = 
[
  {
    "optedOut": true,
    "addrLine5": "someString",
    "changedBy": "someString",
    "changedDate": "2020-10-01"
  },
  {
    "optedOut": false,
    "addrLine5": "anotherString",
    "changedBy": "anotherString",
    "changedDate": "2022-14-01"
  },
  {
    "optedOut": true,
    "addrLine5": "someString",
    "changedBy": "someString",
    "changedDate": "2020-10-01"
  }
]
export const sampleAccountOverviewReason2: domains.AccountOverviewReasonDomain = 
{
  "reason": "Second charge case"
}
export const sampleArrearsDetails2: domains.ArrearsDetailsDomain = 
{
  "details": [
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