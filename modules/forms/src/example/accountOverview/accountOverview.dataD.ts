import { yesNoDD } from "../occupationAndIncome/occupationAndIncome.dataD";

import { ExampleDataD, ExampleRepeatingD } from "../common";
import { BooleanDD, DateDD, IntegerDD, MoneyDD, NatNumDd, OneLineStringDD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";
import { PaymentTypeDd } from "../commonEnums";
import { commonParams, DisplayCompD, LayoutCd, TableCD } from "../../common/componentsD";


const accountOneFlagDD: ExampleDataD = {
  name: "AccountOneFlag",
  description: "One flag from the backend, with the 'type' so that we know how to display",
  structure: {
    flagName: { dataDD: OneLineStringDD, sample: [ 'Terrorist', 'MI6 wanted list' ] },
    flagValue: { dataDD: BooleanDD },
  }
}

export const accountAllFlagsDD: ExampleRepeatingD = {
  name: "AccountAllFlagsList", description: "", paged: false,
  display: TableCD,
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
    history: { dataDD: arrearsDetailsLinesDataD }
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
    order: [ "start", "end", "consecutiveDays" ],
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

export const accountOverviewReasonDataD: ExampleDataD = {
  name: "AccountOverviewReason",
  description: "Account overview reason data definition",
  structure: {
    reason: { dataDD: OneLineStringDD, sample: [ 'Really good reason' ] }
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

export const UnpaidCardOrMisuseItemsCD: DisplayCompD = {
  import: "../copied/unpaidCardOrMisuseItems",
  name: "UnpaidCardOrMisuseItems",
  params: { ...commonParams, id: { paramType: 'object', needed: 'id' } }

}

export const accountOverviewDataD: ExampleDataD = {
  name: "AccountOverview",
  description: "Account overview data definition",
  layout: { component: LayoutCd, displayParams: { details: '[[3,3],[20]]' } },
  structure: {
    score: { dataDD: IntegerDD },
    accountType: { dataDD: EAccountDisplayTypeDD },
    drawDownDate: { dataDD: DateDD },
    repaymentDate: { dataDD: DateDD },
    //@ts-ignore
    propertyValue: { dataDD: MoneyDD, sample: [ 220000 ] },
    //@ts-ignore
    mul: { dataDD: MoneyDD, sample: [ 173750 ] },
    //@ts-ignore
    drawDownAmount: { dataDD: MoneyDD, sample: [ 90007 ], table: '', field: 'ddamnt' },
    criteria: { dataDD: accountOverviewCriteriaDataD },
    zFlagSet: { dataDD: yesNoDD, displayParams: { button: "reason" } },
    excessSixMonths: { dataDD: IntegerDD, displayParams: { button: "excessHistory" } },
    bouncedDDs12Months: { dataDD: IntegerDD },
    unpaidCardOrMisuseItems: { dataDD: { ...IntegerDD, display: UnpaidCardOrMisuseItemsCD } }
  }
}

export const accountOverviewExcessInfoDataD: ExampleDataD = {
  name: "AccountOverviewExcessInfo",
  description: "Account overview excess info data definition",
  structure: {
    dayOfCurrentExcess: { dataDD: NatNumDd },
    currentExcessOnAccount: { dataDD: NatNumDd, displayParams: { label: "Current Excess on Account" } },
    currentPctExcess: { dataDD: NatNumDd },
    dateOfLastCapitalization: { dataDD: DateDD },
    dateOfLastExcessFulfillment: { dataDD: DateDD }
  }
}