import { EAccountsSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn, processParam } from "../codegen/makeRender";
import { DisplayCompParamType, LabelAndStringInputCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { makeButtons } from "../buttons/allButtons";

import { AllGuardCreator } from "../buttons/guardButton";
import { RepeatingLinePageD, RepeatingPageD } from "../example/repeating/repeating.pageD";
import { PostCodeMainPage } from "../example/addressSearch/addressSearch.pageD";
import { listOccupationsModalPD, OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { oneOccupationIncomeDetailsDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( EAccountsSummaryPD, listComponentsIn ( EAccountsSummaryDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "<LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' allButtons={buttons} />",
      "<Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "<LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' allButtons={buttons} required={true} />",
      "<LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' allButtons={buttons} required={true} />",
      "<LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' allButtons={buttons} required={true} />",
      "<CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, EAccountsSummaryPD ) ( EAccountsSummaryDD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' allButtons={buttons} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' allButtons={buttons} required={true} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      ""
    ] )
  } )
  it ( "should createAllReactComponents ", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from '@focuson/pages';",
      "import { Context, FocusedProps, FState } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from '@focuson/form_components';",
      "import { GuardButton } from '@focuson/form_components';",
      "import { LabelAndStringInput } from '@focuson/form_components';",
      "import { LabelAndNumberInput } from '@focuson/form_components';",
      "import { Table } from '@focuson/form_components';",
      "import { LabelAndBooleanInput } from '@focuson/form_components';",
      "import { LabelAndRadio } from '@focuson/form_components';",
      "import {ListNextButton} from '@focuson/form_components';",
      "import {ListPrevButton} from '@focuson/form_components';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '@focuson/form_components';",
      "import {ToggleButton} from '@focuson/form_components';",
      "import {ValidationButton} from '@focuson/form_components';",
      "import {EAccountsSummaryPageDomain} from '../EAccountsSummary/EAccountsSummary.domains';",
      "import {CreatePlanDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryTableDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountSummaryDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "export function EAccountsSummaryPage(){",
      "  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  const id='root';",
      "  const buttons =    {amendExistingPlan:<ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='edit'",
      "        focusOn={['{basePage}','{basePage}','tempCreatePlan']}",
      "        copy={[{'from':['{basePage}','fromApi','createPlan']}]}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'update'}}",
      "      />,",
      "      createNewPlan:<ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='create'",
      "        focusOn={['{basePage}','{basePage}','tempCreatePlan']}",
      "        createEmpty={empty.emptyCreatePlan}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'create'}}",
      "      />,",
      "      deleteExistingPlan:<RestButton state={state}",
      "        id='deleteExistingPlan'",
      "        name='deleteExistingPlan'",
      "        action='delete'",
      "        rest='EAccountsSummary_CreatePlanRestDetails'",
      "        confirm={true}",
      "       />,",
      "      refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}",
      "",
      "      return <>",
      "          <EAccountsSummary id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "      { buttons.createNewPlan } ",
      "      { buttons.amendExistingPlan } ",
      "      { buttons.deleteExistingPlan } ",
      "      { buttons.refresh } ",
      "      </>})}",
      "",
      "export function CreatePlan({id,state,mode,buttons}: FocusedProps<FState, CreatePlanDomain,Context>){",
      "  return <>",
      "    <LabelAndStringInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' allButtons={buttons} required={true} />",
      "    <LabelAndStringInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='create plan date' allButtons={buttons} required={true} ariaLabel='The Create Plan Date' />",
      "    <LabelAndStringInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='create plan end' allButtons={buttons} required={true} />",
      "</>",
      "}",
      "",
      "export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' allButtons={buttons} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' allButtons={buttons} required={true} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      "",
      "export function EAccountSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={buttons} required={true} min={10000000} max={99999999} />",
      "    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='display type' allButtons={buttons} enums={{'savings':'Savings','checking':'Checking'}} />",
      "    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' allButtons={buttons} required={true} />",
      "    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='virtual bank seq' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='total' allButtons={buttons} required={true} />",
      "    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' allButtons={buttons} required={true} />",
      "</>",
      "}",
      ""
    ] )
  } )

  it ( "should createAllReactComponents for a modal page that define a display on the data", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), listOccupationsModalPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from '@focuson/pages';",
      "import { Context, FocusedProps, FState } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from '@focuson/form_components';",
      "import { GuardButton } from '@focuson/form_components';",
      "//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block",
      "import {ListOccupationsDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; ",
      "import {ListOccupations} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.render'",
      "import {ListNextButton} from '@focuson/form_components';",
      "import {ListPrevButton} from '@focuson/form_components';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '@focuson/form_components';",
      "import {ToggleButton} from '@focuson/form_components';",
      "import {ValidationButton} from '@focuson/form_components';",
      "export function ListOccupationsModalPage(){",
      "  return focusedPage<FState, ListOccupationsDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <>",
      "          <ListOccupations id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </>})}"
    ] )
  } )
  it ( "should create a simple page", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), CreatePlanPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <>",
      "          <CreatePlan id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </>})}"
    ] )
  } )
  it ( "should create a page with a Layout", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), PostCodeMainPage ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function PostCodeDemoPage(){",
      "  return focusedPageWithExtraState<FState, PostCodeDemoPageDomain, PostCodeMainPageDomain, Context> ( s => 'PostCodeDemo' ) ( s => s.focusOn('main')) (\n    ( fullState, state , full, d, mode) => {",
      "  const id='root';",
      "  const buttons =    {save:<RestButton state={state}",
      "        id='save'",
      "        name='save'",
      "        action='create'",
      "        validate={false}",
      "        rest='PostCodeDemo_PostCodeMainPageRestDetails'",
      "       />,",
      "      search:<ModalButton id='search' text='search'  state={state} modal = 'PostCodeSearch'  ",
      "        pageMode='edit'",
      "        focusOn={['{basePage}','postcode']}",
      "        copy={[{'from':['{basePage}','main','postcode'],'to':['{basePage}','postcode','search']}]}",
      "        copyOnClose={[{'from':['{basePage}','postcode','addressResults','line1'],'to':['{basePage}','main','line1']},{'from':['{basePage}','postcode','addressResults','line2'],'to':['{basePage}','main','line2']},{'from':['{basePage}','postcode','addressResults','line3'],'to':['{basePage}','main','line3']},{'from':['{basePage}','postcode','addressResults','line4'],'to':['{basePage}','main','line4']},{'from':['{basePage}','postcode','search'],'to':['{basePage}','main','postcode']}]}",
      "      />,}",
      "",
      "      return <HideButtonsLayout buttons={buttons} hide={['search']}>",
      "          <PostCodeMainPage id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "      { buttons.search } ",
      "      { buttons.save } ",
      "      </HideButtonsLayout>})}",
      ""
    ] )
  } )

} )

