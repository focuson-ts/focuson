import { DateDD, MoneyDD } from "../common/dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn } from "../codegen/makeComponents";
import { LabelAndInputCD, TableCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";


describe ( " listComponentsIn", () => {
  it ( "should list the components used to display the ", () => {
    let expected = [
      { dataDD: EAccountsSummaryTableDD, display: TableCD, path: [ "eAccountsTable" ] },
      { dataDD: { ...MoneyDD, resolver: 'getTotalMonthlyCost', sample: [ '1000' ] }, display: LabelAndInputCD, path: [ "totalMonthlyCost" ] },
      { dataDD: { ...MoneyDD, resolver: 'getOneAccountBalance', sample: [ '9921' ] }, display: LabelAndInputCD, path: [ "oneAccountBalance" ] },
      { dataDD: { ...MoneyDD, resolver: 'getCurrentAccountBalance', sample:[ "12321"] }, display: LabelAndInputCD, path: [ "currentAccountBalance" ] },
      { dataDD: DateDD, display: LabelAndInputCD, displayParams: { label: 'Create Start' }, path: [ "createPlan", "createPlanStart" ] },
      { dataDD: DateDD, display: LabelAndInputCD, displayParams: { ariaLabel: 'The Create Plan Date' }, path: [ "createPlan", "createPlanDate" ] },
      { dataDD: DateDD, display: LabelAndInputCD, path: [ "createPlan", "createPlanEnd" ] }
    ];
    let actual = listComponentsIn ( EAccountsSummaryDD );
    for ( let i = 0; i < actual.length; i++ ) {
      let a: any = actual[ i ]
      let e: any = expected[ i ]
      // console.log ( "loop", i , a.dataDD.name, e.dataDD.name)
      expect ( a.dataDD ).toEqual ( e.dataDD )
      expect ( a.display ).toEqual ( e.display )
      expect ( a.displayParams ).toEqual ( e.displayParams )
      expect ( a.path ).toEqual ( e.path )
    }
    expect ( actual.length ).toEqual ( expected.length )
    expect ( actual ).toEqual ( expected )
  } )

  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( listComponentsIn ( EAccountsSummaryDD ) ) ).toEqual ([
      "<Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />",
      "<LabelAndInput state={state.focusOn('totalMonthlyCost')} label='totalMonthlyCost' mode={mode} />",
      "<LabelAndInput state={state.focusOn('oneAccountBalance')} label='oneAccountBalance' mode={mode} />",
      "<LabelAndInput state={state.focusOn('currentAccountBalance')} label='currentAccountBalance' mode={mode} />",
      "<LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "<LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='createPlanDate' ariaLabel='The Create Plan Date' mode={mode} />",
      "<LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='createPlanEnd' mode={mode} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( EAccountsSummaryDD ) ).toEqual ( [
      "export function EAccountsSummaryDD<S>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain>){",
      "  return(<>",
      "  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />",
      "  <LabelAndInput state={state.focusOn('totalMonthlyCost')} label='totalMonthlyCost' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('oneAccountBalance')} label='oneAccountBalance' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('currentAccountBalance')} label='currentAccountBalance' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='createPlanDate' ariaLabel='The Create Plan Date' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='createPlanEnd' mode={mode} />",
      "</>)",
      "}"
    ])
  } )
  it ( "should createAllReactComponents ", () => {
    expect ( createAllReactComponents ( paramsForTest,[ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "import { LensProps } from \"@focuson/state\";",
      "import { Layout } from \"./copied/layout\";",
      "import { ModalButton, ModalCancelButton, ModalCommitButton,ModalAndCopyButton } from \"./copied/modal\";",
      "import { RestButton } from \"./copied/rest\";",
      "import { LabelAndInput } from \"./copied/LabelAndInput\";",
      "import { focusedPageWithExtraState } from \"@focuson/pages\";",
      "import { Table } from \"./copied/table\";",
      "import { FocusedProps } from \"./common\";",
      "import {EAccountsSummaryPageDomain} from \"./pageDomains\";",
      "import {CreatePlanDDDomain} from \"./domains\"",
      "import {EAccountsSummaryDDDomain} from \"./domains\"",
      "import {EAccountSummaryDDDomain} from \"./domains\"",
      "export function EAccountsSummaryPage<S>(){",
      "  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  return (<Layout  details='[1][3,3][5]'>",
      "   <EAccountsSummaryDD state={state}  mode={mode} />",
      "   <ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='edit' from={fullState.focusOn('fromApi')} to={fullState.focusOn('temp')} rest='createPlanRestD' action='update'  />",
      "   <ModalButton id='createNewPlan' text='createNewPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='create' createEmpty rest='createPlanRestD' action='create'  />",
      "   <RestButton id='deleteExistingPlan' state={state} />",
      "   <RestButton id='refresh' state={state} />",
      "   </Layout>)})}",
      "export function CreatePlanPage<S>({state, mode}: FocusedProps<S,CreatePlanDDDomain>){",
      "  return (<Layout  details='[3]'>",
      "   <CreatePlanDD state={state}  mode={mode} />",
      "   <ModalCancelButton id='cancel' state={state} />",
      "   <ModalCommitButton id='commit' state={state} />",
      "   </Layout>)}",
      "export function CreatePlanDD<S>({state,mode}: FocusedProps<S, CreatePlanDDDomain>){",
      "  return(<>",
      "  <LabelAndInput state={state.focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlanDate')} label='createPlanDate' ariaLabel='The Create Plan Date' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlanEnd')} label='createPlanEnd' mode={mode} />",
      "</>)",
      "}",
      "export function EAccountsSummaryDD<S>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain>){",
      "  return(<>",
      "  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />",
      "  <LabelAndInput state={state.focusOn('totalMonthlyCost')} label='totalMonthlyCost' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('oneAccountBalance')} label='oneAccountBalance' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('currentAccountBalance')} label='currentAccountBalance' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='createPlanDate' ariaLabel='The Create Plan Date' mode={mode} />",
      "  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='createPlanEnd' mode={mode} />",
      "</>)",
      "}"
    ])
  } )

  it ( "should createReactPageComponent", () => {
    expect ( createReactPageComponent ( EAccountsSummaryPD ) ).toEqual ( [
      "export function EAccountsSummaryPage<S>(){",
      "  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  return (<Layout  details='[1][3,3][5]'>",
      "   <EAccountsSummaryDD state={state}  mode={mode} />",
      "   <ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='edit' from={fullState.focusOn('fromApi')} to={fullState.focusOn('temp')} rest='createPlanRestD' action='update'  />",
      "   <ModalButton id='createNewPlan' text='createNewPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='create' createEmpty rest='createPlanRestD' action='create'  />",
      "   <RestButton id='deleteExistingPlan' state={state} />",
      "   <RestButton id='refresh' state={state} />",
      "   </Layout>)})}"
    ])
    expect ( createReactPageComponent ( CreatePlanPD ) ).toEqual ( [
      "export function CreatePlanPage<S>({state, mode}: FocusedProps<S,CreatePlanDDDomain>){",
      "  return (<Layout  details='[3]'>",
      "   <CreatePlanDD state={state}  mode={mode} />",
      "   <ModalCancelButton id='cancel' state={state} />",
      "   <ModalCommitButton id='commit' state={state} />",
      "   </Layout>)}"
    ] )
  } )
} )

