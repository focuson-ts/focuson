import { RestD } from "../../common/restD";
import { ChequeCreditbooksDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { onlySchema } from "../database/tableNames";
import { commonIds, fromCommonIds } from "../commonIds";


export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonIds,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', 'create', { "state": 'cancel' }, { "state": 'revalidate' } ],
  states: {
    cancel: { url: '/api/chequeCreditBooks/cancel?{query}', params: fromCommonIds ( 'clientRef', 'accountId', 'brandRef' ) },
    revalidate: { url: '/api/chequeCreditBooks/revalidate?{query}', params: fromCommonIds ( 'clientRef', 'accountId' ) }
  },
  audits: [],
  resolvers: {
    'getChequeCreditbooks': [ {
      type: 'storedProc', package: 'somePackage', name: 'getMeMyData1', schema: onlySchema, params: [
        { type: 'output', name: 'val1', javaType: 'Integer', sqlType: 'INTEGER', },
        { type: 'output', name: 'val2', javaType: 'String', sqlType: 'DATE', format: { type: 'Date', pattern: 'dd-MM-yyyy' } },
        { type: 'autowired', name: 'systemTime', class: '{thePackage}.utils.ITimeService', method: 'now()', import: true } ]
    },
      {
        type: 'storedProc', name: 'getMeMyData2', schema: onlySchema, params: [
          { type: 'output', name: 'val3', javaType: 'String', sqlType: 'DATE', format: { type: 'Date', pattern: "dd-MM-yyyy" } },
          { type: 'output', name: 'val4', javaType: 'String', sqlType: 'CHAR', msgLevel: 'error' },
          { type: 'autowired', name: 'systemTime', class: '{thePackage}.utils.ITimeService', method: 'notused', setParam: 'systemTime.now()', import: true } ]
      } ]
  },
  mutations: [
    {
      restAction: 'create', mutateBy: [
        {
          type: 'storedProc', name: 'sequencename', params: [
            { type: 'output', name: 'checkbookId', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'checkbookIdPart2', javaType: 'String', sqlType: 'DATE', format: { type: 'Date', pattern: 'dd-MM-yyyy' } },
            { type: 'autowired', name: 'systemTime', class: '{thePackage}.utils.ITimeService', method: 'now()', import: true }
          ], schema: onlySchema
        },
        // { mutation: 'IDFromSequence', name: 'sequencename', params: { type: 'output', name: 'checkbookId' }, schema: onlySchema },
        {
          type: 'storedProc', name: 'auditCreateCheckBook',
          params: [ 'brandRef', 'accountId', 'checkbookId',
            { type: 'input', name: 'checkbookIdPart2', javaType: 'String', format: { type: 'Date', pattern: 'dd-MM-yyyy' } } ], schema: onlySchema
        },
        {
          type: 'manual', name: 'manualLog',
          import: 'import java.util.Date;',
          params: [ 'checkbookId', 'checkbookIdPart2' ],
          code: [
            `String now = new Date().toString(); // just showing we can return values and use them. Also demonstrates import`,
            `System.out.println(now + " checkbookid: " + checkbookId + " part2: " + checkbookIdPart2);`,
          ]
        },
      ]
    },
    { restAction: 'get', mutateBy: { type: 'storedProc', package: 'somePackage', name: 'auditGetCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: { state: 'cancel' }, mutateBy: { type: 'storedProc', name: 'auditCancelCheckbook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
  ]

}