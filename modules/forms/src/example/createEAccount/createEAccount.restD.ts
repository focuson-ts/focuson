import { IntParam, RestD } from "../../common/restD";
import { CreateEAccountDataD } from "./createEAccount.dataD";
import { commonIds } from "../commonIds";

export const createEAccountRestD: RestD<any> = {
  params: { ...commonIds, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 'tbd', main: true } },
  dataDD: CreateEAccountDataD,
  url: '/api/createEAccount/?{query}',
  actions: [ 'create', 'get' ],
}
