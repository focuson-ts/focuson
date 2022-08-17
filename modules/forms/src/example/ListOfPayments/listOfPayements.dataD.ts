import { ExampleDataD, ExampleRepeatingD } from "../common";

import { CheckboxAndNumberCD, DataDrivenFixedOptionDropDownAndDetailsCD, LabelAndDropDownCD, LayoutCd, SelectedItemCD, TableCD } from "../../common/componentsD";
import { AccountIdDD, BooleanDD, BooleanPrimitiveDD, DataD, DateDD, NatNumDd, OneLineStringDD, ReadOnlyStringDD, RepeatingDataD, StringDD, StringPrimitiveDD } from "../../common/dataD";
import { CustomerStatus } from "@focuson/form_components";
import { AllGuards } from "../../buttons/guardButton";
import { accountT, clientAddress_C60T, clientNames_C10T, postCodeSearchTable } from "../database/tableNames";

export const authorisedByCustomerDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'CustomerStatus',
  description: "Customer status enum",
  display: LabelAndDropDownCD,
  displayParams: { pleaseSelect: 'select this please', required: true },
  enum: { n: 'no', notyet: 'Not Yet', y: 'Yes' },
}


export const RequestDetailsDD: ExampleDataD = {
  name: 'RequesterDetails',
  description: 'The information about the person who requested the paymets',
  layout: { component: LayoutCd, displayParams: { details: '[[1,1,1], [1], [1], [1], [1,1], [1,1]]' } },

  structure: {
    title: { dataDD: ReadOnlyStringDD, db: { table: clientNames_C10T, field: 'ttl' }, sample: [ 'Mr', 'Mrs' ] },
    date: { dataDD: DateDD, db: { table: clientNames_C10T, field: 'startDate', format: { type: 'Date', pattern: 'dd-MM-yyyy' } } },
    forename: { dataDD: ReadOnlyStringDD, db: { table: clientNames_C10T, field: 'clifor' }, sample: [ 'Fred', 'Fredrica' ] },
    surname: { dataDD: ReadOnlyStringDD, db: { table: clientNames_C10T, field: 'clisur' }, sample: [ 'Bloggs', 'Smith' ] },
    fullname: { dataDD: { ...ReadOnlyStringDD, resolver: 'getFullName' }, sample: [ 'Fred Bloggs', 'Fredrica Smith' ] },
    addressLine1: { dataDD: ReadOnlyStringDD, db: { table: clientAddress_C60T, field: 'adrlneone' }, sample: [ '4 Privat Drive', '11 Green Acres' ] },
    addressLine2: { dataDD: ReadOnlyStringDD, db: { table: clientAddress_C60T, field: 'adrlneontwo' }, sample: [ 'Little Winging', 'Nether Wallop' ] },
    addressLine3: { dataDD: ReadOnlyStringDD, db: { table: clientAddress_C60T, field: 'adrlnethr' }, sample: [ 'Surrey', 'Aylesbury' ] },
    addressLine4: { dataDD: ReadOnlyStringDD, db: { table: clientAddress_C60T, field: 'adrlnefor' }, sample: [ 'UK' ] },
    postcode: { dataDD: ReadOnlyStringDD, db: { table: clientAddress_C60T, field: 'pcd' }, sample: [ 'HG1 1FL', 'SO34 1DF' ] },
    phone: { dataDD: ReadOnlyStringDD, db: { table: clientAddress_C60T, field: 'phone' }, sample: [ '555 1234', '555 2344' ] },
    fax: { dataDD: ReadOnlyStringDD, sample: [ '5556365', '555 1231' ] }
  }
}

