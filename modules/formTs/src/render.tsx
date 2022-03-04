import * as domains from './domains';
import * as pageDomains from './pageDomains';
import * as empty from './empty';
import { LensProps } from "@focuson/state";
import { Layout } from "./copied/layout";
import { RestButton } from "./copied/rest";
import { ListNextButton, ListPrevButton } from "./copied/listNextPrevButtons";
import { PageSelectionAndRestCommandsContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, ModalAndCopyButton, ModalButton, ModalCancelButton, ModalCommitButton} from "@focuson/pages";
import { Context, FocusedProps } from "./common";
import { Lenses } from '@focuson/lens';
import { Guard } from "./copied/guard";
import { Table } from './copied/table';
import { LabelAndStringInput } from './copied/LabelAndInput';
import { LabelAndNumberInput } from './copied/LabelAndInput';
import { Radio } from './copied/Radio';
import { LabelAndRadio } from './copied/Radio';
import { LabelAndBooleanInput } from './copied/LabelAndInput';
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
     <ModalButton id='addEntry' text='addEntry' modal = 'OccupationIncomeModalPD'  to={fullState.focusOn('temp')} base={["OccupationAndIncomeSummary","temp"]} createEmpty={empty.emptyOccupationIncomeDetailsDD}  pageMode='create' copyOnClose={["here"]}  />
     <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />
     <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />
     <ModalButton id='view' text='view' modal = 'OccupationIncomeModalPD'  to={fullState.focusOn('temp')} base={["OccupationAndIncomeSummary","temp"]}   pageMode='view'   />
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
     <ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={["EAccountsSummary","tempCreatePlan"]}  from={fullState.focusOn('fromApi').focusOn('createPlan')}   pageMode='edit'   rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"update","path":["EAccountsSummary"]}} />
     <ModalButton id='createNewPlan' text='createNewPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={["EAccountsSummary","tempCreatePlan"]} createEmpty={empty.emptyCreatePlanDD}  pageMode='create'   rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"create","path":["EAccountsSummary"]}} />
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
     <ModalButton id='orderNewBook' text='orderNewBook' modal = 'OrderChequeBookOrPayingInModal'  to={fullState.focusOn('tempCreatePlan')} base={["ChequeCreditbooks","tempCreatePlan"]} createEmpty={empty.emptyChequeCreditbooksHistoryLineDD}  pageMode='create'   rest={{"name":"ChequeCreditbooks_ChequeCreditbooksDDRestDetails","restAction":"create","path":["tempCreatePlan"]}} />
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
  <Table state={state.focusOn('history')} order={['serialNumber','howOrdered','dateOrder']} mode={mode} />
</>)
}

export function ChequeCreditbooksHistoryLineDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, ChequeCreditbooksHistoryLineDDDomain,Context>){
  return(<>
  <LabelAndNumberInput state={state.focusOn('serialNumber')} label='serial number' mode={mode} />
  <LabelAndStringInput state={state.focusOn('howOrdered')} label='how ordered' mode={mode} />
  <LabelAndStringInput state={state.focusOn('dateOrder')} label='date order' mode={mode} />
</>)
}

export function CreateEAccountDataDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreateEAccountDataDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('name')} label='name' mode={mode} />
  <LabelAndRadio state={state.focusOn('type')} label='type' mode={mode} enums={{"savings":"Savings","checking":"Checking"}} />
  <Radio state={state.focusOn('savingsStyle')}  mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
  <LabelAndNumberInput state={state.focusOn('initialAmount')} label='initial amount' mode={mode} />
</>)
}

export function CreatePlanDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, CreatePlanDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('createPlanStart')} label='Create Start' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createPlanEnd')} label='create plan end' mode={mode} />
</>)
}

export function EAccountsSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountsSummaryDDDomain,Context>){
  return(<>
  <LabelAndBooleanInput state={state.focusOn('useEStatements')} label='use e statements' mode={mode} />
  <Table state={state.focusOn('eAccountsTable')} order={['accountId','displayType','description','virtualBankSeq','frequency','total']} mode={mode} />
  <LabelAndNumberInput state={state.focusOn('totalMonthlyCost')} label='total monthly cost' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('oneAccountBalance')} label='one account balance' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('currentAccountBalance')} label='current account balance' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanStart')} label='Create Start' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanDate')} label='create plan date' ariaLabel='The Create Plan Date' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createPlan').focusOn('createPlanEnd')} label='create plan end' mode={mode} />
</>)
}

