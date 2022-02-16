import { findMustConstructForRest, flapMapActionDetails } from "../common/restD";
import { createPlanRestD, exportAccountsSummaryRestD } from "../example/eAccountsSummary.restD";

describe ( "flatMapActionDetails", () => {
  it ( "should work for exportAccountsSummaryRestD", () => {
    const found = flapMapActionDetails ( exportAccountsSummaryRestD, ( r, rt ) => {
      expect ( r ).toBe ( exportAccountsSummaryRestD )
      return [ rt.name ]
    } )
    expect ( found ).toEqual ( [ "get" ] )
  } )
  it ( "should work for createPlanRestD", () => {
    const found = flapMapActionDetails ( createPlanRestD, ( r, rt ) => {
      expect ( r ).toBe ( createPlanRestD )
      return [ rt.name ]
    } )
    expect ( found ).toEqual ( [ "get", "create", "update", "delete", "create", "list" ] )
  } )

} )

describe ( "findMustConstructForRest", () => {
  it ( "should find the types that must be constructed", () => {
    let actual = findMustConstructForRest ( [ exportAccountsSummaryRestD, createPlanRestD, exportAccountsSummaryRestD, createPlanRestD ] );
    let simpler = { objs: actual.objs.map ( x => x.name ), input: actual.input.map ( x => x.name ), inputWithId: actual.inputWithId.map ( x => x.name ) }
    expect ( simpler ).toEqual ( {
      "input": [ "CreatePlanDD" ],
      "inputWithId": [ "CreatePlanDD" ],
      "objs": [ "CreatePlanDD", "EAccountsSummaryDD", "EAccountSummaryDD" ]
    } )
  } )
} )

