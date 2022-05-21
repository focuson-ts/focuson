import { IntParam, RestD, RestParams } from "../../common/restD";
import { ETransferDataD, HolidayDataD } from "./eTransfers.dataD";
import { AllGuards } from "../../buttons/guardButton";

export const commonParams: RestParams = {
  customerId: { ...IntParam,commonLens: 'customerId' , testValue:988834}
}

/** This should fully define the api*/
export const eTransferRestD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: ETransferDataD,
  url: '/api/eTransfers?{query}',
  actions: [ 'create' ]
}


export const holidayRestD: RestD<AllGuards> = {
  params: {},
  dataDD: HolidayDataD,
  url: '/api/holidays',
  actions: [ 'get' ]
}
