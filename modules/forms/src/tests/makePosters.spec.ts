import { makePoster } from "../codegen/makePosters";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";


describe ( "makePoster", () => {
  it ( "should create posters for a restD with one action", () => {
    expect ( makePoster ( eAccountsSummaryRestD ) ).toEqual ( [] )
  } )
  it ( "should create posters for a restD with many actions", () => {
    expect ( makePoster ( createPlanRestD ) ).toEqual ( [] )
  } )

} )