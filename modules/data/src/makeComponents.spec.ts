import { AccountIdDD, DataD, DateDD, Input, IntegerDD, listComponentsIn, MoneyDD, Table } from "./dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "./example.dataD";


describe ( " listComponentsIn", () => {
  it ( "should list the components used to display the ", () => {
    expect ( listComponentsIn ( [], undefined, undefined, EAccountsSummaryDD ) ).toEqual (
      [
        { dataDD: EAccountsSummaryTableDD, display: Table, path: [ "eAccountsTable" ] },
        { dataDD: MoneyDD, display: Input, path: [ "totalMonthlyCost" ] },
        { dataDD: MoneyDD, display: Input, path: [ "oneAccountBalance" ] },
        { dataDD: MoneyDD, display: Input, path: [ "currentAccountBalance" ] },
        { dataDD: DateDD, display: Input, label: 'Create Start', path: [ "createPlan", "createPlanStart" ] },
        { dataDD: DateDD, display: Input, ariaLabel: 'The Create Plan Date', path: [ "createPlan", "createPlanDate" ] },
        { dataDD: DateDD, display: Input, path: [ "createPlan", "createPlanEnd" ] }
      ]
    )
  } )

  } )

