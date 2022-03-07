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
     <OccupationAndIncomeDetailsDD id='root' state={state}  mode={mode} />
     <ModalButton id='addEntry' text='addEntry'  state={state} modal = 'OccupationIncomeModalPD'  focusOn={["OccupationAndIncomeSummary","temp"]}  copyOnClose={["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails","[append]"]}createEmpty={empty.emptyOccupationIncomeDetailsDD}  setToLengthOnClose={{"array":["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails"],"variable":["OccupationAndIncomeSummary","selectedItem"]}} pageMode='create'   />
     <ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModalPD'  focusOn={["OccupationAndIncomeSummary","temp"]} copyFrom={["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails","{selectedItem}"]} copyOnClose={["OccupationAndIncomeSummary","fromApi","customerOccupationIncomeDetails","{selectedItem}"]}   pageMode='edit'   />
     <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />
     <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />
   </Layout>)})}

export function OccupationIncomeModalPDPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPage<S, OccupationIncomeDetailsDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <OccupationIncomeDetailsDD id='root' state={state}  mode={mode} />
               <ModalCancelButton id='cancel' state={state} />
               <ModalCommitButton id='commit' state={state} />
            </Layout>)})}

export function EAccountsSummaryPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, EAccountsSummaryPageDomain, EAccountsSummaryDDDomain, Context> ( s => 'EAccountsSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][3,3][5]'>
     <EAccountsSummaryDD id='root' state={state}  mode={mode} />
     <ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  focusOn={["EAccountsSummary","tempCreatePlan"]} copyFrom={["EAccountsSummary","fromApi","createPlan"]}    pageMode='edit'   rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"update","path":["EAccountsSummary"]}} />
     <ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  focusOn={["EAccountsSummary","tempCreatePlan"]}  createEmpty={empty.emptyCreatePlanDD}   pageMode='create'   rest={{"name":"EAccountsSummary_CreatePlanDDRestDetails","restAction":"create","path":["EAccountsSummary"]}} />
     <RestButton  id='deleteExistingPlan'   name='deleteExistingPlan' action='delete' state={state}rest='EAccountsSummary_CreatePlanDDRestDetails' confirm={true} />
     <button>refresh of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function CreatePlanPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPage<S, CreatePlanDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <CreatePlanDD id='root' state={state}  mode={mode} />
               <ModalCancelButton id='cancel' state={state} />
               <ModalCommitButton id='commit' state={state} />
            </Layout>)})}

export function ETransferPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, ETransferPageDomain, ETransferDataDDomain, Context> ( s => 'ETransfer' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[3][1,1,1][1,1][1][3]'>
     <ETransferDataD id='root' state={state}  mode={mode} />
     <button>cancel of type ResetStateButton cannot be created yet</button>
     <RestButton  id='eTransfers'   name='eTransfers' action='create' state={state}rest='ETransfer_ETransferDataDRestDetails' confirm={true} />
     <button>resetAll of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function CreateEAccountPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, CreateEAccountPageDomain, CreateEAccountDataDDDomain, Context> ( s => 'CreateEAccount' ) ( s => s.focusOn('editing')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][1][1][1]]'>
     <CreateEAccountDataDD id='root' state={state}  mode={mode} />
     <button>cancel of type ResetStateButton cannot be created yet</button>
     <RestButton  id='eTransfers'   name='eTransfers' action='create' state={state}rest='CreateEAccount_ETransferDataDRestDetails' confirm={true} />
     <button>resetAll of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function ChequeCreditbooksPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPageWithExtraState<S, ChequeCreditbooksPageDomain, ChequeCreditbooksDDDomain, Context> ( s => 'ChequeCreditbooks' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][2][2]'>
     <ChequeCreditbooksDD id='root' state={state}  mode={mode} />
     <button>chequeBook of type ResetStateButton cannot be created yet</button>
     <ModalButton id='orderNewBook' text='orderNewBook'  state={state} modal = 'OrderChequeBookOrPayingInModal'  focusOn={["ChequeCreditbooks","tempCreatePlan"]}  createEmpty={empty.emptyChequeCreditbooksHistoryLineDD}   pageMode='create'   rest={{"name":"ChequeCreditbooks_ChequeCreditbooksDDRestDetails","restAction":"create","path":["tempCreatePlan"]}} />
     <button>payingInBook of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function OrderChequeBookOrPayingInModalPage<S, Context extends PageSelectionAndRestCommandsContext<S>>(){
  return focusedPage<S, ChequeCreditbooksHistoryLineDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <ChequeCreditbooksHistoryLineDD id='root' state={state}  mode={mode} />
               <ModalCancelButton id='cancel' state={state} />
               <ModalCommitButton id='commit' state={state} />
            </Layout>)})}

export function ChequeCreditbooksDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, ChequeCreditbooksDDDomain,Context>){
  return(<>
  <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["serialNumber","howOrdered","dateOrder"]} />
</>)
}

export function ChequeCreditbooksHistoryLineDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, ChequeCreditbooksHistoryLineDDDomain,Context>){
  return(<>
  <LabelAndNumberInput id={`${id}.serialNumber`} state={state.focusOn('serialNumber')} mode={mode} label='serial number' />
  <LabelAndStringInput id={`${id}.howOrdered`} state={state.focusOn('howOrdered')} mode={mode} label='how ordered' />
  <LabelAndStringInput id={`${id}.dateOrder`} state={state.focusOn('dateOrder')} mode={mode} label='date order' />
</>)
}

export function CreateEAccountDataDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, CreateEAccountDataDDDomain,Context>){
  return(<>
  <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' />
  <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='type' enums={{"savings":"Savings","checking":"Checking"}} />
  <Radio id={`${id}.savingsStyle`} state={state.focusOn('savingsStyle')} mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
  <LabelAndNumberInput id={`${id}.initialAmount`} state={state.focusOn('initialAmount')} mode={mode} label='initial amount' />
</>)
}

export function CreatePlanDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, CreatePlanDDDomain,Context>){
  return(<>
  <LabelAndStringInput id={`${id}.createPlanStart`} state={state.focusOn('createPlanStart')} mode={mode} label='Create Start' />
  <LabelAndStringInput id={`${id}.createPlanDate`} state={state.focusOn('createPlanDate')} mode={mode} label='create plan date' ariaLabel='The Create Plan Date' />
  <LabelAndStringInput id={`${id}.createPlanEnd`} state={state.focusOn('createPlanEnd')} mode={mode} label='create plan end' />
</>)
}

export function EAccountsSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, EAccountsSummaryDDDomain,Context>){
  return(<>
  <LabelAndBooleanInput id={`${id}.useEStatements`} state={state.focusOn('useEStatements')} mode={mode} label='use e statements' />
  <Table id={`${id}.eAccountsTable`} state={state.focusOn('eAccountsTable')} mode={mode} order={["accountId","displayType","description","virtualBankSeq","frequency","total"]} />
  <LabelAndNumberInput id={`${id}.totalMonthlyCost`} state={state.focusOn('totalMonthlyCost')} mode={mode} label='total monthly cost' />
  <LabelAndNumberInput id={`${id}.oneAccountBalance`} state={state.focusOn('oneAccountBalance')} mode={mode} label='one account balance' />
  <LabelAndNumberInput id={`${id}.currentAccountBalance`} state={state.focusOn('currentAccountBalance')} mode={mode} label='current account balance' />
  <LabelAndStringInput id={`${id}.createPlan.createPlanStart`} state={state.focusOn('createPlan').focusOn('createPlanStart')} mode={mode} label='Create Start' />
  <LabelAndStringInput id={`${id}.createPlan.createPlanDate`} state={state.focusOn('createPlan').focusOn('createPlanDate')} mode={mode} label='create plan date' ariaLabel='The Create Plan Date' />
  <LabelAndStringInput id={`${id}.createPlan.createPlanEnd`} state={state.focusOn('createPlan').focusOn('createPlanEnd')} mode={mode} label='create plan end' />
</>)
}

export function EAccountSummaryDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, EAccountSummaryDDDomain,Context>){
  return(<>
  <LabelAndStringInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' />
  <LabelAndRadio id={`${id}.displayType`} state={state.focusOn('displayType')} mode={mode} label='display type' enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' />
  <LabelAndStringInput id={`${id}.virtualBankSeq`} state={state.focusOn('virtualBankSeq')} mode={mode} label='virtual bank seq' />
  <LabelAndNumberInput id={`${id}.total`} state={state.focusOn('total')} mode={mode} label='total' />
  <LabelAndStringInput id={`${id}.frequency`} state={state.focusOn('frequency')} mode={mode} label='Frequency/Amount' />
</>)
}

export function ETransferDataD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, ETransferDataDDomain,Context>){
  return(<>
  <LabelAndStringInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Account Id' />
  <LabelAndStringInput id={`${id}.dateOfETransfer`} state={state.focusOn('dateOfETransfer')} mode={mode} label='date of e transfer' />
  <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' />
  <LabelAndStringInput id={`${id}.fromAccount`} state={state.focusOn('fromAccount')} mode={mode} label='from account' />
  <LabelAndStringInput id={`${id}.toAccount`} state={state.focusOn('toAccount')} mode={mode} label='to account' />
  <LabelAndStringInput id={`${id}.monitoringAccount`} state={state.focusOn('monitoringAccount')} mode={mode} label='monitoring account' />
  <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='type' enums={{"savings":"Savings","checking":"Checking"}} />
  <LabelAndNumberInput id={`${id}.balance`} state={state.focusOn('balance')} mode={mode} label='balance' />
  <LabelAndStringInput id={`${id}.notes`} state={state.focusOn('notes')} mode={mode} label='notes' />
</>)
}

