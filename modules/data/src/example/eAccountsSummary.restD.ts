import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { RestD } from "../common/restD";

export const commonParams = {
  customerId: { commonLens: [ 'customerId' ] },
  accountId: { commonLens: [ 'accountId' ] },
}

/** This should fully define the api*/
export const exportAccountsSummaryRestD: RestD = {
  params: { ...commonParams },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?accountId={accountId}&customerId={customerId}',
  actions: [ 'get'],
}
export const createPlanRestD: RestD = {
  params: { ...commonParams, createPlanId: { lens: [ 'TBD' ] } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan/{createPlanId}?accountId={accountId}&customerId={customerId}',
  actions: [ 'get', 'create', 'update', 'delete' , 'create', 'list'],
}
