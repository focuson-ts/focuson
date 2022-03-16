import * as domain from '../CreateEAccount/CreateEAccount.domains';
import * as empty from '../CreateEAccount/CreateEAccount.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { Radio } from '../copied/Radio';
import { LabelAndRadio } from '../copied/Radio';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {CreateEAccountPageDomain} from "../CreateEAccount/CreateEAccount.domains";
import {CreateEAccountDataDomain} from "../CreateEAccount/CreateEAccount.domains"
export function CreateEAccountPage(){
  return focusedPageWithExtraState<FState, CreateEAccountPageDomain, CreateEAccountDataDomain, Context> ( s => 'CreateEAccount' ) ( s => s.focusOn('editing')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {cancel:<button>cancel of type ResetStateButton cannot be created yet</button>,
      createEAccounts:<RestButton state={state}
        id='createEAccounts'
        name='createEAccounts'
        action='create'
        rest='CreateEAccount_ETransferDataDRestDetails'
        confirm={true}
       />,
      resetAll:<button>resetAll of type ResetStateButton cannot be created yet</button>,}

      return <div className='modalPage'>
           {/*{"dataDD":"CreateEAccountData","display":{"import":"","name":"CreateEAccountData","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <CreateEAccountData id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.createEAccounts } 
      { buttons.resetAll } 
      { buttons.cancel } 
      </div>})}

export function CreateEAccountData({id,state,mode,buttons}: FocusedProps<FState, CreateEAccountDataDomain,Context>){
  return <>
     {/*{"path":["name"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.name`} state={state.focusOn('name')} mode={mode} label='name' buttons={buttons} required={true} />
     {/*{"path":["type"],"dataDD":"EAccountDisplayType","display":{"import":"../copied/Radio","name":"LabelAndRadio","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"enums":{"needed":"defaultToEnum","paramType":"object"}}}}*/}
    <LabelAndRadio id={`${id}.type`} state={state.focusOn('type')} mode={mode} label='type' buttons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
     {/*{"path":["savingsStyle"],"dataDD":"SavingsStyle","display":{"import":"../copied/Radio","name":"Radio","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"enums":{"needed":"defaultToEnum","paramType":"object"}}}}*/}
    <Radio id={`${id}.savingsStyle`} state={state.focusOn('savingsStyle')} mode={mode} enums={{"adHoc":"Save what you want, when you want it","payRegular":"Pay a regular amount until you reach a target","paySettime":"Pay a regular amount for a set time","targetTime":"Reach a target balance by a set time"}} />
     {/*{"path":["initialAmount"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.initialAmount`} state={state.focusOn('initialAmount')} mode={mode} label='initial amount' buttons={buttons} required={true} />
</>
}
