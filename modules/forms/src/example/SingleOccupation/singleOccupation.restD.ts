import { ExampleRestD } from "../common";
import { additionalInfoFirstDD, additionalInfoSecondDD, listOccupationsDD, occupationAndIncomeFullDomainDD, otherIncomeResponseDD } from "./singleOccupation.dataD";
import { commonIds } from "../commonIds";

export const occupationAndIncomeRD:ExampleRestD = {
    params: { ...commonIds },
    dataDD: occupationAndIncomeFullDomainDD,
    url: '/customer/occupation/v2/occupationIncomeDetails?{query}',
    actions: [ 'get', 'update' ],
}

export const additionalInfoFirstRD:ExampleRestD = {
    params: { ...commonIds },
    dataDD: additionalInfoFirstDD,
    url: '/customer/occupation/v2/additionalInfoFirst?{query}',
    actions: [ 'get', 'update' ],
}

export const additionalInfoSecondRD:ExampleRestD = {
    params: { ...commonIds },
    dataDD: additionalInfoSecondDD,
    url: '/customer/occupation/v2/additionalInfoSecond?{query}',
    actions: [ 'get', 'update' ],
}

export const otherSourcesOfIncomeRD: ExampleRestD = {
    params: { ...commonIds },
    dataDD: otherIncomeResponseDD,
    url: '/customer/occupation/v2/otherIncome?{query}',
    actions: [ 'get', 'update' ],
}

export const occupationsListRD: ExampleRestD = {
    params: { ...commonIds },
    dataDD: listOccupationsDD,
    url: '/customer/occupation/v2/occupationsList?{query}',
    actions: [ 'get' ],
}


