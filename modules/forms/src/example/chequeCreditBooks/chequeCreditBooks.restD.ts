import { IntParam, RestD, RestParams } from "../../common/restD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { accountT, onlySchema } from "../database/tableNames";

export const commonParams = {
  brandRef: { ...IntParam, commonLens: 'brandRef', testValue: 'brandRef' },
  applRef: { ...IntParam, commonLens: 'applRef', testValue: 'appref' },
  customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId' },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: "accId" },
}
const typeCheckCommonParms: RestParams = commonParams

/** This should fully define the api*/
export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonParams,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', 'create', { "state": 'cancel' } ],
  states: {
    cancel: { url: '/api/chequeCreditBooks/cancel?{query}', useStoredProcedure: { schema: onlySchema, name: 'cancelCheckBook', params: [ 'customerId', 'accountId' ] } }
  },
  audit: [
    { restAction: 'create', storedProcedure: { name: 'auditCreateCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: 'get', storedProcedure: { name: 'auditGetCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: {state: 'cancel'}, storedProcedure: { name: 'auditCancelCheckbook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
  ]

}