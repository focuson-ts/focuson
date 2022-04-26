import * as empty from '../PostCodeMainPage/PostCodeMainPage.empty';
import * as domain from '../PostCodeMainPage/PostCodeMainPage.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { PostCodeMainPageOptionals } from "../PostCodeMainPage/PostCodeMainPage.optionals";
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
import {PostCodeMainPagePageDomain} from "../PostCodeMainPage/PostCodeMainPage.domains";
import { HideButtonsLayout } from '@focuson/form_components';
import {PostCodeDataDomain} from "../PostCodeMainPage/PostCodeMainPage.domains"
import {PostCodeDataLineDomain} from "../PostCodeMainPage/PostCodeMainPage.domains"
import {PostCodeNameAndAddressDomain} from "../PostCodeMainPage/PostCodeMainPage.domains"
import {PostCodeSearchDomain} from "../PostCodeMainPage/PostCodeMainPage.domains"
export function PostCodeMainPagePage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/main
  return focusedPageWithExtraState<FState, PostCodeMainPagePageDomain, PostCodeNameAndAddressDomain, Context> ( s => 'Post Code Main Page' ) ( state => state.focusOn('main')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {save:<RestButton state={state} id={`${id}.save`} 
        name='save'
        action='create'
        validate={false}
        rest='PostCodeMainPage_PostCodeNameAndAddressRestDetails'
       />,
      search:<ModalButton id={`${id}.search`} text='search'  state={state} modal = 'PostCodeSearch'  
        pageMode='edit'
        focusOn='~/postcode'
        copy={[{"from":"~/main/postcode","to":"~/postcode/search"}]}
        copyOnClose={[{"from":"~/postcode/addressResults/line1","to":"~/main/line1"},{"from":"~/postcode/addressResults/line2","to":"~/main/line2"},{"from":"~/postcode/addressResults/line3","to":"~/main/line3"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/search","to":"~/main/postcode"}]}
      />,}

      return <HideButtonsLayout buttons={buttons} hide={["search"]}>
          <PostCodeNameAndAddress id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.search } 
      { buttons.save } 
      </HideButtonsLayout>})}

export function PostCodeDataLine({id,state,mode,buttons}: FocusedProps<FState, PostCodeDataLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='Line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='Line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='Line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='Line4' allButtons={buttons} required={true} />
</>
}

export function PostCodeNameAndAddress({id,state,mode,buttons}: FocusedProps<FState, PostCodeNameAndAddressDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='Line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='Line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='Line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='Line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={buttons} required={true} buttons={["search"]} />
</>
}

export function PostCodeSearch({id,state,mode,buttons}: FocusedProps<FState, PostCodeSearchDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.search`} state={state.focusOn('search')} mode={mode} label='Search' allButtons={buttons} required={true} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["line1","line2","line3","line4"]} copySelectedItemTo={pageState(state)<any>().focusOn('postcode').focusOn('addressResults')} />
    <PostCodeDataLine id={`${id}.addressResults`} state={state.focusOn('addressResults')} mode={mode} buttons={buttons} />
</>
}
