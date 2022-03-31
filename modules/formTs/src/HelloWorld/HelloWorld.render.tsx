import * as domain from '../HelloWorld/HelloWorld.domains';
import * as empty from '../HelloWorld/HelloWorld.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { LabelAndStringInput } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {HelloWorldPageDomain} from "../HelloWorld/HelloWorld.domains";
import {HelloWorldDomain} from "../HelloWorld/HelloWorld.domains"
export function HelloWorldPage(){
  return focusedPageWithExtraState<FState, HelloWorldPageDomain, HelloWorldDomain, Context> ( s => 'Hello World' ) ( state => state.focusQuery('main')) (
( fullState, state , full, d, mode) => {
  const id='root';
  const buttons ={}

      return <>
          <HelloWorld id={`${id}`} state={state} mode={mode} buttons={buttons} />
      </>})}

export function HelloWorld({id,state,mode,buttons}: FocusedProps<FState, HelloWorldDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.hello`} state={state.focusOn('hello')} mode={mode} label='Hello' allButtons={buttons} required={true} />
</>
}
