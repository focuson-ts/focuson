import * as domain from '../EAccountsSummary/EAccountsSummary.domains';
import * as empty from '../EAccountsSummary/EAccountsSummary.empty';
import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { Table } from '../copied/table';
import { LabelAndBooleanInput } from '../copied/LabelAndInput';
import { LabelAndRadio } from '../copied/Radio';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {EAccountsSummaryPageDomain} from "../EAccountsSummary/EAccountsSummary.domains";
import {CreatePlanDDDomain} from "../EAccountsSummary/EAccountsSummary.domains"
import {EAccountsSummaryDDDomain} from "../EAccountsSummary/EAccountsSummary.domains"
import {EAccountsSummaryTableDDDomain} from "../EAccountsSummary/EAccountsSummary.domains"
import {EAccountSummaryDDDomain} from "../EAccountsSummary/EAccountsSummary.domains"
export function EAccountsSummaryPage(){
  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {amendExistingPlan:<ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  
        pageMode='edit'
        focusOn={["EAccountsSummary","tempCreatePlan"]}
        copyFrom={["EAccountsSummary","fromApi","createPlan"]}
         rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"update","path":["EAccountsSummary"]}}
      />,
      createNewPlan:<ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  
        pageMode='create'
        focusOn={["EAccountsSummary","tempCreatePlan"]}
        createEmpty={empty.emptyCreatePlanDD}
         rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"create","path":["EAccountsSummary"]}}
      />,
      deleteExistingPlan:<RestButton state={state}
      id='deleteExistingPlan'
      name='deleteExistingPlan'
      action='delete'
      path={["EAccountsSummary","fromApi"]}
      rest='EAccountsSummary_CreatePlanDDRestDetails'
      confirm={true}
       />,
      refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}

  return (<Layout  details='[1][3,3][5]'>
           {/*{"dataDD":"EAccountsSummaryDD","display":{"import":"","name":"EAccountsSummaryDD","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <EAccountsSummaryDD id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.createNewPlan } 
      { buttons.amendExistingPlan } 
      { buttons.deleteExistingPlan } 
      { buttons.refresh } 
   </Layout>)})}

export function CreatePlanDD({id,state,mode,buttons}: FocusedProps<FState, CreatePlanDDDomain,Context>){
  return(<>
     {/*{"displayParams":{"label":"Create Start"},"path":["createPlanStart"],"dataDD":"DateDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' required={true} />
     {/*{"displayParams":{"ariaLabel":"The Create Plan Date"},"path":["createPlanDate"],"dataDD":"DateDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='create plan date' required={true} ariaLabel='The Create Plan Date' />
     {/*{"path":["createPlanEnd"],"dataDD":"DateDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='create plan end' required={true} />
</>)
}

export function EAccountsSummaryDD({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDDDomain,Context>){
  return(<>
     {/*{"path":["useEStatements"],"dataDD":"BooleanDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndBooleanInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"}}}}*/}
    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' />
     {/*{"path":["eAccountsTable"],"dataDD":"EAccountsSummaryTableDD","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"}}}}*/}
    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={["accountId","displayType","description","virtualBankSeq","frequency","total"]} />
     {/*{"path":["totalMonthlyCost"],"dataDD":"IntegerDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' required={true} />
     {/*{"path":["oneAccountBalance"],"dataDD":"IntegerDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' required={true} />
     {/*{"path":["currentAccountBalance"],"dataDD":"IntegerDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' required={true} />
     {/*{"path":["createPlan"],"dataDD":"CreatePlanDD","display":{"import":"","name":"CreatePlanDD","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}}}*/}
    <CreatePlanDD id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />
</>)
}

export function EAccountSummaryDD({id,state,mode,buttons}: FocusedProps<FState, EAccountSummaryDDDomain,Context>){
  return(<>
     {/*{"displayParams":{"label":"Account Id"},"path":["accountId"],"dataDD":"AccountIdDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' required={true} min={10000000} max={99999999} />
     {/*{"path":["displayType"],"dataDD":"EAccountDisplayTypeDD","display":{"import":"../copied/Radio","name":"LabelAndRadio","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"enums":{"needed":"defaultToEnum","paramType":"object"}}}}*/}
    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='display type' enums={{"savings":"Savings","checking":"Checking"}} />
     {/*{"path":["description"],"dataDD":"OneLineStringDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' required={true} />
     {/*{"path":["virtualBankSeq"],"dataDD":"OneLineStringDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='virtual bank seq' required={true} />
     {/*{"path":["total"],"dataDD":"IntegerDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='total' required={true} />
     {/*{"displayParams":{"label":"Frequency/Amount"},"path":["frequency"],"dataDD":"OneLineStringDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"required":{"paramType":"boolean","needed":"no","default":true},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' required={true} />
</>)
}
