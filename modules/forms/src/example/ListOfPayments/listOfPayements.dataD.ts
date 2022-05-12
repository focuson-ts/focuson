import { ExampleDataD, ExampleRepeatingD } from "../common";

import { CheckboxInputCD, DataDrivenFixedOptionDropDownAndDetailsCD, LabelAndDropDownCD, LayoutCd, NumberInputCD, SelectedItemCD, TwoElementWithTitleLayoutCD } from "../../common/componentsD";
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
    standingOrders: { dataDD: NatNumDd, sample: [ 3, 1, 3 ] },
    openBankingStandingOrders: { dataDD: NatNumDd, sample: [ 2, 4, 3 ] },
    directDebits: { dataDD: NatNumDd, sample: [ 5, 5, 5 ] },
    billPayments: { dataDD: NatNumDd, sample: [ 4, 2, 1 ] },
    openBanking: { dataDD: NatNumDd, sample: [ 0, 1, 2 ] },
  }
}


export const printRecordDD: ExampleDataD = {
  name: 'PrintRecordItem',
  description: 'A single request for the list of payments that happened at a point at time, or will happen when we click print',
  layout: { component: LayoutCd, displayParams: { details: '[[1],[1,3]]' } },
  guards: {
    requestedBy: { condition: 'in', path: 'requestedBy', values: { j: 'joint', m: 'main', n: 'new bank' } },
    alreadyPrinted: { condition: 'equals', path: 'alreadyPrinted', value: true }
  },
  sealedBy: 'alreadyPrinted',
  structure: {
    requestedBy: {
      dataDD: { ...StringDD, display: DataDrivenFixedOptionDropDownAndDetailsCD },
      displayParams: {
        details: {
          M: { valuePath: '~/accountDetails/main/fullname', dataPath: '~/accountDetails/main', display: RequestDetailsDD.name },
          J: { valuePath: '~/accountDetails/joint/fullname', dataPath: '~/accountDetails/joint', display: RequestDetailsDD.name },
          N: { value: 'New Bank'},

        }
      },
      sample: [ 'M', 'J', 'N' ]
    },
    // requesterDetails: { dataDD: RequestDetailsDD, guard: { requestedBy: [ 'M', 'J' ] } },
    listOfPayments: { dataDD: ListOfPaymentsDD },
    includeSingleAndInitialDirectDebits: { dataDD: BooleanDD },
    alreadyPrinted: { dataDD: BooleanDD }, //will be hidden but leaving visible for now.
    // authorisedByCustomer: { dataDD: authorisedByCustomerDD},//, guard: { requestedBy: [ 'm', 'j' ] } },
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