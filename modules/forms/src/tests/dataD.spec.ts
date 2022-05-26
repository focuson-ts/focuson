import { AccountIdDD, AllDataFolder, collectDataWalker, findAllDataDs, findDataDDIn, foldDataDD, isDataDd, isRepeatingDd } from "../common/dataD";
import { BalancesAndMonthlyCostDD, CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
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

  let folder: AllDataFolder<string[], AllGuards> = {
    foldPrim: ( acc, path, parents, oneDataDD, p ) =>
      [ ...acc, path.join ( "," ) + "-prim-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") ],
    foldRep: ( acc, path, parents, oneDataDD, p, start ) =>
      [ ...acc, path.join ( "," ) + "-rep-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") + start ],
    foldData: ( acc, path, parents, oneDataDD, p, start ) =>
      [ ...acc, path.join ( "," ) + "-data-" + p.name + (oneDataDD?.displayParams ? JSON.stringify ( oneDataDD?.displayParams ) : "") + start ],
  };
  it ( "should have a foldDataDD", () => {
    expect ( foldDataDD<string[], AllGuards> ( EAccountsSummaryDD, [], [], [], folder ) ).toEqual ( [
      "-data-EAccountsSummarytrue",
      "useEStatements-prim-Boolean",
      "eAccountsTable-rep-EAccountsSummaryTabletrue",
      "eAccountsTable-data-EAccountSummarytrue",
      "eAccountsTable,accountId-prim-AccountId{\"label\":\"Account Id\"}",
      "eAccountsTable,displayType-prim-EAccountDisplayType",
      "eAccountsTable,description-prim-OneLineString",
      "eAccountsTable,virtualBankSeq-prim-OneLineString",
      "eAccountsTable,total-prim-Money",
      "eAccountsTable,frequency-prim-OneLineString{\"label\":\"Frequency/Amount\"}",
      "eAccountsTable-data-EAccountSummaryfalse",
      "eAccountsTable-rep-EAccountsSummaryTablefalse",
      "balancesAndMonthlyCost-data-BalancesAndMonthlyCosttrue",
      "balancesAndMonthlyCost,totalMonthlyCost-prim-Money",
      "balancesAndMonthlyCost,oneAccountBalance-prim-Money",
      "balancesAndMonthlyCost,currentAccountBalance-prim-Money",
      "balancesAndMonthlyCost-data-BalancesAndMonthlyCostfalse",
      "createPlan-data-CreatePlantrue",
      "createPlan,createPlanStart-prim-Date{\"label\":\"Create Start\",\"dateFormat\":\"yyyy/MM/dd\"}",
      "createPlan,createPlanDate-prim-Date{\"ariaLabel\":\"The Create Plan Date\"}",
      "createPlan,createPlanEnd-prim-Date",
      "createPlan-data-CreatePlanfalse",
      "-data-EAccountsSummaryfalse"
    ] )
  } )

  it ( "should have a foldDataDD with stopAtDisplay (need better test - one with a structure that has a display)", () => {
    expect ( foldDataDD<string[], AllGuards> ( EAccountsSummaryDD, [], [], [], { ...folder, stopAtDisplay: true } ) ).toEqual ( [
      "-data-EAccountsSummarytrue",
      "useEStatements-prim-Boolean",
      "eAccountsTable-rep-EAccountsSummaryTabletrue",
      "eAccountsTable-rep-EAccountsSummaryTablefalse",
      "balancesAndMonthlyCost-data-BalancesAndMonthlyCosttrue",
      "balancesAndMonthlyCost,totalMonthlyCost-prim-Money",
      "balancesAndMonthlyCost,oneAccountBalance-prim-Money",
      "balancesAndMonthlyCost,currentAccountBalance-prim-Money",
      "balancesAndMonthlyCost-data-BalancesAndMonthlyCostfalse",
      "createPlan-data-CreatePlantrue",
      "createPlan,createPlanStart-prim-Date{\"label\":\"Create Start\",\"dateFormat\":\"yyyy/MM/dd\"}",
      "createPlan,createPlanDate-prim-Date{\"ariaLabel\":\"The Create Plan Date\"}",
      "createPlan,createPlanEnd-prim-Date",
      "createPlan-data-CreatePlanfalse",
      "-data-EAccountsSummaryfalse"
    ] )
  } )

} )
describe ( " findDataDDIn", () => {
  it ( "should find all the DataD", () => {
    expect ( findDataDDIn ( EAccountsSummaryDD ).map ( s => s.name ) ).toEqual ( [
      "EAccountsSummary",
      "EAccountsSummaryTable",
      "EAccountSummary",
      "BalancesAndMonthlyCost",
      "CreatePlan"
    ] )
  } )
} )

describe ( "findAllDataDs", () => {
  it ( "should find all the dataDs in a list of expressions, removing duplicates", () => {
    let allDataDs = findAllDataDs ( [ EAccountsSummaryDD, CreatePlanDD, EAccountSummaryDD, CreatePlanDD ] );
    expect ( Object.keys ( allDataDs ) ).toEqual ( [
      "EAccountsSummary",
      "EAccountsSummaryTable",
      "EAccountSummary",
      "BalancesAndMonthlyCost",
      "CreatePlan"
    ] )
    expect ( Object.values ( allDataDs ).map ( s => s.name ) ).toEqual ( [
      "EAccountsSummary",
      "EAccountsSummaryTable",
      "EAccountSummary",
      "BalancesAndMonthlyCost",
      "CreatePlan"
    ] )
  } )

} )
