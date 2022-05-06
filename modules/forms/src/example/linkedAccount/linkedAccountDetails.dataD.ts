import { ExampleDataD, ExampleRepeatingD } from "../common";
import { DateDD, IntegerDD, MoneyDD, PrimitiveDD, StringDD } from "../../common/dataD";
import { LayoutCd, TableCD } from "../../common/componentsD";


const AccountDD: PrimitiveDD = {
  ...IntegerDD,
  name: "Account"
}
export const MandateDD: ExampleDataD = {
  name: 'Mandate',
  description: 'All the data displayed on the screen',
  layout: { component: LayoutCd, displayParams: { details: '[[3,3]]' } },
  structure: {
    sortCode: { dataDD: StringDD, sample: [ '10-11-12', '23-54-12' ] },
    accountId: { dataDD: AccountDD, sample: [ 12341234, 23456123, 3245454 ] },
    mandateStatus: { dataDD: StringDD, sample: [ 'ACTIVE' ] },
    bankName: { dataDD: StringDD, sample: [ 'NatWest', 'RBS' ] },
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
    sortCode: { dataDD: StringDD, sample: [ '10-11-12', '23-54-12' ] },
    searchResults: { dataDD: MandateListDD },
  }
}
export const CollectionSummaryDD: ExampleDataD = {
  name: 'CollectionSummary',
  description: 'The four most important things about collection for a mandate',
  layout: { component: LayoutCd, displayParams: { details: '[[2,2]]' } },
  structure: {
    lastCollectionDate: { dataDD: StringDD, sample: [ '2021/10/6', '2021/12/5' ] },
    lastCollectionAmount: { dataDD: MoneyDD, sample: [ 1234, 456455 ] },
    nextCollectionDate: { dataDD: StringDD, sample: [ '202/10/6', '2022/12/6' ] },
    nextCollectionAmount: { dataDD: MoneyDD, sample: [ 13434, 123455 ] },
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