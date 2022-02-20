import * as domains from './domains';
import * as pageDomains from './pageDomains';
import { LensProps } from "@focuson/state";
import { Layout } from "./copied/layout";
import { ModalButton, ModalCancelButton, ModalCommitButton } from "./copied/modal";
import { RestButton } from "./copied/rest";
import { LabelAndInput } from "./copied/LabelAndInput";
import { focusedPageWithExtraState } from "@focuson/pages";
import { Table } from "./copied/table";
import {EAccountsSummaryPageDomain} from "./pageDomains";
import {CreatePlanDDDomain} from "./domains"
import {EAccountsSummaryDDDomain} from "./domains"
import {EAccountSummaryDDDomain} from "./domains"
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