import { AccountIdDD, AllDataFolder, collectDataWalker, findAllDataDs, findDataDDIn, foldDataDD, isDataDd, isRepeatingDd } from "../common/dataD";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { start } from "repl";
import { AllGuards, Guards } from "../buttons/guardButton";

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

  let folder: AllDataFolder<string[],AllGuards> = {
    foldPrim: ( acc, path,parents, oneDataDD, p ) =>
      [ ...acc, path.join ( "," ) + "-prim-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") ],
    foldRep: ( acc, path,parents, oneDataDD, p, start ) =>
      [ ...acc, path.join ( "," ) + "-rep-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") + start ],
    foldData: ( acc, path, parents,oneDataDD, p, start ) =>
      [ ...acc, path.join ( "," ) + "-data-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") + start ],
  };
  it ( "should have a foldDataDD", () => {
    expect ( foldDataDD<string[],AllGuards> ( EAccountsSummaryDD, [],  [],[], folder ) ).toEqual ( [
      "-data-EAccountsSummaryDDtrue",
      "useEStatements-prim-BooleanDD",
      "eAccountsTable-rep-EAccountsSummaryTableDDtrue",
      "eAccountsTable-data-EAccountSummaryDDtrue",
      "eAccountsTable,accountId-prim-AccountIdDD{\"label\":\"Account Id\"}",
      "eAccountsTable,displayType-prim-EAccountDisplayTypeDD",
      "eAccountsTable,description-prim-OneLineStringDD",
      "eAccountsTable,virtualBankSeq-prim-OneLineStringDD",
      "eAccountsTable,total-prim-MoneyDD",
      "eAccountsTable,frequency-prim-OneLineStringDD{\"label\":\"Frequency/Amount\"}",
      "eAccountsTable-data-EAccountSummaryDDfalse",
      "eAccountsTable-rep-EAccountsSummaryTableDDfalse",
      "totalMonthlyCost-prim-MoneyDD",
      "oneAccountBalance-prim-MoneyDD",
      "currentAccountBalance-prim-MoneyDD",
      "createPlan-data-CreatePlanDDtrue",
      "createPlan,createPlanStart-prim-DateDD{\"label\":\"Create Start\"}",
      "createPlan,createPlanDate-prim-DateDD{\"ariaLabel\":\"The Create Plan Date\"}",
      "createPlan,createPlanEnd-prim-DateDD",
      "createPlan-data-CreatePlanDDfalse",
      "-data-EAccountsSummaryDDfalse"
    ])
  } )

  it ( "should have a foldDataDD with stopAtDisplay (need better test - one with a structure that has a display)", () => {
    expect ( foldDataDD<string[],AllGuards> ( EAccountsSummaryDD, [], [], [],{ ...folder, stopAtDisplay: true } ) ).toEqual ( [
      "-data-EAccountsSummaryDDtrue",
      "useEStatements-prim-BooleanDD",
      "eAccountsTable-rep-EAccountsSummaryTableDDtrue",
      "eAccountsTable-rep-EAccountsSummaryTableDDfalse",
      "totalMonthlyCost-prim-MoneyDD",
      "oneAccountBalance-prim-MoneyDD",
      "currentAccountBalance-prim-MoneyDD",
      "createPlan-data-CreatePlanDDtrue",
      "createPlan,createPlanStart-prim-DateDD{\"label\":\"Create Start\"}",
      "createPlan,createPlanDate-prim-DateDD{\"ariaLabel\":\"The Create Plan Date\"}",
      "createPlan,createPlanEnd-prim-DateDD",
      "createPlan-data-CreatePlanDDfalse",
      "-data-EAccountsSummaryDDfalse"
    ] )
  } )

} )
describe ( " findDataDDIn", () => {
  it ( "should find all the DataD", () => {
    expect ( findDataDDIn ( EAccountsSummaryDD ) ).toEqual (
      [ EAccountsSummaryDD, EAccountsSummaryTableDD,EAccountSummaryDD, CreatePlanDD ] )
  } )
} )

describe ( "findAllDataDs", () => {
  it ( "should find all the dataDs in a list of expressions, removing duplicates", () => {
    expect ( findAllDataDs ( [ EAccountsSummaryDD, CreatePlanDD, EAccountSummaryDD, CreatePlanDD ] ) ).toEqual ( {
      EAccountsSummaryDD,EAccountsSummaryTableDD, CreatePlanDD, EAccountSummaryDD
    } )
  } )

} )
