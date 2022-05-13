import { EAccountsSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn, processParam } from "../codegen/makeRender";
import { DisplayCompParamType, LabelAndStringInputCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { makeButtons } from "../buttons/allButtons";

import { AllGuardCreator } from "../buttons/guardButton";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { listOccupationsModalPD, OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { oneOccupationIncomeDetailsDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";
import { paramsForTest } from "./paramsForTest";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( EAccountsSummaryPD, paramsForTest, EAccountsSummaryPD, listComponentsIn ( EAccountsSummaryDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "<LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={allButtons} />",
      "<Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "<LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={allButtons} required={true} />",
      "<LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={allButtons} required={true} />",
      "<LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={allButtons} required={true} />",
      "<CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} label='Create Plan' allButtons={allButtons} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, EAccountsSummaryPD, EAccountsSummaryPD ) ( EAccountsSummaryDD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary({id,state,mode,allButtons,label}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={allButtons} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={allButtons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={allButtons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={allButtons} required={true} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} label='Create Plan' allButtons={allButtons} />",
      "</>",
      "}",
      ""
    ] )
  } )
  it ( "should createAllReactComponents ", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD, EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from '@focuson/pages';",
      "import { Context, FocusedProps, FState, identityL } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from '@focuson/form_components';",
      "import { GuardButton } from '@focuson/form_components';",
      "import { EAccountsSummaryOptionals } from '../EAccountsSummary/EAccountsSummary.optionals';",
      "import { LabelAndDateInput } from '@focuson/form_components';",
      "import { LabelAndNumberInput } from '@focuson/form_components';",
      "import { Table } from '@focuson/form_components';",
      "import { LabelAndBooleanInput } from '@focuson/form_components';",
      "import { LabelAndStringInput } from '@focuson/form_components';",
      "import { LabelAndRadio } from '@focuson/form_components';",
      "import {DeleteStateButton} from '@focuson/form_components';",
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
      "   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi",
      "  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDomain, Context> ( s => 'E Accounts Summary' ) ( state => state.focusOn('fromApi')) (",
      "( fullState, state , full, d, mode, index) => {",
      "const id=`page${index}`;",
      "  const allButtons =    {amendExistingPlan:<ModalButton id={`${id}.amendExistingPlan`} text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='edit'",
      "        focusOn='~/tempCreatePlan'",
      "        copy={[{'from':'~/fromApi/createPlan'}]}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'update'}}",
      "      />,",
      "      createNewPlan:<ModalButton id={`${id}.createNewPlan`} text='createNewPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='create'",
      "        focusOn='~/tempCreatePlan'",
      "        createEmpty={empty.emptyCreatePlan}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'create'}}",
      "      />,",
      "      deleteExistingPlan:<RestButton state={state} id={`${id}.deleteExistingPlan`} ",
      "        name='deleteExistingPlan'",
      "        action={'delete'}",
      "        rest='EAccountsSummary_CreatePlanRestDetails'",
      "        confirm={true}",
      "       />,",
      "      refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}",
      "",
      "      return <>",
      "          <EAccountsSummary id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "      { allButtons.createNewPlan } ",
      "      { allButtons.amendExistingPlan } ",
      "      { allButtons.deleteExistingPlan } ",
      "      { allButtons.refresh } ",
      "      </>})}",
      "",
      "export function CreatePlan({id,state,mode,allButtons,label}: FocusedProps<FState, CreatePlanDomain,Context>){",
      "  return <>",
      "    <LabelAndDateInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' allButtons={allButtons} />",
      "    <LabelAndDateInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='Create Plan Date' allButtons={allButtons} ariaLabel='The Create Plan Date' />",
      "    <LabelAndDateInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='Create Plan End' allButtons={allButtons} />",
      "</>",
      "}",
      "",
      "export function EAccountsSummary({id,state,mode,allButtons,label}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={allButtons} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={allButtons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={allButtons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={allButtons} required={true} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} label='Create Plan' allButtons={allButtons} />",
      "</>",
      "}",
      "",
      "export function EAccountSummary({id,state,mode,allButtons,label}: FocusedProps<FState, EAccountSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={allButtons} required={true} min={10000000} max={99999999} />",
      "    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='Display Type' allButtons={allButtons} enums={{'savings':'Savings','checking':'Checking'}} />",
      "    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='Description' allButtons={allButtons} required={true} />",
      "    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='Virtual Bank Seq' allButtons={allButtons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='Total' allButtons={allButtons} required={true} />",
      "    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' allButtons={allButtons} required={true} />",
      "</>",
      "}",
      ""
    ] )
  } )

  it ( "should createAllReactComponents for a modal page that define a display on the data", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), OccupationAndIncomeSummaryPD, listOccupationsModalPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from '@focuson/pages';",
      "import { Context, FocusedProps, FState, identityL } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from '@focuson/form_components';",
      "import { GuardButton } from '@focuson/form_components';",
      "//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block",
      "import {ListOccupationsDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; ",
      "import {ListOccupations} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.render'",
      "import {DeleteStateButton} from '@focuson/form_components';",
      "import {ListNextButton} from '@focuson/form_components';",
      "import {ListPrevButton} from '@focuson/form_components';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '@focuson/form_components';",
      "import {ToggleButton} from '@focuson/form_components';",
      "import {ValidationButton} from '@focuson/form_components';",
      "export function ListOccupationsModalPage(){",
      "  return focusedPage<FState, ListOccupationsDomain, Context> ( s =>  'List Occupations Modal' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode, index ) => {",
      "          const id=`page${index}`;",
      "          const allButtons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state} />,",
      "              commit:<ModalCommitButton id={`${id}.commit`}   state={state} />,}",
      "          return <>",
      "          <ListOccupations id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "          { allButtons.cancel } ",
      "          { allButtons.commit } ",
      "          </>})}"
    ] )
  } )
  it ( "should create a simple page", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD, CreatePlanPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDomain, Context> ( s =>  'Create Plan' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode, index ) => {",
      "          const id=`page${index}`;",
      "          const allButtons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state} />,",
      "              commit:<ModalCommitButton id={`${id}.commit`}   state={state} />,}",
      "          return <>",
      "          <CreatePlan id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "          { allButtons.cancel } ",
      "          { allButtons.commit } ",
      "          </>})}"
    ] )
  } )
  it ( "should create a page with a Layout", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), PostCodeMainPage, PostCodeMainPage ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function PostCodeMainPagePage(){",
      "   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/main",
      "  return focusedPageWithExtraState<FState, PostCodeMainPagePageDomain, PostCodeNameAndAddressDomain, Context> ( s => 'Post Code Main Page' ) ( state => state.focusOn('main')) (",
      "( fullState, state , full, d, mode, index) => {",
      "const id=`page${index}`;",
      "  const allButtons =    {save:<RestButton state={state} id={`${id}.save`} ",
      "        name='save'",
      "        action={'create'}",
      "        validate={false}",
      "        rest='PostCodeMainPage_PostCodeNameAndAddressRestDetails'",
      "       />,",
      "      search:<ModalButton id={`${id}.search`} text='search'  state={state} modal = 'PostCodeSearch'  ",
      "        pageMode='edit'",
      "        focusOn='~/postcode'",
      "        copyOnClose={[{'from':'~/postcode/addressResults/line1','to':'~/main/line1'},{'from':'~/postcode/addressResults/line2','to':'~/main/line2'},{'from':'~/postcode/addressResults/line3','to':'~/main/line3'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/addressResults/postcode','to':'~/main/postcode'}]}",
      "        copyJustString={[{'from':'~/main/postcode','to':'~/postcode/search'}]}",
      "      />,}",
      "",
      "      return <HideButtonsLayout buttons={allButtons} hide={['search']}>",
      "          <PostCodeNameAndAddress id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "      { allButtons.search } ",
      "      { allButtons.save } ",
      "      </HideButtonsLayout>})}",
      ""
    ] )
  } )

} )

