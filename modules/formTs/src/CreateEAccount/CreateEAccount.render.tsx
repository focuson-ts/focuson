import * as domain from '../CreateEAccount/CreateEAccount.domains';
import * as empty from '../CreateEAccount/CreateEAccount.empty';
import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { Radio } from '../copied/Radio';
import { LabelAndRadio } from '../copied/Radio';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {CreateEAccountPageDomain} from "../CreateEAccount/CreateEAccount.domains";
import {CreateEAccountDataDDDomain} from "../CreateEAccount/CreateEAccount.domains"
export function CreateEAccountPage(){
  return focusedPageWithExtraState<FState, CreateEAccountPageDomain, CreateEAccountDataDDDomain, Context> ( s => 'CreateEAccount' ) ( s => s.focusOn('editing')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  return (<Layout  details='[1][1][1][1]]'>
          <CreateEAccountDataDD id={`${id}`} state={state} mode={mode} />
          <button>cancel of type ResetStateButton cannot be created yet</button>
          <RestButton  id='createEAccounts'   name='createEAccounts' action='create' path={["CreateEAccount","editing"]} state={state} rest='CreateEAccount_ETransferDataDRestDetails' confirm={true} />
          <button>resetAll of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function CreateEAccountDataDD({id,state,mode}: FocusedProps<FState, CreateEAccountDataDDDomain,Context>){
  return(<>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' required={true} />
    <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='type' enums={{"savings":"Savings","checking":"Checking"}} />
    <Radio id={`${id}.savingsStyle`} state={state.focusOn('savingsStyle')} mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
    <LabelAndNumberInput id={`${id}.initialAmount`} state={state.focusOn('initialAmount')} mode={mode} label='initial amount' required={true} />
</>)
}
