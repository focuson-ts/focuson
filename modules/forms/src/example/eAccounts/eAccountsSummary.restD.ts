import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { IntParam, RestD, StringParam } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { onlySchema } from "../database/tableNames";
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
  states: {
    invalidate: { url: '/api/accountsSummary/invalidate?{query}', useStoredProcedure: { schema: onlySchema, name: 'sda', params: [ 'accountId', 'clientRef' ] } }
  },
  access: [
    { restAction: { state: 'invalidate' }, condition: { type: 'in', param: 'employeeType', values: [ 'teamLeader' ] } }
  ],
  audit: [
    { restAction: { state: 'invalidate' }, storedProcedure: { name: 'auditStuff', params: [ 'accountId', 'clientRef' ], schema: onlySchema } }
  ]
}
export const createPlanRestD: RestD<AllGuards> = {
  params: { ...commonIds, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan?{query}',
  actions: [ 'get', 'create', 'update', 'delete' ],
}
