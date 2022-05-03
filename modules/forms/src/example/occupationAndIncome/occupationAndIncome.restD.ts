import {
  dropdownsDD,
  occupationAndIncomeFullDomainDD,
} from "./occupationAndIncome.dataD";
import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { otherIncomeResponseDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { commonParams } from "../repeating/repeating.restD";
import { RestD } from "../../common/restD";
import { onlySchema } from "../database/tableNames";

/** This should fully define the api*/
export const occupationAndIncomeRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: occupationAndIncomeFullDomainDD,
  url: '/customer/occupation/v2/occupationIncomeDetails?{query}',
  actions: [ 'get', 'update' ],
  audit: [
    { restAction: 'get', storedProcedure: { name: 'auditGetCustomerOccupation', schema: onlySchema, params: [ 'customerId' ] } },
    { restAction: 'update', storedProcedure: { name: 'auditUpdateCustomerOccupation', schema: onlySchema, params: [ 'customerId' ] } },
  ]
}

export const occupationDetailsRD: RestD<any> = {
  params: {},
  dataDD: dropdownsDD,
  url: '/customer/occupation/v2/occupationDetails?{query}',
  actions: [ 'get' ],
}

export const additionalInfoRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: additionalInformationDD,
  url: '/customer/occupation/v2/additionalInfo?{query}',
  actions: [ 'get' ],
  audit: [
    { restAction: 'get', storedProcedure: { name: 'auditGetCustomeAdditionalInfo', schema: onlySchema, params: [ 'customerId' ] } },
  ]
}

export const businessDetailsRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: businessDetailsMainDD,
  url: '/customer/occupation/v2/businessDetails?{query}',
  actions: [ 'get' ],
  audit: [
    { restAction: 'get', storedProcedure: { name: 'auditGetBusinessDetails', schema: onlySchema, params: [ 'customerId' ] } },
  ]
}

export const otherIncomeRD: RestD<any> = {
  params: { ...commonParams },
  dataDD: otherIncomeResponseDD,
  url: '/customer/occupation/v2/otherIncome?{query}',
  actions: [ 'get' ],
  audit: [
    { restAction: 'get', storedProcedure: { name: 'auditGetBusinessDetails', schema: onlySchema, params: [ 'customerId' ] } },
  ]
}

