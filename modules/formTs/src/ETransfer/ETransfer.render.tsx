import * as empty from '../ETransfer/ETransfer.empty';
import * as domain from '../ETransfer/ETransfer.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { ETransferOptionals } from "../ETransfer/ETransfer.optionals";
import { LabelAndNumberInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndRadio } from '@focuson/form_components';
import { Layout } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {ETransferPageDomain} from "../ETransfer/ETransfer.domains";
import {ETransferDataDDomain} from "../ETransfer/ETransfer.domains"
export function ETransferPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi
  return focusedPageWithExtraState<FState, ETransferPageDomain, ETransferDataDDomain, Context> ( s => 'E Transfer' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {cancel:<button>cancel of type ResetStateButton cannot be created yet</button>,
      eTransfers:<RestButton state={state} id={`${id}.eTransfers`} 
        name='eTransfers'
        action='create'
        rest='ETransfer_ETransferDataDRestDetails'
        confirm={true}
       />,
      resetAll:<button>resetAll of type ResetStateButton cannot be created yet</button>,}

      return <>
          <ETransferDataD id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.eTransfers } 
      { buttons.resetAll } 
      { buttons.cancel } 
      </>})}

export function ETransferDataD({id,state,mode,buttons}: FocusedProps<FState, ETransferDataDDomain,Context>){
  return <Layout details='[[1],[3,3],[1,1]]'>
    <LabelAndNumberInput id={`${id}.account`} state={state.focusOn('account')} mode={mode} label='Account Id' allButtons={buttons} required={true} min={0} max={99999999} />
    <LabelAndStringInput id={`${id}.dateOfETransfer`} state={state.focusOn('dateOfETransfer')} mode={mode} label='Date Of E Transfer' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='Description' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.fromAccount`} state={state.focusOn('fromAccount')} mode={mode} label='From Account' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndNumberInput id={`${id}.toAccount`} state={state.focusOn('toAccount')} mode={mode} label='To Account' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndNumberInput id={`${id}.monitoringAccount`} state={state.focusOn('monitoringAccount')} mode={mode} label='Monitoring Account' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='Type' allButtons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndNumberInput id={`${id}.balance`} state={state.focusOn('balance')} mode={mode} label='Balance' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.notes`} state={state.focusOn('notes')} mode={mode} label='Notes' allButtons={buttons} required={true} />
</Layout>
}
