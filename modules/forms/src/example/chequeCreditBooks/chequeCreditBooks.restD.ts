import { IntParam, RestD, RestParams } from "../../common/restD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { accountT, onlySchema } from "../database/tableNames";
import { commonIds, fromCommonIds } from "../commonIds";


/** This should fully define the api*/
export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonIds,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', 'create', { "state": 'cancel' }, { "state": 'revalidate' } ],

  states: {
    cancel: { url: '/api/chequeCreditBooks/cancel?{query}', params: [ 'clientRef', 'accountId' ] },
    revalidate: { url: '/api/chequeCreditBooks/revalidate?{query}', params: [ 'clientRef', 'accountId' ] }
  },
  mutations: [
    {
      restAction: 'create', mutateBy: [
        {
          mutation: 'storedProc', name: 'sequencename', params: [
            { type: 'output', name: 'checkbookId', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'checkbookIdPart2', javaType: 'String', sqlType: 'CHAR' },
          ], schema: onlySchema
        },
        // { mutation: 'IDFromSequence', name: 'sequencename', params: { type: 'output', name: 'checkbookId' }, schema: onlySchema },
        { mutation: 'storedProc', name: 'auditCreateCheckBook', params: [ 'brandRef', 'accountId', 'checkbookId', 'checkbookIdPart2' ], schema: onlySchema } ]
    },
    { restAction: 'get', mutateBy: { mutation: 'storedProc', name: 'auditGetCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: { state: 'cancel' }, mutateBy: { mutation: 'storedProc', name: 'auditCancelCheckbook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
  ]

}