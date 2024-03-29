import { dropdownsDD, occupationAndIncomeFullDomainDD, } from "./occupationAndIncome.dataD";
import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { otherIncomeResponseDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { RestD } from "../../common/restD";
import { onlySchema } from "../database/tableNames";
import { commonIds } from "../commonIds";

/** This should fully define the api*/
export const occupationAndIncomeRD: RestD<any> = {
  params: { ...commonIds },
  dataDD: occupationAndIncomeFullDomainDD,
  url: '/customer/occupation/v2/occupationIncomeDetails?{query}',
  actions: [ 'get', 'update' ],
  mutations: [
    { restAction: 'get', mutateBy: { type: 'storedProc', name: 'auditGetCustomerOccupation', schema: onlySchema, params: [ 'clientRef' ] } },
    { restAction: 'update', mutateBy: { type: 'storedProc', name: 'auditUpdateCustomerOccupation', schema: onlySchema, params: [ 'clientRef' ] } },
  ]
}

export const occupationDetailsRD: RestD<any> = {
  params: {},
  dataDD: dropdownsDD,
  url: '/customer/occupation/v2/occupationDetails?{query}',
  actions: [ 'get' ],
}

export const additionalInfoRD: RestD<any> = {
  params: { ...commonIds },
  dataDD: additionalInformationDD,
  url: '/customer/occupation/v2/additionalInfo?{query}',
  actions: [ 'get' ],
  mutations: [
    {
      restAction: 'get', mutateBy: {
        type: 'storedProc', name: 'auditGetCustomeAdditionalInfo', schema: onlySchema, params: [ 'clientRef' ],
        messageOnSuccess: 'success', messageOnFailure: 'failure'
      },
    },
  ]
}

export const businessDetailsRD: RestD<any> = {
  params: { ...commonIds },
  dataDD: businessDetailsMainDD,
  url: '/customer/occupation/v2/businessDetails?{query}',
  actions: [ 'get' ],
  mutations: [
    { restAction: 'get', mutateBy: { type: 'storedProc', name: 'auditGetBusinessDetails', schema: onlySchema, params: [ 'clientRef' ] } },
  ]
}

export const otherIncomeRD: RestD<any> = {
  params: { ...commonIds },
  dataDD: otherIncomeResponseDD,
  url: '/customer/occupation/v2/otherIncome?{query}',
  actions: [ 'get' ],
  mutations: [
    { restAction: 'get', mutateBy: { type: 'storedProc', name: 'auditOtherIncome', schema: onlySchema, params: [ 'clientRef' ] } },
  ]
}

