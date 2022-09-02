import { ExampleDataD, ExampleRepeatingD } from "../common";
import { AccountIdDD, BooleanDD, DateDD, MoneyDD, NatNumDd, StringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { AuthoriseTableCD, SummaryDetailsCD } from "./custom";
import { AuthoriseCustomisation } from "./authoriseCharges.customise";
import { memoise } from "@focuson/utils";

export const operatorEligableDD: ExampleDataD = {
  name: 'OperatorEligability',
  description: 'is the operator eligable',
  structure: {
    canApprove: { dataDD: BooleanDD },
    canAuthorise: { dataDD: BooleanDD },
  }
}
export function summaryOfChargesDateDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return memoise('summaryOfChargesDateDD', c.pageName)(() =>({
    name: 'SummaryOfChargesDate',
    description: 'The information about a date that has charges on it',
    structure: { dateCreated: { dataDD: DateDD } }
  }))
}
export function summaryOfChargesDateTableDD ( c: AuthoriseCustomisation ): ExampleRepeatingD {
  return memoise('summaryOfChargesDateTableDD', c.pageName)(() =>({
    name: 'SummaryOfChargesDateTable',
    description: 'The list of OneBrands',
    dataDD: summaryOfChargesDateDD ( c ),
    display: TableCD,
    displayParams: { order: [ 'dateCreated' ], copySelectedItemTo: [ 'selectedDateItem' ], copySelectedIndexTo: [ 'selectedDateIndex' ] },
    paged: false,
  }))
}
export function summaryOfChargesSearchDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return memoise('summaryOfChargesSearchDD', c.pageName)(() =>({
    name: 'SummaryOfChargesSearch',
    description: 'search and result',
    structure: {
      date: { dataDD: StringDD },
      searchResults: { dataDD: summaryOfChargesDateTableDD ( c ) }
    }
  }))
}

export function OneBrandDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return memoise('OneBrandDD', c.pageName)(() =>({
    name: 'OneBrand',
    description: 'the information in a drop down allowing us to select a brand',
    structure: {
      id: { dataDD: NatNumDd, sample: [ 1, 2, 3 ] },
      brand: { dataDD: StringDD, sample: [ 'Happy Bank', 'Sad Bank', 'Another Bank' ] }
    }
  }))
}


export function SelectOneBrandDD ( c: AuthoriseCustomisation ): ExampleRepeatingD {
  return memoise('SelectOneBrandDD', c.pageName)(() =>({
    name: 'AuthorisePayments',
    description: 'The list of OneBrands',
    dataDD: OneBrandDD ( c ),
    display: TableCD,
    displayParams: { order: [ 'brand' ], copySelectedItemTo: [ 'selectedItem' ], copySelectedIndexTo: [ 'selectedIndex' ] },
    paged: false,
  }))
}
export function OneChargeDataDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return memoise ( 'OneChargeDataDD', c.pageName ) ( () => ({
    name: 'OneChargeData',
    description: 'All the data we see on the main authoriseCharges page',
    table: c.authoriseTable,
    structure: {
      chargeType: { dataDD: StringDD, db: 'chargeType', sample: [ 'Unpaid DD', 'Unpaid DD fee' ] },
      status: { dataDD: StringDD, db: 'status', sample: [ 'PENDING', 'APPROVED', 'AUTHORISED' ] },
      type: { dataDD: StringDD, db: 'type', sample: [ 'DR', 'CR' ] },
      sortCode: { dataDD: StringDD, db: 'sortCode', sample: [ '166051', '166052' ] },
      accountNo: { dataDD: StringDD, db: 'accountNo', sample: [ '10009126' ] },
      amount: { dataDD: StringDD, db: 'amount', sample: [ '1.00', '1.00' ] },
      narrative: { dataDD: StringDD, db: 'narrative', sample: [ 'unpaid DD' ] },
      approvedBy: { dataDD: StringDD, db: 'approvedBy', sample: [ '', 'The Boss', 'The Boss' ] },
      authorisedBy: { dataDD: StringDD, db: 'authorisedBy', sample: [ '', '', 'The Super Boss' ] },
      hold: { dataDD: BooleanDD, sample: [ false, false, false ] }
    }
  }) )
}
export function ListOfChargesDD ( c: AuthoriseCustomisation ): ExampleRepeatingD {
  return memoise ( 'ListOfChargesDD', c.pageName ) ( () => ({
    name: 'ListOfCharges',
    description: 'All the charges',
    dataDD: OneChargeDataDD ( c ),
    display: AuthoriseTableCD,
    sampleCount: 10,
    displayParams: {
      order: [ 'chargeType', 'status', 'type', 'sortCode', 'accountNo', 'amount', 'narrative', 'hold' ],
      copySelectedItemTo: '~/selectedCharge',
      copySelectedIndexTo: '~/selectedChargeIndex'
    },
    paged: false
  }) )
}
export function SummaryData ( c: AuthoriseCustomisation ): ExampleRepeatingD {
  return  memoise ( 'SummaryData', c.pageName) ( () => ({
    name: 'SummaryData',
    description: 'This is actually the same data as ListOfChargesDD, however it has a different display',
    dataDD: OneChargeDataDD ( c ),
    display: SummaryDetailsCD,
    displayParams: { accountId: '~/selectedCharge/accountNo', selectedItem: '~/selectedChargeItem' },
    paged: false
  }))
}
export function RememberedData ( c: AuthoriseCustomisation ): ExampleDataD {
  return  memoise ( 'RememberedData', c.pageName ) ( () => ({
    name: 'Remembered',
    description: `the type to remember 'what was clicked on' in the summary table`,
    structure: {
      chargeType: { dataDD: StringDD },
      status: { dataDD: StringDD },
      accAmount: { dataDD: NatNumDd },
      accountId: { dataDD: { ...StringDD, allowUndefined: true } }
    }
  }))
}


export function AuthoriseChargesSummaryDataDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return  memoise ( 'AuthoriseChargesSummaryDataDD', c.pageName ) ( () => ({
    name: 'AuthoriseChargesSummaryData',
    description: 'All the data we see on the main authoriseCharges page',
    structure: {
      originalData: { dataDD: ListOfChargesDD ( c ), hidden: true },
      editingData: { dataDD: ListOfChargesDD ( c ) },
    }
  }))
}
export function AuthoriseChargesSummaryDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return  memoise ( 'AuthoriseChargesSummaryDD', c.pageName) ( () => ({
    name: 'AuthoriseChargesSummary',
    description: 'All the data we see on the main authoriseCharges page',
    structure: {
      date: { dataDD: StringDD, displayParams: { buttons: [ 'selectDate' ] } },
      fromApi: { dataDD: AuthoriseChargesSummaryDataDD ( c ) },
    }
  }))
}
export function SuspenseAccountLinesDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return  memoise ( 'SuspenseAccountLinesDD', c.pageName) ( () => ({
    name: 'SuspenseAccountLines',
    description: 'A single line in the suspense accountdetails',
    structure: {
      suspenseAccount: { dataDD: StringDD, sample: [ 'Account charges - unpaid DD' ] },
      value: { dataDD: MoneyDD, sample: [ 25, 25 ] },
      status: { dataDD: StringDD, sample: [ 'PENDING', 'AUTHORISED' ] }
    }
  }))
}

export function SuspenseAccountDetailsDD ( c: AuthoriseCustomisation ): ExampleRepeatingD {
  return  memoise ( 'SuspenseAccountDetailsDD', c.pageName ) ( () => ({
    name: 'SuspenseAccountDetails',
    description: 'the table of the account details',
    dataDD: SuspenseAccountLinesDD ( c ),
    display: TableCD,
    displayParams: { order: [ 'suspenseAccount', 'value', 'status' ] },
    paged: false
  }))
}


export function customerTransactionLineDD ( c: AuthoriseCustomisation ): ExampleDataD {
  return  memoise ( 'customerTransactionLineDD', c.pageName) ( () => ({
    name: 'CustomerTransactionLine',
    description: 'One line for the customer transaction',
    structure: {
      surname: { dataDD: StringDD, sample: [ 'bloggs', 'smith' ] },
      vir: { dataDD: StringDD, sample: [ 'vir1', 'vir2' ] },
      accountNo: { dataDD: AccountIdDD, sample: [ 88888888, 99999999, 11111111 ] },
      amount: { dataDD: MoneyDD, sample: [ 103, 202, 301 ] },
      charge: { dataDD: MoneyDD, sample: [ 10, 10, 10 ] },
      time: { dataDD: StringDD, sample: [ '2022/10/1', '2022/10/1', '2022/11/1' ] },
    }
  }))
}

export function CustomerTransactionsDD ( c: AuthoriseCustomisation ): ExampleRepeatingD {
  return  memoise ( 'CustomerTransactionsDD', c.pageName) ( () => ({
    name: 'CustomerTransactions',
    description: 'the table of the customer transations',
    dataDD: customerTransactionLineDD ( c ),
    display: TableCD,
    displayParams: { order: [ 'surname', 'vir', 'accountNo', 'amount', 'charge', 'time' ] },
    paged: false
  }))
}

// export const chargesSummaryDetailDD: ExampleDataD = {
//   name: 'ChargesSummaryDetail',
//   description: 'A summary of charges',
//   structure: {
//     suspenseAccount: { dataDD: SuspenseAccountDetailsDD },
//     customerTransactions: { dataDD: CustomerTransactionsDD },
//   }
// }
