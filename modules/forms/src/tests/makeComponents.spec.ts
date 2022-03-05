import { DateDD, MoneyDD } from "../common/dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn } from "../codegen/makeComponents";
import { LabelAndNumberInputCD, LabelAndStringInputCD, TableCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { transformButtons } from "../buttons/allButtons";
import { occupationIncomeDetailsDD } from "../example/occupationAndIncomeDetails/occupationAndIncome.dataD";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( listComponentsIn ( EAccountsSummaryDD ) ) ).toEqual ( [
      "<LabelAndBooleanInput state={state.focusOn('useEStatements')} label='use e statements' mode={mode} />",
      "<Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />",
      "<LabelAndNumberInput state={state.focusOn('totalMonthlyCost')} label='total monthly cost' mode={mode} />",
      "<LabelAndNumberInput state={state.focusOn('oneAccountBalance')} label='one account balance' mode={mode} />",
      "<LabelAndNumberInput state={state.focusOn('currentAccountBalance')} label='current account balance' mode={mode} />",
      "<LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "<LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />",
      "<LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='create plan end' mode={mode} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( EAccountsSummaryDD ) ).toEqual ( [
      "export function EAccountsSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain,Context>){",
      "  return(<>",
      "  <LabelAndBooleanInput state={state.focusOn('useEStatements')} label='use e statements' mode={mode} />",
      "  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('totalMonthlyCost')} label='total monthly cost' mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('oneAccountBalance')} label='one account balance' mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('currentAccountBalance')} label='current account balance' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='create plan end' mode={mode} />",
      "</>)",
      "}",
      ""
    ] )
  } )
  it ( "should createAllReactComponents ", () => {
    expect ( createAllReactComponents ( paramsForTest, transformButtons, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ([
      "import { LensProps } from \"@focuson/state\";",
      "import { Layout } from \"./copied/layout\";",
      "import { RestButton } from \"./copied/rest\";",
      "import { ListNextButton, ListPrevButton } from \"./copied/listNextPrevButtons\";",
      "import { PageSelectionAndRestCommandsContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState,  ModalButton, ModalCancelButton, ModalCommitButton} from \"@focuson/pages\";",
      "import { Context, FocusedProps } from \"./common\";",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from \"./copied/guard\";",
      "import { LabelAndStringInput } from './copied/LabelAndInput';",
      "import { LabelAndNumberInput } from './copied/LabelAndInput';",
      "import { Table } from './copied/table';",
      "import { LabelAndBooleanInput } from './copied/LabelAndInput';",
      "import { LabelAndRadio } from './copied/Radio';",
      "import {EAccountsSummaryPageDomain} from \"./pageDomains\";",
      "import {CreatePlanDDDomain} from \"./domains\"",
      "import {EAccountsSummaryDDDomain} from \"./domains\"",
      "import {EAccountSummaryDDDomain} from \"./domains\"",
      "export function EAccountsSummaryPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){",
      "  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  return (<Layout  details='[1][3,3][5]'>",
      "     <EAccountsSummaryDD state={state}  mode={mode} />",
      "     <ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  focusOn={[\"EAccountsSummary\",\"tempCreatePlan\"]} copyFrom={[\"EAccountsSummary\",\"fromApi\",\"createPlan\"]}    pageMode='edit'   rest={{\"name\":\"EAccountsSummary_CreatePlanDDRestDetails\",\"restAction\":\"update\",\"path\":[\"EAccountsSummary\"]}} />",
      "     <ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  focusOn={[\"EAccountsSummary\",\"tempCreatePlan\"]}  createEmpty={empty.emptyCreatePlanDD}   pageMode='create'   rest={{\"name\":\"EAccountsSummary_CreatePlanDDRestDetails\",\"restAction\":\"create\",\"path\":[\"EAccountsSummary\"]}} />",
      "     <RestButton id='deleteExistingPlan' state={state} />",
      "     <button>refresh of type ResetStateButton cannot be created yet</button>",
      "   </Layout>)})}",
      "",
      "export function CreatePlanPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){",
      "  return focusedPage<S, CreatePlanDDDomain, Context> ( s => '' ) (",
      "     ( state, d, mode ) => {",
      "          return (<Layout  details='[3]'>",
      "               <CreatePlanDD state={state}  mode={mode} />",
      "               <ModalCancelButton id='cancel' state={state} />",
      "               <ModalCommitButton id='commit' state={state} />",
      "            </Layout>)})}",
      "",
      "export function CreatePlanDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreatePlanDDDomain,Context>){",
      "  return(<>",
      "  <LabelAndStringInput state={state.focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlanEnd')} label='create plan end' mode={mode} />",
      "</>)",
      "}",
      "",
      "export function EAccountsSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain,Context>){",
      "  return(<>",
      "  <LabelAndBooleanInput state={state.focusOn('useEStatements')} label='use e statements' mode={mode} />",
      "  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('totalMonthlyCost')} label='total monthly cost' mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('oneAccountBalance')} label='one account balance' mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('currentAccountBalance')} label='current account balance' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='create plan end' mode={mode} />",
      "</>)",
      "}",
      "",
      "export function EAccountSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountSummaryDDDomain,Context>){",
      "  return(<>",
      "  <LabelAndStringInput state={state.focusOn('accountId')} label='Account Id' mode={mode} />",
      "  <LabelAndRadio state={state.focusOn('displayType')} label='display type' mode={mode} enums={{\"savings\":\"Savings\",\"checking\":\"Checking\"}} />",
      "  <LabelAndStringInput state={state.focusOn('description')} label='description' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('virtualBankSeq')} label='virtual bank seq' mode={mode} />",
      "  <LabelAndNumberInput state={state.focusOn('total')} label='total' mode={mode} />",
      "  <LabelAndStringInput state={state.focusOn('frequency')} label='Frequency/Amount' mode={mode} />",
      "</>)",
      "}",
      ""
    ] )
  } )

  it ( "should createReactPageComponent", () => {
    expect ( createReactPageComponent ( paramsForTest, transformButtons, EAccountsSummaryPD ) ).toEqual ([
      "export function EAccountsSummaryPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){",
      "  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  return (<Layout  details='[1][3,3][5]'>",
      "     <EAccountsSummaryDD state={state}  mode={mode} />",
      "     <ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  focusOn={[\"EAccountsSummary\",\"tempCreatePlan\"]} copyFrom={[\"EAccountsSummary\",\"fromApi\",\"createPlan\"]}    pageMode='edit'   rest={{\"name\":\"EAccountsSummary_CreatePlanDDRestDetails\",\"restAction\":\"update\",\"path\":[\"EAccountsSummary\"]}} />",
      "     <ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  focusOn={[\"EAccountsSummary\",\"tempCreatePlan\"]}  createEmpty={empty.emptyCreatePlanDD}   pageMode='create'   rest={{\"name\":\"EAccountsSummary_CreatePlanDDRestDetails\",\"restAction\":\"create\",\"path\":[\"EAccountsSummary\"]}} />",
      "     <RestButton id='deleteExistingPlan' state={state} />",
      "     <button>refresh of type ResetStateButton cannot be created yet</button>",
      "   </Layout>)})}",
      ""
    ])
    expect ( createReactPageComponent ( paramsForTest, transformButtons, CreatePlanPD ) ).toEqual ( [
      "export function CreatePlanPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){",
      "  return focusedPage<S, CreatePlanDDDomain, Context> ( s => '' ) (",
      "     ( state, d, mode ) => {",
      "          return (<Layout  details='[3]'>",
      "               <CreatePlanDD state={state}  mode={mode} />",
      "               <ModalCancelButton id='cancel' state={state} />",
      "               <ModalCommitButton id='commit' state={state} />",
      "            </Layout>)})}",
      ""
    ] )
  } )
} )

describe ( "makeComponentWithGuard", () => {
  it ( "should make guard variables", () => {
    expect ( createReactComponent ( occupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function OccupationIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, OccupationIncomeDetailsDDDomain,Context>){",
      "const areYouGuard = state.chainLens(Lenses.fromPath(['areYou'])).optJson();console.log('areYouGuard', areYouGuard)",
      "  return(<>",
      "  <LabelAndStringInput state={state.focusOn('areYou')} label='are you' mode={mode} />",
      "  <Guard value={areYouGuard} cond={['E','S']}><LabelAndStringInput state={state.focusOn('currentEmployment')} label='current employment' mode={mode} /></Guard>"
    ] )
  } )
} )