export const newBankDetailsDD: ExampleDataD = {
  name: 'NewBankDetails',
  description: 'Not really sure what is going on here',
  layout: { component: LayoutCd, displayParams: { details: '[[1,1,1], [1], [1], [1], [1], [1,1], [1,1]]' } },
  structure: {
    title: { dataDD: StringDD, sample: [ 'Mr', 'Mrs' ], displayParams: { required: false } },
    forename: { dataDD: OneLineStringDD, sample: [ 'Fred', 'Fredrica' ], displayParams: { required: false } },
    surname: { dataDD: OneLineStringDD, sample: [ 'Bloggs', 'Smith' ], displayParams: { required: false } },
    bank: { dataDD: OneLineStringDD, sample: [ 'Happy Bank', 'Sad Bank' ] },
    line1: { dataDD: OneLineStringDD, sample: [ '4 Privet drive', '27 Throughput Lane' ] },
    line2: { dataDD: OneLineStringDD, sample: [ 'Little Whinging', 'Woodfield' ] },
    line3: { dataDD: OneLineStringDD, sample: [ 'Surrey', '' ], displayParams: { required: false } },
    line4: { dataDD: OneLineStringDD, sample: [ 'England', 'Ireland' ] },
    postcode: { dataDD: OneLineStringDD, sample: [ 'LW12 5f', 'IR45 3GT' ], displayParams: { buttons: [ 'address' ] } },
    sortCode: { dataDD: OneLineStringDD, sample: [ '10-12-31', '34-43-23' ], displayParams: { buttons: [ 'search' ] } },
    accountNo: { dataDD: AccountIdDD, sample: [ 100233, 345345 ] }
  }
}

export const AccountDetailsDD: ExampleDataD = {
  name: 'AccountDetailsForListOfPayments',
  description: 'The information about the people who have an account',
  structure: {
    main: { dataDD: RequestDetailsDD },
    joint: { dataDD: RequestDetailsDD, sampleOffset: 1 },
  }
}
//
// export const SinglePrint: ExampleDataD = {
//   name: 'SinglePrint',
//   description: 'Should I print this and how many are there',
//   layout: { component: TwoElementWithTitleLayoutCD },
//   structure: {
//     shouldPrint: { dataDD: { ...BooleanDD, emptyValue: true, display: CheckboxInputCD } },
//     numberOfItems: { dataDD: { ...ReadOnlyNatNumDD }, sample: [ 1, 2, 3, 4, 5, 6 ] },
//   }
// }


export const CheckboxAndNumberFromDatabaseDD: BooleanPrimitiveDD = {
  ...BooleanDD,
  emptyValue: true,
  display: CheckboxAndNumberCD,
}

export const ListOfPaymentsDD: ExampleDataD = {
  name: 'ListOfPayments',
  description: 'The information about the person who requested the payments',
  layout: { component: LayoutCd, displayParams: { details: '[[5,1]]' } },
  table: accountT,
  guards: {
    pageModeView: { condition: 'pageModeEquals', mode: 'view' }
  },
  structure: {
    standingOrders: { dataDD: CheckboxAndNumberFromDatabaseDD, displayParams: { number: '~/currentPayments/standingOrders' }, sampleOffset: 0 },
    openBankingStandingOrders: { dataDD: CheckboxAndNumberFromDatabaseDD, displayParams: { number: '~/currentPayments/openBankingStandingOrders' }, sampleOffset: 1 },
    directDebits: { dataDD: CheckboxAndNumberFromDatabaseDD, displayParams: { number: '~/currentPayments/directDebits' }, sampleOffset: 2 },
    billPayments: { dataDD: CheckboxAndNumberFromDatabaseDD, displayParams: { number: '~/currentPayments/billPayments' }, sampleOffset: 3 },
    openBanking: { dataDD: CheckboxAndNumberFromDatabaseDD, displayParams: { number: '~/currentPayments/openBanking' }, sampleOffset: 4 },
  }
}

export const CurrentPaymentCountsDD: ExampleDataD = {
  name: 'CurrentPaymentCounts',
  description: 'The counts of the current types of payments',
  table: accountT,
  structure: {
    standingOrders: { dataDD: NatNumDd, db: "directDebits", sample: [ 3, 1, 0 ] },
    openBankingStandingOrders: { dataDD: NatNumDd, sample: [ 2, 4, 0 ] },
    directDebits: { dataDD: NatNumDd, sample: [ 5, 5, 0 ] },
    billPayments: { dataDD: NatNumDd, sample: [ 4, 2, 0 ] },
    openBanking: { dataDD: NatNumDd, sample: [ 0, 1, 0 ] },
  }
}
export const postCodeDataForListOfPaymentsLineD: DataD<AllGuards> = {
  name: "PostCodeDataLineForListOfPayments",
  description: "",
  table: postCodeSearchTable,
  structure: {
    line1: { dataDD: OneLineStringDD, db: 'zzline1', sample: [ '4 Privet drive', '27 Throughput Lane' ] },
    line2: { dataDD: OneLineStringDD, db: 'zzline2', sample: [ 'Little Whinging', 'Woodfield' ] },
    line3: { dataDD: OneLineStringDD, db: 'zzline3', sample: [ 'Surrey', '' ], displayParams: { required: false } },
    line4: { dataDD: OneLineStringDD, db: 'zzline4', sample: [ 'England', 'Ireland' ] },
    postcode: { dataDD: OneLineStringDD, db: 'PC_POSTCODE', sample: [ 'LW12 5f', 'IR45 3GT' ] }
  }
}

