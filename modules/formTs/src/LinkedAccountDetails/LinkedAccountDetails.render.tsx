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
import {LinkedAccountDetailsDisplayDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {MandateDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {MandateListDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
import {MandateSearchDomain} from "../LinkedAccountDetails/LinkedAccountDetails.domains"
export function LinkedAccountDetailsPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/display
  return focusedPageWithExtraState<FState, LinkedAccountDetailsPageDomain, LinkedAccountDetailsDisplayDomain, Context> ( s => 'Linked Account Details' ) ( state => state.focusOn('display')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {cancelPayment:<RestButton state={state} id={`${id}.cancelPayment`} 
        name='cancelPayment'
        action={{"state":"cancel"}}
        deleteOnSuccess={""}
        rest='LinkedAccountDetails_CollectionItemRestDetails'
       />,
      selectMandate:<ModalButton id={`${id}.selectMandate`} text='selectMandate'  state={state} modal = 'SelectMandate'  
        pageMode='edit'
        focusOn='~/selectMandateSearch'
        copy={[{"from":"~/display/mandate/sortCode","to":"~/selectMandateSearch/sortCode"},{"from":"~/display/mandate","to":"~/tempMandate"}]}
        copyOnClose={[{"from":"~/tempMandate","to":"~/display/mandate"}]}
      />,}

      return <>
          <LinkedAccountDetailsDisplay id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.selectMandate } 
      { buttons.cancelPayment } 
      </>})}

export function CollectionItem({id,state,mode,buttons}: FocusedProps<FState, CollectionItemDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.paymentId`} state={state.focusOn('paymentId')} mode={mode} label='Payment Id' allButtons={buttons} required={true} />
    <LabelAndDateInput id={`${id}.collectionDate`} state={state.focusOn('collectionDate')} mode={mode} label='Collection Date' allButtons={buttons} />
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Amount' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.status`} state={state.focusOn('status')} mode={mode} label='Status' allButtons={buttons} required={true} />
</>
}

export function CollectionSummary({id,state,mode,buttons}: FocusedProps<FState, CollectionSummaryDomain,Context>){
  return <Layout details='[[2,2]]'>
    <LabelAndStringInput id={`${id}.lastCollectionDate`} state={state.focusOn('lastCollectionDate')} mode={mode} label='Last Collection Date' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.lastCollectionAmount`} state={state.focusOn('lastCollectionAmount')} mode={mode} label='Last Collection Amount' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.nextCollectionDate`} state={state.focusOn('nextCollectionDate')} mode={mode} label='Next Collection Date' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.nextCollectionAmount`} state={state.focusOn('nextCollectionAmount')} mode={mode} label='Next Collection Amount' allButtons={buttons} required={true} />
</Layout>
}

export function LinkedAccountDetailsDisplay({id,state,mode,buttons}: FocusedProps<FState, LinkedAccountDetailsDisplayDomain,Context>){
  return <Layout details='[[1]]'>
    <Mandate id={`${id}.mandate`} state={state.focusOn('mandate')} mode={mode} buttons={buttons} />
    <CollectionSummary id={`${id}.collectionSummary`} state={state.focusOn('collectionSummary')} mode={mode} buttons={buttons} />
    <Table id={`${id}.collectionHistory`} state={state.focusOn('collectionHistory')} mode={mode} order={["collectionDate","amount","status"]} copySelectedIndexTo={pageState(state)<any>().focusOn('selectedCollectionIndex')} copySelectedItemTo={pageState(state)<any>().focusOn('selectedCollectionItem')} />
</Layout>
}

export function Mandate({id,state,mode,buttons}: FocusedProps<FState, MandateDomain,Context>){
  return <Layout details='[[3,3]]'>
    <LabelAndStringInput id={`${id}.sortCode`} state={state.focusOn('sortCode')} mode={mode} label='Sort Code' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.accountId`} state={state.focusOn('accountId')} mode={mode} label='Account Id' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.mandateStatus`} state={state.focusOn('mandateStatus')} mode={mode} label='Mandate Status' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.bankName`} state={state.focusOn('bankName')} mode={mode} label='Bank Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.accountName`} state={state.focusOn('accountName')} mode={mode} label='Account Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.mandateRef`} state={state.focusOn('mandateRef')} mode={mode} label='Mandate Ref' allButtons={buttons} required={true} />
</Layout>
}

export function MandateSearch({id,state,mode,buttons}: FocusedProps<FState, MandateSearchDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.sortCode`} state={state.focusOn('sortCode')} mode={mode} label='Sort Code' allButtons={buttons} required={true} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["sortCode","accountId","bankName","accountName","mandateRef","mandateStatus"]} copySelectedItemTo={pageState(state)<any>().focusOn('tempMandate')} copySelectedIndexTo={pageState(state)<any>().focusOn('selectIndex')} prefixFilter={pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('selectMandateSearch').focusOn('sortCode')} prefixColumn='sortCode' />
</>
}
