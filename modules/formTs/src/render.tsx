import * as domains from './domains';
import * as pageDomains from './pageDomains';
import * as empty from './empty';
import { LensProps } from "@focuson/state";
import { Layout } from "./copied/layout";
import { RestButton } from "./copied/rest";
import { ListNextButton, ListPrevButton } from "./copied/listNextPrevButtons";
import { PageSelectionAndRestCommandsContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,  ModalButton, ModalCancelButton, ModalCommitButton, fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps } from "./common";
import { Lenses } from '@focuson/lens';
import { Guard } from "./copied/guard";
import { Table } from './copied/table';
import { LabelAndStringInput } from './copied/LabelAndInput';
import { LabelAndNumberInput } from './copied/LabelAndInput';
import { Radio } from './copied/Radio';
import { LabelAndRadio } from './copied/Radio';
import { LabelAndBooleanInput } from './copied/LabelAndInput';
import { SelectedItem } from './copied/table';
import {OccupationAndIncomeSummaryPageDomain} from "./pageDomains";
import {EAccountsSummaryPageDomain} from "./pageDomains";
import {ETransferPageDomain} from "./pageDomains";
import {CreateEAccountPageDomain} from "./pageDomains";
import {ChequeCreditbooksPageDomain} from "./pageDomains";
import {ChequeCreditbooksDDDomain} from "./domains"
import {ChequeCreditbooksHistoryLineDDDomain} from "./domains"
import {CreateEAccountDataDDDomain} from "./domains"
import {CreatePlanDDDomain} from "./domains"
import {EAccountsSummaryDDDomain} from "./domains"
import {EAccountSummaryDDDomain} from "./domains"
import {ETransferDataDDomain} from "./domains"
import {OccupationAndIncomeDetailsDDDomain} from "./domains"
import {OccupationIncomeDetailsDDDomain} from "./domains"
export function OccupationAndIncomeSummaryPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, OccupationAndIncomeSummaryPageDomain, OccupationAndIncomeDetailsDDDomain, Context> ( s => 'OccupationAndIncomeSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][3,3][5]'>
     <OccupationAndIncomeDetailsDD state={state}  mode={mode} />
     <ModalButton id='addEntry' text='addEntry'  state={state} modal = 'OccupationIncomeModalPD'  focusOn={["OccupationAndIncomeSummary","temp"]}  copyOnClose={["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails","[append]"]}createEmpty={empty.emptyOccupationIncomeDetailsDD}  setToLengthOnClose={{"array":["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails"],"variable":["OccupationAndIncomeSummary","selectedItem"]}} pageMode='create'   />
     <ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModalPD'  focusOn={["OccupationAndIncomeSummary","temp"]} copyFrom={["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails","{selectedItem}"]} copyOnClose={["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails","{selectedItem}"]}   pageMode='edit'   />
     <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />
     <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />
   </Layout>)})}

export function OccupationIncomeModalPDPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPage<S, OccupationIncomeDetailsDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <OccupationIncomeDetailsDD state={state}  mode={mode} />
               <ModalCancelButton id='cancel' state={state} />
               <ModalCommitButton id='commit' state={state} />
            </Layout>)})}

