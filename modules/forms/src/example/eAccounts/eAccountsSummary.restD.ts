import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { RestD, RestParams } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";

export const commonParams: RestParams = {
  customerId: { commonLens: 'customerId', testValue: 'custId'},
  accountId: { commonLens:  'accountId' , testValue: "accId" },
}

/** This should fully define the api*/
export const eAccountsSummaryRestD: RestD<AllGuards> = {
  params: { ...commonParams,customerId: { commonLens: 'customerId', testValue: 'custId', main: true } },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get' ],
}
export const createPlanRestD: RestD <AllGuards> = {
  params: { ...commonParams, createPlanId: { commonLens:  'createPlanId' , testValue: 'tbd', main: true } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan?{query}',
  actions: [ 'get', 'create', 'update', 'delete',  'list' ],
}
