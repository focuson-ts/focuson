import * as empty from '../AccountOverview/AccountOverview.empty';
import * as domain from '../AccountOverview/AccountOverview.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { AccountOverviewOptionals } from "../AccountOverview/AccountOverview.optionals";
import { Table } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndBooleanInput } from '@focuson/form_components';
import { LabelAndRadio } from '@focuson/form_components';
import { LabelAndNumberInput } from '@focuson/form_components';
import { UnpaidCardOrMisuseItems } from '@focuson/form_components';
import { LabelAndDropdown } from '@focuson/form_components';
import { Layout } from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
import {AccountOverviewPageDomain} from "../AccountOverview/AccountOverview.domains";
import { HideButtonsLayout } from '@focuson/form_components';
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
  return focusedPageWithExtraState<FState, AccountOverviewPageDomain, AccountOverviewDomain, Context> ( s => 'Account Overview' ) ( state => state.focusOn('main')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const buttons =    {excessHistory:<ModalButton id={`${id}.excessHistory`} text='excessHistory'  state={state} modal = 'ExcessHistory'  
        pageMode='view'
        focusOn='~/excessHistory'
      />,
      excessInfo:<ModalButton id={`${id}.excessInfo`} text='excessInfo'  state={state} modal = 'ExcessInfoSearch'  
        pageMode='view'
        focusOn='~/excessInfo'
      />,
      flags:<ModalButton id={`${id}.flags`} text='flags'  state={state} modal = 'AccountFlags'  
        pageMode='edit'
        focusOn='~/editingAccountFlags'
        copy={[{"from":"~/accountFlags"}]}
        copyOnClose={[{"to":"~/accountFlags"}]}
      />,
      reason:<ModalButton id={`${id}.reason`} text='reason'  state={state} modal = 'Reason'  
        pageMode='view'
        focusOn='~/reason'
      />,}

      return <HideButtonsLayout buttons={buttons} hide={["excessHistory","reason"]}>
          <AccountOverview id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.excessInfo } 
      { buttons.reason } 
      { buttons.excessHistory } 
      { buttons.flags } 
      </HideButtonsLayout>})}

export function AccountAllFlags({id,state,mode,buttons}: FocusedProps<FState, AccountAllFlagsDomain,Context>){
  return <>
    <Table id={`${id}.flags`} state={state.focusOn('flags')} mode={mode} order={["flagName","flagValue"]} />
</>
}

export function AccountOneFlag({id,state,mode,buttons}: FocusedProps<FState, AccountOneFlagDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.flagName`} state={state.focusOn('flagName')} mode={mode} label='Flag Name' allButtons={buttons} required={true} />
    <LabelAndBooleanInput id={`${id}.flagValue`} state={state.focusOn('flagValue')} mode={mode} label='Flag Value' allButtons={buttons} />
</>
}

export function AccountOverview({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewDomain,Context>){
  return <Layout details='[[3,3],[20]]'>
    <LabelAndNumberInput id={`${id}.score`} state={state.focusOn('score')} mode={mode} label='Score' allButtons={buttons} required={true} />
    <LabelAndRadio id={`${id}.accountType`} state={state.focusOn('accountType')} mode={mode} label='Account Type' allButtons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndStringInput id={`${id}.drawDownDate`} state={state.focusOn('drawDownDate')} mode={mode} label='Draw Down Date' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.repaymentDate`} state={state.focusOn('repaymentDate')} mode={mode} label='Repayment Date' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.propertyValue`} state={state.focusOn('propertyValue')} mode={mode} label='Property Value' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.mul`} state={state.focusOn('mul')} mode={mode} label='Mul' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.drawDownAmount`} state={state.focusOn('drawDownAmount')} mode={mode} label='Draw Down Amount' allButtons={buttons} required={true} />
    <Table id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} order={["criteria"]} />
    <LabelAndDropdown id={`${id}.zFlagSet`} state={state.focusOn('zFlagSet')} mode={mode} label='Z Flag Set' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["reason"]} />
    <LabelAndNumberInput id={`${id}.excessSixMonths`} state={state.focusOn('excessSixMonths')} mode={mode} label='Excess Six Months' allButtons={buttons} required={true} buttons={["excessHistory"]} />
    <LabelAndNumberInput id={`${id}.bouncedDDs12Months`} state={state.focusOn('bouncedDDs12Months')} mode={mode} label='Bounced D Ds12 Months' allButtons={buttons} required={true} />
    <UnpaidCardOrMisuseItems id={`${id}.unpaidCardOrMisuseItems`} state={state.focusOn('unpaidCardOrMisuseItems')} mode={mode} />
</Layout>
}

export function AccountOverviewCriteriaLine({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewCriteriaLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} label='Criteria' allButtons={buttons} required={true} />
</>
}

export function AccountOverviewExcessHistoryLine({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewExcessHistoryLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.start`} state={state.focusOn('start')} mode={mode} label='Start' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.end`} state={state.focusOn('end')} mode={mode} label='End' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.consecutiveDays`} state={state.focusOn('consecutiveDays')} mode={mode} label='Consecutive Days' allButtons={buttons} required={true} min={0} />
</>
}

