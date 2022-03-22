import * as domain from '../Repeating/Repeating.domains';
import * as empty from '../Repeating/Repeating.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { Table } from '../copied/table';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ToggleButton} from '../copied/ToggleButton';
import {ValidationButton} from '../copied/ValidationButton';
import {RepeatingPageDomain} from "../Repeating/Repeating.domains";
import {RepeatingLineDomain} from "../Repeating/Repeating.domains"
import {RepeatingWholeDataDomain} from "../Repeating/Repeating.domains"
export function RepeatingPage(){
  return focusedPageWithExtraState<FState, RepeatingPageDomain, RepeatingWholeDataDomain, Context> ( s => 'Repeating' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  const nextOccupationGuard =  pageState(state)().chainLens<number>(Lenses.fromPath(["selectedItem"])).optJsonOr(0) <  pageState(state)().chainLens<string[]>(Lenses.fromPath(["fromApi"])).optJsonOr([]).length - 1
  const prevOccupationGuard = pageState(state)().chainLens<number>(Lenses.fromPath(["selectedItem"])).optJsonOr(0) >0
  const id='root';
  const buttons =    {addEntry:<ModalButton id='addEntry' text='addEntry'  state={state} modal = 'RepeatingLine'  
        pageMode='create'
        focusOn={["{basePage}","temp"]}
        copyOnClose={[{"to":["{basePage}","fromApi","[append]"]}]}
        createEmpty={empty.emptyRepeatingLine}
        setToLengthOnClose={{"array":["fromApi"],"variable":["selectedItem"]}}
      />,
      edit:<ModalButton id='edit' text='edit'  state={state} modal = 'RepeatingLine'  
        pageMode='edit'
        focusOn={["{basePage}","temp"]}
        copy={[{"from":["{basePage}","fromApi","{selectedItem}"]}]}
        copyOnClose={[{"to":["{basePage}","fromApi","{selectedItem}"]}]}
      />,
      nextOccupation:<GuardButton cond={nextOccupationGuard}>
        <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi')} value={fullState.focusOn('selectedItem')} />
      </GuardButton>,
      prevOccupation:<GuardButton cond={prevOccupationGuard}>
        <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi')} value={fullState.focusOn('selectedItem')} />
      </GuardButton>,}

      return <>
          <Table id={`${id}`} state={state} mode={mode} order={["name","age"]} />
      { buttons.addEntry } 
      { buttons.edit } 
      { buttons.prevOccupation } 
      { buttons.nextOccupation } 
      </>})}

export function RepeatingLine({id,state,mode,buttons}: FocusedProps<FState, RepeatingLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.age`} state={state.focusOn('age')} mode={mode} label='age' allButtons={buttons} required={true} />
</>
}