export function EAccountsSummaryPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][3,3][5]'>
     <EAccountsSummaryDD state={state}  mode={mode} />
     <ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  focusOn={["EAccountsSummary","tempCreatePlan"]} copyFrom={["EAccountsSummary","fromApi","createPlan"]}    pageMode='edit'   rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"update","path":["EAccountsSummary"]}} />
     <ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  focusOn={["EAccountsSummary","tempCreatePlan"]}  createEmpty={empty.emptyCreatePlanDD}   pageMode='create'   rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"create","path":["EAccountsSummary"]}} />
     <RestButton id='deleteExistingPlan' state={state} />
     <button>refresh of type ResetStateButton cannot be created yet</button>
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
     <button>cancel of type ResetStateButton cannot be created yet</button>
     <RestButton id='eTransfers' state={state} />
     <button>resetAll of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function CreateEAccountPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, CreateEAccountPageDomain, CreateEAccountDataDDDomain, Context> ( s => 'CreateEAccount' ) ( s => s.focusOn('editing')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][1][1][1]]'>
     <CreateEAccountDataDD state={state}  mode={mode} />
     <button>cancel of type ResetStateButton cannot be created yet</button>
     <RestButton id='eTransfers' state={state} />
     <button>resetAll of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function ChequeCreditbooksPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, ChequeCreditbooksPageDomain, ChequeCreditbooksDDDomain, Context> ( s => 'ChequeCreditbooks' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][2][2]'>
     <ChequeCreditbooksDD state={state}  mode={mode} />
     <button>chequeBook of type ResetStateButton cannot be created yet</button>
     <ModalButton id='orderNewBook' text='orderNewBook'  state={state} modal = 'OrderChequeBookOrPayingInModal'  focusOn={["ChequeCreditbooks","tempCreatePlan"]}  createEmpty={empty.emptyChequeCreditbooksHistoryLineDD}   pageMode='create'   rest={{"name":"ChequeCreditbooks_ChequeCreditbooksDDRestDetails","restAction":"create","path":["tempCreatePlan"]}} />
     <button>payingInBook of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function OrderChequeBookOrPayingInModalPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPage<S, ChequeCreditbooksHistoryLineDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <ChequeCreditbooksHistoryLineDD state={state}  mode={mode} />
               <ModalCancelButton id='cancel' state={state} />
               <ModalCommitButton id='commit' state={state} />
            </Layout>)})}

export function ChequeCreditbooksDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, ChequeCreditbooksDDDomain,Context>){
  return(<>
  <Table state={state.focusOn('history')} mode={mode} order={["serialNumber","howOrdered","dateOrder"]} />
</>)
}

export function ChequeCreditbooksHistoryLineDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, ChequeCreditbooksHistoryLineDDDomain,Context>){
  return(<>
  <LabelAndNumberInput state={state.focusOn('serialNumber')} mode={mode} label='serial number' />
  <LabelAndStringInput state={state.focusOn('howOrdered')} mode={mode} label='how ordered' />
  <LabelAndStringInput state={state.focusOn('dateOrder')} mode={mode} label='date order' />
</>)
}

export function CreateEAccountDataDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreateEAccountDataDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('name')} mode={mode} label='name' />
  <LabelAndRadio state={state.focusOn('type')} mode={mode} label='type' enums={{"savings":"Savings","checking":"Checking"}} />
  <Radio state={state.focusOn('savingsStyle')} mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
  <LabelAndNumberInput state={state.focusOn('initialAmount')} mode={mode} label='initial amount' />
</>)
}

export function CreatePlanDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreatePlanDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' />
  <LabelAndStringInput state={state.focusOn('createPlanDate')} mode={mode} label='create plan date' ariaLabel='The Create Plan Date' />
  <LabelAndStringInput state={state.focusOn('createPlanEnd')} mode={mode} label='create plan end' />
</>)
}

export function EAccountsSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain,Context>){
  return(<>
  <LabelAndBooleanInput state={state.focusOn('useEStatements')} mode={mode} label='use e statements' />
  <Table state={state.focusOn('eAccountsTable')} mode={mode} order={["accountId","displayType","description","virtualBankSeq","frequency","total"]} />
  <LabelAndNumberInput state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' />
  <LabelAndNumberInput state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' />
  <LabelAndNumberInput state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' />
  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanStart')} mode={mode} label='Create Start' />
  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanDate')} mode={mode} label='create plan date' ariaLabel='The Create Plan Date' />
  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} mode={mode} label='create plan end' />
</>)
}

export function EAccountSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountSummaryDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('accountId')} mode={mode} label='Account Id' />
  <LabelAndRadio state={state.focusOn('displayType')} mode={mode} label='display type' enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndStringInput state={state.focusOn('description')} mode={mode} label='description' />
  <LabelAndStringInput state={state.focusOn('virtualBankSeq')} mode={mode} label='virtual bank seq' />
  <LabelAndNumberInput state={state.focusOn('total')} mode={mode} label='total' />
  <LabelAndStringInput state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' />
</>)
}

