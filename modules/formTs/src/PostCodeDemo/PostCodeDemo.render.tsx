import * as domain from '../PostCodeDemo/PostCodeDemo.domains';
import * as empty from '../PostCodeDemo/PostCodeDemo.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
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
import {PostCodeDemoPageDomain} from "../PostCodeDemo/PostCodeDemo.domains";
import { HideButtonsLayout } from '@focuson/form_components';
import {PostCodeDataDomain} from "../PostCodeDemo/PostCodeDemo.domains"
import {PostCodeDataLineDomain} from "../PostCodeDemo/PostCodeDemo.domains"
import {PostCodeMainPageDomain} from "../PostCodeDemo/PostCodeDemo.domains"
import {PostCodeSearchDomain} from "../PostCodeDemo/PostCodeDemo.domains"
export function PostCodeDemoPage(){
  return focusedPageWithExtraState<FState, PostCodeDemoPageDomain, PostCodeMainPageDomain, Context> ( s => 'PostCodeDemo' ) ( s => s.focusOn('main')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {save:<RestButton state={state}
        id='save'
        name='save'
        action='create'
        validate={false}
        rest='PostCodeDemo_PostCodeMainPageRestDetails'
       />,
      search:<ModalButton id='search' text='search'  state={state} modal = 'PostCodeSearch'  
        pageMode='edit'
        focusOn={["{basePage}","postcode"]}
        copy={[{"from":["{basePage}","main","postcode"],"to":["{basePage}","postcode","search"]}]}
        copyOnClose={[{"from":["{basePage}","postcode","addressResults","line1"],"to":["{basePage}","main","line1"]},{"from":["{basePage}","postcode","addressResults","line2"],"to":["{basePage}","main","line2"]},{"from":["{basePage}","postcode","addressResults","line3"],"to":["{basePage}","main","line3"]},{"from":["{basePage}","postcode","addressResults","line4"],"to":["{basePage}","main","line4"]},{"from":["{basePage}","postcode","search"],"to":["{basePage}","main","postcode"]}]}
      />,}

      return <HideButtonsLayout buttons={buttons} hide={["search"]}>
          <PostCodeMainPage id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.search } 
      { buttons.save } 
      </HideButtonsLayout>})}

export function PostCodeDataLine({id,state,mode,buttons}: FocusedProps<FState, PostCodeDataLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='line4' allButtons={buttons} required={true} />
</>
}

export function PostCodeMainPage({id,state,mode,buttons}: FocusedProps<FState, PostCodeMainPageDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='postcode' allButtons={buttons} required={true} buttons={["search"]} />
</>
}

export function PostCodeSearch({id,state,mode,buttons}: FocusedProps<FState, PostCodeSearchDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.search`} state={state.focusOn('search')} mode={mode} label='search' allButtons={buttons} required={true} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["line1","line2","line3","line4"]} copySelectedItemTo={pageState(state)<any>().focusOn('postcode').focusOn('addressResults')} />
    <PostCodeDataLine id={`${id}.addressResults`} state={state.focusOn('addressResults')} mode={mode} buttons={buttons} />
</>
}
