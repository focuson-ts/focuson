import * as empty from '../JointAccount/JointAccount.empty';
import * as domain from '../JointAccount/JointAccount.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { JointAccountOptionals } from "../JointAccount/JointAccount.optionals";
import { LabelAndNumberInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { Table } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {JointAccountPageDomain} from "../JointAccount/JointAccount.domains";
import {JointAccountDomain} from "../JointAccount/JointAccount.domains"
import {JointAccountAddressDomain} from "../JointAccount/JointAccount.domains"
import {JointAccountAddressesDomain} from "../JointAccount/JointAccount.domains"
import {JointAccountCustomerDomain} from "../JointAccount/JointAccount.domains"
export function JointAccountPage(){
//A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi
  return focusedPageWithExtraState<FState, JointAccountPageDomain, JointAccountDomain, Context> ( s => 'Joint Account' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {edit:<ModalButton id={`${id}.edit`} text='edit'  state={state} modal = 'JointAccountEditModalPage'  
        pageMode='edit'
        focusOn='#selectedAccount'
      />,
      toggle:<ToggleButton id={`${id}.toggle`} state={fullState.focusOn('joint')}
        buttonText='Toggle [{~/joint}]'
         />,}

      return <>
          <JointAccount id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.toggle } 
      { buttons.edit } 
      </>})}

export function JointAccount({id,state,mode,buttons}: FocusedProps<FState, JointAccountDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.balance`} state={state.focusOn('balance')} mode={mode} label='Balance' allButtons={buttons} required={true} />
    <JointAccountCustomer id={`${id}.main`} state={state.focusOn('main')} mode={mode} buttons={buttons} />
    <JointAccountCustomer id={`${id}.joint`} state={state.focusOn('joint')} mode={mode} buttons={buttons} />
</>
}

export function JointAccountAddress({id,state,mode,buttons}: FocusedProps<FState, JointAccountAddressDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='Line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='Line2' allButtons={buttons} required={true} />
</>
}

export function JointAccountCustomer({id,state,mode,buttons}: FocusedProps<FState, JointAccountCustomerDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='Name' allButtons={buttons} required={true} />
    <Table id={`${id}.addresses`} state={state.focusOn('addresses')} mode={mode} order={["line1","line2"]} />
</>
}
