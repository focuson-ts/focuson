import { RestD, RestParams } from "../../common/restD";
import { ETransferDataD } from "./eTransfers.dataD";

export const commonParams: RestParams = {
  customerId: { commonLens: 'customerId' , testValue: 'custId' }
}

/** This should fully define the api*/
export const eTransferRestD: RestD = {
  params: { ...commonParams },
  dataDD: ETransferDataD,
  url: '/api/eTransfers?{query}',
  actions: [ 'create' ]
}