export function AccountOverviewExcessInfo({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewExcessInfoDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.dayOfCurrentExcess`} state={state.focusOn('dayOfCurrentExcess')} mode={mode} label='Day Of Current Excess' allButtons={buttons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.currentExcessOnAccount`} state={state.focusOn('currentExcessOnAccount')} mode={mode} label='Current Excess on Account' allButtons={buttons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.currentPctExcess`} state={state.focusOn('currentPctExcess')} mode={mode} label='Current Pct Excess' allButtons={buttons} required={true} min={0} />
    <LabelAndStringInput id={`${id}.dateOfLastCapitalization`} state={state.focusOn('dateOfLastCapitalization')} mode={mode} label='Date Of Last Capitalization' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dateOfLastExcessFulfillment`} state={state.focusOn('dateOfLastExcessFulfillment')} mode={mode} label='Date Of Last Excess Fulfillment' allButtons={buttons} required={true} />
</>
}

export function AccountOverviewHistory({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewHistoryDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["start","end","consecutiveDays"]} copySelectedItemTo={pageState(state)<any>().focusOn('currentSelectedExcessHistory')} />
</>
}

export function AccountOverviewReason({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewReasonDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.reason`} state={state.focusOn('reason')} mode={mode} label='Reason' allButtons={buttons} required={true} />
</>
}

export function ArrearsDetails({id,state,mode,buttons}: FocusedProps<FState, ArrearsDetailsDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["collectionsDate","creditedDate","minPayment","contractualAmount","paymentType","paymentReceived","shortfall","arrearsTotal","missedPayments"]} />
</>
}

export function ArrearsDetailsLine({id,state,mode,buttons}: FocusedProps<FState, ArrearsDetailsLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.collectionsDate`} state={state.focusOn('collectionsDate')} mode={mode} label='Collections Date' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.creditedDate`} state={state.focusOn('creditedDate')} mode={mode} label='Credited Date' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.minPayment`} state={state.focusOn('minPayment')} mode={mode} label='Min Payment' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.contractualAmount`} state={state.focusOn('contractualAmount')} mode={mode} label='Contractual Amount' allButtons={buttons} required={true} />
    <LabelAndDropdown id={`${id}.paymentType`} state={state.focusOn('paymentType')} mode={mode} label='Payment Type' allButtons={buttons} enums={{"dd":"DD","ddResubmit":"DD Resubmit"}} />
    <LabelAndNumberInput id={`${id}.paymentReceived`} state={state.focusOn('paymentReceived')} mode={mode} label='Payment Received' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.shortfall`} state={state.focusOn('shortfall')} mode={mode} label='Shortfall' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.arrearsTotal`} state={state.focusOn('arrearsTotal')} mode={mode} label='Arrears Total' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.missedPayments`} state={state.focusOn('missedPayments')} mode={mode} label='Missed Payments' allButtons={buttons} required={true} min={0} />
</>
}
