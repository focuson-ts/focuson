import * as empty from '../ListOfPaymentsPage/ListOfPaymentsPage.empty';
import * as domain from '../ListOfPaymentsPage/ListOfPaymentsPage.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { ListOfPaymentsPageOptionals } from "../ListOfPaymentsPage/ListOfPaymentsPage.optionals";
import { LabelAndBooleanInput } from '@focuson/form_components';
import { LabelAndDropdown } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { NumberInput } from '@focuson/form_components';
import { BooleanInput } from '@focuson/form_components';
import { SelectedItem } from '@focuson/form_components';
import { Layout } from '@focuson/form_components';
import { TwoElementWithTitleLayout } from '@focuson/form_components';
import {DeleteStateButton} from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {ListOfPaymentsPagePageDomain} from "../ListOfPaymentsPage/ListOfPaymentsPage.domains";
import {ListOfPaymentsDomain} from "../ListOfPaymentsPage/ListOfPaymentsPage.domains"
import {PrintRecordHistoryDomain} from "../ListOfPaymentsPage/ListOfPaymentsPage.domains"
import {PrintRecordItemDomain} from "../ListOfPaymentsPage/ListOfPaymentsPage.domains"
import {RequesterDetailsDomain} from "../ListOfPaymentsPage/ListOfPaymentsPage.domains"
import {SinglePrintDomain} from "../ListOfPaymentsPage/ListOfPaymentsPage.domains"
export function ListOfPaymentsPagePage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/display
  return focusedPageWithExtraState<FState, ListOfPaymentsPagePageDomain, PrintRecordHistoryDomain, Context> ( s => 'List Of Payments Page' ) ( state => state.focusOn('display')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const allButtons =    {add:<ModalButton id={`${id}.add`} text='add'  state={state} modal = 'EditListOfPayments'  
        pageMode='create'
        focusOn='~/tempListOfPayments'
        copy={[{"from":"~/display[~/selected]"}]}
        copyOnClose={[{"to":"~/display[$append]"}]}
      />,
      next:<ListNextButton id={`${id}.next`} title='Next' list={pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('display')} value={pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('selected')} />,
      prev:<ListPrevButton id={`${id}.prev`} title='Prev' list={pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('display')} value={pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('selected')} />,}

      return <>
          <SelectedItem id={`${id}`} state={state} mode={mode} allButtons={allButtons} index={pageState(state)<domain.ListOfPaymentsPagePageDomain>().focusOn('selected').json()} display={PrintRecordItem} />
      { allButtons.prev } 
      { allButtons.next } 
      { allButtons.add } 
      </>})}

export function ListOfPayments({id,state,mode,allButtons,label}: FocusedProps<FState, ListOfPaymentsDomain,Context>){
  return <Layout details='[[5,1]]'>
    <SinglePrint id={`${id}.standingOrders`} state={state.focusOn('standingOrders')} mode={mode} label='Standing Orders' allButtons={allButtons} />
    <SinglePrint id={`${id}.openBankingStandingOrders`} state={state.focusOn('openBankingStandingOrders')} mode={mode} label='Open Banking Standing Orders' allButtons={allButtons} />
    <SinglePrint id={`${id}.directDebits`} state={state.focusOn('directDebits')} mode={mode} label='Direct Debits' allButtons={allButtons} />
    <SinglePrint id={`${id}.billPayments`} state={state.focusOn('billPayments')} mode={mode} label='Bill Payments' allButtons={allButtons} />
    <SinglePrint id={`${id}.openBanking`} state={state.focusOn('openBanking')} mode={mode} label='Open Banking' allButtons={allButtons} />
</Layout>
}

export function PrintRecordItem({id,state,mode,allButtons,label}: FocusedProps<FState, PrintRecordItemDomain,Context>){
const alreadyPrintedGuard =  state.focusOn('alreadyPrinted').optJson() === true;
const requestedByGuard = state.focusOn('requestedBy').optJson();
//added by sealed: "alreadyPrinted" in component PrintRecordItem. If it doesn't compile check the name and type of the guard variable named
if (alreadyPrintedGuard) mode='view'
  return <Layout details='[[1,1],[1,3]]'>
    <LabelAndStringInput id={`${id}.requestedBy`} state={state.focusOn('requestedBy')} mode={mode} label='Requested By' allButtons={allButtons} required={true} />
    <Guard value={requestedByGuard} cond={["m","j"]}><RequesterDetails id={`${id}.requesterDetails`} state={state.focusOn('requesterDetails')} mode={mode} label='Requester Details' allButtons={allButtons} /></Guard>
    <ListOfPayments id={`${id}.listOfPayments`} state={state.focusOn('listOfPayments')} mode={mode} label='List Of Payments' allButtons={allButtons} />
    <LabelAndBooleanInput id={`${id}.includeSingleAndInitialDirectDebits`} state={state.focusOn('includeSingleAndInitialDirectDebits')} mode={mode} label='Include Single And Initial Direct Debits' allButtons={allButtons} />
    <Guard value={requestedByGuard} cond={["m","j"]}><LabelAndDropdown id={`${id}.authorisedByCustomer`} state={state.focusOn('authorisedByCustomer')} mode={mode} label='Authorised By Customer' allButtons={allButtons} enums={{"n":"no","notyet":"Not Yet","y":"Yes"}} /></Guard>
    <LabelAndBooleanInput id={`${id}.alreadyPrinted`} state={state.focusOn('alreadyPrinted')} mode={mode} label='Already Printed' allButtons={allButtons} />
</Layout>
}

export function RequesterDetails({id,state,mode,allButtons,label}: FocusedProps<FState, RequesterDetailsDomain,Context>){
  return <Layout details='[[1,1,1], [1], [1], [1], [1,1], [1,1]]'>
    <LabelAndStringInput id={`${id}.title`} state={state.focusOn('title')} mode={mode} label='Title' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.forename`} state={state.focusOn('forename')} mode={mode} label='Forename' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.surname`} state={state.focusOn('surname')} mode={mode} label='Surname' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.phone`} state={state.focusOn('phone')} mode={mode} label='Phone' allButtons={allButtons} required={true} readonly={true} />
    <LabelAndStringInput id={`${id}.fax`} state={state.focusOn('fax')} mode={mode} label='Fax' allButtons={allButtons} required={true} readonly={true} />
</Layout>
}

export function SinglePrint({id,state,mode,allButtons,label}: FocusedProps<FState, SinglePrintDomain,Context>){
  return <TwoElementWithTitleLayout title={label}>
    <BooleanInput id={`${id}.shouldPrint`} state={state.focusOn('shouldPrint')} mode={mode} />
    <NumberInput id={`${id}.numberOfItems`} state={state.focusOn('numberOfItems')} mode={mode} required={true} readonly={true} />
</TwoElementWithTitleLayout>
}
