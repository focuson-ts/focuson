import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { RestD, RestParams } from "../common/restD";

export const commonParams: RestParams = {
  customerId: { commonLens: [ 'customerId' ], testValue: 'custId' },
  accountId: { commonLens: [ 'accountId' ], testValue: "accId" },
}

/** This should fully define the api*/
export const eAccountsSummaryRestD: RestD = {
  params: { ...commonParams },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get' ],
}
export const createPlanRestD: RestD = {
  params: { ...commonParams, createPlanId: { lens: [ 'TBD' ], testValue: 'tbd' } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan/{createPlanId}?{query}',
  actions: [ 'get', 'create', 'update', 'delete', 'create', 'list' ],
}
