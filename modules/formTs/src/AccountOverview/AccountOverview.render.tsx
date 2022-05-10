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
import { TableWithCheckboxInput } from '@focuson/form_components';
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndBooleanInput } from '@focuson/form_components';
import { LabelAndRadio } from '@focuson/form_components';
import { LabelAndNumberInput } from '@focuson/form_components';
import { Table } from '@focuson/form_components';
import { LabelAndDateInput } from '@focuson/form_components';
import { PlusMinusButtonsAndInput } from '@focuson/form_components';
import { LabelAndDropdown } from '@focuson/form_components';
import { Layout } from '@focuson/form_components';
import {DeleteStateButton} from '@focuson/form_components';
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
import {AccountOverviewAgreementTypeDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewCriteriaDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewCriteriaLineDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewExcessHistoryLineDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewExcessInfoDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewExcessLinesDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewFacilitiesDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewFacilitiesLineDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewFacilitiesLinesDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewHistoryDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewOptOutDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewOptOutLineDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewOptOutLinesDomain} from "../AccountOverview/AccountOverview.domains"
import {AccountOverviewReasonDomain} from "../AccountOverview/AccountOverview.domains"
import {ArrearsDetailsDomain} from "../AccountOverview/AccountOverview.domains"
import {ArrearsDetailsLineDomain} from "../AccountOverview/AccountOverview.domains"
import {ArrearsDetailsLinesDomain} from "../AccountOverview/AccountOverview.domains"
export function AccountOverviewPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/main
  return focusedPageWithExtraState<FState, AccountOverviewPageDomain, AccountOverviewDomain, Context> ( s => 'Account Overview' ) ( state => state.focusOn('main')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const allButtons =    {agreementType:<ModalButton id={`${id}.agreementType`} text='agreementType'  state={state} modal = 'AgreementType'  
        pageMode='view'
        focusOn='~/agreementType'
      />,
      arrearsDetails:<ModalButton id={`${id}.arrearsDetails`} text='arrearsDetails'  state={state} modal = 'ArrearsDetails'  
        pageMode='view'
        focusOn='~/arrearsDetails'
      />,
      excessHistory:<ModalButton id={`${id}.excessHistory`} text='excessHistory'  state={state} modal = 'ExcessHistory'  
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
      optOut:<ModalButton id={`${id}.optOut`} text='optOut'  state={state} modal = 'OptOut'  
        pageMode='view'
        focusOn='~/optOut'
      />,
      reason:<ModalButton id={`${id}.reason`} text='reason'  state={state} modal = 'Reason'  
        pageMode='view'
        focusOn='~/reason'
      />,}

      return <HideButtonsLayout buttons={allButtons} hide={["reason","arrearsDetails","excessHistory"]}>
          <AccountOverview id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />
      { allButtons.excessInfo } 
      { allButtons.reason } 
      { allButtons.excessHistory } 
      { allButtons.arrearsDetails } 
      { allButtons.flags } 
      { allButtons.optOut } 
      { allButtons.agreementType } 
      </HideButtonsLayout>})}

export function AccountAllFlags({id,state,mode,allButtons,label}: FocusedProps<FState, AccountAllFlagsDomain,Context>){
  return <>
    <TableWithCheckboxInput id={`${id}.flags`} state={state.focusOn('flags')} mode={mode} order={["flagName","flagValue"]} />
</>
}

