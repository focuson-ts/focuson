import * as domains from './domains';
import * as pageDomains from './pageDomains';
import { LensProps } from "@focuson/state";
import { Layout } from "./copied/layout";
import { ModalButton, ModalCancelButton, ModalCommitButton,ModalAndCopyButton } from "./copied/modal";
import { RestButton } from "./copied/rest";
import { LabelAndInput } from "./copied/LabelAndInput";
import { focusedPageWithExtraState } from "@focuson/pages";
import { Table } from "./copied/table";
import { FocusedProps } from "./common";
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
export function OccupationAndIncomeDetailsPage<S>(){
  return focusedPageWithExtraState<S, OccupationAndIncomeDetailsPageDomain, OccupationAndIncomeDomain> ( s => 'OccupationAndIncomeDetails' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][1][1][1][1][1][1]'>
   <OccupationAndIncome state={state}  mode={mode} />
   <RestButton id='addEntry' state={state} />
   <button>editEntry of type ResetStateButton cannot be create yet</button>
   <button>nextEntry of type ResetStateButton cannot be create yet</button>
   <button>prevEntry of type ResetStateButton cannot be create yet</button>
   </Layout>)})}
export function EAccountsSummaryPage<S>(){
  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][3,3][5]'>
   <EAccountsSummaryDD state={state}  mode={mode} />
   <ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='edit' from={fullState.focusOn('fromApi')} to={fullState.focusOn('temp')} rest='createPlanRestD' action='update'  />
   <ModalButton id='createNewPlan' text='createNewPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='create' createEmpty rest='createPlanRestD' action='create'  />
   <RestButton id='deleteExistingPlan' state={state} />
   <RestButton id='refresh' state={state} />
   </Layout>)})}
export function CreatePlanPage<S>({state, mode}: FocusedProps<S,CreatePlanDDDomain>){
  return (<Layout  details='[3]'>
   <CreatePlanDD state={state}  mode={mode} />
   <ModalCancelButton id='cancel' state={state} />
   <ModalCommitButton id='commit' state={state} />
   </Layout>)}
export function ETransferPage<S>(){
  return focusedPageWithExtraState<S, ETransferPageDomain, ETransferDataDDomain> ( s => 'ETransfer' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[3][1,1,1][1,1][1][3]'>
   <ETransferDataD state={state}  mode={mode} />
   <button>cancel of type ResetStateButton cannot be create yet</button>
   <RestButton id='eTransfers' state={state} />
   <button>resetAll of type ResetStateButton cannot be create yet</button>
   </Layout>)})}
export function CreateEAccountPage<S>(){
  return focusedPageWithExtraState<S, CreateEAccountPageDomain, CreateEAccountDataDDDomain> ( s => 'CreateEAccount' ) ( s => s.focusOn('editing')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][1][1][1]]'>
   <CreateEAccountDataDD state={state}  mode={mode} />
   <button>cancel of type ResetStateButton cannot be create yet</button>
   <RestButton id='eTransfers' state={state} />
   <button>resetAll of type ResetStateButton cannot be create yet</button>
   </Layout>)})}
export function CreateEAccountDataDD<S>({state,mode}: FocusedProps<S, CreateEAccountDataDDDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('name')} label='nameCC' mode={mode} />
  <LabelAndInput state={state.focusOn('type')} label='typeCC' mode={mode} />
  <LabelAndInput state={state.focusOn('savingsStyle')} label='savingsStyleCC' mode={mode} />
  <LabelAndInput state={state.focusOn('initialAmount')} label='initialAmountCC' mode={mode} />
</>)
}
export function CreatePlanDD<S>({state,mode}: FocusedProps<S, CreatePlanDDDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('createPlanStart')} label='Create Start' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlanDate')} label='createPlanDateCC' ariaLabel='The Create Plan Date' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlanEnd')} label='createPlanEndCC' mode={mode} />
</>)
}
export function EAccountsSummaryDD<S>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain>){
  return(<>
  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />
  <LabelAndInput state={state.focusOn('totalMonthlyCost')} label='totalMonthlyCostCC' mode={mode} />
  <LabelAndInput state={state.focusOn('oneAccountBalance')} label='oneAccountBalanceCC' mode={mode} />
  <LabelAndInput state={state.focusOn('currentAccountBalance')} label='currentAccountBalanceCC' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='createPlanDateCC' ariaLabel='The Create Plan Date' mode={mode} />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='createPlanEndCC' mode={mode} />
</>)
}
export function ETransferDataD<S>({state,mode}: FocusedProps<S, ETransferDataDDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('amount')} label='Account Id' mode={mode} />
  <LabelAndInput state={state.focusOn('dateOfETransfer')} label='dateOfETransferCC' mode={mode} />
  <LabelAndInput state={state.focusOn('description')} label='descriptionCC' mode={mode} />
  <LabelAndInput state={state.focusOn('fromAccount')} label='fromAccountCC' mode={mode} />
  <LabelAndInput state={state.focusOn('toAccount')} label='toAccountCC' mode={mode} />
  <LabelAndInput state={state.focusOn('monitoringAccount')} label='monitoringAccountCC' mode={mode} />
  <LabelAndInput state={state.focusOn('type')} label='typeCC' mode={mode} />
  <LabelAndInput state={state.focusOn('balance')} label='balanceCC' mode={mode} />
  <LabelAndInput state={state.focusOn('notes')} label='notesCC' mode={mode} />
</>)
}
export function OccupationAndIncome<S>({state,mode}: FocusedProps<S, OccupationAndIncomeDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('typeOfProfession')} label='typeOfProfessionCC' mode={mode} />
  <LabelAndInput state={state.focusOn('occupation')} label='occupationCC' mode={mode} />
  <LabelAndInput state={state.focusOn('customersDescription')} label='customersDescriptionCC' mode={mode} />
  <LabelAndInput state={state.focusOn('businessType')} label='businessTypeCC' mode={mode} />
  <LabelAndInput state={state.focusOn('businessName')} label='businessNameCC' mode={mode} />
  <LabelAndInput state={state.focusOn('dateStarted')} label='dateStartedCC' mode={mode} />
  <LabelAndInput state={state.focusOn('averageAnnualDrawings')} label='averageAnnualDrawingsCC' mode={mode} />
</>)
}