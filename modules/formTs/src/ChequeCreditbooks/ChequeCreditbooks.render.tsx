import * as domain from '../ChequeCreditbooks/ChequeCreditbooks.domains';
import * as empty from '../ChequeCreditbooks/ChequeCreditbooks.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { Table } from '../copied/table';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ToggleButton} from '../copied/ToggleButton';
import {ValidationButton} from '../copied/ValidationButton';
import {ChequeCreditbooksPageDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains";
import {ChequeCreditbooksDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import {ChequeCreditbooksHistoryDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import {ChequeCreditbooksHistoryLineDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
export function ChequeCreditbooksPage(){
  return focusedPageWithExtraState<FState, ChequeCreditbooksPageDomain, ChequeCreditbooksDomain, Context> ( s => 'ChequeCreditbooks' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {chequeBook:<button>chequeBook of type ResetStateButton cannot be created yet</button>,
      orderNewBook:<ModalButton id='orderNewBook' text='orderNewBook'  state={state} modal = 'OrderChequeBookOrPayingInModal'  
        pageMode='create'
        focusOn={["{basePage}","{basePage}","tempCreatePlan"]}
        createEmpty={empty.emptyChequeCreditbooksHistoryLine}
         rest={{"name":"ChequeCreditbooks_ChequeCreditbooksRestDetails","restAction":"create"}}
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
    <LabelAndNumberInput id={`${id}.serialNumber`} state={state.focusOn('serialNumber')} mode={mode} label='serial number' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.howOrdered`} state={state.focusOn('howOrdered')} mode={mode} label='how ordered' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dateOrder`} state={state.focusOn('dateOrder')} mode={mode} label='date order' allButtons={buttons} required={true} />
</>
}