export function AccountOneFlag({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOneFlagDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.flagName`} state={state.focusOn('flagName')} mode={mode} label='Flag Name' allButtons={allButtons} required={true} />
    <LabelAndBooleanInput id={`${id}.flagValue`} state={state.focusOn('flagValue')} mode={mode} label='Flag Value' allButtons={allButtons} />
</>
}

export function AccountOverview({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewDomain,Context>){
  return <Layout details='[[4,3],[{"count":7,"labelWidth":30, "valueWidth":40}, {"count":6,"labelWidth":30, "valueWidth":30}]]' defaultProps='{"labelWidth": 25}'>
    <LabelAndNumberInput id={`${id}.score`} state={state.focusOn('score')} mode={mode} label='Score' allButtons={allButtons} required={true} />
    <LabelAndRadio id={`${id}.accountType`} state={state.focusOn('accountType')} mode={mode} label='Account Type' allButtons={allButtons} enums={{"savings":"Savings","checking":"Checking"}} />
    <LabelAndDateInput id={`${id}.drawDownDate`} state={state.focusOn('drawDownDate')} mode={mode} label='Drawdown Date' allButtons={allButtons} />
    <LabelAndDateInput id={`${id}.repaymentDate`} state={state.focusOn('repaymentDate')} mode={mode} label='Repayment Date' allButtons={allButtons} />
    <LabelAndNumberInput id={`${id}.propertyValue`} state={state.focusOn('propertyValue')} mode={mode} label='Property Value' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.mul`} state={state.focusOn('mul')} mode={mode} label='MUL' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.drawDownAmount`} state={state.focusOn('drawDownAmount')} mode={mode} label='Drawdown Amount' allButtons={allButtons} required={true} />
    <Table id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} order={["criteria"]} />
    <LabelAndDropdown id={`${id}.zFlagSet`} state={state.focusOn('zFlagSet')} mode={mode} label='Z Flag Set' allButtons={allButtons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["reason"]} />
    <LabelAndNumberInput id={`${id}.excessSixMonths`} state={state.focusOn('excessSixMonths')} mode={mode} label='Times in Excess in past 6 months' allButtons={allButtons} required={true} buttons={["excessHistory"]} />
    <LabelAndNumberInput id={`${id}.bouncedDDs12Months`} state={state.focusOn('bouncedDDs12Months')} mode={mode} label='Number of bounced DDs in the last 12 months' allButtons={allButtons} required={true} />
    <PlusMinusButtonsAndInput id={`${id}.unpaidCardOrMisuseItems`} state={state.focusOn('unpaidCardOrMisuseItems')} mode={mode} label='Unpaid Card Or Misuse Items' allButtons={allButtons} required={true} min={0} flags={pageState(state)<any>().focusOn('accountFlags').focusOn('flags')} />
    <LabelAndNumberInput id={`${id}.currentBalance`} state={state.focusOn('currentBalance')} mode={mode} label='Current Balance' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.currentInterestRate`} state={state.focusOn('currentInterestRate')} mode={mode} label='Current Interest Rate' allButtons={allButtons} required={true} min={0} />
    <AccountOverviewFacilities id={`${id}.facilities`} state={state.focusOn('facilities')} mode={mode} label='Facilities' allButtons={allButtons} />
    <LabelAndNumberInput id={`${id}.highBalance`} state={state.focusOn('highBalance')} mode={mode} label='High Balance' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.lowBalance`} state={state.focusOn('lowBalance')} mode={mode} label='Low Balance' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.pctOfFacility`} state={state.focusOn('pctOfFacility')} mode={mode} label='% of Facility' allButtons={allButtons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.eightyPctFacility`} state={state.focusOn('eightyPctFacility')} mode={mode} label='80.0% Facility' allButtons={allButtons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.eightyFivePctFacility`} state={state.focusOn('eightyFivePctFacility')} mode={mode} label='85.0% Facility' allButtons={allButtons} required={true} min={0} />
</Layout>
}

