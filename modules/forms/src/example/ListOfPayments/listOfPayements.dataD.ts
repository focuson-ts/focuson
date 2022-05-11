import { ExampleDataD, ExampleRepeatingD } from "../common";

import { CheckboxInputCD, LabelAndDropDownCD, LayoutCd, NumberInputCD, SelectedItemCD, TwoElementWithTitleLayoutCD } from "../../common/componentsD";
import { NatNumDd } from "../commonEnums";
import { BooleanDD, NumberPrimitiveDD, OneLineStringDD, StringDD, StringPrimitiveDD } from "../../common/dataD";
import { CustomerStatus } from "@focuson/form_components";

export const authorisedByCustomerDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'CustomerStatus',
  description: "Customer status enum",
  display: LabelAndDropDownCD,
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
    addressLine1: { dataDD: ReadOnlyStringDD, sample: [ '4 Privat Drive', ' 11 Green Acres' ] },
    addressLine2: { dataDD: ReadOnlyStringDD, sample: [ 'Little Winging', 'Nether Wallop' ] },
    addressLine3: { dataDD: ReadOnlyStringDD, sample: [ 'Surrey', 'Aylesbury' ] },
    addressLine4: { dataDD: ReadOnlyStringDD, sample: [ 'UK' ] },
    postcode: { dataDD: ReadOnlyStringDD, sample: [ 'HG1 1FL', 'SO34 1DF' ] },
    phone: { dataDD: ReadOnlyStringDD, sample: [ '555 1234', '555 2344' ] },
    fax: { dataDD: ReadOnlyStringDD, sample: [ '5556365', '555 1231' ] }
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

export const printRecordDD: ExampleDataD = {
  name: 'PrintRecordItem',
  description: 'A single request for the list of payments that happened at a point at time, or will happen when we click print',
  layout: { component: LayoutCd, displayParams: { details: '[[1,1],[1,3]]' } },
  guards: {
    requestedBy: { condition: 'in', path: 'requestedBy', values: { j: 'joint', m: 'main', n: 'new bank' } },
    alreadyPrinted: { condition: 'equals', path: 'alreadyPrinted', value: true }
  },
  sealedBy: 'alreadyPrinted',
  structure: {
    requestedBy: { dataDD: StringDD, sample: ['m', 'j', 'new bank'] },
    requesterDetails: { dataDD: RequestDetailsDD, guard: { requestedBy: [ 'm', 'j' ] } },
    listOfPayments: { dataDD: ListOfPaymentsDD },
    includeSingleAndInitialDirectDebits: { dataDD: BooleanDD },
    authorisedByCustomer: { dataDD: authorisedByCustomerDD, guard: { requestedBy: [ 'm', 'j' ] } },
    alreadyPrinted: { dataDD: BooleanDD, sampleOffset: 0}, //will be hidden but leaving visible for now. The sample offset means that the first one is not printed... just dev experimence
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