describe ( "makeComponentWithGuard", () => {
  it ( "should make guard variables in the order they were declared in", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, OccupationAndIncomeSummaryPD, OccupationAndIncomeSummaryPD ) ( oneOccupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function OneOccupationIncomeDetails({id,state,mode,allButtons,label}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){",
      "const areYouGuard = state.focusOn('areYou').optJson();",
      "const ownShareOfTheCompanyGuard = state.focusOn('ownShareOfTheCompany').optJson();",
      "const owningSharesPctGuard = state.focusOn('owningSharesPct').optJson();",
      "const employmentTypeGuard = state.focusOn('employmentType').optJson();"
    ] )
  } )
} )

describe ( "make components - the different parameter types", () => {
  function makeParam ( theType: DisplayCompParamType, val: string | string[] ) {
    return processParam ( OccupationAndIncomeSummaryPD, OccupationAndIncomeSummaryPD, paramsForTest, 'errorPrefix', { ...LabelAndStringInputCD, params: { p1: { paramType: theType, needed: 'no' } } } ) ( 'p1', val );
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
  it ( "should create paramtype path - from page", () => {
    expect ( makeParam ( 'path', '~/one/two' ).replace ( /"/g, "'" ) ).toEqual ( "{pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('one').focusOn('two')}" )
  } )
  it ( "should create paramtype path - from full", () => {
    expect ( makeParam ( 'path', '/one/two' ).replace ( /"/g, "'" ) ).toEqual ( "{fullState<FState,any,Context>(state).focusOn('one').focusOn('two')}" )
  } )
  it ( "should create paramtype path - from 'here'", () => {
    expect ( makeParam ( 'path', 'one/two' ).replace ( /"/g, "'" ) ).toEqual ( "{state.focusOn('one').focusOn('two')}" )
  } )
  it ( "should create paramtype path - with variables", () => {
    expect ( makeParam ( 'path', '#one' ).replace ( /"/g, "'" ) ).toEqual ( "{state.copyWithLens(OccupationAndIncomeSummaryOptionals.one(identityL))}" )
  } )
} )

