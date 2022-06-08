import { ExampleRestD } from "../common";
import { CollectionItemDD, CollectionListDD, CollectionSummaryDD, CreatePaymentDD, MandateListDD, OverpaymentPageDD } from "./linkedAccountDetails.dataD";

import { FloatParam, IntParam, RestParams } from "../../common/restD";
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
  accountId: { ...IntParam, lens: '~/display/mandate/accountId', testValue: 143598 }
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
  accountId: { ...IntParam, lens: '~/display/mandate/accountId', testValue: '1' },
  paymentId: { ...IntParam, lens: '~/selectedCollectionItem/paymentId', testValue: '123' },
}


export const singleCollectionPaymentRD: ExampleRestD = {
  params: collectionPaymentParams,
  dataDD: CollectionItemDD,
  url: '/api/payment?{query}',
  actions: [ { state: 'cancel' }, { state: 'revalidate' } ],
  mutations: [
    { restAction: { state: 'cancel' }, mutateBy: { type: 'storedProc', name: 'auditCancel', schema: onlySchema, params: [ 'accountId', 'paymentId', 'brandRef' ] } },
    { restAction: { state: 'revalidate' }, mutateBy: { type: 'storedProc', name: 'auditrevalidate', schema: onlySchema, params: [ 'accountId', 'paymentId' ] } }
  ],
  states: {
    cancel: { url: '/api/payment/cancel?{query}', params: { ...fromCommonIds ( 'accountId', 'brandRef' ), paymentId: collectionPaymentParams.paymentId } },
    revalidate: { url: '/api/payment/revalidate?{query}', params: { ...fromCommonIds ( 'accountId' ), paymentId: collectionPaymentParams.paymentId } },
  }
}


export const createPaymentRD: ExampleRestD = {
  params: { ...collectionPaymentParams, amount: { ...FloatParam, lens: '~/createPayment/amount', testValue: '' } },
  dataDD: CreatePaymentDD,
  url: '/api/payment/create?{query}',
  actions: [ 'create' ],
  mutations: [
    {
      restAction: 'create', mutateBy: [
        { type: 'sql', name: 'create', sql: 'insert into', params: [ 'accountId','amount' ], schema: onlySchema },
        { type: 'storedProc', name: 'auditCreate', params: [ 'accountId' ], schema: onlySchema },
        // { mutation: 'manual', name: 'someMeaningfulName', code: [ 'some', 'lines', 'of code' ], params: [ 'accountId' ] },
      ],
    } ]
}


export const overpaymentHistoryRD: ExampleRestD = {
  params: { ...fromCommonIds ( 'clientRef', 'accountId', 'brandRef' ) },
  dataDD: OverpaymentPageDD,
  url: '/api/payment/overpayment/history?{query}',
  actions: [ 'get' ],
  resolvers: {
    'getOverpaymentPage': [
      {
        type: "manual", params: [ 'brandRef', { name: 'jurisdictionCode', type: 'output', javaType: 'String' } ], name: 'CalculateJurisdictionCode',
        code: [ 'String jurisdictionCode = brandRef == new Integer(10) ? "ROI": "GB";' ]
      },
      {
        type: 'sql', sql: 'select DATE from holidaytable where jurisdictionCode = ?',
        params: [ 'jurisdictionCode', { type: 'output', javaType: 'String', name: 'history', rsName: 'DATE' } ], name: 'getTheSql',
        schema: onlySchema
      } ]
  }
}