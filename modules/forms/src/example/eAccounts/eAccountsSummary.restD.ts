import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { IntParam, RestD, StringParam } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import {accountT, addT, customerT, onlySchema} from "../database/tableNames";
import { allCommonIds, commonIds } from "../commonIds";

export const eAccountsSummaryRestD: RestD<AllGuards> = {
  params: {
    ...commonIds,
    customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId', main: true },
    employeeType: allCommonIds.employeeType
  },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', { state: 'invalidate' } ],
  tables: {
    entity: {type: 'Main', table: customerT,
      // idStrategy: {type: 'WithId', idField: 'id', idOffset: 0},
      children: {
        account: {type: 'Multiple', table: accountT,  idInParent: 'id', idInThis: 'customer'}
      }
    },
    where: [{table: customerT, alias: customerT.name, field: 'id', paramName: 'customerId'
  }]
  },
  // insertSqlStrategy: [{type: 'StrategyForIds', table: customerT, idField: 'id', idOffset: 0},
  //   {type: 'StrategyForIds', table: accountT, idField: 'id', idOffset: 20}],
  states: {
    invalidate: { url: '/api/accountsSummary/invalidate?{query}', params: [ 'accountId', 'clientRef' ] }
  },
  access: [
    { restAction: { state: 'invalidate' }, condition: { type: 'in', param: 'employeeType', values: [ 'teamLeader' ] } }
  ],
  mutations: [
    { restAction: { state: 'invalidate' }, mutateBy: { mutation: 'storedProc', name: 'auditStuff', params: [ {type: 'string', value: 'someString'},'accountId', 'clientRef' ], schema: onlySchema } }
  ]
}
export const createPlanRestD: RestD<AllGuards> = {
  params: { ...commonIds, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan?{query}',
  actions: [ 'get', 'create', 'update', 'delete' ],
}
