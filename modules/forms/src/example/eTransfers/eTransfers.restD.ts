import { IntParam, RestD, RestParams } from "../../common/restD";
import { ETransferDataD } from "./eTransfers.dataD";
import { AllGuards } from "../../buttons/guardButton";

export const commonParams: RestParams = {
  customerId: { ...IntParam,commonLens: 'customerId' , testValue: 'custId' }
}

/** This should fully define the api*/
export const eTransferRestD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: ETransferDataD,
  url: '/api/eTransfers?{query}',
  actions: [ 'create' ]
}
