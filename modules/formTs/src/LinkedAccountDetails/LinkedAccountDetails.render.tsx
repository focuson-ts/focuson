import * as empty from '../LinkedAccountDetails/LinkedAccountDetails.empty';
import * as domain from '../LinkedAccountDetails/LinkedAccountDetails.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { LinkedAccountDetailsOptionals } from "../LinkedAccountDetails/LinkedAccountDetails.optionals";
import { LabelAndNumberInput } from '@focuson/form_components';
import { LabelAndDateInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndDropdown } from '@focuson/form_components';
import { Table } from '@focuson/form_components';
import { Layout } from '@focuson/form_components';
import {DeleteStateButton} from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {LinkedAccountDetailsPageDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains";
import {CollectionItemDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {CollectionsListDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {CollectionSummaryDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {CreatePaymentDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {LinkedAccountDetailsDisplayDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {MandateDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {MandateListDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {MandateSearchDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {OverpaymentHistoryDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {OverpaymentHistoryLineDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {OverpaymentPageDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
export function LinkedAccountDetailsPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/display
  return focusedPageWithExtraState<FState, LinkedAccountDetailsPageDomain, LinkedAccountDetailsDisplayDomain, Context> ( s => 'Linked Account Details' ) ( state => state.focusOn('display')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const haveLegalSelectedPaymentGuard = pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('selectedCollectionItem').focusOn('paymentId').optJson() !== undefined
  const allButtons =    {cancelPayment:<RestButton state={state} id={`${id}.cancelPayment`} enabledBy={haveLegalSelectedPaymentGuard} 
        name='cancelPayment'
        action={{"state":"cancel"}}
        deleteOnSuccess={["~/display/collectionSummary","~/display/collectionHistory","~/selectedCollectionIndex"]}
        rest='LinkedAccountDetails_CollectionItemRestDetails'
        confirm={"Really?"}
       />,
      createPayment:<ModalButton id={`${id}.createPayment`} text='createPayment'  state={state} modal = 'CreatePayment'  
        pageMode='create'
        focusOn='~/createPayment'
        copy={[{"from":"~/display/collectionSummary/allowance","to":"~/createPayment/allowance"},{"from":"~/display/collectionSummary/period","to":"~/createPayment/period"}]}
        createEmpty={empty.emptyCreatePayment}
         rest={{"name":"LinkedAccountDetails_CreatePaymentRestDetails","restAction":"create","deleteOnSuccess":["~/display/collectionSummary","~/display/collectionHistory"]}}
      />,
      refreshMandate:<DeleteStateButton  id={`${id}.refreshMandate`} states={[pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('display').focusOn('collectionSummary'),pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('display').focusOn('collectionHistory')]} label='Refresh Mandate' />,
      selectMandate:<ModalButton id={`${id}.selectMandate`} text='selectMandate'  state={state} modal = 'SelectMandate'  
        pageMode='edit'
        focusOn='~/selectMandateSearch'
        copy={[{"from":"~/display/mandate/sortCode","to":"~/selectMandateSearch/sortCode"},{"from":"~/display/mandate","to":"~/tempMandate"}]}
        copyOnClose={[{"from":"~/tempMandate","to":"~/display/mandate"}]}
      />,}

      return <>
          <LinkedAccountDetailsDisplay id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />
      { allButtons.selectMandate } 
      { allButtons.createPayment } 
      { allButtons.cancelPayment } 
      { allButtons.refreshMandate } 
      </>})}

export function CollectionItem({id,state,mode,allButtons,label}: FocusedProps<FState, CollectionItemDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.paymentId`} state={state.focusOn('paymentId')} mode={mode} label='Payment Id' allButtons={allButtons} required={true} />
    <LabelAndDateInput id={`${id}.collectionDate`} state={state.focusOn('collectionDate')} mode={mode} label='Collection Date' allButtons={allButtons} />
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Amount' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.status`} state={state.focusOn('status')} mode={mode} label='Status' allButtons={allButtons} required={true} />
</>
}

export function CollectionSummary({id,state,mode,allButtons,label}: FocusedProps<FState, CollectionSummaryDomain,Context>){
  return <Layout details='[[2,2]]'>
    <LabelAndStringInput id={`${id}.lastCollectionDate`} state={state.focusOn('lastCollectionDate')} mode={mode} label='Last Collection Date' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.lastCollectionAmount`} state={state.focusOn('lastCollectionAmount')} mode={mode} label='Last Collection Amount' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.nextCollectionDate`} state={state.focusOn('nextCollectionDate')} mode={mode} label='Next Collection Date' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.nextCollectionAmount`} state={state.focusOn('nextCollectionAmount')} mode={mode} label='Next Collection Amount' allButtons={allButtons} required={true} />
</Layout>
}

export function CreatePayment({id,state,mode,allButtons,label}: FocusedProps<FState, CreatePaymentDomain,Context>){
const reasonIsAllowanceGuard = state.focusOn('reason').optJson();
  return <>
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Amount' allButtons={allButtons} required={true} min={200} />
    <LabelAndNumberInput id={`${id}.otherAmount`} state={state.focusOn('otherAmount')} mode={mode} label='Other Amount' allButtons={allButtons} required={true} min={200} />
    <LabelAndDateInput id={`${id}.collectionDate`} state={state.focusOn('collectionDate')} mode={mode} label='Collection Date' allButtons={allButtons} />
    <LabelAndDropdown id={`${id}.reason`} state={state.focusOn('reason')} mode={mode} label='Reason' allButtons={allButtons} enums={{"A":"Allowance","O":"Overpayment"}} required={true} pleaseSelect='Seect...' />
    <Guard value={reasonIsAllowanceGuard} cond={["A"]}><LabelAndNumberInput id={`${id}.allowance`} state={state.focusOn('allowance')} mode={mode} label='Allowance' allButtons={allButtons} required={true} readonly={true} /></Guard>
    <Guard value={reasonIsAllowanceGuard} cond={["A"]}><LabelAndDropdown id={`${id}.period`} state={state.focusOn('period')} mode={mode} label='Period' allButtons={allButtons} enums={{"Monthly":"Monthly","Yearly":"Yearly"}} readonly={true} /></Guard>
</>
}

export function LinkedAccountDetailsDisplay({id,state,mode,allButtons,label}: FocusedProps<FState, LinkedAccountDetailsDisplayDomain,Context>){
  return <Layout details='[[1]]' displayAsCards={true}>
    <Mandate id={`${id}.mandate`} state={state.focusOn('mandate')} mode={mode} label='Mandate' allButtons={allButtons} />
    <CollectionSummary id={`${id}.collectionSummary`} state={state.focusOn('collectionSummary')} mode={mode} label='Collection Summary' allButtons={allButtons} />
    <Table id={`${id}.collectionHistory`} state={state.focusOn('collectionHistory')} mode={mode} order={["collectionDate","amount","status"]} copySelectedIndexTo={pageState(state)<any>().focusOn('selectedCollectionIndex')} copySelectedItemTo={pageState(state)<any>().focusOn('selectedCollectionItem')} />
</Layout>
}

export function Mandate({id,state,mode,allButtons,label}: FocusedProps<FState, MandateDomain,Context>){
  return <Layout details='[[3,3]]'>
    <LabelAndStringInput id={`${id}.sortCode`} state={state.focusOn('sortCode')} mode={mode} label='Sort Code' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.mandateStatus`} state={state.focusOn('mandateStatus')} mode={mode} label='Mandate Status' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.bankName`} state={state.focusOn('bankName')} mode={mode} label='Bank Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.accountName`} state={state.focusOn('accountName')} mode={mode} label='Account Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.mandateRef`} state={state.focusOn('mandateRef')} mode={mode} label='Mandate Ref' allButtons={allButtons} required={true} />
</Layout>
}

export function MandateSearch({id,state,mode,allButtons,label}: FocusedProps<FState, MandateSearchDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.sortCode`} state={state.focusOn('sortCode')} mode={mode} label='Sort Code' allButtons={allButtons} required={false} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["sortCode","accountId","bankName","accountName","mandateRef","mandateStatus"]} copySelectedItemTo={pageState(state)<any>().focusOn('tempMandate')} copySelectedIndexTo={pageState(state)<any>().focusOn('selectIndex')} prefixFilter={pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('selectMandateSearch').focusOn('sortCode')} prefixColumn='sortCode' />
</>
}

export function OverpaymentHistoryLine({id,state,mode,allButtons,label}: FocusedProps<FState, OverpaymentHistoryLineDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.amountReceived`} state={state.focusOn('amountReceived')} mode={mode} label='Amount Received' allButtons={allButtons} required={true} />
    <LabelAndDateInput id={`${id}.date`} state={state.focusOn('date')} mode={mode} label='Date' allButtons={allButtons} />
    <LabelAndDropdown id={`${id}.status`} state={state.focusOn('status')} mode={mode} label='Status' allButtons={allButtons} enums={{"COLLECTED":"COLLECTED","CANCELLED":"CANCELLED"}} />
</>
}

export function OverpaymentPage({id,state,mode,allButtons,label}: FocusedProps<FState, OverpaymentPageDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["amountReceived","date","status"]} />
    <LabelAndDateInput id={`${id}.drawDownDate`} state={state.focusOn('drawDownDate')} mode={mode} label='Draw Down Date' allButtons={allButtons} />
    <LabelAndNumberInput id={`${id}.initialBorrowing`} state={state.focusOn('initialBorrowing')} mode={mode} label='Initial Borrowing' allButtons={allButtons} required={true} />
</>
}
