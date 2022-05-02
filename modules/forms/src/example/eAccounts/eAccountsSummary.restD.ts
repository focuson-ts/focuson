import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { IntParam, RestD, RestParams, StringParam } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { onlySchema } from "../database/tableNames";

export const commonParams: RestParams = {
  customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId' },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: "accId" },
}

/** This should fully define the api*/
export const eAccountsSummaryRestD: RestD<AllGuards> = {
  params: {
    ...commonParams,
    customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId', main: true },
    employeeType: { ...StringParam, commonLens: 'employeeType', testValue: 'basic' }
  },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', { state: 'invalidate' } ],
  states: {
    invalidate: { url: '/api/accountsSummary/invalidate?{query}', useStoredProcedure: { schema: onlySchema, name: 'sda', params: [ 'accountId', 'customerId' ] } }
  },
  access: [
    { restAction: { state: 'invalidate' }, condition: { type: 'in', param: 'employeeType', values: [ 'teamLeader' ] } }
  ]
}
export const createPlanRestD: RestD<AllGuards> = {
  params: { ...commonParams, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan?{query}',
  actions: [ 'get', 'create', 'update', 'delete' ],
}
