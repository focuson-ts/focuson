import { RestD, RestParams } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { RepeatingWholeDataD } from "./repeating.dataD";
import { fromCommonIds } from "../commonIds";

export const repeatingIds: RestParams = fromCommonIds('clientRef')

/** This should fully define the api*/
export const repeatingRestRD: RestD<AllGuards> = {
  params: { ...repeatingIds },
  dataDD: RepeatingWholeDataD,
  url: '/api/repeating?{query}',
  actions: [ 'create', 'get' ]
}
