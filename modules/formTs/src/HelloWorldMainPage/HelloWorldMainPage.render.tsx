import * as empty from '../HelloWorldMainPage/HelloWorldMainPage.empty';
import * as domain from '../HelloWorldMainPage/HelloWorldMainPage.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { HelloWorldMainPageOptionals } from "../HelloWorldMainPage/HelloWorldMainPage.optionals";
import { LabelAndStringInput } from '@focuson/form_components';
import {DeleteStateButton} from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {HelloWorldMainPagePageDomain} from "../HelloWorldMainPage/HelloWorldMainPage.domains";
import {HelloWorldDomainDataDomain} from "../HelloWorldMainPage/HelloWorldMainPage.domains"
export function HelloWorldMainPagePage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi
  return focusedPageWithExtraState<FState, HelloWorldMainPagePageDomain, HelloWorldDomainDataDomain, Context> ( s => 'Hello World Main Page' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons ={}

      return <>
          <HelloWorldDomainData id={`${id}`} state={state} mode={mode} buttons={buttons} />
      </>})}

export function HelloWorldDomainData({id,state,mode,buttons}: FocusedProps<FState, HelloWorldDomainDataDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.message`} state={state.focusOn('message')} mode={mode} label='Hello world example' allButtons={buttons} required={true} />
</>
}
