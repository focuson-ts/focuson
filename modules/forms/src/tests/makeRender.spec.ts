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
import { listOccupationsModalPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { oneOccupationIncomeDetailsDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";

//
describe ( " listComponentsIn", () => {
  it ( "should make the react component lists", () => {
    expect ( createAllReactCalls ( listComponentsIn ( EAccountsSummaryDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      " {/*{'path':['useEStatements'],'dataDD':'Boolean','display':{'import':'../copied/LabelAndInput','name':'LabelAndBooleanInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'}}}}*/}",
      "<LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' buttons={buttons} />",
      " {/*{'path':['eAccountsTable'],'dataDD':'EAccountsSummaryTable','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'},'copySelectedIndexTo':{'paramType':'pageState','needed':'no'},'copySelectedItemTo':{'paramType':'pageState','needed':'no'}}}}*/}",
      "<Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      " {/*{'path':['totalMonthlyCost'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "<LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' buttons={buttons} required={true} />",
      " {/*{'path':['oneAccountBalance'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "<LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' buttons={buttons} required={true} />",
      " {/*{'path':['currentAccountBalance'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "<LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' buttons={buttons} required={true} />",
      " {/*{'path':['createPlan'],'dataDD':'CreatePlan','display':{'import':'','name':'CreatePlan','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}}}*/}",
      "<CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />"
    ] )
  } )

  it ( "should createReactComponent", () => {
    expect ( createReactComponent ( paramsForTest, AllGuardCreator ) ( EAccountsSummaryDD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "     {/*{'path':['useEStatements'],'dataDD':'Boolean','display':{'import':'../copied/LabelAndInput','name':'LabelAndBooleanInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'}}}}*/}",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' buttons={buttons} />",
      "     {/*{'path':['eAccountsTable'],'dataDD':'EAccountsSummaryTable','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'},'copySelectedIndexTo':{'paramType':'pageState','needed':'no'},'copySelectedItemTo':{'paramType':'pageState','needed':'no'}}}}*/}",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "     {/*{'path':['totalMonthlyCost'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' buttons={buttons} required={true} />",
      "     {/*{'path':['oneAccountBalance'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['currentAccountBalance'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['createPlan'],'dataDD':'CreatePlan','display':{'import':'','name':'CreatePlan','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}}}*/}",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      ""
    ] )
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
      "import {CreatePlanDomain} from '../EAccountsSummary/EAccountsSummary.domains'; ",
      "//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block",
      "import {RepeatingLineDomain} from '../Repeating/Repeating.domains'; ",
      "import {CreatePlan} from '../EAccountsSummary/EAccountsSummary.render'",
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
      "import {CreatePlanDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountsSummaryTableDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {EAccountSummaryDomain} from '../EAccountsSummary/EAccountsSummary.domains'",
      "import {RepeatingLineDomain} from '../Repeating/Repeating.domains'",
      "import {RepeatingWholeDataDomain} from '../Repeating/Repeating.domains'",
      "export function EAccountsSummaryPage(){",
      "  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (\n    ( fullState, state , full, d, mode) => {",
      "  const id='root';",
      "  const buttons =    {amendExistingPlan:<ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='edit'",
      "        focusOn={['EAccountsSummary','{basePage}','tempCreatePlan']}",
      "        copy={[{'from':['{basePage}','fromApi','createPlan']}]}",
      "         rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'update'}}",
      "      />,",
      "      createNewPlan:<ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  ",
      "        pageMode='create'",
      "        focusOn={['EAccountsSummary','{basePage}','tempCreatePlan']}",
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
      "      return <div className='mainPage'>",
      "           {/*{'dataDD':'EAccountsSummary','display':{'import':'','name':'EAccountsSummary','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <EAccountsSummary id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "      { buttons.createNewPlan } ",
      "      { buttons.amendExistingPlan } ",
      "      { buttons.deleteExistingPlan } ",
      "      { buttons.refresh } ",
      "      </div>})}",
      "",
      "export function CreatePlanPage(){",
      "  return focusedPage<FState, CreatePlanDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'CreatePlan','display':{'import':'','name':'CreatePlan','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <CreatePlan id={`${id}`} state={state} mode={mode} buttons={buttons} />",
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
      "        copyOnClose={[{'to':['{basePage}','fromApi','[append]']}]}",
      "        createEmpty={empty.emptyRepeatingLine}",
      "        setToLengthOnClose={{'array':['fromApi'],'variable':['selectedItem']}}",
      "      />,",
      "      edit:<ModalButton id='edit' text='edit'  state={state} modal = 'RepeatingLine'  ",
      "        pageMode='edit'",
      "        focusOn={['Repeating','temp']}",
      "        copy={[{'from':['{basePage}','fromApi','{selectedItem}']}]}",
      "        copyOnClose={[{'to':['{basePage}','fromApi','{selectedItem}']}]}",
      "      />,",
      "      nextOccupation:<GuardButton cond={nextOccupationGuard}>",
      "        <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi')} value={fullState.focusOn('selectedItem')} />",
      "      </GuardButton>,",
      "      prevOccupation:<GuardButton cond={prevOccupationGuard}>",
      "        <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi')} value={fullState.focusOn('selectedItem')} />",
      "      </GuardButton>,}",
      "",
      "      return <div className='mainPage'>",
      "           {/*{'dataDD':'RepeatingWholeData','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'},'copySelectedIndexTo':{'paramType':'pageState','needed':'no'},'copySelectedItemTo':{'paramType':'pageState','needed':'no'}}},'path':[]}*/}",
      "          <Table id={`${id}`} state={state} mode={mode} order={['name','age']} />",
      "      { buttons.addEntry } ",
      "      { buttons.edit } ",
      "      { buttons.prevOccupation } ",
      "      { buttons.nextOccupation } ",
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
      "export function CreatePlan({id,state,mode,buttons}: FocusedProps<FState, CreatePlanDomain,Context>){",
      "  return <>",
      "     {/*{'displayParams':{'label':'Create Start'},'path':['createPlanStart'],'dataDD':'Date','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' buttons={buttons} required={true} />",
      "     {/*{'displayParams':{'ariaLabel':'The Create Plan Date'},'path':['createPlanDate'],'dataDD':'Date','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='create plan date' buttons={buttons} required={true} ariaLabel='The Create Plan Date' />",
      "     {/*{'path':['createPlanEnd'],'dataDD':'Date','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='create plan end' buttons={buttons} required={true} />",
      "</>",
      "}",
      "",
      "export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){",
      "  return <>",
      "     {/*{'path':['useEStatements'],'dataDD':'Boolean','display':{'import':'../copied/LabelAndInput','name':'LabelAndBooleanInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'}}}}*/}",
      "    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' buttons={buttons} />",
      "     {/*{'path':['eAccountsTable'],'dataDD':'EAccountsSummaryTable','display':{'import':'','name':'Table','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'order':{'paramType':'string[]','needed':'yes'},'copySelectedIndexTo':{'paramType':'pageState','needed':'no'},'copySelectedItemTo':{'paramType':'pageState','needed':'no'}}}}*/}",
      "    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />",
      "     {/*{'path':['totalMonthlyCost'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' buttons={buttons} required={true} />",
      "     {/*{'path':['oneAccountBalance'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['currentAccountBalance'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' buttons={buttons} required={true} />",
      "     {/*{'path':['createPlan'],'dataDD':'CreatePlan','display':{'import':'','name':'CreatePlan','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}}}*/}",
      "    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />",
      "</>",
      "}",
      "",
      "export function EAccountSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountSummaryDomain,Context>){",
      "  return <>",
      "     {/*{'displayParams':{'label':'Account Id'},'path':['accountId'],'dataDD':'AccountId','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' buttons={buttons} required={true} min={10000000} max={99999999} />",
      "     {/*{'path':['displayType'],'dataDD':'EAccountDisplayType','display':{'import':'../copied/Radio','name':'LabelAndRadio','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'enums':{'needed':'defaultToEnum','paramType':'object'}}}}*/}",
      "    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='display type' buttons={buttons} enums={{'savings':'Savings','checking':'Checking'}} />",
      "     {/*{'path':['description'],'dataDD':'OneLineString','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' buttons={buttons} required={true} />",
      "     {/*{'path':['virtualBankSeq'],'dataDD':'OneLineString','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='virtual bank seq' buttons={buttons} required={true} />",
      "     {/*{'path':['total'],'dataDD':'Money','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='total' buttons={buttons} required={true} />",
      "     {/*{'displayParams':{'label':'Frequency/Amount'},'path':['frequency'],'dataDD':'OneLineString','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' buttons={buttons} required={true} />",
      "</>",
      "}",
      "",
      "export function RepeatingLine({id,state,mode,buttons}: FocusedProps<FState, RepeatingLineDomain,Context>){",
      "  return <>",
      "     {/*{'path':['name'],'dataDD':'OneLineString','display':{'import':'../copied/LabelAndInput','name':'LabelAndStringInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'pattern':{'paramType':'string','needed':'no'},'minlength':{'paramType':'object','needed':'no'},'maxlength':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' buttons={buttons} required={true} />",
      "     {/*{'path':['age'],'dataDD':'Integer','display':{'import':'../copied/LabelAndInput','name':'LabelAndNumberInput','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'label':{'paramType':'string','needed':'defaultToCamelCaseOfName'},'buttons':{'paramType':'object','needed':'defaultToButtons'},'button':{'paramType':'string','needed':'no'},'required':{'paramType':'boolean','needed':'no','default':true},'min':{'paramType':'object','needed':'no'},'max':{'paramType':'object','needed':'no'}}}}*/}",
      "    <LabelAndNumberInput id={`${id}.age`} state={state.focusOn('age')} mode={mode} label='age' buttons={buttons} required={true} />",
      "</>",
      "}",
      ""
    ])
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
      "import {ListOccupationsDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; ",
      "import { SearchListItemsCD } from '../copied/SearchListItems';",
      "import {ListNextButton} from '../copied/listNextPrevButtons';",
      "import {ListPrevButton} from '../copied/listNextPrevButtons';",
      "import {ModalButton} from '@focuson/pages';",
      "import {ModalCancelButton} from '@focuson/pages';",
      "import {ModalCommitButton} from '@focuson/pages';",
      "import {RestButton} from '../copied/rest';",
      "import {ValidationButton} from '../copied/ValidationButton';",
      "export function ListOccupationsModalPage(){",
      "  return focusedPage<FState, ListOccupationsDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page",
      "     ( state, d, mode ) => {",
      "          const id='root';",
      "          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,",
      "              commit:<ModalCommitButton id='commit'  state={state} />,}",
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'ListOccupations','display':{'import':'','name':'SearchListItemsCD','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'},'title':{'paramType':'string','needed':'yes'},'children':{'paramType':'object','needed':'no'}}},'path':[]}*/}",
      "          <SearchListItemsCD id={`${id}`} state={state} mode={mode} title='Search for occupations' />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </div>})}"
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
      "          return <div className='modalPage'>",
      "           {/*{'dataDD':'CreatePlan','display':{'import':'','name':'CreatePlan','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
      "          <CreatePlan id={`${id}`} state={state} mode={mode} buttons={buttons} />",
      "          { buttons.cancel } ",
      "          { buttons.commit } ",
      "          </div>})}"
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
      "        focusOn={['PostCodeDemo','postcode']}",
      "        copy={[{'from':['{basePage}','main','postcode'],'to':['{basePage}','postcode','search']}]}",
      "        copyOnClose={[{'from':['{basePage}','postcode','addressResults','line1'],'to':['{basePage}','main','line1']},{'from':['{basePage}','postcode','addressResults','line2'],'to':['{basePage}','main','line2']},{'from':['{basePage}','postcode','addressResults','line3'],'to':['{basePage}','main','line3']},{'from':['{basePage}','postcode','addressResults','line4'],'to':['{basePage}','main','line4']},{'from':['{basePage}','postcode','search'],'to':['{basePage}','main','postcode']}]}",
      "      />,}",
      "",
      "      return <HideButtonsLayout buttons={buttons} hide={['search']}>",
      "           {/*{'dataDD':'PostCodeMainPage','display':{'import':'','name':'PostCodeMainPage','params':{'id':{'paramType':'object','needed':'id'},'state':{'paramType':'state','needed':'defaultToPath'},'mode':{'paramType':'object','needed':'no','default':'mode'},'ariaLabel':{'paramType':'string','needed':'no'}}},'path':[]}*/}",
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
    expect ( createReactComponent ( paramsForTest, AllGuardCreator ) ( oneOccupationIncomeDetailsDD ).slice ( 0, 5 ).map ( r => r.replace ( /"/g, "'" ) ) ).toEqual ( [
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