export function OccupationAndIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, OccupationAndIncomeDetailsDDDomain,Context>){
  return(<>
  <LabelAndStringInput id={`${id}.mainCustomerName`} state={state.focusOn('mainCustomerName')} mode={mode} label='main customer name' />
  <SelectedItem id={`${id}.customerOccupationIncomeDetails`} state={state.focusOn('customerOccupationIncomeDetails')} mode={mode} index={pageState(state).focusOn('selectedItem').json()} display={OccupationIncomeDetailsDD} />
</>)
}

export function OccupationIncomeDetailsDD<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, OccupationIncomeDetailsDDDomain,Context>){
const areYouGuard = state.chainLens(Lenses.fromPath(["areYou"])).optJson();console.log('areYouGuard', areYouGuard)
  return(<>
  <LabelAndStringInput id={`${id}.areYou`} state={state.focusOn('areYou')} mode={mode} label='are you' />
  <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.currentEmployment`} state={state.focusOn('currentEmployment')} mode={mode} label='current employment' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.occupation`} state={state.focusOn('occupation')} mode={mode} label='occupation' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.customerDescription`} state={state.focusOn('customerDescription')} mode={mode} label='customer description' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.ownShareOfTheCompany`} state={state.focusOn('ownShareOfTheCompany')} mode={mode} label='own share of the company' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.owningSharesPct`} state={state.focusOn('owningSharesPct')} mode={mode} label='owning shares pct' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.workFor`} state={state.focusOn('workFor')} mode={mode} label='work for' /></Guard>
  <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.employmentType`} state={state.focusOn('employmentType')} mode={mode} label='employment type' /></Guard>
  <LabelAndNumberInput id={`${id}.annualSalaryBeforeDeduction`} state={state.focusOn('annualSalaryBeforeDeduction')} mode={mode} label='annual salary before deduction' />
  <LabelAndNumberInput id={`${id}.annualIncomeExcludingRent`} state={state.focusOn('annualIncomeExcludingRent')} mode={mode} label='annual income excluding rent' />
  <LabelAndNumberInput id={`${id}.regularCommissionBonus`} state={state.focusOn('regularCommissionBonus')} mode={mode} label='regular commission bonus' />
  <LabelAndStringInput id={`${id}.dateOfEmploymentStart`} state={state.focusOn('dateOfEmploymentStart')} mode={mode} label='date of employment start' />
  <LabelAndStringInput id={`${id}.otherSourceOfIncome`} state={state.focusOn('otherSourceOfIncome')} mode={mode} label='other source of income' />
  <LabelAndStringInput id={`${id}.createdBy`} state={state.focusOn('createdBy')} mode={mode} label='created by' />
  <LabelAndStringInput id={`${id}.createdDate`} state={state.focusOn('createdDate')} mode={mode} label='created date' />
  <LabelAndStringInput id={`${id}.employerName`} state={state.focusOn('employerName')} mode={mode} label='employer name' />
  <LabelAndStringInput id={`${id}.whatTypeOfBusiness`} state={state.focusOn('whatTypeOfBusiness')} mode={mode} label='what type of business' />
  <LabelAndStringInput id={`${id}.whatNameBusiness`} state={state.focusOn('whatNameBusiness')} mode={mode} label='what name business' />
  <LabelAndStringInput id={`${id}.establishedYear`} state={state.focusOn('establishedYear')} mode={mode} label='established year' />
  <LabelAndNumberInput id={`${id}.annualDrawing3Yrs`} state={state.focusOn('annualDrawing3Yrs')} mode={mode} label='annual drawing3 yrs' />
  <LabelAndStringInput id={`${id}.empStartDate`} state={state.focusOn('empStartDate')} mode={mode} label='emp start date' />
  <LabelAndStringInput id={`${id}.empEndDate`} state={state.focusOn('empEndDate')} mode={mode} label='emp end date' />
  <LabelAndStringInput id={`${id}.sePositionHeld`} state={state.focusOn('sePositionHeld')} mode={mode} label='se position held' />
  <LabelAndStringInput id={`${id}.occupationCategory`} state={state.focusOn('occupationCategory')} mode={mode} label='occupation category' />
  <LabelAndNumberInput id={`${id}.empEmploymentSeq`} state={state.focusOn('empEmploymentSeq')} mode={mode} label='emp employment seq' />
  <LabelAndNumberInput id={`${id}.empAppRoleSeq`} state={state.focusOn('empAppRoleSeq')} mode={mode} label='emp app role seq' />
  <LabelAndNumberInput id={`${id}.accountantAppRoleSeq`} state={state.focusOn('accountantAppRoleSeq')} mode={mode} label='accountant app role seq' />
</>)
}