export function EAccountSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, EAccountSummaryDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('accountId')} label='Account Id' mode={mode} />
  <LabelAndRadio state={state.focusOn('displayType')} label='display type' mode={mode} enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndStringInput state={state.focusOn('description')} label='description' mode={mode} />
  <LabelAndStringInput state={state.focusOn('virtualBankSeq')} label='virtual bank seq' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('total')} label='total' mode={mode} />
  <LabelAndStringInput state={state.focusOn('frequency')} label='Frequency/Amount' mode={mode} />
</>)
}

export function ETransferDataD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, ETransferDataDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('amount')} label='Account Id' mode={mode} />
  <LabelAndStringInput state={state.focusOn('dateOfETransfer')} label='date of e transfer' mode={mode} />
  <LabelAndStringInput state={state.focusOn('description')} label='description' mode={mode} />
  <LabelAndStringInput state={state.focusOn('fromAccount')} label='from account' mode={mode} />
  <LabelAndStringInput state={state.focusOn('toAccount')} label='to account' mode={mode} />
  <LabelAndStringInput state={state.focusOn('monitoringAccount')} label='monitoring account' mode={mode} />
  <LabelAndRadio state={state.focusOn('type')} label='type' mode={mode} enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndNumberInput state={state.focusOn('balance')} label='balance' mode={mode} />
  <LabelAndStringInput state={state.focusOn('notes')} label='notes' mode={mode} />
</>)
}

export function OccupationAndIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, OccupationAndIncomeDetailsDDDomain,Context>){
  return(<>
  <LabelAndStringInput state={state.focusOn('regulatoryReport')} label='regulatory report' mode={mode} />
  <LabelAndStringInput state={state.focusOn('mainCustomerName')} label='main customer name' mode={mode} />
  <LabelAndStringInput state={state.focusOn('jointCustomerName')} label='joint customer name' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('mainClientRef')} label='main client ref' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('jointClientRef')} label='joint client ref' mode={mode} />
  <Table state={state.focusOn('customerOccupationIncomeDetails')} order={['areYou','occupation']} mode={mode} />
</>)
}

export function OccupationIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({state,mode}: FocusedProps<S, OccupationIncomeDetailsDDDomain,Context>){
const areYouGuard = state.chainLens(Lenses.fromPath(["areYou"])).optJson();console.log('areYouGuard', areYouGuard)
  return(<>
  <LabelAndStringInput state={state.focusOn('areYou')} label='are you' mode={mode} />
  <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput state={state.focusOn('currentEmployment')} label='current employment' mode={mode} /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('occupation')} label='occupation' mode={mode} /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('customerDescription')} label='customer description' mode={mode} /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('ownShareOfTheCompany')} label='own share of the company' mode={mode} /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('owningSharesPct')} label='owning shares pct' mode={mode} /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('workFor')} label='work for' mode={mode} /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput state={state.focusOn('employmentType')} label='employment type' mode={mode} /></Guard>
  <LabelAndNumberInput state={state.focusOn('annualSalaryBeforeDeduction')} label='annual salary before deduction' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('annualIncomeExcludingRent')} label='annual income excluding rent' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('regularCommissionBonus')} label='regular commission bonus' mode={mode} />
  <LabelAndStringInput state={state.focusOn('dateOfEmploymentStart')} label='date of employment start' mode={mode} />
  <LabelAndStringInput state={state.focusOn('otherSourceOfIncome')} label='other source of income' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createdBy')} label='created by' mode={mode} />
  <LabelAndStringInput state={state.focusOn('createdDate')} label='created date' mode={mode} />
  <LabelAndStringInput state={state.focusOn('employerName')} label='employer name' mode={mode} />
  <LabelAndStringInput state={state.focusOn('whatTypeOfBusiness')} label='what type of business' mode={mode} />
  <LabelAndStringInput state={state.focusOn('whatNameBusiness')} label='what name business' mode={mode} />
  <LabelAndStringInput state={state.focusOn('establishedYear')} label='established year' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('annualDrawing3Yrs')} label='annual drawing3 yrs' mode={mode} />
  <LabelAndStringInput state={state.focusOn('empStartDate')} label='emp start date' mode={mode} />
  <LabelAndStringInput state={state.focusOn('empEndDate')} label='emp end date' mode={mode} />
  <LabelAndStringInput state={state.focusOn('sePositionHeld')} label='se position held' mode={mode} />
  <LabelAndStringInput state={state.focusOn('occupationCategory')} label='occupation category' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('empEmploymentSeq')} label='emp employment seq' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('empAppRoleSeq')} label='emp app role seq' mode={mode} />
  <LabelAndNumberInput state={state.focusOn('accountantAppRoleSeq')} label='accountant app role seq' mode={mode} />
</>)
}
