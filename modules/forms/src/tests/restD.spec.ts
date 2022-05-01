import { findMustConstructForRest, flapMapActionDetails, makeParamValueForTest } from "../common/restD";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { arrearsDetailsRestD } from "../example/accountOverview/accountOverview.restD";


describe ( "flatMapActionDetails", () => {
  it ( "should work for exportAccountsSummaryRestD", () => {
    const found = flapMapActionDetails ( eAccountsSummaryRestD, ( r, rt ) => {
      expect ( r ).toBe ( eAccountsSummaryRestD )
      return [ rt.name ]
    } )
    expect ( found ).toEqual ( [ "get" , "state"] )
  } )
  it ( "should work for createPlanRestD", () => {
    const found = flapMapActionDetails ( createPlanRestD, ( r, rt ) => {
      expect ( r ).toBe ( createPlanRestD )
      return [ rt.name ]
    } )
    expect ( found ).toEqual ( [ "get", "create", "update", "delete" ] )
  } )

} )

describe ( "findMustConstructForRest", () => {
  it ( "should find the types that must be constructed", () => {
    let actual = findMustConstructForRest ( [ eAccountsSummaryRestD, createPlanRestD, eAccountsSummaryRestD, createPlanRestD ] );
    let simpler = { objs: actual.objs.map ( x => x.name ), input: actual.input.map ( x => x.name ) }
    expect ( simpler ).toEqual ( {
      "input": [ "CreatePlan" ],
      "objs": [ "CreatePlan", "EAccountsSummary", "EAccountsSummaryTable", "EAccountSummary" ]
    } )
  } )
} )


describe ( "makeCommonParamsValueForTest", () => {
  it ( "get the values out of the rest params - for a get", () => {
    expect ( makeParamValueForTest ( createPlanRestD, 'get' ) ).toEqual ( {
      "accountId": "accId",
      "createPlanId": "tbd",
      "customerId": "custId"
    } )
  } )
  it ( "get the values out of the rest params - for a create (no primary id)", () => {
    expect ( makeParamValueForTest ( createPlanRestD, 'create' ) ).toEqual ( {
      "accountId": "accId",
      "customerId": "custId"
    } )
  } )

  it ( "should work with a mixture of common lens and normal lens", () => {
    expect ( JSON.stringify ( makeParamValueForTest ( arrearsDetailsRestD, 'get' ) ).replace ( /"/g, "'" ) ).toEqual (
      "{'accountId':'accId','customerId':'custId','startDate':'2020-01-20'}" )
  } )
} )
