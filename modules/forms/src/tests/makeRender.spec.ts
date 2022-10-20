import { EAccountsSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn, makeGuardVariables, processParam } from "../codegen/makeRender";
import { DisplayCompParamType, LabelAndStringInputCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { makeButtons } from "../buttons/allButtons";

import { AllGuardCreator } from "../buttons/guardButton";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { listOccupationsModalPD, OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { oneOccupationIncomeDetailsDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";
import { paramsForTest } from "./paramsForTest";
import { makeGuardButtonVariables } from "../codegen/makeButtons";
import { ListOfPaymentsPagePD } from "../example/ListOfPayments/listOfPayements.pageD";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( EAccountsSummaryPD, paramsForTest, EAccountsSummaryPD, listComponentsIn ( EAccountsSummaryDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "<LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={allButtons} parentState={state} />",
      "<Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "<BalancesAndMonthlyCost id={`${id}.balancesAndMonthlyCost`} state={state.focusOn('balancesAndMonthlyCost')} mode={mode} label='Balances And Monthly Cost' allButtons={allButtons} />",
      "<CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} label='Create Plan' allButtons={allButtons} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, EAccountsSummaryPD, EAccountsSummaryPD ) ( EAccountsSummaryDD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary({id,state,mode,allButtons,label}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return<>",
      "<Layout state={state} allButtons={allButtons} details='[[10]]' defaultProps='{'valueWidth': 50}'>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={allButtons} parentState={state} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <BalancesAndMonthlyCost id={`${id}.balancesAndMonthlyCost`} state={state.focusOn('balancesAndMonthlyCost')} mode={mode} label='Balances And Monthly Cost' allButtons={allButtons} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} label='Create Plan' allButtons={allButtons} />",
      "</Layout>",
      "</>}",
      ""
    ] )
  } )
  it ( "should createAllReactComponents ", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD, EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState, fullState, pageState, replaceTextUsingPath} from '@focuson/pages';",
      "import { Context, FocusedProps, FState, identityL } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { DisplayGuards, Guard, GuardButton } from '@focuson/form_components';",
      "import { defaultDateFn, safeNumber, safeArray, safeString, applyOrDefault} from '@focuson/utils';",
      "import * as action from '../actions'",
      "import { EAccountsSummaryOptionals } from '../EAccountsSummary/EAccountsSummary.optionals';",
      "import { LabelAndNumberInput } from '@focuson/form_components';",
      "import { LabelAndDateInput } from '@focuson/form_components';",
      "import { Table } from '@focuson/form_components';",
      "import { LabelAndBooleanInput } from '@focuson/form_components';",
      "import { LabelAndStringInput } from '@focuson/form_components';",
      "import { LabelAndRadio } from '@focuson/form_components';",
      "import { Layout } from '@focuson/form_components';",
      "import {ActionButton} from '@focuson/form_components';",
      "import {CommandButton} from '@focuson/form_components';",
      "import {DeleteStateButton} from '@focuson/form_components';",
      "import {ListNextButton} from '@focuson/form_components';",
      "import {ListPrevButton} from '@focuson/form_components';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '@focuson/form_components';",
      "import {SelectPage} from '@focuson/pages';",
      "import {ToggleButton} from '@focuson/form_components';",
      "import {ValidationButton} from '@focuson/form_components';",
      "import {EAccountsSummaryPageDomain} from '../EAccountsSummary/EAccountsSummary.domains';",
      "import {BalancesAndMonthlyCostDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {CreatePlanDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryTableDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountSummaryDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "export function EAccountsSummaryPage(){",
      "   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi",
      "  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDomain, Context> ( s => ({title: 'E Accounts Summary'})) ( state => state.focusOn('fromApi')) (",
      "( fullState, state , full, d, mode, index) => {",
      "const id=`page${index}`;",
      "  const allButtons =    {amendExistingPlan:<ModalButton id={`${id}.amendExistingPlan`} text='Amend Existing Plan' dateFn={defaultDateFn} state={state} modal='EAccountsSummary_CreatePlan' ",
      "        pageMode='edit'",
      "        focusOn={'~/tempCreatePlan'}",
      "        // If there is a compile error here the focuson path might not exist",
      "        focusOnLensForCompileCheck={pageState(state)<domain.EAccountsSummaryPageDomain>().focusOn('tempCreatePlan')}",
      "        buttonType={'secondary'}",
      "        copy={[{'from':'~/fromApi/createPlan'}]}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'update'}}",
      "      />,",
      "      createNewPlan:<ModalButton id={`${id}.createNewPlan`} text='Create New Plan' dateFn={defaultDateFn} state={state} modal='EAccountsSummary_CreatePlan' ",
      "        pageMode='create'",
      "        focusOn={'~/tempCreatePlan'}",
      "        // If there is a compile error here the focuson path might not exist",
      "        focusOnLensForCompileCheck={pageState(state)<domain.EAccountsSummaryPageDomain>().focusOn('tempCreatePlan')}",
      "        buttonType={'secondary'}",
      "        createEmpty={empty.emptyCreatePlan}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'create'}}",
      "      />,",
      "      deleteExistingPlan:<RestButton state={state} id={`${id}.deleteExistingPlan`}  text='Delete Existing Plan'",
      "        name='deleteExistingPlan'",
      "        action={'delete'}",
      "        rest='EAccountsSummary_CreatePlanRestDetails'",
      "        confirm={true}",
      "       />,}",
      "",
      "      return <>",
      "      <>",
      "          <EAccountsSummary id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "      { allButtons.createNewPlan } ",
      "      { allButtons.amendExistingPlan } ",
      "      { allButtons.deleteExistingPlan } ",
      "      </></>})}",
      "",
      "export function BalancesAndMonthlyCost({id,state,mode,allButtons,label}: FocusedProps<FState, BalancesAndMonthlyCostDomain,Context>){",
      "  return<>",
      "<>",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={allButtons} required={true} parentState={state} step={0.01} />",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={allButtons} required={true} parentState={state} step={0.01} />",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={allButtons} required={true} parentState={state} step={0.01} />",
      "</>",
      "</>}",
      "",
      "export function CreatePlan({id,state,mode,allButtons,label}: FocusedProps<FState, CreatePlanDomain,Context>){",
      "  return<>",
      "<>",
      "    <LabelAndDateInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' allButtons={allButtons} dateFormat='yyyy-MM-dd' />",
      "    <LabelAndDateInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='Create Plan Date' allButtons={allButtons} dateFormat='yyyy-MM-dd' ariaLabel='The Create Plan Date' />",
      "    <LabelAndDateInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='Create Plan End' allButtons={allButtons} dateFormat='yyyy-MM-dd' />",
      "</>",
      "</>}",
      "",
      "export function EAccountsSummary({id,state,mode,allButtons,label}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return<>",
      "<Layout state={state} allButtons={allButtons} details='[[10]]' defaultProps='{'valueWidth': 50}'>",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={allButtons} parentState={state} />",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "    <BalancesAndMonthlyCost id={`${id}.balancesAndMonthlyCost`} state={state.focusOn('balancesAndMonthlyCost')} mode={mode} label='Balances And Monthly Cost' allButtons={allButtons} />",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} label='Create Plan' allButtons={allButtons} />",
      "</Layout>",
      "</>}",
      "",
      "export function EAccountSummary({id,state,mode,allButtons,label}: FocusedProps<FState, EAccountSummaryDomain,Context>){",
      "  return<>",
      "<>",
      "    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={allButtons} required={true} parentState={state} className='accountIdClazz' min={100000} max={9999999999} />",
      "    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='Display Type' allButtons={allButtons} enums={{'savings':'Savings','checking':'Checking'}} required={true} />",
      "    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='Description' allButtons={allButtons} required={true} parentState={state} className='descriptionClazz' />",
      "    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='Virtual Bank Seq' allButtons={allButtons} required={true} parentState={state} />",
      "    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='Total' allButtons={allButtons} required={true} parentState={state} className='moneyClazz' step={0.01} />",
      "    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' allButtons={allButtons} required={true} parentState={state} />",
      "</>",
      "</>}",
      ""
    ] )
  } )

  it ( "should createAllReactComponents for a modal page that define a display on the data", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), OccupationAndIncomeSummaryPD, listOccupationsModalPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState, fullState, pageState, replaceTextUsingPath} from '@focuson/pages';",
      "import { Context, FocusedProps, FState, identityL } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { DisplayGuards, Guard, GuardButton } from '@focuson/form_components';",
      "import { defaultDateFn, safeNumber, safeArray, safeString, applyOrDefault} from '@focuson/utils';",
      "import * as action from '../actions'",
      "import { OccupationAndIncomeSummaryOptionals } from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.optionals';",
      "//if there is an error message here check that the PageD links to this DataD in a domain or rest block",
      "import {ListOccupationsDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; ",
      "import {ListOccupations} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.render'",
      "import {ActionButton} from '@focuson/form_components';",
      "import {CommandButton} from '@focuson/form_components';",
      "import {DeleteStateButton} from '@focuson/form_components';",
      "import {ListNextButton} from '@focuson/form_components';",
      "import {ListPrevButton} from '@focuson/form_components';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '@focuson/form_components';",
      "import {SelectPage} from '@focuson/pages';",
      "import {ToggleButton} from '@focuson/form_components';",
      "import {ValidationButton} from '@focuson/form_components';",
      "export function OccupationAndIncomeSummary_ListOccupationsModalPage(){",
      "  return focusedPage<FState, ListOccupationsDomain, Context> ( s => ({title: replaceTextUsingPath(s,'List Occupations'), className: 'ListOccupationsH1'}) ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode, index ) => {",
      "          const id=`page${index}`;",
      "          const allButtons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state}  buttonType='secondary' />,",
      "              commit:<ModalCommitButton id={`${id}.commit`}  buttonType='primary'  state={state} />,}",
      "          return <>",
      "          <>",
      "          <ListOccupations id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "          { allButtons.cancel } ",
      "          { allButtons.commit } ",
      "          </></>})}"
    ] )
  } )
  it ( "should create a simple page", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD, CreatePlanPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary_CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDomain, Context> ( s => ({title: 'Create Plan'}) ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode, index ) => {",
      "          const id=`page${index}`;",
      "          const allButtons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state}  confirm={'It will start on {~/tempCreatePlan/createPlanStart}'} buttonType='secondary' />,",
      "              commit:<ModalCommitButton id={`${id}.commit`}  buttonType='primary'  state={state} />,}",
      "          return <>",
      "          <>",
      "          <CreatePlan id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "          { allButtons.cancel } ",
      "          { allButtons.commit } ",
      "          </></>})}"
    ] )
  } )
  it ( "should create a page with a Layout", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), PostCodeMainPage, PostCodeMainPage ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function PostCodeMainPagePage(){",
      "   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/main",
      "  return focusedPageWithExtraState<FState, PostCodeMainPagePageDomain, PostCodeNameAndAddressDomain, Context> ( s => ({title: 'Post Code Main Page'})) ( state => state.focusOn('main')) (",
      "( fullState, state , full, d, mode, index) => {",
      "const id=`page${index}`;",
      "  const allButtons =    {save:<RestButton state={state} id={`${id}.save`}  text='Save'",
      "        name='save'",
      "        action={'createWithoutFetch'}",
      "        validate={true}",
      "        onSuccess={[{'command':'message','msg':'Saved'}]}",
      "        rest='PostCodeMainPage_PostCodeNameAndAddressRestDetails'",
      "       />,",
      "      search:<ModalButton id={`${id}.search`} text='Search' dateFn={defaultDateFn} state={state} modal='PostCodeMainPage_PostCodeSearch' ",
      "        pageMode='edit'",
      "        focusOn={'~/postcode'}",
      "        // If there is a compile error here the focuson path might not exist",
      "        focusOnLensForCompileCheck={pageState(state)<domain.PostCodeMainPagePageDomain>().focusOn('postcode')}",
      "        copyOnClose={[{'from':'~/postcode/addressResults/line1','to':'~/main/line1'},{'from':'~/postcode/addressResults/line2','to':'~/main/line2'},{'from':'~/postcode/addressResults/line3','to':'~/main/line3'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/addressResults/postcode','to':'~/main/postcode'}]}",
      "        copyJustString={[{'from':'~/main/postcode','to':'~/postcode/search'}]}",
      "      />,}",
      "",
      "      return <>",
      "      <HideButtonsLayout buttons={allButtons} hide={['search']}>",
      "          <PostCodeNameAndAddress id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />",
      "      { allButtons.search } ",
      "      { allButtons.save } ",
      "      </HideButtonsLayout></>})}",
      ""
    ] )
  } )

} )

