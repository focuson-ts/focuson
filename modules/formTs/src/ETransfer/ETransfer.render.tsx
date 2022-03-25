import * as domain from '../ETransfer/ETransfer.domains';
import * as empty from '../ETransfer/ETransfer.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
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
  return focusedPageWithExtraState<FState, ETransferPageDomain, ETransferDataDDomain, Context> ( s => 'ETransfer' ) ( s => sstate: pageState - ~/fromApi) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {cancel:<button>cancel of type ResetStateButton cannot be created yet</button>,
      eTransfers:<RestButton state={state}
        id='eTransfers'
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
    <LabelAndStringInput id={`${id}.dateOfETransfer`} state={state.focusOn('dateOfETransfer')} mode={mode} label='date of e transfer' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.description`} state={state.focusOn('description')} mode={mode} label='description' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.fromAccount`} state={state.focusOn('fromAccount')} mode={mode} label='from account' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndNumberInput id={`${id}.toAccount`} state={state.focusOn('toAccount')} mode={mode} label='to account' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndNumberInput id={`${id}.monitoringAccount`} state={state.focusOn('monitoringAccount')} mode={mode} label='monitoring account' allButtons={buttons} required={true} min={10000000} max={99999999} />
    <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='type' allButtons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndNumberInput id={`${id}.balance`} state={state.focusOn('balance')} mode={mode} label='balance' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.notes`} state={state.focusOn('notes')} mode={mode} label='notes' allButtons={buttons} required={true} />
</Layout>
}
