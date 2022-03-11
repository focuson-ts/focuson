import * as domain from '../PostCodeDemo/PostCodeDemo.domains';
import * as empty from '../PostCodeDemo/PostCodeDemo.empty';
import { LensProps } from "@focuson/state";
import { Layout } from "../copied/layout";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { Table } from '../copied/table';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {PostCodeDemoPageDomain} from "../PostCodeDemo/PostCodeDemo.domains";
import {PostCodeDataDomain} from "../PostCodeDemo/PostCodeDemo.domains"
import {postCodeDataLineDomain} from "../PostCodeDemo/PostCodeDemo.domains"
import {PostCodeMainPageDomain} from "../PostCodeDemo/PostCodeDemo.domains"
import {PostCodeSearchDomain} from "../PostCodeDemo/PostCodeDemo.domains"
export function PostCodeDemoPage(){
  return focusedPageWithExtraState<FState, PostCodeDemoPageDomain, PostCodeMainPageDomain, Context> ( s => 'PostCodeDemo' ) ( s => s.focusOn('main')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  return (<Layout  details=''>
          <PostCodeMainPage id={`${id}`} state={state} mode={mode} />
          <ModalButton id='search' text='search'  state={state} modal = 'PostCodeSearch'  focusOn={["PostCodeDemo","postcode"]}  createEmpty={empty.emptyPostCodeSearch}   pageMode='edit'   />
   </Layout>)})}

export function postCodeDataLine({id,state,mode}: FocusedProps<FState, postCodeDataLineDomain,Context>){
  return(<>
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' required={true} />
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='line3' required={true} />
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='line4' required={true} />
</>)
}

export function PostCodeMainPage({id,state,mode}: FocusedProps<FState, PostCodeMainPageDomain,Context>){
  return(<>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' required={true} />
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' required={true} />
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='line3' required={true} />
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='line4' required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='postcode' required={true} />
</>)
}

export function PostCodeSearch({id,state,mode}: FocusedProps<FState, PostCodeSearchDomain,Context>){
  return(<>
    <LabelAndStringInput id={`${id}.search`} state={state.focusOn('search')} mode={mode} label='search' required={true} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["line1","line2","line3","line4"]} />
</>)
}
