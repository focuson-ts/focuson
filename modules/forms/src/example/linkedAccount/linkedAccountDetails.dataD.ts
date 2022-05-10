import { ExampleDataD, ExampleRepeatingD } from "../common";
import { DateDD, IntegerDD, MoneyDD, OneLineStringDD, PrimitiveDD, StringDD, StringPrimitiveDD } from "../../common/dataD";
import { LabelAndDropDownCD, LayoutCd, TableCD } from "../../common/componentsD";

export const paymentReasonDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'PaymentReason',
  description: "An enum about why the payment is being mad",
  display: LabelAndDropDownCD,
  enum: { '': 'Select...', 'A': 'Allowance', 'O': 'Overpayment' }
}
export const periodDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'A Period',
  description: "An enum for monthly/yearly etc",
  display: LabelAndDropDownCD,
  enum: { 'Monthly': 'Monthly', 'Yearly': 'Yearly' }
}
export const paymentStatus: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'The status of a payment',
  description: "An enum that describes the lifecycles phases of the payment",
  display: LabelAndDropDownCD,
  enum: { 'COLLECTED': 'COLLECTED', 'CANCELLED': 'CANCELLED' }
}
const AccountDD: PrimitiveDD = {
  ...IntegerDD,
  name: "Account"
}

export const OverpaymentHistoryLineDD: ExampleDataD = {
  name: 'OverpaymentHistoryLine',
  description: 'A single overpayment in the past',
  structure: {
    amountReceived: { dataDD: MoneyDD, sample: [ 1234, 3656734 ] },
    date: { dataDD: DateDD, sample: [ '2020/10/1', '2021/9/1' ] },
    status: { dataDD: paymentStatus },
  }
}
export const OverpaymentHistory: ExampleRepeatingD = {
  dataDD: OverpaymentHistoryLineDD,
  description: "All the history ",
  display: TableCD,
  displayParams: { order: [ "amountReceived", 'date', 'status' ] },
  name: "OverpaymentHistory",
  paged: false
}
export const OverpaymentPageDD: ExampleDataD = {
  name: 'OverpaymentPage',
  description: 'A single overpayment in the past',
  structure: {
    history: { dataDD: OverpaymentHistory },
    drawDownDate: { dataDD: DateDD, sample: [ '2020/10/1', '2021/9/1' ] },
    initialBorrowing: { dataDD: MoneyDD, sample: [ 100010, 200020 ] },
  }
}

export const MandateDD: ExampleDataD = {
  name: 'Mandate',
  description: 'All the data displayed on the screen',
  layout: { component: LayoutCd, displayParams: { details: '[[3,3]]' } },
  structure: {
    sortCode: { dataDD: StringDD, sample: [ '10-11-12', '23-54-12' ] },
    accountId: { dataDD: AccountDD, sample: [ 12341234, 23456123, 3245454 ] },
    mandateStatus: { dataDD: StringDD, sample: [ 'ACTIVE' ] },
    bankName: { dataDD: StringDD, sample: [ 'Bank Of Happiness', 'Royal Bank of Success' ] },
    accountName: { dataDD: StringDD, sample: [ 'F & J Bloggs' ] },
    mandateRef: { dataDD: StringDD, sample: [ '12099845-34', '12099845-78' ] }
  }
}


export const MandateListDD: ExampleRepeatingD = {
  name: "MandateList",
  description: "The list of mandates that we display in the search results for 'select mandate'",
  display: TableCD,
  displayParams: {
    order: [ "sortCode", 'accountId', 'bankName', 'accountName', 'mandateRef', "mandateStatus" ],
    copySelectedItemTo: [ 'tempMandate' ],
    copySelectedIndexTo: [ 'selectIndex' ],
    prefixFilter: '~/selectMandateSearch/sortCode',
    prefixColumn: 'sortCode'
  },
  sampleCount: 5,
  dataDD: MandateDD,
  paged: false
}
export const MandateSearchDD: ExampleDataD = {
  name: 'MandateSearch',
  description: "The search sortcode and search results for a 'select mandate'",
  structure: {
    sortCode: { dataDD: StringDD, sample: [ '10-11-12', '23-54-12' ], displayParams: { required: false } },
    searchResults: { dataDD: MandateListDD },
  }
}

export const CollectionSummaryDD: ExampleDataD = {
  name: 'CollectionSummary',
  description: 'The four most important things about collection for a mandate, plus a couple of things we need to create a payment',
  layout: { component: LayoutCd, displayParams: { details: '[[2,2]]' } },
  structure: {
    lastCollectionDate: { dataDD: StringDD, sample: [ '2021/10/6', '2021/12/5' ] },
    lastCollectionAmount: { dataDD: MoneyDD, sample: [ 1234, 456455 ] },
    nextCollectionDate: { dataDD: StringDD, sample: [ '2022/10/6', '2022/12/6' ] },
    nextCollectionAmount: { dataDD: MoneyDD, sample: [ 13434, 123455 ] },
    allowance: { dataDD: MoneyDD, sample: [ 1000, 2000 ], hidden: true },
    period: { dataDD: periodDD, hidden: true },
  }
}


export const CreatePaymentDD: ExampleDataD = {
  name: 'CreatePayment',
  description: 'The data needed to make a payment',
  guards: { reasonIsAllowance: { condition: 'in', path: 'reason', values: paymentReasonDD.enum } },
  structure: {
    amount: { dataDD: MoneyDD, sample: [ 56657, 32834 ], displayParams: { min: 200 } },
    collectionDate: { dataDD: DateDD },
    reason: { dataDD: paymentReasonDD },
    allowance: { dataDD: MoneyDD, guard: { reasonIsAllowance: [ 'A' ] }, displayParams: { readonly: true } },
    period: { dataDD: periodDD, guard: { reasonIsAllowance: [ 'A' ] }, displayParams: { readonly: true } }
  }
}

export const CollectionItemDD: ExampleDataD = {
  name: 'CollectionItem',
  description: 'All the data displayed on the screen',
  structure: {
    paymentId: { dataDD: IntegerDD },
    collectionDate: { dataDD: DateDD },
    amount: { dataDD: MoneyDD, sample: [ 56657, 32834 ] },
    status: { dataDD: StringDD, sample: [ 'C', 'P' ] }
  }
}

export const CollectionListDD: ExampleRepeatingD = {
  name: "CollectionsList",
  description: "The list of collections or payments for the selection account",
  display: TableCD,
  displayParams: {
    order: [ "collectionDate", 'amount', 'status' ],
    copySelectedIndexTo: [ 'selectedCollectionIndex' ],
    copySelectedItemTo: [ 'selectedCollectionItem' ]
  },
  sampleCount: 4,
  dataDD: CollectionItemDD,
  paged: false
}

export const linkedAccountDetailsDD: ExampleDataD = {
  name: 'LinkedAccountDetailsDisplay',
  description: 'All the data displayed on the screen',
  layout: { component: LayoutCd, displayParams: { details: '[[1]]' } },
  structure: {
    mandate: { dataDD: MandateDD },
    collectionSummary: { dataDD: CollectionSummaryDD },
    collectionHistory: { dataDD: CollectionListDD }
  }
}