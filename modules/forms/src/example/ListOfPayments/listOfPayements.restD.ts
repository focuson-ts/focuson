import { ExampleRestD } from "../common";

import { AccountDetailsDD, CurrentPaymentCountsDD, postCodeSearchResponseDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { IntParam, RestD, RestParams, StringParam } from "../../common/restD";
import { accountT, onlySchema } from "../database/tableNames";
import { AllGuards } from "../../buttons/guardButton";
import { allCommonIds, fromCommonIds } from "../commonIds";

export const PrintRecordHistoryParams: RestParams = fromCommonIds ( 'accountId' )

export const PrintRecordHistoryRD: ExampleRestD = {
  namePrefix: 'history',
  params: { ...PrintRecordHistoryParams, },
  dataDD: PrintRecordHistoryDD,
  url: '/api/printrecord/history?{query}',
  actions: [ 'get' ],
}

export const PrintRecordRD: ExampleRestD = {
  namePrefix: 'single',
  params: {
    ...PrintRecordHistoryParams,
    id: { ...IntParam, lens: '~/display[~/selected]id', testValue: 888, main: true }
  },
  dataDD: PrintRecordHistoryDD,
  url: '/api/printrecord?{query}',
  actions: [ 'create', { state: 'print' } ],
  states: { print: { url: '/api/print?{query}', params: [ 'id' ] } },
  mutations: [ { restAction: { state: 'print' }, mutateBy: { type: 'storedProc', name: 'print', schema: onlySchema, params: [ 'id' ] } } ]
}


export const CurrentPaymentCountsRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: CurrentPaymentCountsDD,
  url: '/api/paymentcounts?{query}',
  actions: [ 'get' ],
  resolvers: {
    getCurrentPaymentCounts: {
      type: 'sql', name: 'get', schema: onlySchema, sql: 'someSql', params: [
        { type: 'output', javaType: 'Integer', rsName: 'xxx', name: 'standingOrders' },
        { type: 'output', javaType: 'Integer', rsName: 'yyy', name: 'directDebits' },
      ]
    }
  }
}
export const accountAndAddressDetailsRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: AccountDetailsDD,
  url: '/api/payment/accountDetails?{query}',
  actions: [ 'get' ],
}
export const postcodeParams: RestParams = {
  dbName: { ...allCommonIds.dbName },
  postcode: { ...StringParam, lens: '~/addressSearch/postcode', testValue: 'LW12 4RG' }
}
export const postcodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponseDD,
  url: '/api/listOfPayments/postCode?{query}',
  actions: [ 'get' ],

}