export function ETransferDataD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, ETransferDataDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('amount')} mode={mode} label='Account Id' />
  <LabelAndStringInput state={state.focusOn('dateOfETransfer')} mode={mode} label='date of e transfer' />
  <LabelAndStringInput state={state.focusOn('description')} mode={mode} label='description' />
  <LabelAndStringInput state={state.focusOn('fromAccount')} mode={mode} label='from account' />
  <LabelAndStringInput state={state.focusOn('toAccount')} mode={mode} label='to account' />
  <LabelAndStringInput state={state.focusOn('monitoringAccount')} mode={mode} label='monitoring account' />
  <LabelAndRadio state={state.focusOn('type')} mode={mode} label='type' enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndNumberInput state={state.focusOn('balance')} mode={mode} label='balance' />
  <LabelAndStringInput state={state.focusOn('notes')} mode={mode} label='notes' />
</>)
}

export function OccupationAndIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, OccupationAndIncomeDetailsDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('regulatoryReport')} mode={mode} label='regulatory report' />
  <LabelAndStringInput state={state.focusOn('mainCustomerName')} mode={mode} label='main customer name' />
  <LabelAndStringInput state={state.focusOn('jointCustomerName')} mode={mode} label='joint customer name' />
  <LabelAndNumberInput state={state.focusOn('mainClientRef')} mode={mode} label='main client ref' />
  <LabelAndNumberInput state={state.focusOn('jointClientRef')} mode={mode} label='joint client ref' />
  <SelectedItem state={state.focusOn('customerOccupationIncomeDetails')} mode={mode} index={pageState(state).focusOn('selectedItem').json()} display={OccupationIncomeDetailsDD} />
</>)
}

export function OccupationIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, OccupationIncomeDetailsDDDomain,Context>){
const areYouGuard = state.chainLens(Lenses.fromPath(["areYou"])).optJson();console.log('areYouGuard', areYouGuard)
  return(<>
  <LabelAndStringInput state={state.focusOn('areYou')} mode={mode} label='are you' />
  <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput state={state.focusOn('currentEmployment')} mode={mode} label='current employment' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('occupation')} mode={mode} label='occupation' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('customerDescription')} mode={mode} label='customer description' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('ownShareOfTheCompany')} mode={mode} label='own share of the company' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('owningSharesPct')} mode={mode} label='owning shares pct' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('workFor')} mode={mode} label='work for' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('employmentType')} mode={mode} label='employment type' /></Guard>
  <LabelAndNumberInput state={state.focusOn('annualSalaryBeforeDeduction')} mode={mode} label='annual salary before deduction' />
  <LabelAndNumberInput state={state.focusOn('annualIncomeExcludingRent')} mode={mode} label='annual income excluding rent' />
  <LabelAndNumberInput state={state.focusOn('regularCommissionBonus')} mode={mode} label='regular commission bonus' />
  <LabelAndStringInput state={state.focusOn('dateOfEmploymentStart')} mode={mode} label='date of employment start' />
  <LabelAndStringInput state={state.focusOn('otherSourceOfIncome')} mode={mode} label='other source of income' />
  <LabelAndStringInput state={state.focusOn('createdBy')} mode={mode} label='created by' />
  <LabelAndStringInput state={state.focusOn('createdDate')} mode={mode} label='created date' />
  <LabelAndStringInput state={state.focusOn('employerName')} mode={mode} label='employer name' />
  <LabelAndStringInput state={state.focusOn('whatTypeOfBusiness')} mode={mode} label='what type of business' />
  <LabelAndStringInput state={state.focusOn('whatNameBusiness')} mode={mode} label='what name business' />
  <LabelAndStringInput state={state.focusOn('establishedYear')} mode={mode} label='established year' />
  <LabelAndNumberInput state={state.focusOn('annualDrawing3Yrs')} mode={mode} label='annual drawing3 yrs' />
  <LabelAndStringInput state={state.focusOn('empStartDate')} mode={mode} label='emp start date' />
  <LabelAndStringInput state={state.focusOn('empEndDate')} mode={mode} label='emp end date' />
  <LabelAndStringInput state={state.focusOn('sePositionHeld')} mode={mode} label='se position held' />
  <LabelAndStringInput state={state.focusOn('occupationCategory')} mode={mode} label='occupation category' />
  <LabelAndNumberInput state={state.focusOn('empEmploymentSeq')} mode={mode} label='emp employment seq' />
  <LabelAndNumberInput state={state.focusOn('empAppRoleSeq')} mode={mode} label='emp app role seq' />
  <LabelAndNumberInput state={state.focusOn('accountantAppRoleSeq')} mode={mode} label='accountant app role seq' />
</>)
}
