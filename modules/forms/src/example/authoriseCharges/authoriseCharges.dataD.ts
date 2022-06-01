import { ExampleDataD, ExampleRepeatingD } from "../common";
import { BooleanDD, DateDD, MoneyDD, NatNumDd, StringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { AuthoriseTableCD } from "./custom";


export const summaryOfChargesDateDD: ExampleDataD = {
  name: 'SummaryOfChargesDate',
  description: 'The information about a date that has charges on it',
  structure: { dateCreated: { dataDD: DateDD } }
}
export const summaryOfChargesDateTableDD: ExampleRepeatingD = {
  name: 'SummaryOfChargesDateTable',
  description: 'The list of OneBrands',
  dataDD: summaryOfChargesDateDD,
  display: TableCD,
  displayParams: { order: [ 'dateCreated' ], copySelectedItemTo: [ 'selectedDateItem' ], copySelectedIndexTo: [ 'selectedDateIndex' ] },
  paged: false,
}
export const summaryOfChargesSearchDD: ExampleDataD = {
  name: 'SummaryOfChargesSearch',
  description: 'search and result',
  structure: {
    date: { dataDD: StringDD },
    searchResults: { dataDD: summaryOfChargesDateTableDD }
  }
}

export const OneBrandDD: ExampleDataD = {
  name: 'OneBrand',
  description: 'the information in a drop down allowing us to select a brand',
  structure: {
    id: { dataDD: NatNumDd, sample: [ 1, 2, 3 ] },
    brand: { dataDD: StringDD, sample: [ 'Happy Bank', 'Sad Bank', 'Another Bank' ] }
  }
}


export const SelectOneBrandDD: ExampleRepeatingD = {
  name: 'AuthorisePayments',
  description: 'The list of OneBrands',
  dataDD: OneBrandDD,
  display: TableCD,
  displayParams: { order: [ 'brand' ], copySelectedItemTo: [ 'selectedItem' ], copySelectedIndexTo: [ 'selectedIndex' ] },
  paged: false,
}
export const OneChargeDataDD: ExampleDataD = {
  name: 'OneChargeData',
  description: 'All the data we see on the main authoriseCharges page',
  structure: {
    chargeType: { dataDD: StringDD, sample: [ 'Unpaid DD', 'Unpaid DD fee' ] },
    status: { dataDD: StringDD, sample: [ 'PENDING', 'APPROVED', 'AUTHORISED' ] },
    type: { dataDD: StringDD, sample: [ 'DR', 'CR' ] },
    sortCode: { dataDD: StringDD, sample: [ '166051', '166052' ] },
    accountNo: { dataDD: StringDD, sample: [ '10009126' ] },
    amount: { dataDD: StringDD, sample: [ '1.00', '1.00' ] },
    narrative: { dataDD: StringDD, sample: [ 'unpaid DD' ] },
    approvedBy: { dataDD: StringDD, sample: [ '', 'The Boss', 'The Boss' ] },
    authorisedBy: { dataDD: StringDD, sample: [ '', '', 'The Super Boss' ] },
    hold: { dataDD: BooleanDD, sample: [ false, false, false ] }
  }
}
export const ListOfChargesDD: ExampleRepeatingD = {
  name: 'ListOfCharges',
  description: 'All the charges',
  dataDD: OneChargeDataDD,
  display: AuthoriseTableCD,
  displayParams: { order: [ 'chargeType', 'status', 'type', 'sortCode', 'accountNo', 'amount', 'narrative', 'hold' ], copySelectedItemTo: '~/selectedCharge' },
  paged: false
}

export const AuthoriseChargesSummaryDataDD: ExampleDataD = {
  name: 'AuthoriseChargesSummaryData',
  description: 'All the data we see on the main authoriseCharges page',
  structure: {
    originalData: { dataDD: ListOfChargesDD, hidden: true },
    editingData: { dataDD: ListOfChargesDD },
  }
}
export const AuthoriseChargesSummaryDD: ExampleDataD = {
  name: 'AuthoriseChargesSummary',
  description: 'All the data we see on the main authoriseCharges page',
  structure: {
    date: { dataDD: StringDD, displayParams: { buttons: [ 'selectDate' ] } },
    fromApi: { dataDD: AuthoriseChargesSummaryDataDD },
  }
}
export const SuspenseAccountLinesDD: ExampleDataD = {
  name: 'SuspenseAccountLines',
  description: 'A single line in the suspense accountdetails',
  structure: {
    suspenseAccount: { dataDD: StringDD, sample: [ 'Account charges - unpaid DD' ] },
    value: { dataDD: MoneyDD, sample: [ 25, 25 ] },
    status: { dataDD: StringDD, sample: [ 'PENDING', 'AUTHORISED' ] }
  }
}

export const SuspenseAccountDetailsDD: ExampleRepeatingD = {
  name: 'SuspenseAccountDetails',
  description: 'the table of the account details',
  dataDD: SuspenseAccountLinesDD,
  display: TableCD,
  displayParams: { order: [ 'suspenseAccount', 'value', 'status' ] },
  paged: false
}


export const customerTransactionLineDD: ExampleDataD = {
  name: 'CustomerTransactionLine',
  description: 'One line for the customer transaction',
  structure: {
    surname: { dataDD: StringDD },
    vir: { dataDD: StringDD },
    accountNo: { dataDD: StringDD },
    amount: { dataDD: MoneyDD },
    charge: { dataDD: StringDD },
    time: { dataDD: StringDD },
  }
}

export const CustomerTransactionsDD: ExampleRepeatingD = {
  name: 'CustomerTransactions',
  description: 'the table of the customer transations',
  dataDD: customerTransactionLineDD,
  display: TableCD,
  displayParams: { order: [ 'surname', 'vir', 'accountNo', 'amount', 'charge', 'time' ] },
  paged: false
}

export const chargesSummaryDetailDD: ExampleDataD = {
  name: 'ChargesSummaryDetail',
  description: 'A summary of charges',
  structure: {
    suspenseAccount: { dataDD: SuspenseAccountDetailsDD },
    customerTransactions: { dataDD: CustomerTransactionsDD },
  }
}
