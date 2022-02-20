import { allRestAndActions, dataDsIn } from "../common/pageD";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { sortedEntries } from "@focuson/utils";

describe ( "dataDsIn", () => {
  it ( "should find all the DataDs in a list of pages", () => {
    let list = [ EAccountsSummaryPD, createPlanPD, EAccountsSummaryPD, createPlanPD ];
    const actual = dataDsIn ( list )
    const names = sortedEntries ( actual ).map ( ( [ n, v ] ) => {
      expect ( n ).toEqual ( v.name )
      return n
    } )
    expect ( names ).toEqual ( [
      "CreatePlanDD",
      "EAccountsSummaryDD",
      "EAccountSummaryDD"
    ] )
  } )
  it ( "should find all the DataDs in a list of pages", () => {
    let list = [ EAccountsSummaryPD, createPlanPD, EAccountsSummaryPD, createPlanPD ];
    const actual = dataDsIn ( list, true )
    const names = sortedEntries ( actual ).map ( ( [ n, v ] ) => {
      expect ( n ).toEqual ( v.name )
      return n
    } )
    expect ( names ).toEqual ( [
      "CreatePlanDD",
      "EAccountsSummaryDD"
    ] )
  } )
} )

describe ( "allRestAndActions", () => {
  it ( "should find the unque rests and actions", () => {
    expect ( allRestAndActions ( [ EAccountsSummaryPD, createPlanPD, EAccountsSummaryPD, createPlanPD ] ).//
      map ( ( [ page, rdp, rad ] ) => [ page.name, rdp.rest.dataDD.name, rad.name ] ) ).toEqual ( [
      [ "EAccountsSummary", "CreatePlanDD", "get" ],
      [ "EAccountsSummary", "CreatePlanDD", "create" ],
      [ "EAccountsSummary", "CreatePlanDD", "update" ],
      [ "EAccountsSummary", "CreatePlanDD", "delete" ],
      [ "EAccountsSummary", "CreatePlanDD", "list" ],
      [ "EAccountsSummary", "EAccountsSummaryDD", "get" ]
    ] )
  } )

} )