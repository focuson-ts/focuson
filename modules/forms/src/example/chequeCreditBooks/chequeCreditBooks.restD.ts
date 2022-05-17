import { RestD } from "../../common/restD";
import { ChequeCreditbooksDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { onlySchema } from "../database/tableNames";
import { commonIds } from "../commonIds";


export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonIds,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', 'create', { "state": 'cancel' }, { "state": 'revalidate' } ],
  states: {
    cancel: { url: '/api/chequeCreditBooks/cancel?{query}', params: [ 'clientRef', 'accountId' ] },
    revalidate: { url: '/api/chequeCreditBooks/revalidate?{query}', params: [ 'clientRef', 'accountId' ] }
  },
  audits: [],
  resolvers: {
    'get': [ {
      mutation: 'storedProc', name: 'getMeMyData1', schema: onlySchema, params: [
        { type: 'output', name: 'val1', javaType: 'Integer', sqlType: 'INTEGER' },
        { type: 'output', name: 'val2', javaType: 'String', sqlType: 'CHAR' },
        { type: 'autowired', name: 'systemTime', class: '{thePackage}.utils.ITimeService', method: 'now', import: true } ]
    },
      {
        mutation: 'storedProc', name: 'getMeMyData2', schema: onlySchema, params: [
          { type: 'output', name: 'val3', javaType: 'Integer', sqlType: 'INTEGER' },
          { type: 'output', name: 'val4', javaType: 'String', sqlType: 'CHAR' },
          { type: 'autowired', name: 'systemTime', class: '{thePackage}.utils.ITimeService', method: 'now', import: true } ]
      } ]
  },
  mutations: [
    {
      restAction: 'create', mutateBy: [
        {
          mutation: 'storedProc', name: 'sequencename', params: [
            { type: 'output', name: 'checkbookId', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'checkbookIdPart2', javaType: 'String', sqlType: 'CHAR' },
            { type: 'autowired', name: 'systemTime', class: '{thePackage}.utils.ITimeService', method: 'now', import: true }
          ], schema: onlySchema
        },
        // { mutation: 'IDFromSequence', name: 'sequencename', params: { type: 'output', name: 'checkbookId' }, schema: onlySchema },
        { mutation: 'storedProc', name: 'auditCreateCheckBook', params: [ 'brandRef', 'accountId', 'checkbookId', 'checkbookIdPart2' ], schema: onlySchema },
        {
          mutation: 'manual', name: 'manualLog',
          import: 'import java.util.Date;',
          params: [ 'checkbookId', 'checkbookIdPart2' ],
          code: [
            `String now = new Date().toString(); // just showing we can return values and use them. Also demonstrates import`,
            `System.out.println(now + " checkbookid: " + checkbookId + " part2: " + checkbookIdPart2);`,
          ]
        },
      ]
    },
    { restAction: 'get', mutateBy: { mutation: 'storedProc', name: 'auditGetCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: { state: 'cancel' }, mutateBy: { mutation: 'storedProc', name: 'auditCancelCheckbook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
  ]

}