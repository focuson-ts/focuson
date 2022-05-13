import * as empty from '../LinkedAccountDetails/LinkedAccountDetails.empty';
import * as domain from '../LinkedAccountDetails/LinkedAccountDetails.domains';
import * as render from "./LinkedAccountDetails.render";
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import {CreatePaymentDomain} from '../LinkedAccountDetails/LinkedAccountDetails.domains'; 
import {CreatePayment} from '../LinkedAccountDetails/LinkedAccountDetails.render'
import {DeleteStateButton} from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
export function CreatePaymentPage(){
  return focusedPage<FState, CreatePaymentDomain, Context> ( s =>  'Create Payment' ) (//If there is a compilation here have you added this to the 'domain' of the main page
     ( state, d, mode, index ) => {
          const amountEnoughGuard =  pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('createPayment').focusOn('otherAmount').optJsonOr(Number.MAX_VALUE) <  pageState(state)<domain.LinkedAccountDetailsPageDomain>().focusOn('createPayment').focusOn('amount').optJsonOr(Number.MIN_VALUE);
          const id=`page${index}`;
          const allButtons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state} />,
              commit:<ModalCommitButton id={`${id}.commit`} enabledBy={amountEnoughGuard}   state={state} />,
              overpaymentHistory:<ModalButton id={`${id}.overpaymentHistory`} text='overpaymentHistory'  state={state} modal = 'OverpaymentModalPage'  
                pageMode='view'
                focusOn='~/overpayment'
              />,}
          return <>
          <CreatePayment id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />
          { allButtons.cancel } 
          { allButtons.commit } 
          { allButtons.overpaymentHistory } 
          </>})}