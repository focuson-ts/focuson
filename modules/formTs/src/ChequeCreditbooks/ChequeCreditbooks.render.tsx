import * as domain from '../ChequeCreditbooks/ChequeCreditbooks.domains';
import * as empty from '../ChequeCreditbooks/ChequeCreditbooks.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { ChequeCreditbooksOptionals } from "../ChequeCreditbooks/ChequeCreditbooks.optionals";
import { Table } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndNumberInput } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {ChequeCreditbooksPageDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains";
import {ChequeCreditbooksDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import {ChequeCreditbooksHistoryDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import {ChequeCreditbooksHistoryLineDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
export function ChequeCreditbooksPage(){
  return focusedPageWithExtraState<FState, ChequeCreditbooksPageDomain, ChequeCreditbooksDomain, Context> ( s => 'Cheque Creditbooks' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {chequeBook:<button>chequeBook of type ResetStateButton cannot be created yet</button>,
      orderNewBook:<ModalButton id='orderNewBook' text='orderNewBook'  state={state} modal = 'OrderChequeBookOrPayingInModal'  
        pageMode='create'
        focusOn='~/tempCreatePlan'
        pageParams={{"position":{"top":123}}}
        createEmpty={empty.emptyChequeCreditbooksHistoryLine}
         rest={{"name":"ChequeCreditbooks__ChequeCreditbooksRestDetails","restAction":"create"}}
      />,
      payingInBook:<button>payingInBook of type ResetStateButton cannot be created yet</button>,}

      return <>
          <ChequeCreditbooks id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.chequeBook } 
      { buttons.payingInBook } 
      { buttons.orderNewBook } 
      </>})}

export function ChequeCreditbooks({id,state,mode,buttons}: FocusedProps<FState, ChequeCreditbooksDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["serialNumber","howOrdered","dateOrder"]} />
</>
}

export function ChequeCreditbooksHistoryLine({id,state,mode,buttons}: FocusedProps<FState, ChequeCreditbooksHistoryLineDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.serialNumber`} state={state.focusOn('serialNumber')} mode={mode} label='Serial Number' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.howOrdered`} state={state.focusOn('howOrdered')} mode={mode} label='How Ordered' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dateOrder`} state={state.focusOn('dateOrder')} mode={mode} label='Date Order' allButtons={buttons} required={true} />
</>
}
