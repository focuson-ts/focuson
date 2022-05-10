import { IntParam, RestD, RestParams } from "../../common/restD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { accountT, onlySchema } from "../database/tableNames";
import { commonIds } from "../commonIds";


/** This should fully define the api*/
export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonIds,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', 'create', { "state": 'cancel' },{ "state": 'revalidate' } ],
  states: {
    cancel: { url: '/api/chequeCreditBooks/cancel?{query}', useStoredProcedure: { schema: onlySchema, name: 'cancelCheckBook', params: [ 'clientRef', 'accountId' ] } },
    revalidate: { url: '/api/chequeCreditBooks/revalidate?{query}', useSql: { schema: onlySchema, sql: 'update something', params: [ 'clientRef', 'accountId' ] } }
  },
  audit: [
    { restAction: 'create', storedProcedure: { name: 'auditCreateCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: 'get', storedProcedure: { name: 'auditGetCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: {state: 'cancel'}, storedProcedure: { name: 'auditCancelCheckbook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
  ]

}