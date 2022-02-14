import { EAccountsSummaryDD } from "./example.dataD";
import { DataD } from "../common/dataD";

export const commonParams = {
  customerId: { commonLens: [ 'customerId' ] },
  accountId: { commonLens: [ 'accountId' ] },
}

type AllLensRestParams = CommonLensRestParam | LensRestParam
export interface CommonLensRestParam {commonLens: string[]}
export interface LensRestParam {lens: string[]}
export interface RestParams {
  [ name: string ]:AllLensRestParams
}
type RestActions = 'get' | 'update' | 'create' | 'delete'
export interface RestD {
  params: RestParams,
  dataDD: DataD,
  url: string,
  actions: RestActions[]
}
/** This should fully define the api*/
export const exportAccountsSummaryRestD: RestD = {
  params: { ...commonParams },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?accountId={accountId}&customerId={customerId}',
  actions: [ 'get' , 'delete', 'update'],
}
export const createPlanRestD: RestD = {
  params: { ...commonParams, createPlanId: { lens: [ 'TBD' ] } },
// @ts-ignore
  dataDD: 'not sure',
  url: '/api/createPlan/{createPlanId}?accountId={accountId}&customerId={customerId}',
  actions: [ 'get', 'create', 'update', 'delete' ],
}
