import * as domain from '../JointAccount/JointAccount.domains';
import * as empty from '../JointAccount/JointAccount.empty';
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
import {ValidationButton} from '../copied/ValidationButton';
import {JointAccountPageDomain} from "../JointAccount/JointAccount.domains";
import {JointAccountDomain} from "../JointAccount/JointAccount.domains"
import {JointAccountAddressDomain} from "../JointAccount/JointAccount.domains"
import {JointAccountAddressesDomain} from "../JointAccount/JointAccount.domains"
import {JointAccountCustomerDomain} from "../JointAccount/JointAccount.domains"
export function JointAccountPage(){
  return focusedPageWithExtraState<FState, JointAccountPageDomain, JointAccountDomain, Context> ( s => 'JointAccount' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons ={}

      return <div className='mainPage'>
           {/*{"dataDD":"JointAccount","display":{"import":"","name":"JointAccount","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <JointAccount id={`${id}`} state={state} mode={mode} buttons={buttons} />
      </div>})}

export function JointAccount({id,state,mode,buttons}: FocusedProps<FState, JointAccountDomain,Context>){
  return <>
     {/*{"path":["balance"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.balance`} state={state.focusOn('balance')} mode={mode} label='balance' buttons={buttons} required={true} />
     {/*{"path":["main"],"dataDD":"JointAccountCustomer","display":{"import":"","name":"JointAccountCustomer","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}}}*/}
    <JointAccountCustomer id={`${id}.main`} state={state.focusOn('main')} mode={mode} buttons={buttons} />
     {/*{"path":["joint"],"dataDD":"JointAccountCustomer","display":{"import":"","name":"JointAccountCustomer","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}}}*/}
    <JointAccountCustomer id={`${id}.joint`} state={state.focusOn('joint')} mode={mode} buttons={buttons} />
</>
}

export function JointAccountAddress({id,state,mode,buttons}: FocusedProps<FState, JointAccountAddressDomain,Context>){
  return <>
     {/*{"path":["line1"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line1`} state={state.focusOn('line1')} mode={mode} label='line1' buttons={buttons} required={true} />
     {/*{"path":["line2"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.line2`} state={state.focusOn('line2')} mode={mode} label='line2' buttons={buttons} required={true} />
</>
}

export function JointAccountCustomer({id,state,mode,buttons}: FocusedProps<FState, JointAccountCustomerDomain,Context>){
  return <>
     {/*{"path":["name"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' buttons={buttons} required={true} />
     {/*{"path":["addresses"],"dataDD":"JointAccountAddresses","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.addresses`} state={state.focusOn('addresses')} mode={mode} order={["line1","line2"]} />
</>
}
