
import { occupationAndIncomeDetailsDD, otherIncomeResponseDD } from "./occupationAndIncome.dataD";
import { RestD, RestParams } from "../../common/restD";

export const commonParams: RestParams = {
    vbAccountSeq: { commonLens: 'vbAccountSeq', testValue: 'vbAccountSeq'},
    vbAccountType: { commonLens: 'vbAccountType', testValue: 'vbAccountType'},
    brandRef: { commonLens: 'brandRef', testValue: 'brandRef'},
    accountSeq: { commonLens: 'accountSeq', testValue: 'accountSeq' },
    applicationRef: { commonLens: 'applicationRef', testValue: 'applicationRef' },
}

/** This should fully define the api*/
export const occupationAndIncomeRD: RestD = {
    params: commonParams,
    dataDD: occupationAndIncomeDetailsDD,
    url: '/customer/occupation/v2/occupationIncomeDetails?{query}',
    actions: [ 'get' , "update"],
}

export const otherIncomeRD: RestD = {
    params: { ...commonParams},
    dataDD: otherIncomeResponseDD,
    url: '/customer/occupation/v2/otherIncome?{query}',
    actions: [ 'get' ],
}

