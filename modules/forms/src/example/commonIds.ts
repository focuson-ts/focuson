import { CommonLensRestParam, IntParam, RestParams, StringParam } from "../common/restD";
import { NameAnd } from "@focuson/utils";

export const allCommonIds = {
  brandRef: { ...IntParam, commonLens: 'brandRef', testValue: 10 },
  applRef: { ...IntParam, commonLens: 'applRef', testValue: 22, inJwtToken: true },
  clientRef: { ...IntParam, commonLens: 'clientRef', testValue: 333 },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: 44444444 },
  vbAccountSeq: { ...IntParam, commonLens: 'vbAccountSeq', testValue: 55555 },
  employeeId: { ...IntParam, commonLens: 'employeeId', testValue: 666666, inJwtToken: true },
  employeeType: { ...StringParam, commonLens: 'employeeType', testValue: 'basic', inJwtToken: true },
  dbName: { ...StringParam, commonLens: 'dbName', testValue: 'db' },
  today: { ...StringParam, commonLens: 'today', testValue: '29/07/2022' },
  operatorName: { ...StringParam, commonLens: 'operatorName', testValue: 'Phil' }
}

export const commonIds = fromCommonIds ( "brandRef", "applRef", "clientRef", "accountId" )

export function fromCommonIds ( ...keys: (keyof (typeof allCommonIds))[] ): NameAnd<CommonLensRestParam<any>> {
  const result: NameAnd<CommonLensRestParam<any>> = {}
  keys.forEach ( key => result[ key ] = allCommonIds[ key ] )
  return result
}

//Just checks that allCommonParams is a RestParams. We do it like this to allow code insight to continue working
const typeCheckAllCommonParms: RestParams = allCommonIds