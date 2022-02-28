import * as domains from './domains';
import * as pageDomains from './pageDomains';
import { LensProps } from "@focuson/state";
import { Layout } from "./copied/layout";
import { RestButton } from "./copied/rest";
import { LabelAndInput } from "./copied/LabelAndInput";
import { PageSelectionAndRestCommandsContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, ModalAndCopyButton, ModalButton, ModalCancelButton, ModalCommitButton} from "@focuson/pages";
import { Table } from "./copied/table";
import { LabelAndRadio, Radio } from "./copied/Radio";
import { Context, FocusedProps } from "./common";
import {OccupationAndIncomeDetailsPageDomain} from "./pageDomains";
import {EAccountsSummaryPageDomain} from "./pageDomains";
import {ETransferPageDomain} from "./pageDomains";
import {CreateEAccountPageDomain} from "./pageDomains";
import {CreateEAccountDataDDDomain} from "./domains"
import {CreatePlanDDDomain} from "./domains"
import {EAccountsSummaryDDDomain} from "./domains"
import {EAccountSummaryDDDomain} from "./domains"
import {ETransferDataDDomain} from "./domains"
import {OccupationAndIncomeDomain} from "./domains"
export function OccupationAndIncomeDetailsPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, OccupationAndIncomeDetailsPageDomain, OccupationAndIncomeDomain, Context> ( s => 'OccupationAndIncomeDetails' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][1][1][1][1][1][1]'>
   <OccupationAndIncome state={state}  mode={mode} />
   <RestButton id='addEntry' state={state} />
   <button>editEntry of type ResetStateButton cannot be create yet</button>
   <button>Next</button>
   <button>Prev</button>
   </Layout>)})}

export function EAccountsSummaryPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][3,3][5]'>
   <EAccountsSummaryDD state={state}  mode={mode} />
   <ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={["EAccountsSummary","tempCreatePlan"]}  from={fullState.focusOn('fromApi').focusOn('createPlan')}   pageMode='edit'  rest={{"rest":"EAccountsSummary_CreatePlanDDRestDetails","action":"update","result":"refresh"}} />
   <ModalButton id='createNewPlan' text='createNewPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={["EAccountsSummary","tempCreatePlan"]}   pageMode='create'  rest={{"rest":"EAccountsSummary_CreatePlanDDRestDetails","action":"create","result":"refresh"}} />
   <RestButton id='deleteExistingPlan' state={state} />
   <button>refresh of type ResetStateButton cannot be create yet</button>
   </Layout>)})}

export function CreatePlanPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPage<S, CreatePlanDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
             <CreatePlanDD state={state}  mode={mode} />
   <ModalCancelButton id='cancel' state={state} />
   <ModalCommitButton id='commit' state={state} />
            </Layout>)})}

export function ETransferPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, ETransferPageDomain, ETransferDataDDomain, Context> ( s => 'ETransfer' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[3][1,1,1][1,1][1][3]'>
   <ETransferDataD state={state}  mode={mode} />
   <button>cancel of type ResetStateButton cannot be create yet</button>
   <RestButton id='eTransfers' state={state} />
   <button>resetAll of type ResetStateButton cannot be create yet</button>
   </Layout>)})}

export function CreateEAccountPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, CreateEAccountPageDomain, CreateEAccountDataDDDomain, Context> ( s => 'CreateEAccount' ) ( s => s.focusOn('editing')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][1][1][1]]'>
   <CreateEAccountDataDD state={state}  mode={mode} />
   <button>cancel of type ResetStateButton cannot be create yet</button>
   <RestButton id='eTransfers' state={state} />
   <button>resetAll of type ResetStateButton cannot be create yet</button>
   </Layout>)})}

export function CreateEAccountDataDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreateEAccountDataDDDomain,Context>){
  return(<>
  <LabelAndInput state={state.focusOn('name')} label='name' mode={mode} />
  <LabelAndRadio state={state.focusOn('type')} label='type' mode={mode} enums={{"savings":"Savings","checking":"Checking"}} />
  <Radio state={state.focusOn('savingsStyle')}  mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
  <LabelAndInput state={state.focusOn('initialAmount')} label='initial amount' mode={mode} />
</>)
}

export function CreatePlanDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreatePlanDDDomain,Context>){
  return(<>
  <LabelAndInput state={state.focusOn('createPlanStart')} label='Create Start' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlanEnd')} label='create plan end' mode={mode} />
</>)
}

export function EAccountsSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain,Context>){
  return(<>
  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />
  <LabelAndInput state={state.focusOn('totalMonthlyCost')} label='total monthly cost' mode={mode} />
  <LabelAndInput state={state.focusOn('oneAccountBalance')} label='one account balance' mode={mode} />
  <LabelAndInput state={state.focusOn('currentAccountBalance')} label='current account balance' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='create plan end' mode={mode} />
</>)
}

export function ETransferDataD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, ETransferDataDDomain,Context>){
  return(<>
  <LabelAndInput state={state.focusOn('amount')} label='Account Id' mode={mode} />
  <LabelAndInput state={state.focusOn('dateOfETransfer')} label='date of e transfer' mode={mode} />
  <LabelAndInput state={state.focusOn('description')} label='description' mode={mode} />
  <LabelAndInput state={state.focusOn('fromAccount')} label='from account' mode={mode} />
  <LabelAndInput state={state.focusOn('toAccount')} label='to account' mode={mode} />
  <LabelAndInput state={state.focusOn('monitoringAccount')} label='monitoring account' mode={mode} />
  <LabelAndRadio state={state.focusOn('type')} label='type' mode={mode} enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndInput state={state.focusOn('balance')} label='balance' mode={mode} />
  <LabelAndInput state={state.focusOn('notes')} label='notes' mode={mode} />
</>)
}

export function OccupationAndIncome<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, OccupationAndIncomeDomain,Context>){
  return(<>
  <LabelAndInput state={state.focusOn('typeOfProfession')} label='type of profession' mode={mode} />
  <LabelAndInput state={state.focusOn('occupation')} label='occupation' mode={mode} />
  <LabelAndInput state={state.focusOn('customersDescription')} label='customers description' mode={mode} />
  <LabelAndInput state={state.focusOn('businessType')} label='business type' mode={mode} />
  <LabelAndInput state={state.focusOn('businessName')} label='business name' mode={mode} />
  <LabelAndInput state={state.focusOn('dateStarted')} label='date started' mode={mode} />
  <LabelAndInput state={state.focusOn('averageAnnualDrawings')} label='average annual drawings' mode={mode} />
</>)
}
