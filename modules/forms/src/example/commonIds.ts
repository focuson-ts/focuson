import { IntParam, RestParams, StringParam } from "../common/restD";

export const allCommonIds = {
  brandRef: { ...IntParam, commonLens: 'brandRef', testValue: 10 },
  applRef: { ...IntParam, commonLens: 'applRef', testValue: 888 },
  clientRef: { ...IntParam, commonLens: 'clientRef', testValue: 666 },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: 12342312 },
  employeeType: { ...StringParam, commonLens: 'employeeType', testValue: 'basic' },
  dbName: { ...StringParam, commonLens: 'dbName', testValue: 'mock' }
}

export const commonIds = fromCommonIds ( "brandRef", "applRef", "clientRef", "accountId" )

export function fromCommonIds ( ...keys: (keyof (typeof allCommonIds))[] ): RestParams {
  const result: RestParams = {}
  keys.forEach ( key => result[ key ] = allCommonIds[ key ] )
  return result
}

//Just checks that allCommonParams is a RestParams. We do it like this to allow code insight to continue working
const typeCheckAllCommonParms: RestParams = allCommonIds