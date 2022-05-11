import { ExampleRestD } from "../common";
import { CollectionItemDD, CollectionListDD, CollectionSummaryDD, CreatePaymentDD, MandateListDD, OverpaymentPageDD } from "./linkedAccountDetails.dataD";

import { IntParam, RestParams } from "../../common/restD";
import { onlySchema } from "../database/tableNames";
import { fromCommonIds } from "../commonIds";

export const linkedAccountParams: RestParams = fromCommonIds ( 'clientRef' );

export const allMandatesForClientRD: ExampleRestD = {
  params: linkedAccountParams,
  dataDD: MandateListDD,
  url: '/api/mandates/allForClient?{query}',
  actions: [ 'get' ]
}

export const collectionParams: RestParams = {
  ...linkedAccountParams,
  accountId: { ...IntParam, lens: '~/display/mandate/accountId', testValue: '143598547-75' }
}

export const collectionSummaryRD: ExampleRestD = {
  params: collectionParams,
  dataDD: CollectionSummaryDD,
  url: '/api/collections/summary?{query}',
  actions: [ 'get' ]
}

export const collectionHistoryListRD: ExampleRestD = {
  params: collectionParams,
  dataDD: CollectionListDD,
  url: '/api/collections/list?{query}',
  actions: [ 'get' ]
}

export const collectionPaymentParams: RestParams = {
  ...fromCommonIds ( 'clientRef', 'accountId' ),
  accountId: { ...IntParam, lens: '~/display/mandate/accountId', testValue: '1'},
  paymentId: { ...IntParam, lens: '~/selectedCollectionItem/paymentId', testValue: '123' },
}


export const singleCollectionPaymentRD: ExampleRestD = {
  params: collectionPaymentParams,
  dataDD: CollectionItemDD,
  url: '/api/payment?{query}',
  actions: [ { state: 'cancel' }, { state: 'revalidate' } ],
  audit: [
    { restAction: { state: 'cancel' }, storedProcedure: { name: 'auditCancel', schema: onlySchema, params: [ 'accountId', 'paymentId' ] } },
    { restAction: { state: 'revalidate' }, storedProcedure: { name: 'auditrevalidate', schema: onlySchema, params: [ 'accountId', 'paymentId' ] } }
  ],
  states: {
    cancel: { url: '/api/payment/cancel?{query}', useSql: { sql: 'write ', params: [ 'accountId', 'paymentId' ], schema: onlySchema } },
    revalidate: { url: '/api/payment/revalidate?{query}', useStoredProcedure: { name: 'revalidate', params: [ 'accountId', 'paymentId' ], schema: onlySchema } },
  }
}


export const createPaymentRD: ExampleRestD = {
  params: collectionPaymentParams,
  dataDD: CreatePaymentDD,
  url: '/api/payment/create?{query}',
  actions: [ 'create' ],
  audit: [
    { restAction: 'create', storedProcedure: { name: 'auditCreate', schema: onlySchema, params: [ 'accountId' ] } },
  ],
}


export const overpaymentHistoryRD: ExampleRestD = {
  params:   {...fromCommonIds ( 'clientRef', 'accountId' )},
  dataDD: OverpaymentPageDD,
  url: '/api/payment/overpayment/history?{query}',
  actions: [ 'get' ]
}