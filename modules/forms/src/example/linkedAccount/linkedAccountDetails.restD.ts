import { ExampleRestD } from "../common";
import { CollectionItemDD, CollectionListDD, CollectionSummaryDD, CreatePaymentDD, MandateListDD } from "./linkedAccountDetails.dataD";

import { FloatParam, IntParam, RestParams } from "../../common/restD";
import { collectionHistoryTableDD, onlySchema } from "../database/tableNames";
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
  accountId: { ...IntParam, lens: '~/display/mandate/accountId', testValue: 143598 },

}

export const collectionSummaryRD: ExampleRestD = {
  params: collectionParams,
  dataDD: CollectionSummaryDD,
  url: '/api/collections/summary?{query}',
  actions: [ 'get' ],
  resolvers: {
    getAccountType: {
      type: 'sqlFunction', name: 'getAccountType', package: 'b00', schema: onlySchema,
      params: [
        { type: 'output', name: 'accountType', javaType: 'Integer', sqlType: 'INTEGER' },
      ]
    }
  }
}
export const collectionHistoryListRD: ExampleRestD = {
  params: collectionParams,
  dataDD: CollectionListDD,
  url: '/api/collections/list?{query}',
  actions: [ 'get' ],
  tables: {
    entity: {
      type: 'Main',
      idStrategy: { type: 'WithoutId' },
      table: collectionHistoryTableDD,
      alias: 'CH'
    },
    where: []
  },
  mutations: [
    {
      restAction: 'get', mutateBy: [ {
        type: 'sql', makeMock: false, sql: `select amount as amountd, id, amount as amounts
                                            from ${collectionHistoryTableDD.name}`, params: [
          { type: 'output', name: 'amtDouble', format: { type: 'Double', pattern: '%,2f' }, rsName: 'amountd', javaType: 'String' },
          { type: 'output', name: 'id', format: { type: 'Integer', pattern: '%d' }, rsName: 'id', javaType: 'String' },
          { type: 'output', name: 'amtString', format: { type: 'String', pattern: '%s' }, rsName: 'amounts', javaType: 'String' }
        ], schema: onlySchema
      } ]
    },

  ]

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
    {
      restAction: { state: 'cancel' },
      mutateBy: {
        type: 'storedProc', name: 'auditCancel',
        schema: onlySchema, params: [ 'accountId', 'paymentId', 'brandRef' ]
      }
    },


    { restAction: { state: 'revalidate' }, mutateBy: { type: 'storedProc', name: 'auditrevalidate', schema: onlySchema, params: [ 'accountId', 'paymentId' ] } }
  ],
  states: {
    cancel: { url: '/api/payment/cancel?{query}', params: { ...fromCommonIds ( 'accountId', 'brandRef' ), paymentId: collectionPaymentParams.paymentId } },


    revalidate: { url: '/api/payment/revalidate?{query}', params: { ...fromCommonIds ( 'accountId' ), paymentId: collectionPaymentParams.paymentId } },
  }
}


export const createPaymentRD: ExampleRestD = {
  params: { ...fromCommonIds ( 'clientRef', 'accountId' ), amount: { ...FloatParam, lens: '~/createPayment/amount', testValue: '' } },
  dataDD: CreatePaymentDD,
  url: '/api/payment/create?{query}',
  actions: [ 'create' ],
  mutations: [
    {
      restAction: 'create', mutateBy: [
        { type: 'sql', name: 'create', sql: 'insert into', params: [ 'accountId', 'amount' ], schema: onlySchema },
        { type: 'storedProc', name: 'auditCreate', params: [ 'accountId' ], schema: onlySchema },
        // { mutation: 'manual', name: 'someMeaningfulName', code: [ 'some', 'lines', 'of code' ], params: [ 'accountId' ] },
      ],
    } ]
}

