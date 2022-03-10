import * as domain from '../ETransfer/ETransfer.domains';
import * as empty from '../ETransfer/ETransfer.empty';
import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { LabelAndRadio } from '../copied/Radio';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {ETransferPageDomain} from "../ETransfer/ETransfer.domains";
import {ETransferDataDDomain} from "../ETransfer/ETransfer.domains"
export function ETransferPage<S, Context extends FocusOnContext<S>>(){
  return focusedPageWithExtraState<S, ETransferPageDomain, ETransferDataDDomain, Context> ( s => 'ETransfer' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[3][1,1,1][1,1][1][3]'>
     <ETransferDataD id='root' state={state}  mode={mode} />
          <button>cancel of type ResetStateButton cannot be created yet</button>
          <RestButton  id='eTransfers'   name='eTransfers' action='create' path={["ETransfer"]} state={state} rest='ETransfer_ETransferDataDRestDetails' confirm={true} />
          <button>resetAll of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function ETransferDataD<S, Context extends FocusOnContext<S>>({id,state,mode}: FocusedProps<S, ETransferDataDDomain,Context>){
  return(<>
    <LabelAndNumberInput id={`${id}.account`} state={state.focusOn('account')} mode={mode} label='Account Id' required={true} min={10000000} max={99999999} />
    <LabelAndStringInput id={`${id}.dateOfETransfer`} state={state.focusOn('dateOfETransfer')} mode={mode} label='date of e transfer' required={true} />
    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' required={true} />
    <LabelAndNumberInput id={`${id}.fromAccount`} state={state.focusOn('fromAccount')} mode={mode} label='from account' required={true} min={10000000} max={99999999} />
    <LabelAndNumberInput id={`${id}.toAccount`} state={state.focusOn('toAccount')} mode={mode} label='to account' required={true} min={10000000} max={99999999} />
    <LabelAndNumberInput id={`${id}.monitoringAccount`} state={state.focusOn('monitoringAccount')} mode={mode} label='monitoring account' required={true} min={10000000} max={99999999} />
    <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='type' enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndNumberInput id={`${id}.balance`} state={state.focusOn('balance')} mode={mode} label='balance' required={true} />
    <LabelAndStringInput id={`${id}.notes`} state={state.focusOn('notes')} mode={mode} label='notes' required={true} />
</>)
}
