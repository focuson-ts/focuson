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
import {ToggleButton} from '../copied/ToggleButton';
import {ValidationButton} from '../copied/ValidationButton';
import {AccountOverviewPageDomain} from "../AccountOverview/AccountOverview.domains";
import { HideButtonsLayout } from '../copied/hideButtons';
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
    <LabelAndStringInput id={`${id}.flagName`} state={state.focusOn('flagName')} mode={mode} label='flag name' allButtons={buttons} required={true} />
    <LabelAndBooleanInput id={`${id}.flagValue`} state={state.focusOn('flagValue')} mode={mode} label='flag value' allButtons={buttons} />
</>
}

export function AccountOverview({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewDomain,Context>){
  return <Layout details='[[3,3],[20]]'>
    <LabelAndNumberInput id={`${id}.score`} state={state.focusOn('score')} mode={mode} label='score' allButtons={buttons} required={true} />
    <LabelAndRadio id={`${id}.accountType`} state={state.focusOn('accountType')} mode={mode} label='account type' allButtons={buttons} enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndStringInput id={`${id}.drawDownDate`} state={state.focusOn('drawDownDate')} mode={mode} label='draw down date' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.repaymentDate`} state={state.focusOn('repaymentDate')} mode={mode} label='repayment date' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.propertyValue`} state={state.focusOn('propertyValue')} mode={mode} label='property value' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.mul`} state={state.focusOn('mul')} mode={mode} label='mul' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.drawDownAmount`} state={state.focusOn('drawDownAmount')} mode={mode} label='draw down amount' allButtons={buttons} required={true} />
    <Table id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} order={["criteria"]} />
    <LabelAndDropdown id={`${id}.zFlagSet`} state={state.focusOn('zFlagSet')} mode={mode} label='z flag set' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["reason"]} />
    <LabelAndNumberInput id={`${id}.excessSixMonths`} state={state.focusOn('excessSixMonths')} mode={mode} label='excess six months' allButtons={buttons} required={true} buttons={["excessHistory"]} />
    <LabelAndNumberInput id={`${id}.bouncedDDs12Months`} state={state.focusOn('bouncedDDs12Months')} mode={mode} label='bounced d ds12 months' allButtons={buttons} required={true} />
    <UnpaidCardOrMisuseItems id={`${id}.unpaidCardOrMisuseItems`} state={state.focusOn('unpaidCardOrMisuseItems')} mode={mode} />
</Layout>
}

export function AccountOverviewCriteriaLine({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewCriteriaLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} label='criteria' allButtons={buttons} required={true} />
</>
}

export function AccountOverviewExcessHistoryLine({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewExcessHistoryLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.start`} state={state.focusOn('start')} mode={mode} label='start' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.end`} state={state.focusOn('end')} mode={mode} label='end' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.consecutiveDays`} state={state.focusOn('consecutiveDays')} mode={mode} label='consecutive days' allButtons={buttons} required={true} min={0} />
</>
}

export function AccountOverviewExcessInfo({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewExcessInfoDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.dayOfCurrentExcess`} state={state.focusOn('dayOfCurrentExcess')} mode={mode} label='day of current excess' allButtons={buttons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.currentExcessOnAccount`} state={state.focusOn('currentExcessOnAccount')} mode={mode} label='Current Excess on Account' allButtons={buttons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.currentPctExcess`} state={state.focusOn('currentPctExcess')} mode={mode} label='current pct excess' allButtons={buttons} required={true} min={0} />
    <LabelAndStringInput id={`${id}.dateOfLastCapitalization`} state={state.focusOn('dateOfLastCapitalization')} mode={mode} label='date of last capitalization' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dateOfLastExcessFulfillment`} state={state.focusOn('dateOfLastExcessFulfillment')} mode={mode} label='date of last excess fulfillment' allButtons={buttons} required={true} />
</>
}

export function AccountOverviewHistory({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewHistoryDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["start","end","consecutiveDays"]} copySelectedItemTo={pageState(state)<any>().focusOn('currentSelectedExcessHistory')} />
</>
}

export function AccountOverviewReason({id,state,mode,buttons}: FocusedProps<FState, AccountOverviewReasonDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.reason`} state={state.focusOn('reason')} mode={mode} label='reason' allButtons={buttons} required={true} />
</>
}

export function ArrearsDetails({id,state,mode,buttons}: FocusedProps<FState, ArrearsDetailsDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["collectionsDate","creditedDate","minPayment","contractualAmount","paymentType","paymentReceived","shortfall","arrearsTotal","missedPayments"]} />
</>
}

export function ArrearsDetailsLine({id,state,mode,buttons}: FocusedProps<FState, ArrearsDetailsLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.collectionsDate`} state={state.focusOn('collectionsDate')} mode={mode} label='collections date' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.creditedDate`} state={state.focusOn('creditedDate')} mode={mode} label='credited date' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.minPayment`} state={state.focusOn('minPayment')} mode={mode} label='min payment' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.contractualAmount`} state={state.focusOn('contractualAmount')} mode={mode} label='contractual amount' allButtons={buttons} required={true} />
    <LabelAndDropdown id={`${id}.paymentType`} state={state.focusOn('paymentType')} mode={mode} label='payment type' allButtons={buttons} enums={{"dd":"DD","ddResubmit":"DD Resubmit"}} />
    <LabelAndNumberInput id={`${id}.paymentReceived`} state={state.focusOn('paymentReceived')} mode={mode} label='payment received' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.shortfall`} state={state.focusOn('shortfall')} mode={mode} label='shortfall' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.arrearsTotal`} state={state.focusOn('arrearsTotal')} mode={mode} label='arrears total' allButtons={buttons} required={true} />
    <LabelAndNumberInput id={`${id}.missedPayments`} state={state.focusOn('missedPayments')} mode={mode} label='missed payments' allButtons={buttons} required={true} min={0} />
</>
}
