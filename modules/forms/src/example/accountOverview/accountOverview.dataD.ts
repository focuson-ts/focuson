import { yesNoDD } from "../occupationAndIncome/occupationAndIncome.dataD";
import { ExampleDataD, ExampleRepeatingD } from "../common";
import { BooleanDD, DateDD, IntegerDD, MoneyDD, NatNumDd, OneLineStringDD, ManyLineStringDD, StringDD, StringPrimitiveDD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";
import { PaymentTypeDd } from "../commonEnums";
import {
  LabelAndDropDownCD,
  LayoutCd,
  TableCD,
  TableWithCheckboxInputCD,
  UnpaidCardOrMisuseItemsCD
} from "../../common/componentsD";

// import { ExampleDataD, ExampleRepeatingD, NatNumDd, PaymentTypeDd } from "../common";
// import { BooleanDD, DateDD, IntegerDD, ManyLineStringDD, MoneyDD, OneLineStringDD, StringDD, StringPrimitiveDD } from "@focuson/forms";
// import { EAccountDisplayTypeDD } from "../eAccount/eAccountsSummary.dataD";
// import { yesNoDD } from "../occupationAndIncome/occupationAndIncome.dataD";
// import { commonParamsWithLabel, DisplayCompD, intValidationParams, LabelAndDropDownCD, TableCD } from "@focuson/forms/dist/src/common/componentsD";
// import { TableWithCheckboxInputCD } from "../../forms/tableWithCheckboxInputD"

export const accountOverviewFacilitiesLineDataD: ExampleDataD = {
  name: "AccountOverviewFacilitiesLine",
  description: "Account overview facilities data definition",
  structure: {
    facility: { dataDD: MoneyDD, sample: [ 1234 ] },
    changeDate: { dataDD: DateDD, sample: [ '23-03-2022' ] },
    unApproved: { dataDD: BooleanDD, sample: [ true ] },
    reason: { dataDD: StringDD, sample: [ 'some reason' ] },
    amount: { dataDD: MoneyDD, sample: [ 2345 ] }
  }
}

export const accountOverviewFacilitiesLinesDataD: ExampleRepeatingD = {
  name: "AccountOverviewFacilitiesLines", description: "", paged: false,
  display: TableCD,

  displayParams: {
    maxCount: '0',
    order: [ "facility", "changeDate", "unApproved", "reason", "amount" ],
    // copySelectedItemTo: { value: [ 'currentSelectedExcessHistory' ] }
  },
  dataDD: accountOverviewFacilitiesLineDataD,
}

export const accountOverviewFacilitiesDataD: ExampleDataD = {
  name: "AccountOverviewFacilities",
  description: "Account overview facilities data definition",
  structure: {
    facilities: { dataDD: accountOverviewFacilitiesLinesDataD }
  }
}

const accountOneFlagDD: ExampleDataD = {
  name: "AccountOneFlag",
  description: "One flag from the backend, with the 'type' so that we know how to display",
  // display: LabelAndStringInputCD,
  structure: {
    flagName: { dataDD: OneLineStringDD, sample: [ 'Capitalised', 'Contigent Obligations' ] },
    flagValue: { dataDD: BooleanDD },
  }
}

export const accountAllFlagsDD: ExampleRepeatingD = {
  name: "AccountAllFlagsList", description: "", paged: false,
  display: TableWithCheckboxInputCD,
  displayParams: { order: [ "flagName", "flagValue" ] },
  dataDD: accountOneFlagDD,
}

export const accountAllFlagsDataDD: ExampleDataD = {
  name: "AccountAllFlags",
  description: "All the account flags",
  structure: {
    flags: { dataDD: accountAllFlagsDD }
  }
}

const arrearsDetailsLineDataD: ExampleDataD = {
  name: "ArrearsDetailsLine",
  description: "Arrears Details data definition",
  structure: {
    collectionsDate: { dataDD: DateDD },
    creditedDate: { dataDD: DateDD },
    minPayment: { dataDD: MoneyDD },
    contractualAmount: { dataDD: MoneyDD },
    paymentType: { dataDD: PaymentTypeDd },
    paymentReceived: { dataDD: MoneyDD },
    shortfall: { dataDD: MoneyDD },
    arrearsTotal: { dataDD: MoneyDD },
    missedPayments: { dataDD: NatNumDd },
  }
}

export const arrearsDetailsLinesDataD: ExampleRepeatingD = {
  name: "ArrearsDetailsLines", description: "", paged: false,
  display: TableCD,
  displayParams: { order: [ "collectionsDate", "creditedDate", "minPayment", "contractualAmount", "paymentType", "paymentReceived", "shortfall", "arrearsTotal", "missedPayments" ] },
  dataDD: arrearsDetailsLineDataD,
}

export const arrearsDetailsDataD: ExampleDataD = {
  name: "ArrearsDetails",
  description: "Arrears Details data definition",
  structure: {
    details: { dataDD: arrearsDetailsLinesDataD }
  }
}

export const arrearsInformationDataD: ExampleDataD = {
  name: "ArrearsInformation",
  description: "Arrears information data definition",
  layout: { component: LayoutCd, displayParams: { details: '[[3,3],[20]]' } },
  structure: {
    externalArrearsReporting: { dataDD: StringDD, displayParams: { label: "External Arrears Reporting" } },
    numberOfMonthsArrears: { dataDD: NatNumDd, displayParams: { label: "Number of months arrears has been reported to agencies (this period)" } },
    actualMonthsDown: { dataDD: NatNumDd, displayParams: { label: "Actual Months Down (this period)" } },
    arrearsLetterSent: { dataDD: StringDD, displayParams: { label: "Arrears Letter Sent?" } },
    currentArrearsPct: { dataDD: NatNumDd, displayParams: { label: "Current Arrears %" } },
    lastCapitalizationDate: { dataDD: DateDD, displayParams: { label: "Date of Last Capitalization" } },
    contractualAmount: { dataDD: MoneyDD, displayParams: { label: "Arrears Contractual Amount" } },
    arrearsTotalBalance: { dataDD: MoneyDD, displayParams: { label: "Arrears Total Balance" } },
    paymentType: { dataDD: PaymentTypeDd, displayParams: { label: "Payment Type" } },
    collectionDate: { dataDD: DateDD, displayParams: { label: "Collection Date(dd/mm/yyy)" } },
    paymentReceived: { dataDD: MoneyDD, displayParams: { label: "Payment Received" } },
    minPayment: { dataDD: MoneyDD, displayParams: { label: "Minimum Payment" } },
    shortfall: { dataDD: MoneyDD, displayParams: { label: "Shortfall" } }
  }
}

export const accountOverviewExcessHistoryLineDataD: ExampleDataD = {
  name: "AccountOverviewExcessHistoryLine",
  description: "Account overview excess history data definition",
  structure: {
    start: { dataDD: DateDD },
    end: { dataDD: DateDD },
    consecutiveDays: { dataDD: NatNumDd },
  }
}

export const accountOverviewExcessHistoryLinesDataD: ExampleRepeatingD = {
  name: "AccountOverviewExcessLines", description: "", paged: false,
  display: TableCD,
  displayParams: {
    order: [ "consecutiveDays", "start", "end" ],
    copySelectedItemTo: [ 'currentSelectedExcessHistory' ]
  },
  dataDD: accountOverviewExcessHistoryLineDataD,
}

export const accountOverviewExcessHistoryDataD: ExampleDataD = {
  name: "AccountOverviewHistory",
  description: "Account overview history data definition",
  structure: {
    history: { dataDD: accountOverviewExcessHistoryLinesDataD }
  }
}

export const accountOverviewExcessPeriodDetailsLineDataD: ExampleDataD = {
  name: "AccountOverviewExcessPeriodDetailsLine",
  description: "Account overview excess period details data definition",
  structure: {
    start: { dataDD: DateDD },
    end: { dataDD: DateDD },
    consecutiveDays: { dataDD: NatNumDd },
  }
}

export const accountOverviewExcessPeriodDetailsLinesDataD: ExampleRepeatingD = {
  name: "AccountOverviewExcessPeriodDetailsLines", description: "", paged: false,
  display: TableCD,
  displayParams: {
    order: [ "consecutiveDays", "start", "end" ],
    copySelectedItemTo: [ 'currentSelectedExcessHistory' ]
  },
  dataDD: accountOverviewExcessPeriodDetailsLineDataD,
}

export const accountOverviewExcessPeriodDetailsDataD: ExampleDataD = {
  name: "AccountOverviewExcessPeriodDetails",
  description: "Account overview period details data definition",
  structure: {
    details: { dataDD: accountOverviewExcessPeriodDetailsLinesDataD }
  }
}

export const accountOverviewReasonDataD: ExampleDataD = {
  name: "AccountOverviewReason",
  description: "Account overview reason data definition",
  structure: {
    reason: { dataDD: ManyLineStringDD, sample: [ 'Second charge case' ] }
  }
}

const accountOverviewCriteriaLineDataD: ExampleDataD = {
  name: "AccountOverviewCriteriaLine",
  description: "Account overview data definition",
  structure: {
    criteria: { dataDD: OneLineStringDD, sample: [ 'Account Management', "Affordability check failed" ] }
  }
}

const accountOverviewCriteriaDataD: ExampleRepeatingD = {
  name: "AccountOverviewCriteria", description: "", paged: false,
  display: TableCD,
  displayParams: { order: [ "criteria" ] },
  dataDD: accountOverviewCriteriaLineDataD
}

export const agreementTypeDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: "AgreementType",
  description: "The component that displays agreement type",
  display: LabelAndDropDownCD,
  enum: { option1: 'Savings', checking: 'Checking', mixed: "Mixed" }
}

