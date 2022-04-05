import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { IntParam, RestD, RestParams } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";

export const commonParams: RestParams = {
  customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId' },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: "accId" },
}

/** This should fully define the api*/
export const eAccountsSummaryRestD: RestD<AllGuards> = {
  params: { ...commonParams, customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId', main: true } },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get' ],
}
export const createPlanRestD: RestD<AllGuards> = {
  params: { ...commonParams, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan?{query}',
  actions: [ 'get', 'create', 'update', 'delete', 'list' ],
}
