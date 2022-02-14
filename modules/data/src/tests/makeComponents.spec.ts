import { AccountIdDD, DataD, DateDD, IntegerDD, MoneyDD } from "../common/dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/example.dataD";
import { ComponentData, createAllReactCalls, listComponentsIn } from "../codegen/makeComponents";
import { LabelAndInputCD, TableCD } from "../common/componentsD";


describe ( " listComponentsIn", () => {
  it ( "should list the components used to display the ", () => {
    let expected = [
      { dataDD: EAccountsSummaryTableDD, display: TableCD, path: [ "eAccountsTable" ] },
      { dataDD: MoneyDD, display: LabelAndInputCD, path: [ "totalMonthlyCost" ] },
      { dataDD: MoneyDD, display: LabelAndInputCD, path: [ "oneAccountBalance" ] },
      { dataDD: MoneyDD, display: LabelAndInputCD, path: [ "currentAccountBalance" ] },
      { dataDD: DateDD, display: LabelAndInputCD, displayParams: { label: 'Create Start' }, path: [ "createPlan", "createPlanStart" ] },
      { dataDD: DateDD, display: LabelAndInputCD, displayParams: { ariaLabel: 'The Create Plan Date' }, path: [ "createPlan", "createPlanDate" ] },
      { dataDD: DateDD, display: LabelAndInputCD, path: [ "createPlan", "createPlanEnd" ] }
    ];
    let actual = listComponentsIn ( EAccountsSummaryDD );
    expect ( actual.length ).toEqual ( expected.length )
    for ( let i = 0; i < actual.length; i++ ) {
      let a: any = actual[ i ]
      let e: any = expected[ i ]
      // console.log ( "loop", i )
      expect ( a.dataDD ).toEqual ( e.dataDD )
      expect ( a.display ).toEqual ( e.display )
      expect ( a.displayParams ).toEqual ( e.displayParams )
      expect ( a.path ).toEqual ( e.path )
    }
    expect ( actual ).toEqual ( expected )
  } )

  it ( "should make the react components", () => {
    expect ( createAllReactCalls ( listComponentsIn ( EAccountsSummaryDD ) ) ).toEqual (
      [
        "<Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','frequency']} />",
        "<LabelAndInput state={state.focusOn('totalMonthlyCost')} label='totalMonthlyCostCC' />",
        "<LabelAndInput state={state.focusOn('oneAccountBalance')} label='oneAccountBalanceCC' />",
        "<LabelAndInput state={state.focusOn('currentAccountBalance')} label='currentAccountBalanceCC' />",
        "<LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' />",
        "<LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='createPlanDateCC' ariaLabel='The Create Plan Date' />",
        "<LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='createPlanEndCC' />"
      ]
    )
  } )

} )

