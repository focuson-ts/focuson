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
import {ValidationButton} from '../copied/ValidationButton';
import {ChequeCreditbooksPageDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains";
import {ChequeCreditbooksDDDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import {ChequeCreditbooksHistoryDDDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
import {ChequeCreditbooksHistoryLineDDDomain} from "../ChequeCreditbooks/ChequeCreditbooks.domains"
export function ChequeCreditbooksPage(){
  return focusedPageWithExtraState<FState, ChequeCreditbooksPageDomain, ChequeCreditbooksDDDomain, Context> ( s => 'ChequeCreditbooks' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {chequeBook:<button>chequeBook of type ResetStateButton cannot be created yet</button>,
      orderNewBook:<ModalButton id='orderNewBook' text='orderNewBook'  state={state} modal = 'OrderChequeBookOrPayingInModal'  
        pageMode='create'
        focusOn={["ChequeCreditbooks","{basePage}","tempCreatePlan"]}
        createEmpty={empty.emptyChequeCreditbooksHistoryLineDD}
         rest={{"name":"ChequeCreditbooks_ChequeCreditbooksDDRestDetails","restAction":"create"}}
      />,
      payingInBook:<button>payingInBook of type ResetStateButton cannot be created yet</button>,}

      return <div className='mainPage'>
           {/*{"dataDD":"ChequeCreditbooksDD","display":{"import":"","name":"ChequeCreditbooksDD","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <ChequeCreditbooksDD id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.chequeBook } 
      { buttons.payingInBook } 
      { buttons.orderNewBook } 
      </div>})}

export function ChequeCreditbooksDD({id,state,mode,buttons}: FocusedProps<FState, ChequeCreditbooksDDDomain,Context>){
  return <>
     {/*{"path":["history"],"dataDD":"ChequeCreditbooksHistoryDD","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["serialNumber","howOrdered","dateOrder"]} />
</>
}

export function ChequeCreditbooksHistoryLineDD({id,state,mode,buttons}: FocusedProps<FState, ChequeCreditbooksHistoryLineDDDomain,Context>){
  return <>
     {/*{"path":["serialNumber"],"dataDD":"IntegerDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.serialNumber`} state={state.focusOn('serialNumber')} mode={mode} label='serial number' buttons={buttons} required={true} />
     {/*{"path":["howOrdered"],"dataDD":"OneLineStringDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.howOrdered`} state={state.focusOn('howOrdered')} mode={mode} label='how ordered' buttons={buttons} required={true} />
     {/*{"path":["dateOrder"],"dataDD":"DateDD","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.dateOrder`} state={state.focusOn('dateOrder')} mode={mode} label='date order' buttons={buttons} required={true} />
</>
}
