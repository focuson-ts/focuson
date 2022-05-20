import { IntParam, RestD } from "../../common/restD";
import { CreateEAccountDataD } from "./createEAccount.dataD";
import { commonIds } from "../commonIds";
import { onlySchema } from "../database/tableNames";

export const createEAccountRestD: RestD<any> = {
  params: { ...commonIds, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreateEAccountDataD,
  url: '/api/createEAccount/?{query}',
  actions: [ 'create', 'get' ],
  mutations: [
    {
      restAction: 'create', mutateBy: [
        { // don't do this for real. Just showing capabilities.
          type: 'sql', name: 'updateSql', sql: 'update sequences set nextid=nextid+1 where seqName=?',
          params: { type: 'string', value: 'eAccount' }, schema: onlySchema
        },
        {
          type: 'sql', name: 'getSql', sql: 'select nextid from sequences where seqName=?', params: [
            { type: 'string', value: 'eAccount' },
            { type: 'output', name: 'nextAccountId', javaType: 'Integer', rsName: 'nextid' },
          ], schema: onlySchema
        } ]
    },
    { restAction: 'get', mutateBy: { type: 'storedProc', package: 'somePackage', name: 'auditGetCheckBook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
    { restAction: { state: 'cancel' }, mutateBy: { type: 'storedProc', name: 'auditCancelCheckbook', params: [ 'brandRef', 'accountId' ], schema: onlySchema } },
  ]

}
