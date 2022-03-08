import * as domains from './domains';
import * as empty from './empty';
import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { Table } from '../copied/table';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {ChequeCreditbooksPageDomain} from "./domains";
import {ChequeCreditbooksDDDomain} from "./domains"
import {ChequeCreditbooksHistoryLineDDDomain} from "./domains"
export function ChequeCreditbooksPage<S, Context extends FocusOnContext<S>>(){
  return focusedPageWithExtraState<S, ChequeCreditbooksPageDomain, ChequeCreditbooksDDDomain, Context> ( s => 'ChequeCreditbooks' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  return (<Layout  details='[1][2][2]'>
     <ChequeCreditbooksDD id='root' state={state}  mode={mode} />
     <button>chequeBook of type ResetStateButton cannot be created yet</button>
     <ModalButton id='orderNewBook' text='orderNewBook'  state={state} modal = 'OrderChequeBookOrPayingInModal'  focusOn={["ChequeCreditbooks","tempCreatePlan"]}  createEmpty={empty.emptyChequeCreditbooksHistoryLineDD}   pageMode='create'   rest={{"name":"ChequeCreditbooks_ChequeCreditbooksDDRestDetails","restAction":"create","path":["tempCreatePlan"]}} />
     <button>payingInBook of type ResetStateButton cannot be created yet</button>
   </Layout>)})}

export function ChequeCreditbooksDD<S, Context extends FocusOnContext<S>>({id,state,mode}: FocusedProps<S, ChequeCreditbooksDDDomain,Context>){
  return(<>
  <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["serialNumber","howOrdered","dateOrder"]} />
</>)
}

export function ChequeCreditbooksHistoryLineDD<S, Context extends FocusOnContext<S>>({id,state,mode}: FocusedProps<S, ChequeCreditbooksHistoryLineDDDomain,Context>){
  return(<>
  <LabelAndNumberInput id={`${id}.serialNumber`} state={state.focusOn('serialNumber')} mode={mode} label='serial number' required={true} />
  <LabelAndStringInput id={`${id}.howOrdered`} state={state.focusOn('howOrdered')} mode={mode} label='how ordered' required={true} />
  <LabelAndStringInput id={`${id}.dateOrder`} state={state.focusOn('dateOrder')} mode={mode} label='date order' required={true} />
</>)
}
