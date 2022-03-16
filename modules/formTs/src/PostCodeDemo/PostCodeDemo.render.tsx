import * as domain from '../PostCodeDemo/PostCodeDemo.domains';
import * as empty from '../PostCodeDemo/PostCodeDemo.empty';
import { LensProps } from "@focuson/state";
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
import { HideButtonsLayout } from '../copied/hideButtons';
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
        focusOn={["PostCodeDemo","postcode"]}
        copy={[{"from":["{basePage}","main","postcode"],"to":["{basePage}","postcode","search"]}]}
        copyOnClose={[{"from":["{basePage}","postcode","addressResults","line1"],"to":["{basePage}","main","line1"]},{"from":["{basePage}","postcode","addressResults","line2"],"to":["{basePage}","main","line2"]},{"from":["{basePage}","postcode","addressResults","line3"],"to":["{basePage}","main","line3"]},{"from":["{basePage}","postcode","addressResults","line4"],"to":["{basePage}","main","line4"]},{"from":["{basePage}","postcode","search"],"to":["{basePage}","main","postcode"]}]}
      />,}

      return <HideButtonsLayout buttons={buttons} hide={["search"]}>
           {/*{"dataDD":"PostCodeMainPage","display":{"import":"","name":"PostCodeMainPage","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <PostCodeMainPage id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.search } 
      { buttons.save } 
      </HideButtonsLayout>})}

export function PostCodeDataLine({id,state,mode,buttons}: FocusedProps<FState, PostCodeDataLineDomain,Context>){
  return <>
     {/*{"path":["line1"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' buttons={buttons} required={true} />
     {/*{"path":["line2"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' buttons={buttons} required={true} />
     {/*{"path":["line3"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='line3' buttons={buttons} required={true} />
     {/*{"path":["line4"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='line4' buttons={buttons} required={true} />
</>
}

export function PostCodeMainPage({id,state,mode,buttons}: FocusedProps<FState, PostCodeMainPageDomain,Context>){
  return <>
     {/*{"path":["name"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' buttons={buttons} required={true} />
     {/*{"path":["line1"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' buttons={buttons} required={true} />
     {/*{"path":["line2"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' buttons={buttons} required={true} />
     {/*{"path":["line3"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line3`} state={state.focusOn('line3')} mode={mode} label='line3' buttons={buttons} required={true} />
     {/*{"path":["line4"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line4`} state={state.focusOn('line4')} mode={mode} label='line4' buttons={buttons} required={true} />
     {/*{"displayParams":{"button":"search"},"path":["postcode"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='postcode' buttons={buttons} required={true} button='search' />
</>
}

export function PostCodeSearch({id,state,mode,buttons}: FocusedProps<FState, PostCodeSearchDomain,Context>){
  return <>
     {/*{"path":["search"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.search`} state={state.focusOn('search')} mode={mode} label='search' buttons={buttons} required={true} />
     {/*{"path":["searchResults"],"dataDD":"PostCodeData","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["line1","line2","line3","line4"]} copySelectedItemTo={pageState(state)<any>().focusOn('postcode').focusOn('addressResults')} />
     {/*{"path":["addressResults"],"dataDD":"PostCodeDataLine","display":{"import":"","name":"PostCodeDataLine","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}}}*/}
    <PostCodeDataLine id={`${id}.addressResults`} state={state.focusOn('addressResults')} mode={mode} buttons={buttons} />
</>
}
