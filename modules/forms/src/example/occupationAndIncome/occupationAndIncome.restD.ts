
import { dropdownsDD, occupationAndIncomeFullDomainDD } from "./occupationAndIncome.dataD";
import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { otherIncomeResponseDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { commonParams } from "../eTransfers/eTransfers.restD";
import { RestD } from "../../common/restD";

/** This should fully define the api*/
export const occupationAndIncomeRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: occupationAndIncomeFullDomainDD,
  url: '/customer/occupation/v2/occupationIncomeDetails?{query}',
  actions: [ 'get', 'update' ],
}

export const dropdownsRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: dropdownsDD,
  url: '/customer/occupation/v2/occupationDetails?{query}',
  actions: [ 'get' ],
}

export const additionalInfoRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: additionalInformationDD,
  url: '/customer/occupation/v2/additionalInfo?{query}',
  actions: [ 'get' ],
}

export const businessDetailsRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: businessDetailsMainDD,
  url: '/customer/occupation/v2/businessDetails?{query}',
  actions: [ 'get' ],
}

export const otherIncomeRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: otherIncomeResponseDD,
  url: '/customer/occupation/v2/otherIncome?{query}',
  actions: [ 'get' ],
}

