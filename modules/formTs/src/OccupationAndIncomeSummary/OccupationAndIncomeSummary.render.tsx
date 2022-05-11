import * as empty from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.empty';
import * as domain from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { OccupationAndIncomeSummaryOptionals } from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.optionals";
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndDropdown } from '@focuson/form_components';
import { LabelAndNumberInput } from '@focuson/form_components';
import { Table } from '@focuson/form_components';
import { SelectedItem } from '@focuson/form_components';
import { LabelAndDateInput } from '@focuson/form_components';
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
import {OccupationAndIncomeSummaryPageDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains";
import { HideButtonsLayout } from '@focuson/form_components';
import {AccountDetailsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {AdditionalInformationDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {BusinessDetailsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {BusinessDetailsMainDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {BusinessFinancialDetailsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {ContractTypesResponseDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {CustomerOccupationIncomeDetailsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {DetailsOfNonRecurringItemsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {DetailsOfReevaluationOfAssetsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {DropdownsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {EmploymentStatusDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {FrequenciesResponseDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {ListOccupationsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OccupationAndIncomeFullDomainDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OccupationDescriptionResponseDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OccupationsListDataDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OneOccupationIncomeDetailsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OtherIncomeResponseDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
export function OccupationAndIncomeSummaryPage(){
   //A compilation error here is often because you have specified the wrong path in display. The path you gave is ~/fromApi
  return focusedPageWithExtraState<FState, OccupationAndIncomeSummaryPageDomain, OccupationAndIncomeFullDomainDomain, Context> ( s => 'Occupation And Income Summary' ) ( state => state.focusOn('fromApi')) (
( fullState, state , full, d, mode, index) => {
const id=`page${index}`;
  const allButtons =    {addEntry:<ModalButton id={`${id}.addEntry`} text='addEntry'  state={state} modal = 'OccupationIncomeModal'  
        pageMode='create'
        focusOn='~/temp'
        copyOnClose={[{"to":"#currentOccupation/[$append]"}]}
        createEmpty={empty.emptyOneOccupationIncomeDetails}
        setToLengthOnClose={{"variable":"#selected","array":"#currentOccupation"}}
      />,
      additionalInfo:<ModalButton id={`${id}.additionalInfo`} text='additionalInfo'  state={state} modal = 'AdditionalInformationModal'  
        pageMode='edit'
        focusOn='~/additionalInformation'
      />,
      businessDetails:<ModalButton id={`${id}.businessDetails`} text='businessDetails'  state={state} modal = 'BusinessDetailsModal'  
        pageMode='edit'
        focusOn='~/businessDetails'
      />,
      edit:<ModalButton id={`${id}.edit`} text='edit'  state={state} modal = 'OccupationIncomeModal'  
        pageMode='edit'
        focusOn='~/temp'
        copy={[{"from":"#currentOccupation[#selected]"}]}
        copyOnClose={[{"to":"#currentOccupation[#selected]"}]}
      />,
      list:<ModalButton id={`${id}.list`} text='list'  state={state} modal = 'ListOccupationsModal'  
        pageMode='edit'
        focusOn='~/occupation'
        copy={[{"from":"#currentOccupation[#selected]/occupation","to":"~/occupation/search"},{"from":"#currentOccupation[#selected]/occupation","to":"~/occupation/selectedOccupationName"}]}
        copyOnClose={[{"from":"~/occupation/selectedOccupationName","to":"#currentOccupation[#selected]/occupation"}]}
      />,
      mainOrJoint:<ToggleButton id={`${id}.mainOrJoint`} state={fullState.focusOn('mainOrJoint')}
        buttonText='Showing {~/mainOrJoint|Main|Joint}'
         />,
      nextOccupation:<ListNextButton id={`${id}.nextOccupation`} title='Next' list={state.copyWithLens(OccupationAndIncomeSummaryOptionals.currentOccupation(identityL))} value={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL))} />,
      otherSourcesOfIncome:<ModalButton id={`${id}.otherSourcesOfIncome`} text='otherSourcesOfIncome'  state={state} modal = 'OtherSourcesOfIncomeModal'  
        pageMode='edit'
        focusOn='~/otherSourcesOfIncome'
      />,
      prevOccupation:<ListPrevButton id={`${id}.prevOccupation`} title='Prev' list={state.copyWithLens(OccupationAndIncomeSummaryOptionals.currentOccupation(identityL))} value={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL))} />,}

      return <HideButtonsLayout buttons={allButtons} hide={["additionalInfo","businessDetails","otherSourcesOfIncome","list"]}>
          <OccupationAndIncomeFullDomain id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />
      { allButtons.mainOrJoint } 
      { allButtons.nextOccupation } 
      { allButtons.prevOccupation } 
      { allButtons.addEntry } 
      { allButtons.edit } 
      { allButtons.additionalInfo } 
      { allButtons.businessDetails } 
      { allButtons.otherSourcesOfIncome } 
      { allButtons.list } 
      </HideButtonsLayout>})}

export function AccountDetails({id,state,mode,allButtons,label}: FocusedProps<FState, AccountDetailsDomain,Context>){
  return <>
    <LabelAndDropdown id={`${id}.contactTitle`} state={state.focusOn('contactTitle')} mode={mode} label='Contact Title' allButtons={allButtons} enums={{"X":"","MR":"Mr","MRS":"Mrs","MISS":"Miss","MS":"Ms","DR":"Dr","REV":"Rev","PROF":"Prof","SIR":"Sir","CAPTAIN":"Captain","LADY":"Lady","MAJOR":"Major","MASTER":"Master","LORD":"Lord","COLONEL":"Colonel","BARON":"Baron","VISCOUNT":"Viscount","BRIGADIER":"Brigadier","LIEUT_COL":"Lieut Col","FRAU":"Frau","HERR":"Herr","FATHER":"Father","MESSRS":"Messrs","MADAM":"Madam"}} />
    <LabelAndStringInput id={`${id}.contactForename`} state={state.focusOn('contactForename')} mode={mode} label='Contact Forename' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.contactSurname`} state={state.focusOn('contactSurname')} mode={mode} label='Contact Surname' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.practice`} state={state.focusOn('practice')} mode={mode} label='Practice' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.telephone`} state={state.focusOn('telephone')} mode={mode} label='Telephone' allButtons={allButtons} required={true} />
</>
}

export function AdditionalInformation({id,state,mode,allButtons,label}: FocusedProps<FState, AdditionalInformationDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.applicantName`} state={state.focusOn('applicantName')} mode={mode} label='Applicant Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.employerName`} state={state.focusOn('employerName')} mode={mode} label='Employer Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={allButtons} required={true} />
</>
}

export function BusinessDetails({id,state,mode,allButtons,label}: FocusedProps<FState, BusinessDetailsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.applicantName`} state={state.focusOn('applicantName')} mode={mode} label='Applicant Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.businessName`} state={state.focusOn('businessName')} mode={mode} label='Business Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={allButtons} required={true} />
</>
}

export function BusinessDetailsMain({id,state,mode,allButtons,label}: FocusedProps<FState, BusinessDetailsMainDomain,Context>){
  return <>
    <BusinessDetails id={`${id}.businessDetails`} state={state.focusOn('businessDetails')} mode={mode} label='Business Details' allButtons={allButtons} />
    <BusinessFinancialDetails id={`${id}.businessFinancialDetails`} state={state.focusOn('businessFinancialDetails')} mode={mode} label='Business Financial Details' allButtons={allButtons} />
    <DetailsOfNonRecurringItems id={`${id}.detailsOfNonRecurringItems`} state={state.focusOn('detailsOfNonRecurringItems')} mode={mode} label='Details Of Non Recurring Items' allButtons={allButtons} />
    <DetailsOfReevaluationOfAssets id={`${id}.detailsOfReevaluationOfAssets`} state={state.focusOn('detailsOfReevaluationOfAssets')} mode={mode} label='Details Of Reevaluation Of Assets' allButtons={allButtons} />
    <AccountDetails id={`${id}.accountantDetails`} state={state.focusOn('accountantDetails')} mode={mode} label='Accountant Details' allButtons={allButtons} />
</>
}

export function BusinessFinancialDetails({id,state,mode,allButtons,label}: FocusedProps<FState, BusinessFinancialDetailsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.turnoverLastYear`} state={state.focusOn('turnoverLastYear')} mode={mode} label='Turnover Last Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.turnoverPenultimateYear`} state={state.focusOn('turnoverPenultimateYear')} mode={mode} label='Turnover Penultimate Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.netProfitLastYear`} state={state.focusOn('netProfitLastYear')} mode={mode} label='Net Profit Last Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.netProfitPenultimateYear`} state={state.focusOn('netProfitPenultimateYear')} mode={mode} label='Net Profit Penultimate Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.drawingsLastYear`} state={state.focusOn('drawingsLastYear')} mode={mode} label='Drawings Last Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.drawingsPenultimateYear`} state={state.focusOn('drawingsPenultimateYear')} mode={mode} label='Drawings Penultimate Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.dividendsLastYear`} state={state.focusOn('dividendsLastYear')} mode={mode} label='Dividends Last Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.dividendsPenultimateYear`} state={state.focusOn('dividendsPenultimateYear')} mode={mode} label='Dividends Penultimate Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.netAssetsLastYear`} state={state.focusOn('netAssetsLastYear')} mode={mode} label='Net Assets Last Year' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.netAssetsPenultimateYear`} state={state.focusOn('netAssetsPenultimateYear')} mode={mode} label='Net Assets Penultimate Year' allButtons={allButtons} required={true} />
</>
}

export function ContractTypesResponse({id,state,mode,allButtons,label}: FocusedProps<FState, ContractTypesResponseDomain,Context>){
  return <>
</>
}

export function DetailsOfNonRecurringItems({id,state,mode,allButtons,label}: FocusedProps<FState, DetailsOfNonRecurringItemsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.nonRecurringItems`} state={state.focusOn('nonRecurringItems')} mode={mode} label='Non Recurring Items' allButtons={allButtons} required={true} />
</>
}

export function DetailsOfReevaluationOfAssets({id,state,mode,allButtons,label}: FocusedProps<FState, DetailsOfReevaluationOfAssetsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.revaluationOfAssets`} state={state.focusOn('revaluationOfAssets')} mode={mode} label='Revaluation Of Assets' allButtons={allButtons} required={true} />
</>
}

export function Dropdowns({id,state,mode,allButtons,label}: FocusedProps<FState, DropdownsDomain,Context>){
  return <>
    <OccupationDescriptionResponse id={`${id}.occupationDescriptionResponse`} state={state.focusOn('occupationDescriptionResponse')} mode={mode} label='Occupation Description Response' allButtons={allButtons} />
    <EmploymentStatus id={`${id}.employmentStatus`} state={state.focusOn('employmentStatus')} mode={mode} label='Employment Status' allButtons={allButtons} />
    <ContractTypesResponse id={`${id}.contractTypesResponse`} state={state.focusOn('contractTypesResponse')} mode={mode} label='Contract Types Response' allButtons={allButtons} />
    <FrequenciesResponse id={`${id}.frequenciesResponse`} state={state.focusOn('frequenciesResponse')} mode={mode} label='Frequencies Response' allButtons={allButtons} />
</>
}

export function EmploymentStatus({id,state,mode,allButtons,label}: FocusedProps<FState, EmploymentStatusDomain,Context>){
  return <>
</>
}

export function FrequenciesResponse({id,state,mode,allButtons,label}: FocusedProps<FState, FrequenciesResponseDomain,Context>){
  return <>
</>
}

export function ListOccupations({id,state,mode,allButtons,label}: FocusedProps<FState, ListOccupationsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.search`} state={state.focusOn('search')} mode={mode} label='Search' allButtons={allButtons} required={true} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["descTypeName"]} copySelectedItemTo={pageState(state)<any>().focusOn('{basePage}').focusOn('fromApi').focusOn('customerOccupationIncomeDetails').focusOn('{selectedItem}').focusOn('occupation')} />
</>
}

export function OccupationAndIncomeFullDomain({id,state,mode,allButtons,label}: FocusedProps<FState, OccupationAndIncomeFullDomainDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.mainCustomerName`} state={state.focusOn('mainCustomerName')} mode={mode} label='Main Customer Name' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.jointCustomerName`} state={state.focusOn('jointCustomerName')} mode={mode} label='Joint Customer Name' allButtons={allButtons} required={true} />
    <SelectedItem id={`${id}.customerOccupationIncomeDetails`} state={state.focusOn('customerOccupationIncomeDetails')} mode={mode} allButtons={allButtons} index={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL)).json()} display={OneOccupationIncomeDetails} />
</>
}

export function OccupationDescriptionResponse({id,state,mode,allButtons,label}: FocusedProps<FState, OccupationDescriptionResponseDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.descTypeName`} state={state.focusOn('descTypeName')} mode={mode} label='Desc Type Name' allButtons={allButtons} required={true} />
</>
}

export function OneOccupationIncomeDetails({id,state,mode,allButtons,label}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){
const areYouGuard = state.focusOn('areYou').optJson();
const employmentTypeGuard = state.focusOn('employmentType').optJson();
const otherSourceOfIncomeGuard = state.focusOn('otherSourceOfIncome').optJson();
const owningSharesPctGuard = state.focusOn('owningSharesPct').optJson();
const ownShareOfTheCompanyGuard = state.focusOn('ownShareOfTheCompany').optJson();
  return <Layout details='[[3,3],[{"count":5,"labelWidth":70, "valueWidth":40},5],[30]]' title='Current employment details - '>
    <LabelAndDropdown id={`${id}.areYou`} state={state.focusOn('areYou')} mode={mode} label='Are {~/mainOrJoint|you|they}... ' allButtons={allButtons} enums={{"X":"","E":"Employed","S":"Self Employed","C":"Currently not earning","R":"Retired","T":"Student","U":"Unknown","H":"Home Family Responsibilities"}} />
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.occupation`} state={state.focusOn('occupation')} mode={mode} label='What is {~/mainOrJoint|your|their} occupation? ' allButtons={allButtons} required={true} buttons={["list"]} /></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.customerDescription`} state={state.focusOn('customerDescription')} mode={mode} label='Customers description: ' allButtons={allButtons} required={true} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><LabelAndDropdown id={`${id}.ownShareOfTheCompany`} state={state.focusOn('ownShareOfTheCompany')} mode={mode} label='Do {~/mainOrJoint|you|they} own a share of the company? ' allButtons={allButtons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={ownShareOfTheCompanyGuard} cond={["Y"]}><LabelAndDropdown id={`${id}.owningSharesPct`} state={state.focusOn('owningSharesPct')} mode={mode} label='Is this 20% or more of it? ' allButtons={allButtons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndStringInput id={`${id}.workFor`} state={state.focusOn('workFor')} mode={mode} label='Who do {~/mainOrJoint|you|they} work for? ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndDropdown id={`${id}.employmentType`} state={state.focusOn('employmentType')} mode={mode} label='Is this employment... ' allButtons={allButtons} enums={{"0":"","1":"Permanent","2":"Temporary","3":"Contract"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["1"]}><LabelAndDateInput id={`${id}.empStartDate`} state={state.focusOn('empStartDate')} mode={mode} label='When did this employment start? (mm/yyyy) ' allButtons={allButtons} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["2","3"]}><LabelAndDateInput id={`${id}.empEndDate`} state={state.focusOn('empEndDate')} mode={mode} label='When will it finish? (mm/yyyy) ' allButtons={allButtons} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualSalaryBeforeDeduction`} state={state.focusOn('annualSalaryBeforeDeduction')} mode={mode} label='What is {~/mainOrJoint|your|their} annual salary? (before deductions) ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualIncomeExcludingRent`} state={state.focusOn('annualIncomeExcludingRent')} mode={mode} label='Do {~/mainOrJoint|you|they} have any other guaranteed annual income? (excluding rent) ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.regularCommissionBonus`} state={state.focusOn('regularCommissionBonus')} mode={mode} label='Do {~/mainOrJoint|you|they} have any regular commission, bonus or overtime? ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatTypeOfBusiness`} state={state.focusOn('whatTypeOfBusiness')} mode={mode} label='What type of business is it? ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatNameBusiness`} state={state.focusOn('whatNameBusiness')} mode={mode} label='What is its name: ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.establishedYear`} state={state.focusOn('establishedYear')} mode={mode} label='When was it established? (MM/YYYY) ' allButtons={allButtons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndNumberInput id={`${id}.annualDrawing3Yrs`} state={state.focusOn('annualDrawing3Yrs')} mode={mode} label='What are {~/mainOrJoint|your|their} average annual drawings over the past 3 years? ' allButtons={allButtons} required={true} /></Guard></Guard>
    <LabelAndDropdown id={`${id}.otherSourceOfIncome`} state={state.focusOn('otherSourceOfIncome')} mode={mode} label='Do {~/mainOrJoint|you|they} have another sources of income (e.g. rental income) ? ' allButtons={allButtons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["otherSourcesOfIncome"]} />
    <LabelAndStringInput id={`${id}.createdBy`} state={state.focusOn('createdBy')} mode={mode} label='Entry created by: ' allButtons={allButtons} required={true} />
    <LabelAndDateInput id={`${id}.createdDate`} state={state.focusOn('createdDate')} mode={mode} label='on ' allButtons={allButtons} />
</Layout>
}

export function OtherIncomeResponse({id,state,mode,allButtons,label}: FocusedProps<FState, OtherIncomeResponseDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.clientOtherIncomeSeq`} state={state.focusOn('clientOtherIncomeSeq')} mode={mode} label='Client Other Income Seq' allButtons={allButtons} required={true} />
    <LabelAndStringInput id={`${id}.otherIncomeType`} state={state.focusOn('otherIncomeType')} mode={mode} label='Other Income Type' allButtons={allButtons} required={true} />
    <LabelAndDropdown id={`${id}.incomeFreqRef`} state={state.focusOn('incomeFreqRef')} mode={mode} label='Income Freq Ref' allButtons={allButtons} enums={{"0":"","1":"Annual","2":"Monthly","3":"Quarterly","4":"Half-Yearly","5":"Fortnightly","6":"Weekly"}} />
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Amount' allButtons={allButtons} required={true} />
</>
}
