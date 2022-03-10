import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import {ChequeCreditbooksHistoryLineDDDomain} from '../ChequeCreditbooks/ChequeCreditbooks.domains'; 
import {ChequeCreditbooksHistoryLineDD} from '../ChequeCreditbooks/ChequeCreditbooks.render'
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
export function OrderChequeBookOrPayingInModalPage<S, Context extends FocusOnContext<S>>(){
  return focusedPage<S, ChequeCreditbooksHistoryLineDDDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <ChequeCreditbooksHistoryLineDD id='root' state={state}  mode={mode} />
                    <ModalCancelButton id='cancel' state={state} />
                    <ModalCommitButton id='commit'  state={state} />
            </Layout>)})}
