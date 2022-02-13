import { AccountIdDD, DataD, DateDD, IntegerDD, MoneyDD } from "../common/dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/example.dataD";
import { createAllReactCalls, listComponentsIn } from "../common/makeComponents";
import { LabelAndInputCD, TableCD } from "../common/componentsD";


describe ( " listComponentsIn", () => {
  it ( "should list the components used to display the ", () => {
    expect ( listComponentsIn ( [], {}, EAccountsSummaryDD )
    ).toEqual (
      [
        { dataDD: EAccountsSummaryTableDD, display: TableCD, path: [ "eAccountsTable" ] },
        { dataDD: MoneyDD, display: LabelAndInputCD, path: [ "totalMonthlyCost" ] },
        { dataDD: MoneyDD, display: LabelAndInputCD, path: [ "oneAccountBalance" ] },
        { dataDD: MoneyDD, display: LabelAndInputCD, path: [ "currentAccountBalance" ] },
        { dataDD: DateDD, display: LabelAndInputCD, displayParams: { label: 'Create Start' }, path: [ "createPlan", "createPlanStart" ] },
        { dataDD: DateDD, display: LabelAndInputCD, displayParams: { ariaLabel: 'The Create Plan Date' }, path: [ "createPlan", "createPlanDate" ] },
        { dataDD: DateDD, display: LabelAndInputCD, path: [ "createPlan", "createPlanEnd" ] }
      ]
    )
  } )

  it ( "should make the react components", () => {
    expect ( createAllReactCalls ( listComponentsIn ( [], {}, EAccountsSummaryDD ) ) ).toEqual (
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

