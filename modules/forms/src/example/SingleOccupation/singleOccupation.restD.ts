import { ExampleRestD } from "../common";
import { additionalInfoFirstDD, additionalInfoSecondDD, listOccupationsDD, occupationAndIncomeFullDomainDD, otherIncomeResponseDD } from "./singleOccupation.dataD";
import { commonParams } from "../repeating/repeating.restD";

export const occupationAndIncomeRD:ExampleRestD = {
    params: { ...commonParams },
    dataDD: occupationAndIncomeFullDomainDD,
    url: '/customer/occupation/v2/occupationIncomeDetails?{query}',
    actions: [ 'get', 'update' ],
}

export const additionalInfoFirstRD:ExampleRestD = {
    params: { ...commonParams },
    dataDD: additionalInfoFirstDD,
    url: '/customer/occupation/v2/additionalInfoFirst?{query}',
    actions: [ 'get', 'update' ],
}

export const additionalInfoSecondRD:ExampleRestD = {
    params: { ...commonParams },
    dataDD: additionalInfoSecondDD,
    url: '/customer/occupation/v2/additionalInfoSecond?{query}',
    actions: [ 'get', 'update' ],
}

export const otherSourcesOfIncomeRD: ExampleRestD = {
    params: { ...commonParams },
    dataDD: otherIncomeResponseDD,
    url: '/customer/occupation/v2/otherIncome?{query}',
    actions: [ 'get', 'update' ],
}

export const occupationsListRD: ExampleRestD = {
    params: { ...commonParams },
    dataDD: listOccupationsDD,
    url: '/customer/occupation/v2/occupationsList?{query}',
    actions: [ 'get' ],
}


