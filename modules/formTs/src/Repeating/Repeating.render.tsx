import * as domain from '../Repeating/Repeating.domains';
import * as empty from '../Repeating/Repeating.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { LabelAndNumberInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { Table } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {RepeatingPageDomain} from "../Repeating/Repeating.domains";
import {RepeatingLineDomain} from "../Repeating/Repeating.domains"
import {RepeatingWholeDataDomain} from "../Repeating/Repeating.domains"
export function RepeatingPage(){
  return focusedPageWithExtraState<FState, RepeatingPageDomain, RepeatingWholeDataDomain, Context> ( s => 'Repeating' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode) => {
  const nextOccupationGuard = fullState.focusOn('selectedItem').optJsonOr(0) <   fullState.focusOn('fromApi').optJsonOr([]).length - 1
  const prevOccupationGuard =  fullState.focusOn('selectedItem').optJsonOr(0) >0
  const id='root';
  const buttons =    {addEntry:<ModalButton id='addEntry' text='addEntry'  state={state} modal = 'RepeatingLine'  
        pageMode='create'
        focusOn='~/temp'
        copyOnClose={[{"to":"~/fromApi[$append]"}]}
        createEmpty={empty.emptyRepeatingLine}
        setToLengthOnClose={{"variable":"~/selectedItem","array":"~/fromApi"}}
      />,
      edit:<ModalButton id='edit' text='edit'  state={state} modal = 'RepeatingLine'  
        pageMode='edit'
        focusOn='~/temp'
        copy={[{"from":"~/fromApi[selectedItem]"}]}
        copyOnClose={[{"to":"~/fromApi/[selectedItem]"}]}
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
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='Name' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.age`} state={state.focusOn('age')} mode={mode} label='Age' allButtons={buttons} required={true} />
</>
}
