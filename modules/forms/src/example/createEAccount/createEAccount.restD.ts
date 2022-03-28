import { RestD } from "../../common/restD";
import { commonParams } from "../eAccounts/eAccountsSummary.restD";
import { CreateEAccountDataD } from "./createEAccount.dataD";

export const createEAccountRestD: RestD<any> = {
  params: { ...commonParams, createPlanId: { commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreateEAccountDataD,
  url: '/api/createEAccount/?{query}',
  actions: [ 'create', 'get' ],
}
