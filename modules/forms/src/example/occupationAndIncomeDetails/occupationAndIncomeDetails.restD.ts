import { RestD, RestParams } from "../../common/restD";
import { OccupationAndIncomeDetailsDataD } from "./occupationAndIncomeDetails.dataD";

export const commonParams: RestParams = {
  customerId: { commonLens: 'customerId' , testValue: 'custId' }
}

export const oneOccupationAndIncomeDetails: RestD = {
  params: { ...commonParams },
  dataDD: OccupationAndIncomeDetailsDataD,
  url: '/api/oneOccupationAndIncome?{query}',
  actions: [ 'create', 'update', 'create', 'list' ]
}