export function AccountOverviewAgreementType({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewAgreementTypeDomain,Context>){
  return <>
    <LabelAndDropdown id={`${id}.agreementType`} state={state.focusOn('agreementType')} mode={mode} label='Agreement Type' allButtons={allButtons} enums={{"option1":"Savings","checking":"Checking","mixed":"Mixed"}} />
    <LabelAndDropdown id={`${id}.transactionHeading`} state={state.focusOn('transactionHeading')} mode={mode} label='Transaction Heading' allButtons={allButtons} enums={{"option1":"Option1","option2":"Option2","option3":"Option3"}} />
</>
}

export function AccountOverviewCriteriaLine({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewCriteriaLineDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.criteria`} state={state.focusOn('criteria')} mode={mode} label='Criteria' allButtons={allButtons} required={true} />
</>
}

export function AccountOverviewExcessHistoryLine({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewExcessHistoryLineDomain,Context>){
  return <>
    <LabelAndDateInput id={`${id}.start`} state={state.focusOn('start')} mode={mode} label='Start' allButtons={allButtons} />
    <LabelAndDateInput id={`${id}.end`} state={state.focusOn('end')} mode={mode} label='End' allButtons={allButtons} />
    <LabelAndNumberInput id={`${id}.consecutiveDays`} state={state.focusOn('consecutiveDays')} mode={mode} label='Consecutive Days' allButtons={allButtons} required={true} min={0} />
</>
}

export function AccountOverviewExcessInfo({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewExcessInfoDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.dayOfCurrentExcess`} state={state.focusOn('dayOfCurrentExcess')} mode={mode} label='Day Of Current Excess' allButtons={allButtons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.currentExcessOnAccount`} state={state.focusOn('currentExcessOnAccount')} mode={mode} label='Current Excess on Account' allButtons={allButtons} required={true} min={0} />
    <LabelAndNumberInput id={`${id}.currentPctExcess`} state={state.focusOn('currentPctExcess')} mode={mode} label='Current Pct Excess' allButtons={allButtons} required={true} min={0} />
    <LabelAndDateInput id={`${id}.dateOfLastCapitalization`} state={state.focusOn('dateOfLastCapitalization')} mode={mode} label='Date Of Last Capitalization' allButtons={allButtons} />
    <LabelAndDateInput id={`${id}.dateOfLastExcessFulfillment`} state={state.focusOn('dateOfLastExcessFulfillment')} mode={mode} label='Date Of Last Excess Fulfillment' allButtons={allButtons} />
</>
}

export function AccountOverviewFacilities({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewFacilitiesDomain,Context>){
  return <>
    <Table id={`${id}.facilities`} state={state.focusOn('facilities')} mode={mode} maxCount='0' order={["facility","changeDate","unApproved","reason","amount"]} />
</>
}

export function AccountOverviewFacilitiesLine({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewFacilitiesLineDomain,Context>){
  return <>
    <LabelAndNumberInput id={`${id}.facility`} state={state.focusOn('facility')} mode={mode} label='Facility' allButtons={allButtons} required={true} />
    <LabelAndDateInput id={`${id}.changeDate`} state={state.focusOn('changeDate')} mode={mode} label='Change Date' allButtons={allButtons} />
    <LabelAndBooleanInput id={`${id}.unApproved`} state={state.focusOn('unApproved')} mode={mode} label='Un Approved' allButtons={allButtons} />
    <LabelAndStringInput id={`${id}.reason`} state={state.focusOn('reason')} mode={mode} label='Reason' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Amount' allButtons={allButtons} required={true} />
</>
}

export function AccountOverviewHistory({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewHistoryDomain,Context>){
  return <>
    <Table id={`${id}.history`} state={state.focusOn('history')} mode={mode} order={["consecutiveDays","start","end"]} copySelectedItemTo={pageState(state)<any>().focusOn('currentSelectedExcessHistory')} />
</>
}

export function AccountOverviewOptOut({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewOptOutDomain,Context>){
  return <>
    <Table id={`${id}.optOut`} state={state.focusOn('optOut')} mode={mode} order={["optedOut","addrLine5","changedBy","changedDate"]} copySelectedItemTo={pageState(state)<any>().focusOn('optOut')} />
</>
}

export function AccountOverviewOptOutLine({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewOptOutLineDomain,Context>){
  return <>
    <LabelAndBooleanInput id={`${id}.optedOut`} state={state.focusOn('optedOut')} mode={mode} label='Opted Out' allButtons={allButtons} />
    <LabelAndStringInput id={`${id}.addrLine5`} state={state.focusOn('addrLine5')} mode={mode} label='Addr Line5' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.changedBy`} state={state.focusOn('changedBy')} mode={mode} label='Changed By' allButtons={allButtons} required={true} />
    <LabelAndDateInput id={`${id}.changedDate`} state={state.focusOn('changedDate')} mode={mode} label='Changed Date' allButtons={allButtons} />
</>
}

export function AccountOverviewReason({id,state,mode,allButtons,label}: FocusedProps<FState, AccountOverviewReasonDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.reason`} state={state.focusOn('reason')} mode={mode} label='Reason' allButtons={allButtons} required={true} />
</>
}

export function ArrearsDetails({id,state,mode,allButtons,label}: FocusedProps<FState, ArrearsDetailsDomain,Context>){
  return <>
    <Table id={`${id}.details`} state={state.focusOn('details')} mode={mode} order={["collectionsDate","creditedDate","minPayment","contractualAmount","paymentType","paymentReceived","shortfall","arrearsTotal","missedPayments"]} />
</>
}

export function ArrearsDetailsLine({id,state,mode,allButtons,label}: FocusedProps<FState, ArrearsDetailsLineDomain,Context>){
  return <>
    <LabelAndDateInput id={`${id}.collectionsDate`} state={state.focusOn('collectionsDate')} mode={mode} label='Collections Date' allButtons={allButtons} />
    <LabelAndDateInput id={`${id}.creditedDate`} state={state.focusOn('creditedDate')} mode={mode} label='Credited Date' allButtons={allButtons} />
    <LabelAndNumberInput id={`${id}.minPayment`} state={state.focusOn('minPayment')} mode={mode} label='Min Payment' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.contractualAmount`} state={state.focusOn('contractualAmount')} mode={mode} label='Contractual Amount' allButtons={allButtons} required={true} />
    <LabelAndDropdown id={`${id}.paymentType`} state={state.focusOn('paymentType')} mode={mode} label='Payment Type' allButtons={allButtons} enums={{"dd":"DD","ddResubmit":"DD Resubmit"}} />
    <LabelAndNumberInput id={`${id}.paymentReceived`} state={state.focusOn('paymentReceived')} mode={mode} label='Payment Received' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.shortfall`} state={state.focusOn('shortfall')} mode={mode} label='Shortfall' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.arrearsTotal`} state={state.focusOn('arrearsTotal')} mode={mode} label='Arrears Total' allButtons={allButtons} required={true} />
    <LabelAndNumberInput id={`${id}.missedPayments`} state={state.focusOn('missedPayments')} mode={mode} label='Missed Payments' allButtons={allButtons} required={true} min={0} />
</>
}
