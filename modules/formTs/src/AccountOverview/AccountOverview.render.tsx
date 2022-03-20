import * as domain from '../AccountOverview/AccountOverview.domains';
import * as empty from '../AccountOverview/AccountOverview.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { Table } from '../copied/table';
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { LabelAndBooleanInput } from '../copied/LabelAndInput';
import { LabelAndRadio } from '../copied/Radio';
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { UnpaidCardOrMisuseItems } from '../copied/unpaidCardOrMisuseItems';
import { LabelAndDropdown } from '../copied/Dropdown/LabelAndDropdown';
import { Layout } from '../copied/layout';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
import {AccountOverviewPageDomain} from "../AccountOverview/AccountOverview.domains";
import {AccountAllFlagsDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountAllFlagsListDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOneFlagDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewCriteriaDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewCriteriaLineDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewExcessHistoryLineDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewExcessInfoDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewExcessLinesDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewHistoryDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewReasonDomain} from "../AccountOverview/AccountOverview.domains"
import {ArrearsDetailsDomain} from "../AccountOverview/AccountOverview.domains"
import {ArrearsDetailsLineDomain} from "../AccountOverview/AccountOverview.domains"
import {ArrearsDetailsLinesDomain} from "../AccountOverview/AccountOverview.domains"
export function AccountOverviewPage(){
  return focusedPageWithExtraState<FState, AccountOverviewPageDomain, AccountOverviewDomain, Context> ( s => 'AccountOverview' ) ( s => s.focusOn('main')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {excessHistory:<ModalButton id='excessHistory' text='excessHistory'  state={state} modal = 'ExcessHistory'  
        pageMode='view'
        focusOn={["{basePage}","excessHistory"]}
      />,
      excessInfo:<ModalButton id='excessInfo' text='excessInfo'  state={state} modal = 'ExcessInfoSearch'  
        pageMode='view'
        focusOn={["{basePage}","excessInfo"]}
      />,
      flags:<ModalButton id='flags' text='flags'  state={state} modal = 'AccountFlags'  
        pageMode='edit'
        focusOn={["{basePage}","editingAccountFlags"]}
        copy={[{"from":["{basePage}","accountFlags"]}]}
        copyOnClose={[{"to":["{basePage}","accountFlags"]}]}
      />,
      reason:<ModalButton id='reason' text='reason'  state={state} modal = 'Reason'  
        pageMode='view'
        focusOn={["{basePage}","reason"]}
      />,}

      return <div className='mainPage'>
           {/*{"dataDD":"AccountOverview","display":{"import":"","name":"AccountOverview","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <AccountOverview id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.excessInfo } 
      { buttons.reason } 
      { buttons.excessHistory } 
      { buttons.flags } 
      </div>})}

export function AccountAllFlags({id,state,mode,buttons}: FocusedProps<FState, AccountAllFlagsDomain,Context>){
  return <>
     {/*{"path":["flags"],"dataDD":"AccountAllFlagsList","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.flags`} state={state.focusOn('flags')} mode={mode} order={["flagName","flagValue"]} />
</>
}

export function AccountOneFlag({id,state,mode,buttons}: FocusedProps<FState, AccountOneFlagDomain,Context>){
  return <>
     {/*{"path":["flagName"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.flagName`} state={state.focusOn('flagName')} mode={mode} label='flag name' buttons={buttons} required={true} />
     {/*{"path":["flagValue"],"dataDD":"Boolean","display":{"import":"../copied/LabelAndInput","name":"LabelAndBooleanInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"}}}}*/}
    <LabelAndBooleanInput id={`${id}.flagValue`} state={state.focusOn('flagValue')} mode={mode} label='flag value' buttons={buttons} />
</>
}

export function AccountOverview({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewDomain,Context>){
  return <Layout details='[[3,3],[20]]'>
     {/*{"path":["score"],"dataDD":"Integer","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.score`} state={state.focusOn('score')} mode={mode} label='score' buttons={buttons} required={true} />
     {/*{"path":["accountType"],"dataDD":"EAccountDisplayType","display":{"import":"../copied/Radio","name":"LabelAndRadio","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"enums":{"needed":"defaultToEnum","paramType":"object"}}}}*/}
    <LabelAndRadio id={`${id}.accountType`} state={state.focusOn('accountType')} mode={mode} label='account type' buttons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
     {/*{"path":["drawDownDate"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.drawDownDate`} state={state.focusOn('drawDownDate')} mode={mode} label='draw down date' buttons={buttons} required={true} />
     {/*{"path":["repaymentDate"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.repaymentDate`} state={state.focusOn('repaymentDate')} mode={mode} label='repayment date' buttons={buttons} required={true} />
     {/*{"path":["propertyValue"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.propertyValue`} state={state.focusOn('propertyValue')} mode={mode} label='property value' buttons={buttons} required={true} />
     {/*{"path":["mul"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.mul`} state={state.focusOn('mul')} mode={mode} label='mul' buttons={buttons} required={true} />
     {/*{"path":["drawDownAmount"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.drawDownAmount`} state={state.focusOn('drawDownAmount')} mode={mode} label='draw down amount' buttons={buttons} required={true} />
     {/*{"path":["criteria"],"dataDD":"AccountOverviewCriteria","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} order={["criteria"]} />
     {/*{"displayParams":{"button":"reason"},"path":["zFlagSet"],"dataDD":"YesNo","display":{"import":"../copied/Dropdown/LabelAndDropdown","name":"LabelAndDropdown","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"enums":{"needed":"defaultToEnum","paramType":"object"}}}}*/}
    <LabelAndDropdown id={`${id}.zFlagSet`} state={state.focusOn('zFlagSet')} mode={mode} label='z flag set' buttons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} button='reason' />
     {/*{"displayParams":{"button":"excessHistory"},"path":["excessSixMonths"],"dataDD":"Integer","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.excessSixMonths`} state={state.focusOn('excessSixMonths')} mode={mode} label='excess six months' buttons={buttons} required={true} button='excessHistory' />
     {/*{"path":["bouncedDDs12Months"],"dataDD":"Integer","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.bouncedDDs12Months`} state={state.focusOn('bouncedDDs12Months')} mode={mode} label='bounced d ds12 months' buttons={buttons} required={true} />
     {/*{"path":["unpaidCardOrMisuseItems"],"dataDD":"Integer","display":{"import":"../copied/unpaidCardOrMisuseItems","name":"UnpaidCardOrMisuseItems","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}}}*/}
    <UnpaidCardOrMisuseItems id={`${id}.unpaidCardOrMisuseItems`} state={state.focusOn('unpaidCardOrMisuseItems')} mode={mode} />
</Layout>
}

export function AccountOverviewCriteriaLine({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewCriteriaLineDomain,Context>){
  return <>
     {/*{"path":["criteria"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} label='criteria' buttons={buttons} required={true} />
</>
}

export function AccountOverviewExcessHistoryLine({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewExcessHistoryLineDomain,Context>){
  return <>
     {/*{"path":["start"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.start`} state={state.focusOn('start')} mode={mode} label='start' buttons={buttons} required={true} />
     {/*{"path":["end"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.end`} state={state.focusOn('end')} mode={mode} label='end' buttons={buttons} required={true} />
     {/*{"path":["consecutiveDays"],"dataDD":"NaturalNumber","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.consecutiveDays`} state={state.focusOn('consecutiveDays')} mode={mode} label='consecutive days' buttons={buttons} required={true} min={0} />
</>
}

export function AccountOverviewExcessInfo({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewExcessInfoDomain,Context>){
  return <>
     {/*{"path":["dayOfCurrentExcess"],"dataDD":"NaturalNumber","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.dayOfCurrentExcess`} state={state.focusOn('dayOfCurrentExcess')} mode={mode} label='day of current excess' buttons={buttons} required={true} min={0} />
     {/*{"displayParams":{"label":"Current Excess on Account"},"path":["currentExcessOnAccount"],"dataDD":"NaturalNumber","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.currentExcessOnAccount`} state={state.focusOn('currentExcessOnAccount')} mode={mode} label='Current Excess on Account' buttons={buttons} required={true} min={0} />
     {/*{"path":["currentPctExcess"],"dataDD":"NaturalNumber","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.currentPctExcess`} state={state.focusOn('currentPctExcess')} mode={mode} label='current pct excess' buttons={buttons} required={true} min={0} />
     {/*{"path":["dateOfLastCapitalization"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.dateOfLastCapitalization`} state={state.focusOn('dateOfLastCapitalization')} mode={mode} label='date of last capitalization' buttons={buttons} required={true} />
     {/*{"path":["dateOfLastExcessFulfillment"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.dateOfLastExcessFulfillment`} state={state.focusOn('dateOfLastExcessFulfillment')} mode={mode} label='date of last excess fulfillment' buttons={buttons} required={true} />
</>
}

export function AccountOverviewHistory({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewHistoryDomain,Context>){
  return <>
     {/*{"path":["history"],"dataDD":"AccountOverviewExcessLines","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["start","end","consecutiveDays"]} copySelectedItemTo={pageState(state)<any>().focusOn('currentSelectedExcessHistory')} />
</>
}

export function AccountOverviewReason({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewReasonDomain,Context>){
  return <>
     {/*{"path":["reason"],"dataDD":"OneLineString","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.reason`} state={state.focusOn('reason')} mode={mode} label='reason' buttons={buttons} required={true} />
</>
}

export function ArrearsDetails({id,state,mode,buttons}: FocusedProps<FState, ArrearsDetailsDomain,Context>){
  return <>
     {/*{"path":["history"],"dataDD":"ArrearsDetailsLines","display":{"import":"","name":"Table","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"order":{"paramType":"string[]","needed":"yes"},"copySelectedIndexTo":{"paramType":"pageState","needed":"no"},"copySelectedItemTo":{"paramType":"pageState","needed":"no"}}}}*/}
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["collectionsDate","creditedDate","minPayment","contractualAmount","paymentType","paymentReceived","shortfall","arrearsTotal","missedPayments"]} />
</>
}

export function ArrearsDetailsLine({id,state,mode,buttons}: FocusedProps<FState, ArrearsDetailsLineDomain,Context>){
  return <>
     {/*{"path":["collectionsDate"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.collectionsDate`} state={state.focusOn('collectionsDate')} mode={mode} label='collections date' buttons={buttons} required={true} />
     {/*{"path":["creditedDate"],"dataDD":"Date","display":{"import":"../copied/LabelAndInput","name":"LabelAndStringInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"pattern":{"paramType":"string","needed":"no"},"minlength":{"paramType":"object","needed":"no"},"maxlength":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndStringInput id={`${id}.creditedDate`} state={state.focusOn('creditedDate')} mode={mode} label='credited date' buttons={buttons} required={true} />
     {/*{"path":["minPayment"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.minPayment`} state={state.focusOn('minPayment')} mode={mode} label='min payment' buttons={buttons} required={true} />
     {/*{"path":["contractualAmount"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.contractualAmount`} state={state.focusOn('contractualAmount')} mode={mode} label='contractual amount' buttons={buttons} required={true} />
     {/*{"path":["paymentType"],"dataDD":"PaymentType","display":{"import":"../copied/Dropdown/LabelAndDropdown","name":"LabelAndDropdown","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"enums":{"needed":"defaultToEnum","paramType":"object"}}}}*/}
    <LabelAndDropdown id={`${id}.paymentType`} state={state.focusOn('paymentType')} mode={mode} label='payment type' buttons={buttons} enums={{"dd":"DD","ddResubmit":"DD Resubmit"}} />
     {/*{"path":["paymentReceived"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.paymentReceived`} state={state.focusOn('paymentReceived')} mode={mode} label='payment received' buttons={buttons} required={true} />
     {/*{"path":["shortfall"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.shortfall`} state={state.focusOn('shortfall')} mode={mode} label='shortfall' buttons={buttons} required={true} />
     {/*{"path":["arrearsTotal"],"dataDD":"Money","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.arrearsTotal`} state={state.focusOn('arrearsTotal')} mode={mode} label='arrears total' buttons={buttons} required={true} />
     {/*{"path":["missedPayments"],"dataDD":"NaturalNumber","display":{"import":"../copied/LabelAndInput","name":"LabelAndNumberInput","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"},"label":{"paramType":"string","needed":"defaultToCamelCaseOfName"},"buttons":{"paramType":"object","needed":"defaultToButtons"},"button":{"paramType":"string","needed":"no"},"required":{"paramType":"boolean","needed":"no","default":true},"min":{"paramType":"object","needed":"no"},"max":{"paramType":"object","needed":"no"}}}}*/}
    <LabelAndNumberInput id={`${id}.missedPayments`} state={state.focusOn('missedPayments')} mode={mode} label='missed payments' buttons={buttons} required={true} min={0} />
</>
}
