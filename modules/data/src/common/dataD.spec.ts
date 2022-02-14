import { AccountIdDD, AllDataFolder, foldDataDD, isDataDd, isRepeatingDd } from "./dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/example.dataD";

describe ( "dataDD", () => {
  it ( "should have a isDataDd ", () => {
    expect ( isDataDd ( EAccountsSummaryDD ) ).toEqual ( true )
    expect ( isDataDd ( EAccountSummaryDD ) ).toEqual ( true )
    expect ( isDataDd ( EAccountsSummaryTableDD ) ).toEqual ( false )
    expect ( isDataDd ( AccountIdDD ) ).toEqual ( false )
  } )
  it ( "should have a isRepeatingDd ", () => {
    expect ( isRepeatingDd ( EAccountsSummaryDD ) ).toEqual ( false )
    expect ( isRepeatingDd ( EAccountSummaryDD ) ).toEqual ( false )
    expect ( isRepeatingDd ( EAccountsSummaryTableDD ) ).toEqual ( true )
    expect ( isRepeatingDd ( AccountIdDD ) ).toEqual ( false )
  } )

  let folder: AllDataFolder<string[]> = {
    foldPrim: ( acc, path, oneDataDD, p ) =>
      [ ...acc, path.join ( "," ) + "-prim-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") ],
    foldRep: ( acc, path, oneDataDD, p ) =>
      [ ...acc, path.join ( "," ) + "-rep-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") ],
    foldData: ( acc, path, oneDataDD, p ) =>
      [ ...acc, path.join ( "," ) + "-data-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") ],
  };
  it ( "should have a foldDataDD", () => {
    expect ( foldDataDD<string[]> ( EAccountsSummaryDD, [], [], folder ) ).toEqual ( [
      "-data-EAccountsSummaryDD",
      "eAccountsTable-rep-EAccountsSummaryTableDD",
      "eAccountsTable-data-EAccountSummaryDD",
      "eAccountsTable,accountId-prim-AccountIdDD{\"label\":\"Account Id\"}",
      "eAccountsTable,displayType-prim-EAccountDisplayTypeDD",
      "eAccountsTable,description-prim-OneLineStringDD",
      "eAccountsTable,frequency-prim-OneLineStringDD{\"label\":\"Frequency/Amount\"}",
      "totalMonthlyCost-prim-IntegerDD",
      "oneAccountBalance-prim-IntegerDD",
      "currentAccountBalance-prim-IntegerDD",
      "createPlan-data-CreatePlanDD",
      "createPlan,createPlanStart-prim-DateDD{\"label\":\"Create Start\"}",
      "createPlan,createPlanDate-prim-DateDD{\"ariaLabel\":\"The Create Plan Date\"}",
      "createPlan,createPlanEnd-prim-DateDD"
    ] )
  } )

  it ( "should have a foldDataDD with stopAtDisplay (need better test - one with a structure that has a display)", () => {
    expect ( foldDataDD<string[]> ( EAccountsSummaryDD, [], [], { ...folder, stopAtDisplay: true } ) ).toEqual ( [
      "-data-EAccountsSummaryDD",
      "eAccountsTable-rep-EAccountsSummaryTableDD",
      "totalMonthlyCost-prim-IntegerDD",
      "oneAccountBalance-prim-IntegerDD",
      "currentAccountBalance-prim-IntegerDD",
      "createPlan-data-CreatePlanDD",
      "createPlan,createPlanStart-prim-DateDD{\"label\":\"Create Start\"}",
      "createPlan,createPlanDate-prim-DateDD{\"ariaLabel\":\"The Create Plan Date\"}",
      "createPlan,createPlanEnd-prim-DateDD"
    ] )
  } )
} )