import { RestD } from "../../common/restD";
import { commonParams } from "../eAccounts/eAccountsSummary.restD";
import { CreateEAccountDataD } from "./createEAccount.dataD";

export const createEAccountRestD: RestD = {
  params: { ...commonParams, createPlanId: { commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreateEAccountDataD,
  url: '/api/createEAccount/{createPlanId}?{query}',
  actions: [ 'create' ],
}
