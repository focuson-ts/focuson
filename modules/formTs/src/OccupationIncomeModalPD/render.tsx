import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import {OccupationIncomeDetailsDDDomain} from '../OccupationAndIncomeSummary/domains'
import {OccupationIncomeDetailsDD} from '../OccupationAndIncomeSummary/render'
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
export function OccupationIncomeModalPDPage<S, Context extends FocusOnContext<S>>(){
  return focusedPage<S, OccupationIncomeDetailsDDDomain, Context> ( s => '' ) (
     ( state, d, mode ) => {
          return (<Layout  details='[3]'>
               <OccupationIncomeDetailsDD id='root' state={state}  mode={mode} />
               <ModalCancelButton id='cancel' state={state} />
               <ModalCommitButton id='commit' validate={true} state={state} />
     <ValidationButton  id='validate'   name='validate'  />
            </Layout>)})}
