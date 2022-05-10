import * as empty from '../CreateEAccount/CreateEAccount.empty';
import * as domain from '../CreateEAccount/CreateEAccount.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { CreateEAccountOptionals } from "../CreateEAccount/CreateEAccount.optionals";
import { LabelAndNumberInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { Radio } from '@focuson/form_components';
import { LabelAndRadio } from '@focuson/form_components';
import {DeleteStateButton} from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {CreateEAccountPageDomain} from "../CreateEAccount/CreateEAccount.domains";
import {CreateEAccountDataDomain} from "../CreateEAccount/CreateEAccount.domains"
export function CreateEAccountPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/editing
  return focusedPageWithExtraState<FState, CreateEAccountPageDomain, CreateEAccountDataDomain, Context> ( s => 'Create E Account' ) ( state => state.focusOn('editing')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {cancel:<button>cancel of type ResetStateButton cannot be created yet</button>,
      createEAccounts:<RestButton state={state} id={`${id}.createEAccounts`} 
        name='createEAccounts'
        action={"create"}
        rest='CreateEAccount_CreateEAccountDataRestDetails'
        confirm={true}
       />,
      resetAll:<button>resetAll of type ResetStateButton cannot be created yet</button>,}

      return <>
          <CreateEAccountData id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.createEAccounts } 
      { buttons.resetAll } 
      { buttons.cancel } 
      </>})}

export function CreateEAccountData({id,state,mode,buttons}: FocusedProps<FState, CreateEAccountDataDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='Name' allButtons={buttons} required={true} />
    <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='Type' allButtons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
    <Radio id={`${id}.savingsStyle`} state={state.focusOn('savingsStyle')} mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
    <LabelAndNumberInput id={`${id}.initialAmount`} state={state.focusOn('initialAmount')} mode={mode} label='Initial Amount' allButtons={buttons} required={true} />
</>
}
