import { IntParam, RestD, RestParams } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { RepeatingWholeDataD } from "./repeating.dataD";

export const commonParams: RestParams = {
  customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId' },
}

/** This should fully define the api*/
export const repeatingRestRD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: RepeatingWholeDataD,
  url: '/api/repeating?{query}',
  actions: [ 'create', 'get' ]
}
