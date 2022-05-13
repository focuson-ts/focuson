import { ExampleDataD, ExampleRepeatingD } from "../common";

import { CheckboxInputCD, DataDrivenFixedOptionDropDownAndDetailsCD, LabelAndDropDownCD, LayoutCd, NumberInputCD, SelectedItemCD, TwoElementWithTitleLayoutCD } from "../../common/componentsD";
import { NatNumDd } from "../commonEnums";
import { AccountIdDD, BooleanDD, NumberPrimitiveDD, OneLineStringDD, StringDD, StringPrimitiveDD } from "../../common/dataD";
import { CustomerStatus } from "@focuson/form_components";

export const authorisedByCustomerDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'CustomerStatus',
  description: "Customer status enum",
  display: LabelAndDropDownCD,
  displayParams: { pleaseSelect: 'select this please', required: true },
  enum: { n: 'no', notyet: 'Not Yet', y: 'Yes' },
}

const ReadOnlyStringDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'ReadOnlyString',
  description: "A string that can only be viewed",
  displayParams: { readonly: true }
}
const ReadOnlyNatNumDD: NumberPrimitiveDD = {
  ...NatNumDd,
  name: 'ReadOnlyNatNum',
  description: "A number that can only be viewed",
  display: NumberInputCD,
  displayParams: { readonly: true }
}
export const RequestDetailsDD: ExampleDataD = {
  name: 'RequesterDetails',
  description: 'The information about the person who requested the paymets',
  layout: { component: LayoutCd, displayParams: { details: '[[1,1,1], [1], [1], [1], [1,1], [1,1]]' } },
  structure: {
    title: { dataDD: ReadOnlyStringDD, sample: [ 'Mr', 'Mrs' ] },
    forename: { dataDD: ReadOnlyStringDD, sample: [ 'Fred', 'Fredrica' ] },
    surname: { dataDD: ReadOnlyStringDD, sample: [ 'Bloggs', 'Smith' ] },
    fullname: { dataDD: ReadOnlyStringDD, sample: [ 'Fred Bloggs', 'Fredrica Smith' ] },
    addressLine1: { dataDD: ReadOnlyStringDD, sample: [ '4 Privat Drive', '11 Green Acres' ] },
    addressLine2: { dataDD: ReadOnlyStringDD, sample: [ 'Little Winging', 'Nether Wallop' ] },
    addressLine3: { dataDD: ReadOnlyStringDD, sample: [ 'Surrey', 'Aylesbury' ] },
    addressLine4: { dataDD: ReadOnlyStringDD, sample: [ 'UK' ] },
    postcode: { dataDD: ReadOnlyStringDD, sample: [ 'HG1 1FL', 'SO34 1DF' ] },
    phone: { dataDD: ReadOnlyStringDD, sample: [ '555 1234', '555 2344' ] },
    fax: { dataDD: ReadOnlyStringDD, sample: [ '5556365', '555 1231' ] }
  }
}

