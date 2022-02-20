import { RestD } from "../../common/restD";
import { CreatePlanDD } from "../eAccounts/eAccountsSummary.dataD";
import { commonParams } from "../eAccounts/eAccountsSummary.restD";

export const createEAccountRestD: RestD = {
  params: { ...commonParams, createPlanId: { commonLens: 'createPlanId', testValue: 'tbd' } },
  dataDD: CreatePlanDD,
  url: '/api/createEAccount/{createPlanId}?{query}',
  actions: [ 'create' ],
}
