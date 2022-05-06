import * as empty from '../EAccountsSummary/EAccountsSummary.empty';
import * as domain from '../EAccountsSummary/EAccountsSummary.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { EAccountsSummaryOptionals } from "../EAccountsSummary/EAccountsSummary.optionals";
import { LabelAndDateInput } from '@focuson/form_components';
import { LabelAndNumberInput } from '@focuson/form_components';
import { Table } from '@focuson/form_components';
import { LabelAndBooleanInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndRadio } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {EAccountsSummaryPageDomain} from "../EAccountsSummary/EAccountsSummary.domains";
import {CreatePlanDomain} from "../EAccountsSummary/EAccountsSummary.domains"
import {EAccountsSummaryDomain} from "../EAccountsSummary/EAccountsSummary.domains"
import {EAccountsSummaryTableDomain} from "../EAccountsSummary/EAccountsSummary.domains"
import {EAccountSummaryDomain} from "../EAccountsSummary/EAccountsSummary.domains"
export function EAccountsSummaryPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi
  return focusedPageWithExtraState<FState, EAccountsSummaryPageDomain, EAccountsSummaryDomain, Context> ( s => 'E Accounts Summary' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {amendExistingPlan:<ModalButton id={`${id}.amendExistingPlan`} text='amendExistingPlan'  state={state} modal = 'CreatePlan'  
        pageMode='edit'
        focusOn='~/tempCreatePlan'
        copy={[{"from":"~/fromApi/createPlan"}]}
         rest={{"name":"EAccountsSummary_CreatePlanRestDetails","restAction":"update"}}
      />,
      createNewPlan:<ModalButton id={`${id}.createNewPlan`} text='createNewPlan'  state={state} modal = 'CreatePlan'  
        pageMode='create'
        focusOn='~/tempCreatePlan'
        createEmpty={empty.emptyCreatePlan}
         rest={{"name":"EAccountsSummary_CreatePlanRestDetails","restAction":"create"}}
      />,
      deleteExistingPlan:<RestButton state={state} id={`${id}.deleteExistingPlan`} 
        name='deleteExistingPlan'
        action={"delete"}
        rest='EAccountsSummary_CreatePlanRestDetails'
        confirm={true}
       />,
      refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}

      return <>
          <EAccountsSummary id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.createNewPlan } 
      { buttons.amendExistingPlan } 
      { buttons.deleteExistingPlan } 
      { buttons.refresh } 
      </>})}

export function CreatePlan({id,state,mode,buttons}: FocusedProps<FState, CreatePlanDomain,Context>){
  return <>
    <LabelAndDateInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' allButtons={buttons} />
    <LabelAndDateInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='Create Plan Date' allButtons={buttons} ariaLabel='The Create Plan Date' />
    <LabelAndDateInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='Create Plan End' allButtons={buttons} />
</>
}

export function EAccountsSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountsSummaryDomain,Context>){
  return <>
    <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='Use E Statements' allButtons={buttons} />
    <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={["accountId","displayType","description","virtualBankSeq","frequency","total"]} />
    <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='Total Monthly Cost' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='One Account Balance' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='Current Account Balance' allButtons={buttons} required={true} />
    <CreatePlan id={`${id}.createPlan`} state={state.focusOn('createPlan')} mode={mode} buttons={buttons} />
</>
}

export function EAccountSummary({id,state,mode,buttons}: FocusedProps<FState, EAccountSummaryDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='Display Type' allButtons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='Description' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='Virtual Bank Seq' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='Total' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' allButtons={buttons} required={true} />
</>
}