export const transactionTypeDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: "TransactionType",
  description: "The component that displays transaction type",
  display: LabelAndDropDownCD,
  enum: { option1: 'Option1', option2: 'Option2', option3: "Option3" }
}

export const accountOverviewAgreementTypeDataD: ExampleDataD = {
  name: "AccountOverviewAgreementType",
  description: "Account overview agreement type data definition",
  structure: {
    agreementType: { dataDD: agreementTypeDD },
    transactionHeading: { dataDD: transactionTypeDD }
  }
}

export const accountOverviewOptOutLineDataD: ExampleDataD = {
  name: "AccountOverviewOptOutLine",
  description: "Account overview opt out line data definition",
  structure: {
    optedOut: { dataDD: BooleanDD },
    addrLine5: { dataDD: StringDD },
    changedBy: { dataDD: StringDD },
    changedDate: { dataDD: DateDD },
  }
}

export const accountOverviewOptOutLinesDataD: ExampleRepeatingD = {
  name: "AccountOverviewOptOutLines", description: "", paged: false,
  display: TableCD,
  displayParams: {
    order: [ "optedOut", "addrLine5", "changedBy", "changedDate" ],
    copySelectedItemTo: [ 'optOut' ]
  },
  dataDD: accountOverviewOptOutLineDataD,
}

