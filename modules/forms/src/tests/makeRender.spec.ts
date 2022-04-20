import { EAccountsSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn, processParam } from "../codegen/makeRender";
import { DisplayCompParamType, LabelAndStringInputCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { makeButtons } from "../buttons/allButtons";

import { AllGuardCreator } from "../buttons/guardButton";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { listOccupationsModalPD, OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { oneOccupationIncomeDetailsDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( EAccountsSummaryPD, listComponentsIn ( EAccountsSummaryDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "<LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={buttons} />",
      "<Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "<LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={buttons} required={true} />",
      "<LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={buttons} required={true} />",
      "<LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={buttons} required={true} />",
      "<CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, EAccountsSummaryPD, EAccountsSummaryPD ) ( EAccountsSummaryDD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={buttons} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={buttons} required={true} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
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
      "   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi",
      "  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDomain, Context> ( s => 'E Accounts Summary' ) ( state => state.focusOn('fromApi')) (",
      "( fullState, state , full, d, mode, index) => {",
      "const id=`page${index}`;",
      "  const buttons =    {amendExistingPlan:<ModalButton id={`${id}.amendExistingPlan`} text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
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
      "      deleteExistingPlan:<RestButton state={state} id={`${id}.deleteExistingPlan`}",
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
      "    <LabelAndStringInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='Create Plan Date' allButtons={buttons} required={true} ariaLabel='The Create Plan Date' />",
      "    <LabelAndStringInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='Create Plan End' allButtons={buttons} required={true} />",
      "</>",
      "}",
      "",
      "export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={buttons} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={buttons} required={true} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      "",
      "export function EAccountSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountSummaryDomain,Context>){",
      "  return <>",
      "    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={buttons} required={true} min={10000000} max={99999999} />",
      "    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='Display Type' allButtons={buttons} enums={{'savings':'Savings','checking':'Checking'}} />",
      "    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='Description' allButtons={buttons} required={true} />",
      "    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='Virtual Bank Seq' allButtons={buttons} required={true} />",
      "    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='Total' allButtons={buttons} required={true} />",
      "    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' allButtons={buttons} required={true} />",
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
      "     ( state, d, mode, index ) => {",
      "          const id=`page${index}`;",
      "          const buttons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state} />,",
      "              commit:<ModalCommitButton id={`${id}.commit`}  state={state} />,}",
      "          return <>",
      "          <ListOccupations id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </>})}"
    ] )
  } )
  it ( "should create a simple page", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD, CreatePlanPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode, index ) => {",
      "          const id=`page${index}`;",
      "          const buttons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state} />,",
      "              commit:<ModalCommitButton id={`${id}.commit`}  state={state} />,}",
      "          return <>",
      "          <CreatePlan id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
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
      "  const buttons =    {save:<RestButton state={state} id={`${id}.save`}",
      "        name='save'",
      "        action='create'",
      "        validate={false}",
      "        rest='PostCodeMainPage_PostCodeNameAndAddressRestDetails'",
      "       />,",
      "      search:<ModalButton id={`${id}.search`} text='search'  state={state} modal = 'PostCodeSearch'  ",
      "        pageMode='edit'",
      "        focusOn='~/postcode'",
      "        copy={[{'from':'~/main/postcode','to':'~/postcode/search'}]}",
      "        copyOnClose={[{'from':'~/postcode/addressResults/line1','to':'~/main/line1'},{'from':'~/postcode/addressResults/line2','to':'~/main/line2'},{'from':'~/postcode/addressResults/line3','to':'~/main/line3'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/search','to':'~/main/postcode'}]}",
      "      />,}",
      "",
      "      return <HideButtonsLayout buttons={buttons} hide={['search']}>",
      "          <PostCodeNameAndAddress id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "      { buttons.search } ",
      "      { buttons.save } ",
      "      </HideButtonsLayout>})}",
      ""
    ])
  } )

} )

describe ( "makeComponentWithGuard", () => {
  it ( "should make guard variables", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, OccupationAndIncomeSummaryPD,OccupationAndIncomeSummaryPD ) ( oneOccupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function OneOccupationIncomeDetails({id,state,mode,buttons}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){",
      "const areYouGuard = state.focusOn('areYou').optJson();",
      "const employmentTypeGuard = state.focusOn('employmentType').optJson();",
      "const otherSourceOfIncomeGuard = state.focusOn('otherSourceOfIncome').optJson();",
      "const owningSharesPctGuard = state.focusOn('owningSharesPct').optJson();"
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