export const newBankDetailsDD: ExampleDataD = {
  name: 'NewBankDetails',
  description: 'Not really sure what is going on here',
  layout: { component: LayoutCd, displayParams: { details: '[[1,1,1], [1], [1], [1], [1], [1,1], [1,1]]' } },
  structure: {
    title: { dataDD: StringDD, sample: [ 'Mr', 'Mrs' ] },
    forename: { dataDD: OneLineStringDD, sample: [ 'Fred', 'Fredrica' ] },
    surname: { dataDD: OneLineStringDD, sample: [ 'Bloggs', 'Smith' ] },
    bank: { dataDD: OneLineStringDD, sample: [ 'Happy Bank', 'Sad Bank' ] },
    line1: { dataDD: OneLineStringDD, sample: [ '4 Privet drive', '27 Throughput Lane' ] },
    line2: { dataDD: OneLineStringDD, sample: [ 'Little Whinging', 'Woodfield' ] },
    line3: { dataDD: OneLineStringDD, sample: [ 'Surrey', '' ], displayParams: { required: false } },
    line4: { dataDD: OneLineStringDD, sample: [ 'England', 'Ireland' ] },
    postcode: { dataDD: OneLineStringDD, sample: [ 'LW12 5f', 'IR45 3GT' ], displayParams: { buttons: [ 'address' ] } },
    sortCode: { dataDD: OneLineStringDD, sample: [ '10-12-31', '34-43-23¶' ] },
    accountNo: { dataDD: AccountIdDD, sample: [100233, 345345 ] }
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

export const SinglePrint: ExampleDataD = {
  name: 'SinglePrint',
  description: 'Should I print this and how many are there',
  layout: { component: TwoElementWithTitleLayoutCD },
  structure: {
    shouldPrint: { dataDD: { ...BooleanDD, display: CheckboxInputCD } },
    numberOfItems: { dataDD: { ...ReadOnlyNatNumDD }, sample: [ 1, 2, 3, 4, 5, 6 ] },
  }
}

export const ListOfPaymentsDD: ExampleDataD = {
  name: 'ListOfPayments',
  description: 'The information about the person who requested the paymets',
  layout: { component: LayoutCd, displayParams: { details: '[[5,1]]' } },
  structure: {
    standingOrders: { dataDD: SinglePrint, sampleOffset: 0 },
    openBankingStandingOrders: { dataDD: SinglePrint, sampleOffset: 1 },
    directDebits: { dataDD: SinglePrint, sampleOffset: 2 },
    billPayments: { dataDD: SinglePrint, sampleOffset: 3 },
    openBanking: { dataDD: SinglePrint, sampleOffset: 4 },
  }
}

export const CurrentPaymentCountsDD: ExampleDataD = {
  name: 'CurrentPaymentCounts',
  description: 'The counts of the current types of payments',
  structure: {
    standingOrders: { dataDD: NatNumDd, sample: [ 3, 1, 0 ] },
    openBankingStandingOrders: { dataDD: NatNumDd, sample: [ 2, 4, 0 ] },
    directDebits: { dataDD: NatNumDd, sample: [ 5, 5, 0 ] },
    billPayments: { dataDD: NatNumDd, sample: [ 4, 2, 0 ] },
    openBanking: { dataDD: NatNumDd, sample: [ 0, 1, 0 ] },
  }
}
export const addressSearchDD: ExampleDataD = {
  name: 'AddressSearch',
  description: 'Seraching for address by postcode',
  structure: {
    postcode: {dataDD: OneLineStringDD}
  }
}


export const printRecordDD: ExampleDataD = {
  name: 'PrintRecordItem',
  description: 'A single request for the list of payments that happened at a point at time, or will happen when we click print',
  layout: { component: LayoutCd, displayParams: { details: '[[1],[1,3]]' } },
  guards: {
    requestedBy: { condition: 'in', path: 'requestedBy', values: { j: 'joint', m: 'main', n: 'new bank' } },
    alreadyPrinted: { condition: 'equals', path: 'alreadyPrinted', value: true },
  },
  sealedBy: 'alreadyPrinted',
  structure: {
    requestedBy: {
      dataDD: { ...StringDD, display: DataDrivenFixedOptionDropDownAndDetailsCD },
      displayParams: {
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
    alreadyPrinted: { dataDD: BooleanDD, sample: [ false, true, false ] }, //will be hidden but leaving visible for now.
    authorisedByCustomer: { dataDD: authorisedByCustomerDD, guard: { requestedBy: [ 'N' ] } },
  }
}

export const PrintRecordHistoryDD: ExampleRepeatingD = {
  name: 'PrintRecordHistory',
  dataDD: printRecordDD,
  display: SelectedItemCD,
  displayParams: { index: '~/selected', display: printRecordDD.name },
  paged: false,
  description: 'This is the list of all the requests for past payments'
}