describe ( "makeComponentWithGuard", () => {
  it ( "should make guard variables", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, OccupationAndIncomeSummaryPD ) ( oneOccupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function OneOccupationIncomeDetails({id,state,mode,buttons}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){",
      "const areYouGuard = state.chainLens(Lenses.fromPath(['areYou'])).optJsonOr([]);",
      "const employmentTypeGuard = state.chainLens(Lenses.fromPath(['employmentType'])).optJsonOr([]);",
      "const otherSourceOfIncomeGuard = state.chainLens(Lenses.fromPath(['otherSourceOfIncome'])).optJsonOr([]);",
      "const owningSharesPctGuard = state.chainLens(Lenses.fromPath(['owningSharesPct'])).optJsonOr([]);"
    ] )
  } )
} )

describe ( "make components - the different parameter types", () => {
  function makeParam ( theType: DisplayCompParamType, val: string | string[] ) {
    return processParam ( 'errorPrefix', { ...LabelAndStringInputCD, params: { p1: { paramType: theType, needed: 'no' } } } ) ( 'p1', val );
  }
  it ( "should create paramtype object", () => {
    expect ( makeParam ( 'object', 'obj' ) ).toEqual ( '{obj}' )
  } )
  it ( "should create paramtype boolean", () => {
    expect ( makeParam ( 'boolean', 'obj' ) ).toEqual ( '{obj}' )
  } )
  it ( "should create paramtype string", () => {
    expect ( makeParam ( 'string', 'obj' ) ).toEqual ( "'obj'" )
  } )
  it ( "should create paramtype string[]", () => {
    expect ( makeParam ( 'string[]', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{['a','b']}" )
  } )
  it ( "should create paramtype state", () => {
    expect ( makeParam ( 'state', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{state.focusOn('a').focusOn('b')}" )
  } )
  it ( "should create paramtype stateValue", () => {
    expect ( makeParam ( 'stateValue', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{state.focusOn('a').focusOn('b').json()}" )
  } )
  it ( "should create paramtype pageState", () => {
    expect ( makeParam ( 'pageState', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{pageState(state)<any>().focusOn('a').focusOn('b')}" )
  } )
  it ( "should create paramtype pageStateValue", () => {
    expect ( makeParam ( 'pageStateValue', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{pageState(state)<any>().focusOn('a').focusOn('b').json()}" )
  } )
  it ( "should create paramtype fullState", () => {
    expect ( makeParam ( 'fullState', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{fullState(state).focusOn('a').focusOn('b')}" )
  } )
  it ( "should create paramtype fullStateValue", () => {
    expect ( makeParam ( 'fullStateValue', [ 'a', 'b' ] ).replace ( /"/g, "'" ) ).toEqual ( "{fullState(state).focusOn('a').focusOn('b').json()}" )
  } )
} )