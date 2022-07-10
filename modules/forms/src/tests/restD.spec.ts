import { findMustConstructForRest, flapMapActionDetails, makeParamValueForTest } from "../common/restD";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { arrearsDetailsRestD } from "../example/accountOverview/accountOverview.restD";


describe ( "flatMapActionDetails", () => {
  it ( "should work for exportAccountsSummaryRestD", () => {
    const found = flapMapActionDetails ( eAccountsSummaryRestD, ( r, rt ) => {
      expect ( r ).toBe ( eAccountsSummaryRestD )
      return [ rt.name ]
    } )
    expect ( found ).toEqual ( [ "get", "state" ] )
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
      "input": [
        "BalancesAndMonthlyCost",
        "CreatePlan",
        "EAccountsSummary",
        "EAccountsSummaryTable",
        "EAccountSummary"
      ],
      "objs": [
        "BalancesAndMonthlyCost",
        "CreatePlan",
        "EAccountsSummary",
        "EAccountsSummaryTable",
        "EAccountSummary"
      ]
    })
  } )
} )


describe ( "makeCommonParamsValueForTest", () => {
  it ( "get the values out of the rest params - for a get", () => {
    expect ( makeParamValueForTest ( 'error', createPlanRestD, 'get' ) ).toEqual ( {
      "accountId": "44444444",
      "applRef": "22",
      "brandRef": "10",
      "clientRef": "333",
      "createPlanId": "777"
    } )
  } )
  it ( "get the values out of the rest params - for a create (no primary id)", () => {
    expect ( makeParamValueForTest ( 'error', createPlanRestD, 'create' ) ).toEqual ( {
      "accountId": "44444444",
      "applRef": "22",
      "brandRef": "10",
      "clientRef": "333"
    })
  } )

  it ( "should work with a mixture of common lens and normal lens", () => {
    expect ( JSON.stringify ( makeParamValueForTest ( 'error', arrearsDetailsRestD, 'get' ) ).replace ( /"/g, "'" ) ).toEqual ( "{'accountId':'44444444','applRef':'22','brandRef':'10','clientRef':'333','startDate':'2020-01-20'}" )
  } )
} )
