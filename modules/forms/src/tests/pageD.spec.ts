import { allRestAndActions, dataDsIn } from "../common/pageD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { sortedEntries } from "@focuson/utils";
import { CreateEAccountDataD } from "../example/createEAccount/createEAccount.dataD";
import { CreateEAccountPageD } from "../example/createEAccount/createEAccount.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";

describe ( "dataDsIn", () => {
  it ( "should find all the DataDs in a list of pages", () => {
    let list = [ EAccountsSummaryPD, CreatePlanPD, EAccountsSummaryPD, CreatePlanPD ];
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

  it ( "should find all the DataDs in a list of pages when display stopped", () => {
    let list = [ EAccountsSummaryPD, CreatePlanPD, EAccountsSummaryPD, CreatePlanPD ];
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
    expect ( allRestAndActions ( [ EAccountsSummaryPD, CreatePlanPD, EAccountsSummaryPD, CreatePlanPD ] ).//
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