export const postCodeSearchResponseDD: RepeatingDataD<AllGuards> = {
  name: "PostCodeSearchResponseForListOfPayments",
  description: "The array of all the data",
  dataDD: postCodeDataForListOfPaymentsLineD,
  paged: false,
  display: TableCD,
  displayParams: {
    emptyData: 'No results',
    tableTitle: 'Search results',
    order: [ 'postcode', 'line1', 'line2', 'line3', 'line4' ],
    copySelectedItemTo: [ 'selectedPostCodeAddress' ],
    copySelectedIndexTo: [ 'selectedPostCodeIndex' ]
  }
}

export const addressSearchDD: ExampleDataD = {
  name: 'AddressSearch',
  description: 'Searching for address by postcode',
  structure: {
    postcode: { dataDD: OneLineStringDD, displayParams: { buttons: [ 'search' ] } },
    searchResult: { dataDD: postCodeSearchResponseDD }
  }
}


export const printRecordDD: ExampleDataD = {
  name: 'PrintRecordItem',
  description: 'A single request for the list of payments that happened at a point at time, or will happen when we click print',
  layout: { component: LayoutCd, displayParams: { details: '[[1],[1,4]]' } },
  guards: {
    requestedByEnabled: { condition: 'pageModeEquals', mode: [ 'edit', 'create' ] },
    requestedBy: { condition: 'in', path: 'requestedBy', values: { j: 'joint', m: 'main', n: 'new bank' } },
    alreadyPrinted: { condition: 'equals', path: 'alreadyPrinted', value: true },
  },
  sealedBy: 'alreadyPrinted',
  structure: {
    id: { dataDD: NatNumDd, hidden: true, sample: [ 1, 2, 3 ] },
    requestedBy: {
      dataDD: { ...StringDD, emptyValue: undefined, allowUndefined: true, display: DataDrivenFixedOptionDropDownAndDetailsCD },
      displayParams: {
        pleaseSelect: 'Select...',
        enabledBy: 'requestedByEnabled',
        dontShowEmpty: true,
        details: {
          M: { valuePath: '~/accountDetails/main/fullname', dataPath: '~/accountDetails/main', display: RequestDetailsDD.name },
          J: { valuePath: '~/accountDetails/joint/fullname', dataPath: '~/accountDetails/joint', display: RequestDetailsDD.name },
          N: { value: 'New Bank', dataPath: 'newBankDetails', display: newBankDetailsDD.name },
        }
      },
      sample: [ 'M', 'J', 'N' ]
    },
    newBankDetails: { dataDD: newBankDetailsDD, hidden: true },
    // requesterDetails: { dataDD: RequestDetailsDD, guard: { requestedBy: [ 'M', 'J' ] } },
    listOfPayments: { dataDD: ListOfPaymentsDD },
    includeSingleAndInitialDirectDebits: { dataDD: BooleanDD },
    alreadyPrinted: { dataDD: { ...BooleanDD, resolver: 'alreadyPrinted' }, sample: [ false, true, false ] }, //will be hidden but leaving visible for now.
    authorisedByCustomer: { dataDD: authorisedByCustomerDD, guard: { requestedBy: [ 'N' ] } },
    datePrinted: { dataDD: StringDD, guard: { alreadyPrinted: [ 'true' ] } }
  }
}

export const PrintRecordHistoryDD: ExampleRepeatingD = {
  name: 'PrintRecordHistory',
  dataDD: printRecordDD,
  display: SelectedItemCD,
  displayParams: { index: '~/selected', display: printRecordDD.name, header: 'Request # ', showNofM: true },
  paged: false,
  description: 'This is the list of all the requests for past payments'
}