import { IntParam, RestParams, StringParam } from "../common/restD";

export const allCommonIds = {
  brandRef: { ...IntParam, commonLens: 'brandRef', testValue: 'brandRef' },
  applRef: { ...IntParam, commonLens: 'applRef', testValue: 'appref' },
  clientRef: { ...IntParam, commonLens: 'clientRef', testValue: 'custId' },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: "accId" },
  employeeType: { ...StringParam, commonLens: 'employeeType', testValue: 'basic' }
}

export const commonIds = fromCommonIds ( "brandRef", "applRef", "clientRef", "accountId" )

export function fromCommonIds ( ...keys: (keyof (typeof allCommonIds))[] ): RestParams {
  const result: RestParams = {}
  keys.forEach ( key => result[ key ] = allCommonIds[ key ] )
  return result
}

//Just checks that allCommonParams is a RestParams. We do it like this to allow code insight to continue working
const typeCheckAllCommonParms: RestParams = allCommonIds