describe ( "makeComponentWithGuard", () => {
  it ( "should make guard variables in the order they were declared in", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator, OccupationAndIncomeSummaryPD, OccupationAndIncomeSummaryPD ) ( oneOccupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function OneOccupationIncomeDetails({id,state,mode,allButtons,label}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){",
      "const guardDebug=state.main?.debug?.guardDebug",
      "const areYouGuard = state.focusOn('areYou').optJson();if (guardDebug)console.log('OccupationAndIncomeSummary '+ id + '.areYou', areYouGuard);//Guard {'condition':'in','path':'areYou','values':{'X':'','E':'Employed','S':'Self Employed','C':'Currently not earning','R':'Retired','T':'Student','U':'Unknown','H':'Home Family Responsibilities'}}",
      "const ownShareOfTheCompanyGuard = state.focusOn('ownShareOfTheCompany').optJson();if (guardDebug)console.log('OccupationAndIncomeSummary '+ id + '.ownShareOfTheCompany', ownShareOfTheCompanyGuard);//Guard {'condition':'in','path':'ownShareOfTheCompany','values':{'X':'','N':'No','Y':'Yes'}}",
      "const owningSharesPctGuard = state.focusOn('owningSharesPct').optJson();if (guardDebug)console.log('OccupationAndIncomeSummary '+ id + '.owningSharesPct', owningSharesPctGuard);//Guard {'condition':'in','path':'owningSharesPct','values':{'X':'','N':'No','Y':'Yes'}}"
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
describe ( "makeGuardButtonVariables", () => {
  it ( 'should make complex guards using variables', () => {
    expect ( makeGuardVariables ( ListOfPaymentsPagePD, AllGuardCreator, paramsForTest, ListOfPaymentsPagePD, ListOfPaymentsPagePD ) ).toEqual ( [
      "const guardDebug=state.main?.debug?.guardDebug",
      "const canPrintGuard =  applyOrDefault(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('display').chainNthFromPath(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('selected')).focusOn('alreadyPrinted').optJson(), t => t === false,false)? []:[\"This record has already been printed\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.canPrint', canPrintGuard);//Guard {\"condition\":\"equals\",\"value\":false,\"path\":\"~/display[~/selected]/alreadyPrinted\",\"message\":\"This record has already been printed\"}",
      "const alreadyPrintedNotTrueGuard =  applyOrDefault(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('tempListOfPayments').focusOn('alreadyPrinted').optJson(), t => t !== true,false)? []:[\"alreadyPrinted not true\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.alreadyPrintedNotTrue', alreadyPrintedNotTrueGuard);//Guard {\"condition\":\"notEquals\",\"value\":true,\"path\":\"~/tempListOfPayments/alreadyPrinted\",\"message\":\"alreadyPrinted not true\"}",
      "const needsStandingOrdersGuard =  (safeNumber(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('currentPayments').focusOn('standingOrders').optJson(), 0) >0) && state.copyWithLens(ListOfPaymentsPageOptionals.currentListOfPayments(identityL)).focusOn('standingOrders').optJsonOr(false)      ? []:[\"needsStandingOrders is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.needsStandingOrders', needsStandingOrdersGuard);//Guard {\"condition\":\">0 and true\",\"number\":\"~/currentPayments/standingOrders\",\"boolean\":\"#currentListOfPayments/standingOrders\"}",
      "const needsOpenBankingStandingOrdersGuard =  (safeNumber(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('currentPayments').focusOn('openBankingStandingOrders').optJson(), 0) >0) && state.copyWithLens(ListOfPaymentsPageOptionals.currentListOfPayments(identityL)).focusOn('openBankingStandingOrders').optJsonOr(false)      ? []:[\"needsOpenBankingStandingOrders is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.needsOpenBankingStandingOrders', needsOpenBankingStandingOrdersGuard);//Guard {\"condition\":\">0 and true\",\"number\":\"~/currentPayments/openBankingStandingOrders\",\"boolean\":\"#currentListOfPayments/openBankingStandingOrders\"}",
      "const needsDirectDirectsGuard =  (safeNumber(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('currentPayments').focusOn('directDebits').optJson(), 0) >0) && state.copyWithLens(ListOfPaymentsPageOptionals.currentListOfPayments(identityL)).focusOn('directDebits').optJsonOr(false)      ? []:[\"needsDirectDirects is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.needsDirectDirects', needsDirectDirectsGuard);//Guard {\"condition\":\">0 and true\",\"number\":\"~/currentPayments/directDebits\",\"boolean\":\"#currentListOfPayments/directDebits\"}",
      "const needBillPaymentsGuard =  (safeNumber(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('currentPayments').focusOn('billPayments').optJson(), 0) >0) && state.copyWithLens(ListOfPaymentsPageOptionals.currentListOfPayments(identityL)).focusOn('billPayments').optJsonOr(false)      ? []:[\"needBillPayments is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.needBillPayments', needBillPaymentsGuard);//Guard {\"condition\":\">0 and true\",\"number\":\"~/currentPayments/billPayments\",\"boolean\":\"#currentListOfPayments/billPayments\"}",
      "const needsOpenBankingGuard =  (safeNumber(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('currentPayments').focusOn('openBanking').optJson(), 0) >0) && state.copyWithLens(ListOfPaymentsPageOptionals.currentListOfPayments(identityL)).focusOn('billPayments').optJsonOr(false)      ? []:[\"needsOpenBanking is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.needsOpenBanking', needsOpenBankingGuard);//Guard {\"condition\":\">0 and true\",\"number\":\"~/currentPayments/openBanking\",\"boolean\":\"#currentListOfPayments/billPayments\"}",
      "const needsSomethingGuard =  needsStandingOrdersGuard.length===0||needsOpenBankingStandingOrdersGuard.length===0||needsDirectDirectsGuard.length===0||needBillPaymentsGuard.length===0||needsOpenBankingGuard.length===0? []:[\"needsSomething is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.needsSomething', needsSomethingGuard);//Guard {\"condition\":\"or\",\"conditions\":[\"needsStandingOrders\",\"needsOpenBankingStandingOrders\",\"needsDirectDirects\",\"needBillPayments\",\"needsOpenBanking\"]}",
      "const authorisedByUserGuard =  applyOrDefault(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('display').chainNthFromPath(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('selected')).focusOn('authorisedByCustomer').optJson(), t => t === \"y\",false)? []:[\"authorisedByUser is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.authorisedByUser', authorisedByUserGuard);//Guard {\"condition\":\"equals\",\"value\":\"\\\"y\\\"\",\"path\":\"~/display[~/selected]/authorisedByCustomer\"}",
      "const sendingToUserGuard =  [\"M\",\"J\"].includes(safeString( pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('display').chainNthFromPath(pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('selected')).focusOn('requestedBy').optJson()))? []:[\"sendingToUser is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.sendingToUser', sendingToUserGuard);//Guard {\"condition\":\"contains\",\"values\":[\"M\",\"J\"],\"path\":\"~/display[~/selected]/requestedBy\"}",
      "const authorisedToSendGuard =  sendingToUserGuard.length===0||authorisedByUserGuard.length===0? []:[\"authorisedToSend is not valid\"];if (guardDebug)console.log('ListOfPaymentsPage '+ id + '.authorisedToSend', authorisedToSendGuard);//Guard {\"condition\":\"or\",\"conditions\":[\"sendingToUser\",\"authorisedByUser\"]}"
    ])
  } )
} )
