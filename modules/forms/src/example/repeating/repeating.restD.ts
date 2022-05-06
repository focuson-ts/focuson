import { IntParam, RestD, RestParams } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { RepeatingWholeDataD } from "./repeating.dataD";

export const repeatingIds: RestParams = {
  clientRef: { ...IntParam, commonLens: 'clientRef', testValue: 'custId' },
}

/** This should fully define the api*/
export const repeatingRestRD: RestD<AllGuards> = {
  params: { ...repeatingIds },
  dataDD: RepeatingWholeDataD,
  url: '/api/repeating?{query}',
  actions: [ 'create', 'get' ]
}