export const accountOverviewOptOutDataD: ExampleDataD = {
  name: "AccountOverviewOptOut",
  description: "Account overview opt-out data definition",
  structure: {
    optOut: { dataDD: accountOverviewOptOutLinesDataD }
  }
}

export const accountOverviewDataD: ExampleDataD = {
  name: "AccountOverview",
  description: "Account overview data definition",
  layout: { component: LayoutCd, displayParams: { details: '[[4,3],[7,6]]', displayAsCards: true}},
  structure: {
    score: { dataDD: IntegerDD, displayParams: { label: "Score" } },
    accountType: { dataDD: EAccountDisplayTypeDD, displayParams: { label: "Account Type" } },
    drawDownDate: { dataDD: DateDD, displayParams: { label: "Drawdown Date" } },
    repaymentDate: { dataDD: DateDD, displayParams: { label: "Repayment Date" } },
    propertyValue: { dataDD: MoneyDD, displayParams: { label: "Property Value" }, sample: [ 220000 ] },
    mul: { dataDD: MoneyDD, displayParams: { label: "MUL" }, sample: [ 173750 ] },
    drawDownAmount: { dataDD: MoneyDD, displayParams: { label: "Drawdown Amount" }, sample: [ 90007 ] },
    criteria: { dataDD: accountOverviewCriteriaDataD, displayParams: { label: "Criteria" } },
    zFlagSet: { dataDD: yesNoDD, displayParams: { label: "Z Flag Set", buttons: [ "reason" ] } },
    excessSixMonths: { dataDD: IntegerDD, displayParams: { label: "Times in Excess in past 6 months", buttons: [ "excessHistory" ] }, sample: [ 1, 2, 3 ] },
    bouncedDDs12Months: { dataDD: IntegerDD, displayParams: { label: "Number of bounced DDs in the last 12 months" }, sample: [ 3, 1, 0 ] },
    unpaidCardOrMisuseItems: { dataDD: { ...NatNumDd, display: UnpaidCardOrMisuseItemsCD }, displayParams: { flags: [ "accountFlags", "flags" ] }, sample: [ 0 ] },
    currentBalance: { dataDD: MoneyDD, displayParams: { label: "Current Balance" }, sample: [ 123, 563, 234 ] },
    currentInterestRate: { dataDD: NatNumDd, displayParams: { label: "Current Interest Rate" }, sample: [ 12, 1, 2 ] },
    facilities: { dataDD: accountOverviewFacilitiesDataD },
    highBalance: { dataDD: MoneyDD, displayParams: { label: "High Balance" }, sample: [1000,2000] },
    lowBalance: { dataDD: MoneyDD, displayParams: { label: "Low Balance" } , sample: [23,6354]},
    pctOfFacility: { dataDD: NatNumDd, displayParams: { label: "% of Facility" } , sample: [27,12]},
    eightyPctFacility: { dataDD: NatNumDd, displayParams: { label: "80.0% Facility" } , sample: [800,8000]},
    eightyFivePctFacility: { dataDD: NatNumDd, displayParams: { label: "85.0% Facility" } , sample: [234,456]},
  }
}

export const accountOverviewExcessInfoDataD: ExampleDataD = {
  name: "AccountOverviewExcessInfo",
  description: "Account overview excess info data definition",
  layout: { component: LayoutCd, displayParams: { details: '[[7]]', defaultProps: `{"valueWidth": 50}`, displayAsCards: true}},
  structure: {
    dayOfCurrentExcess: { dataDD: NatNumDd },
    currentExcessOnAccount: { dataDD: NatNumDd, displayParams: { label: "Current Excess on Account" } },
    currentPctExcess: { dataDD: NatNumDd },
    dateOfLastCapitalization: { dataDD: DateDD },
    dateOfLastExcessFulfillment: { dataDD: DateDD }
  }
}