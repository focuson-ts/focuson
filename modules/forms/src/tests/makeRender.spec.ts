import { EAccountsSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { createAllReactCalls, createAllReactComponents, createReactComponent, createReactPageComponent, listComponentsIn, processParam } from "../codegen/makeRender";
import { DisplayCompParamType, LabelAndStringInputCD } from "../common/componentsD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { makeButtons } from "../buttons/allButtons";
import { occupationIncomeDetailsDD } from "../example/occupationAndIncomeDetails/occupationAndIncome.dataD";
import { AllGuardCreator } from "../buttons/guardButton";
import { RepeatingLinePageD, RepeatingPageD } from "../example/repeating/repeating.pageD";
import { listOccupationsModalPD } from "../example/occupationAndIncomeDetails/occupationAndIncome.pageD";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( listComponentsIn ( EAccountsSummaryDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      " {/*{'path':['useEStatements'],'dataDD':'BooleanDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndBooleanInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'}}}}*/}",
      "<LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' buttons={buttons} />",
      " {/*{'path':['eAccountsTable'],'dataDD':'EAccountsSummaryTableDD','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'}}}}*/}",
      "<Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      " {/*{'path':['totalMonthlyCost'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "<LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' buttons={buttons} required={true} />",
      " {/*{'path':['oneAccountBalance'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "<LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' buttons={buttons} required={true} />",
      " {/*{'path':['currentAccountBalance'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "<LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' buttons={buttons} required={true} />",
      " {/*{'path':['createPlan'],'dataDD':'CreatePlanDD','display':{'import':'','name':'CreatePlanDD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}}}*/}",
      "<CreatePlanDD id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />"
    ])
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator ) ( EAccountsSummaryDD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummaryDD({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDDDomain,Context>){",
      "  return <>",
      "     {/*{'path':['useEStatements'],'dataDD':'BooleanDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndBooleanInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'}}}}*/}",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' buttons={buttons} />",
      "     {/*{'path':['eAccountsTable'],'dataDD':'EAccountsSummaryTableDD','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'}}}}*/}",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "     {/*{'path':['totalMonthlyCost'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' buttons={buttons} required={true} />",
      "     {/*{'path':['oneAccountBalance'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['currentAccountBalance'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['createPlan'],'dataDD':'CreatePlanDD','display':{'import':'','name':'CreatePlanDD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}}}*/}",
      "    <CreatePlanDD id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      ""
    ])
  } )
  it ( "should createAllReactComponents ", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), [ EAccountsSummaryPD, CreatePlanPD, RepeatingPageD, RepeatingLinePageD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from '@focuson/pages';",
      "import { Context, FocusedProps, FState } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from '../copied/guard';",
      "import { GuardButton } from '../copied/GuardButton';",
      "//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block",
      "import {CreatePlanDDDomain} from '../EAccountsSummary/EAccountsSummary.domains'; ",
      "//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block",
      "import {RepeatingLineDomain} from '../Repeating/Repeating.domains'; ",
      "import {CreatePlanDD} from '../EAccountsSummary/EAccountsSummary.render'",
      "import {RepeatingLine} from '../Repeating/Repeating.render'",
      "import { LabelAndStringInput } from '../copied/LabelAndInput';",
      "import { LabelAndNumberInput } from '../copied/LabelAndInput';",
      "import { Table } from '../copied/table';",
      "import { LabelAndBooleanInput } from '../copied/LabelAndInput';",
      "import { LabelAndRadio } from '../copied/Radio';",
      "import {ListNextButton} from '../copied/listNextPrevButtons';",
      "import {ListPrevButton} from '../copied/listNextPrevButtons';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '../copied/rest';",
      "import {ValidationButton} from '../copied/ValidationButton';",
      "import {EAccountsSummaryPageDomain} from '../EAccountsSummary/EAccountsSummary.domains';",
      "import {RepeatingPageDomain} from '../Repeating/Repeating.domains';",
      "import {CreatePlanDDDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryDDDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryTableDDDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountSummaryDDDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {RepeatingLineDomain} from '../Repeating/Repeating.domains'",
      "import {RepeatingWholeDataDomain} from '../Repeating/Repeating.domains'",
      "export function EAccountsSummaryPage(){",
      "  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  const id='root';",
      "  const buttons =    {amendExistingPlan:<ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='edit'",
      "        focusOn={['EAccountsSummary','tempCreatePlan']}",
      "        copyFrom={['EAccountsSummary','fromApi','createPlan']}",
      "         rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'update','path':['EAccountsSummary']}}",
      "      />,",
      "      createNewPlan:<ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='create'",
      "        focusOn={['EAccountsSummary','tempCreatePlan']}",
      "        createEmpty={empty.emptyCreatePlanDD}",
      "         rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'create','path':['EAccountsSummary']}}",
      "      />,",
      "      deleteExistingPlan:<RestButton state={state}",
      "        id='deleteExistingPlan'",
      "        name='deleteExistingPlan'",
      "        action='delete'",
      "        path={['EAccountsSummary','fromApi']}",
      "        rest='EAccountsSummary_CreatePlanDDRestDetails'",
      "        confirm={true}",
      "       />,",
      "      refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}",
      "",
      "      return <div className='mainPage'>",
      "           {/*{'dataDD':'EAccountsSummaryDD','display':{'import':'','name':'EAccountsSummaryDD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <EAccountsSummaryDD id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "      { buttons.createNewPlan } ",
      "      { buttons.amendExistingPlan } ",
      "      { buttons.deleteExistingPlan } ",
      "      { buttons.refresh } ",
      "      </div>})}",
      "",
      "export function CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDDDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'CreatePlanDD','display':{'import':'','name':'CreatePlanDD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <CreatePlanDD id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </div>})}",
      "export function RepeatingPage(){",
      "  return focusedPageWithExtraState<FState, RepeatingPageDomain, RepeatingWholeDataDomain, Context> ( s => 'Repeating' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  const nextOccupationGuard =  pageState(state)().chainLens<number>(Lenses.fromPath(['selectedItem'])).optJsonOr(0) <  pageState(state)().chainLens<string[]>(Lenses.fromPath(['fromApi'])).optJsonOr([]).length - 1",
      "  const prevOccupationGuard = pageState(state)().chainLens<number>(Lenses.fromPath(['selectedItem'])).optJsonOr(0) >0",
      "  const id='root';",
      "  const buttons =    {addEntry:<ModalButton id='addEntry' text='addEntry'  state={state} modal = 'RepeatingLine'  ",
      "        pageMode='create'",
      "        focusOn={['Repeating','temp']}",
      "        copyOnClose={['Repeating','fromApi','[append]']}",
      "        createEmpty={empty.emptyRepeatingLine}",
      "        setToLengthOnClose={{'array':['Repeating','fromApi'],'variable':['Repeating','selectedItem']}}",
      "      />,",
      "      edit:<ModalButton id='edit' text='edit'  state={state} modal = 'RepeatingLine'  ",
      "        pageMode='edit'",
      "        focusOn={['Repeating','temp']}",
      "        copyFrom={['Repeating','fromApi','{selectedItem}']}",
      "        copyOnClose={['Repeating','fromApi','{selectedItem}']}",
      "      />,",
      "      nextOccupation:<GuardButton cond={nextOccupationGuard}>",
      "        <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi')} value={fullState.focusOn('selectedItem')} />",
      "      </GuardButton>,",
      "      prevOccupation:<GuardButton cond={prevOccupationGuard}>",
      "        <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi')} value={fullState.focusOn('selectedItem')} />",
      "      </GuardButton>,}",
      "",
      "      return <div className='mainPage'>",
      "           {/*{'dataDD':'RepeatingWholeData','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'}}},'path':[]}*/}",
      "          <Table id={`${id}`} state={state} mode={mode} order={['name','age']} />",
      "      { buttons.addEntry } ",
      "      { buttons.edit } ",
      "      { buttons.nextOccupation } ",
      "      { buttons.prevOccupation } ",
      "      </div>})}",
      "",
      "export function RepeatingLinePage(){",
      "  return focusedPage<FState, RepeatingLineDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'RepeatingLine','display':{'import':'','name':'RepeatingLine','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <RepeatingLine id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </div>})}",
      "export function CreatePlanDD({id,state,mode,buttons}: FocusedProps<FState, CreatePlanDDDomain,Context>){",
      "  return <>",
      "     {/*{'displayParams':{'label':'Create Start'},'path':['createPlanStart'],'dataDD':'DateDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' buttons={buttons} required={true} />",
      "     {/*{'displayParams':{'ariaLabel':'The Create Plan Date'},'path':['createPlanDate'],'dataDD':'DateDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='create plan date' buttons={buttons} required={true} ariaLabel='The Create Plan Date' />",
      "     {/*{'path':['createPlanEnd'],'dataDD':'DateDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='create plan end' buttons={buttons} required={true} />",
      "</>",
      "}",
      "",
      "export function EAccountsSummaryDD({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDDDomain,Context>){",
      "  return <>",
      "     {/*{'path':['useEStatements'],'dataDD':'BooleanDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndBooleanInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'}}}}*/}",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' buttons={buttons} />",
      "     {/*{'path':['eAccountsTable'],'dataDD':'EAccountsSummaryTableDD','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'}}}}*/}",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "     {/*{'path':['totalMonthlyCost'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' buttons={buttons} required={true} />",
      "     {/*{'path':['oneAccountBalance'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['currentAccountBalance'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['createPlan'],'dataDD':'CreatePlanDD','display':{'import':'','name':'CreatePlanDD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}}}*/}",
      "    <CreatePlanDD id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      "",
      "export function EAccountSummaryDD({id,state,mode,buttons}: FocusedProps<FState, EAccountSummaryDDDomain,Context>){",
      "  return <>",
      "     {/*{'displayParams':{'label':'Account Id'},'path':['accountId'],'dataDD':'AccountIdDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' buttons={buttons} required={true} min={10000000} max={99999999} />",
      "     {/*{'path':['displayType'],'dataDD':'EAccountDisplayTypeDD','display':{'import':'../copied/Radio','name':'LabelAndRadio','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'enums':{'needed':'defaultToEnum','paramType':'object'}}}}*/}",
      "    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='display type' buttons={buttons} enums={{'savings':'Savings','checking':'Checking'}} />",
      "     {/*{'path':['description'],'dataDD':'OneLineStringDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' buttons={buttons} required={true} />",
      "     {/*{'path':['virtualBankSeq'],'dataDD':'OneLineStringDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='virtual bank seq' buttons={buttons} required={true} />",
      "     {/*{'path':['total'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='total' buttons={buttons} required={true} />",
      "     {/*{'displayParams':{'label':'Frequency/Amount'},'path':['frequency'],'dataDD':'OneLineStringDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' buttons={buttons} required={true} />",
      "</>",
      "}",
      "",
      "export function RepeatingLine({id,state,mode,buttons}: FocusedProps<FState, RepeatingLineDomain,Context>){",
      "  return <>",
      "     {/*{'path':['name'],'dataDD':'OneLineStringDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' buttons={buttons} required={true} />",
      "     {/*{'path':['age'],'dataDD':'IntegerDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.age`} state={state.focusOn('age')} mode={mode} label='age' buttons={buttons} required={true} />",
      "</>",
      "}",
      ""
    ] )
  } )

  it ( "should createAllReactComponents for a modal page that define a display on the data", () => {
    expect ( createAllReactComponents ( paramsForTest, AllGuardCreator, makeButtons (), [ listOccupationsModalPD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { LensProps } from '@focuson/state';",
      "import { FocusOnContext } from '@focuson/focuson';",
      "import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from '@focuson/pages';",
      "import { Context, FocusedProps, FState } from '../common';",
      "import { Lenses } from '@focuson/lens';",
      "import { Guard } from '../copied/guard';",
      "import { GuardButton } from '../copied/GuardButton';",
      "//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block",
      "import {ListOccupationsDDDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; ",
      "import { SearchList } from '../copied/searchList';",
      "import {ListNextButton} from '../copied/listNextPrevButtons';",
      "import {ListPrevButton} from '../copied/listNextPrevButtons';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '../copied/rest';",
      "import {ValidationButton} from '../copied/ValidationButton';",
      "export function ListOccupationsModalPage(){",
      "  return focusedPage<FState, ListOccupationsDDDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'ListOccupationsDD','display':{'import':'','name':'SearchList','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <SearchList id={`${id}`} state={state} mode={mode} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </div>})}"
    ] )
  } )
  it ( "should create a simple page", () => {
    expect ( createReactPageComponent ( paramsForTest, AllGuardCreator, makeButtons (), CreatePlanPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDDDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'CreatePlanDD','display':{'import':'','name':'CreatePlanDD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <CreatePlanDD id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </div>})}"
    ] )
  } )
} )

describe ( "makeComponentWithGuard", () => {
  it ( "should make guard variables", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator ) ( occupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function OccupationIncomeDetailsDD({id,state,mode,buttons}: FocusedProps<FState, OccupationIncomeDetailsDDDomain,Context>){",
      "const areYouGuard = state.chainLens(Lenses.fromPath(['areYou'])).optJsonOr([]);",
      "  return <Layout details='[1][3,3][5]'>",
      "     {/*{'path':['areYou'],'dataDD':'CustomerStatusDD','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.areYou`} state={state.focusOn('areYou')} mode={mode} label='are you' buttons={buttons} required={true} />"
    ] )
  } )
} )

describe ( "make components - the different parameter types", () => {
  function makeParam ( theType: DisplayCompParamType, val: string | string[] ) {
    return processParam ( [ 'some', 'path' ], EAccountsSummaryDD, { ...LabelAndStringInputCD, params: { p1: { paramType: theType, needed: 'no' } } } ) ( 'p1', val );
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