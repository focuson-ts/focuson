import * as domains from './domains';
import * as pageDomains from './pageDomains';
import { LensProps } from "@focuson/state";
import { Layout } from "./copied/layout";
import { ModalButton, ModalCancelButton, ModalCommitButton } from "./copied/modal";
import { RestButton } from "./copied/rest";
import { LabelAndInput } from "./copied/LabelAndInput";
import { focusedPageWithExtraState } from "@focuson/pages";
import { Table } from "./copied/table";
import {OccupationAndIncomeDetailsPageDomain} from "./pageDomains";
import {EAccountsSummaryPageDomain} from "./pageDomains";
import {ETransferPageDomain} from "./pageDomains";
import {CreatePlanDDDomain} from "./domains"
import {EAccountsSummaryDDDomain} from "./domains"
import {EAccountSummaryDDDomain} from "./domains"
import {ETransferDataDDomain} from "./domains"
import {OccupationAndIncomeDomain} from "./domains"
export function OccupationAndIncomeDetailsPage<S>(){
  return focusedPageWithExtraState<S, OccupationAndIncomeDetailsPageDomain, OccupationAndIncomeDomain> ( s => 'fromApi' ) ( s => s.focusOn ( 'fromApi' ) ) (
    ( fullState, state ) => {
  return (<Layout  details='[1][1][1][1][1][1][1]'>
   <OccupationAndIncome state={state} />
   <RestButton id='addEntry' state={state} />
   <button>editEntry of type ResetStateButton cannot be create yet</button>
   <button>nextEntry of type ResetStateButton cannot be create yet</button>
   <button>prevEntry of type ResetStateButton cannot be create yet</button>
   </Layout>)})}
export function EAccountsSummaryPage<S>(){
  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain> ( s => 'fromApi' ) ( s => s.focusOn ( 'fromApi' ) ) (
    ( fullState, state ) => {
  return (<Layout  details='[1][3,3][5]'>
   <EAccountsSummaryDD state={state} />
   <ModalButton id='amendExistingPlan' state={state} mode='edit' mainData='fromApi' tempData='temp' rest='createPlanRestD' action='update'  />
   <ModalButton id='createNewPlan' state={state} mode='create'  tempData='temp' rest='createPlanRestD' action='create'  />
   <RestButton id='deleteExistingPlan' state={state} />
   <RestButton id='refresh' state={state} />
   <ModalButton id='requestInfo' state={state} mode='view' mainData='TDB' tempData='TBD'   />
   </Layout>)})}
// Not creating modal page for CreatePlan yet
export function ETransferPage<S>(){
  return focusedPageWithExtraState<S, ETransferPageDomain, ETransferDataDDomain> ( s => 'fromApi' ) ( s => s.focusOn ( 'fromApi' ) ) (
    ( fullState, state ) => {
  return (<Layout  details='[3][1,1,1][1,1][1][3]'>
   <ETransferDataD state={state} />
   <button>cancel of type ResetStateButton cannot be create yet</button>
   <RestButton id='eTransfers' state={state} />
   <button>resetAll of type ResetStateButton cannot be create yet</button>
   </Layout>)})}
export function CreatePlanDD<S>({state}: LensProps<S, CreatePlanDDDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('createPlanStart')} label='Create Start' />
  <LabelAndInput state={state.focusOn('createPlanDate')} label='createPlanDateCC' ariaLabel='The Create Plan Date' />
  <LabelAndInput state={state.focusOn('createPlanEnd')} label='createPlanEndCC' />
</>)
}
export function EAccountsSummaryDD<S>({state}: LensProps<S, EAccountsSummaryDDDomain>){
  return(<>
  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} />
  <LabelAndInput state={state.focusOn('totalMonthlyCost')} label='totalMonthlyCostCC' />
  <LabelAndInput state={state.focusOn('oneAccountBalance')} label='oneAccountBalanceCC' />
  <LabelAndInput state={state.focusOn('currentAccountBalance')} label='currentAccountBalanceCC' />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='createPlanDateCC' ariaLabel='The Create Plan Date' />
  <LabelAndInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='createPlanEndCC' />
</>)
}
export function ETransferDataD<S>({state}: LensProps<S, ETransferDataDDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('amount')} label='Account Id' />
  <LabelAndInput state={state.focusOn('dateOfETransfer')} label='dateOfETransferCC' />
  <LabelAndInput state={state.focusOn('description')} label='descriptionCC' />
  <LabelAndInput state={state.focusOn('fromAccount')} label='fromAccountCC' />
  <LabelAndInput state={state.focusOn('toAccount')} label='toAccountCC' />
  <LabelAndInput state={state.focusOn('type')} label='typeCC' />
  <LabelAndInput state={state.focusOn('balance')} label='balanceCC' />
  <LabelAndInput state={state.focusOn('notes')} label='notesCC' />
</>)
}
export function OccupationAndIncome<S>({state}: LensProps<S, OccupationAndIncomeDomain>){
  return(<>
  <LabelAndInput state={state.focusOn('typeOfProfession')} label='typeOfProfessionCC' />
  <LabelAndInput state={state.focusOn('occupation')} label='occupationCC' />
  <LabelAndInput state={state.focusOn('customersDescription')} label='customersDescriptionCC' />
  <LabelAndInput state={state.focusOn('businessType')} label='businessTypeCC' />
  <LabelAndInput state={state.focusOn('businessName')} label='businessNameCC' />
  <LabelAndInput state={state.focusOn('dateStarted')} label='dateStartedCC' />
  <LabelAndInput state={state.focusOn('averageAnnualDrawings')} label='averageAnnualDrawingsCC' />
</>)
}