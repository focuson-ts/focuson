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
import { Layout } from '@focuson/form_components';
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
  const buttons =    {addEntry:<ModalButton id={`${id}.addEntry`} text='addEntry'  state={state} modal = 'OccupationIncomeModal'  
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

      return <HideButtonsLayout buttons={buttons} hide={["additionalInfo","businessDetails","otherSourcesOfIncome","list"]}>
          <OccupationAndIncomeFullDomain id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.mainOrJoint } 
      { buttons.nextOccupation } 
      { buttons.prevOccupation } 
      { buttons.addEntry } 
      { buttons.edit } 
      { buttons.additionalInfo } 
      { buttons.businessDetails } 
      { buttons.otherSourcesOfIncome } 
      { buttons.list } 
      </HideButtonsLayout>})}

export function AccountDetails({id,state,mode,buttons}: FocusedProps<FState, AccountDetailsDomain,Context>){
  return <>
    <LabelAndDropdown id={`${id}.contactTitle`} state={state.focusOn('contactTitle')} mode={mode} label='Contact Title' allButtons={buttons} enums={{"X":"","MR":"Mr","MRS":"Mrs","MISS":"Miss","MS":"Ms","DR":"Dr","REV":"Rev","PROF":"Prof","SIR":"Sir","CAPTAIN":"Captain","LADY":"Lady","MAJOR":"Major","MASTER":"Master","LORD":"Lord","COLONEL":"Colonel","BARON":"Baron","VISCOUNT":"Viscount","BRIGADIER":"Brigadier","LIEUT_COL":"Lieut Col","FRAU":"Frau","HERR":"Herr","FATHER":"Father","MESSRS":"Messrs","MADAM":"Madam"}} />
    <LabelAndStringInput id={`${id}.contactForename`} state={state.focusOn('contactForename')} mode={mode} label='Contact Forename' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.contactSurname`} state={state.focusOn('contactSurname')} mode={mode} label='Contact Surname' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.practice`} state={state.focusOn('practice')} mode={mode} label='Practice' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.telephone`} state={state.focusOn('telephone')} mode={mode} label='Telephone' allButtons={buttons} required={true} />
</>
}

export function AdditionalInformation({id,state,mode,buttons}: FocusedProps<FState, AdditionalInformationDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.applicantName`} state={state.focusOn('applicantName')} mode={mode} label='Applicant Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.employerName`} state={state.focusOn('employerName')} mode={mode} label='Employer Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={buttons} required={true} />
</>
}

export function BusinessDetails({id,state,mode,buttons}: FocusedProps<FState, BusinessDetailsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.applicantName`} state={state.focusOn('applicantName')} mode={mode} label='Applicant Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.businessName`} state={state.focusOn('businessName')} mode={mode} label='Business Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='Address Line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='Address Line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='Address Line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='Address Line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='Postcode' allButtons={buttons} required={true} />
</>
}

export function BusinessDetailsMain({id,state,mode,buttons}: FocusedProps<FState, BusinessDetailsMainDomain,Context>){
  return <>
    <BusinessDetails id={`${id}.businessDetails`} state={state.focusOn('businessDetails')} mode={mode} buttons={buttons} />
    <BusinessFinancialDetails id={`${id}.businessFinancialDetails`} state={state.focusOn('businessFinancialDetails')} mode={mode} buttons={buttons} />
    <DetailsOfNonRecurringItems id={`${id}.detailsOfNonRecurringItems`} state={state.focusOn('detailsOfNonRecurringItems')} mode={mode} buttons={buttons} />
    <DetailsOfReevaluationOfAssets id={`${id}.detailsOfReevaluationOfAssets`} state={state.focusOn('detailsOfReevaluationOfAssets')} mode={mode} buttons={buttons} />
    <AccountDetails id={`${id}.accountantDetails`} state={state.focusOn('accountantDetails')} mode={mode} buttons={buttons} />
</>
}

export function BusinessFinancialDetails({id,state,mode,buttons}: FocusedProps<FState, BusinessFinancialDetailsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.turnoverLastYear`} state={state.focusOn('turnoverLastYear')} mode={mode} label='Turnover Last Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.turnoverPenultimateYear`} state={state.focusOn('turnoverPenultimateYear')} mode={mode} label='Turnover Penultimate Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netProfitLastYear`} state={state.focusOn('netProfitLastYear')} mode={mode} label='Net Profit Last Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netProfitPenultimateYear`} state={state.focusOn('netProfitPenultimateYear')} mode={mode} label='Net Profit Penultimate Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.drawingsLastYear`} state={state.focusOn('drawingsLastYear')} mode={mode} label='Drawings Last Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.drawingsPenultimateYear`} state={state.focusOn('drawingsPenultimateYear')} mode={mode} label='Drawings Penultimate Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dividendsLastYear`} state={state.focusOn('dividendsLastYear')} mode={mode} label='Dividends Last Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dividendsPenultimateYear`} state={state.focusOn('dividendsPenultimateYear')} mode={mode} label='Dividends Penultimate Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netAssetsLastYear`} state={state.focusOn('netAssetsLastYear')} mode={mode} label='Net Assets Last Year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netAssetsPenultimateYear`} state={state.focusOn('netAssetsPenultimateYear')} mode={mode} label='Net Assets Penultimate Year' allButtons={buttons} required={true} />
</>
}

export function ContractTypesResponse({id,state,mode,buttons}: FocusedProps<FState, ContractTypesResponseDomain,Context>){
  return <>
</>
}

export function DetailsOfNonRecurringItems({id,state,mode,buttons}: FocusedProps<FState, DetailsOfNonRecurringItemsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.nonRecurringItems`} state={state.focusOn('nonRecurringItems')} mode={mode} label='Non Recurring Items' allButtons={buttons} required={true} />
</>
}

export function DetailsOfReevaluationOfAssets({id,state,mode,buttons}: FocusedProps<FState, DetailsOfReevaluationOfAssetsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.revaluationOfAssets`} state={state.focusOn('revaluationOfAssets')} mode={mode} label='Revaluation Of Assets' allButtons={buttons} required={true} />
</>
}

export function Dropdowns({id,state,mode,buttons}: FocusedProps<FState, DropdownsDomain,Context>){
  return <>
    <OccupationDescriptionResponse id={`${id}.occupationDescriptionResponse`} state={state.focusOn('occupationDescriptionResponse')} mode={mode} buttons={buttons} />
    <EmploymentStatus id={`${id}.employmentStatus`} state={state.focusOn('employmentStatus')} mode={mode} buttons={buttons} />
    <ContractTypesResponse id={`${id}.contractTypesResponse`} state={state.focusOn('contractTypesResponse')} mode={mode} buttons={buttons} />
    <FrequenciesResponse id={`${id}.frequenciesResponse`} state={state.focusOn('frequenciesResponse')} mode={mode} buttons={buttons} />
</>
}

export function EmploymentStatus({id,state,mode,buttons}: FocusedProps<FState, EmploymentStatusDomain,Context>){
  return <>
</>
}

export function FrequenciesResponse({id,state,mode,buttons}: FocusedProps<FState, FrequenciesResponseDomain,Context>){
  return <>
</>
}

export function ListOccupations({id,state,mode,buttons}: FocusedProps<FState, ListOccupationsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.search`} state={state.focusOn('search')} mode={mode} label='Search' allButtons={buttons} required={true} />
    <Table id={`${id}.searchResults`} state={state.focusOn('searchResults')} mode={mode} order={["descTypeName"]} copySelectedItemTo={pageState(state)<any>().focusOn('{basePage}').focusOn('fromApi').focusOn('customerOccupationIncomeDetails').focusOn('{selectedItem}').focusOn('occupation')} />
</>
}

export function OccupationAndIncomeFullDomain({id,state,mode,buttons}: FocusedProps<FState, OccupationAndIncomeFullDomainDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.mainCustomerName`} state={state.focusOn('mainCustomerName')} mode={mode} label='Main Customer Name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.jointCustomerName`} state={state.focusOn('jointCustomerName')} mode={mode} label='Joint Customer Name' allButtons={buttons} required={true} />
    <SelectedItem id={`${id}.customerOccupationIncomeDetails`} state={state.focusOn('customerOccupationIncomeDetails')} mode={mode} buttons={buttons} index={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL)).json()} display={OneOccupationIncomeDetails} />
</>
}

export function OccupationDescriptionResponse({id,state,mode,buttons}: FocusedProps<FState, OccupationDescriptionResponseDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.descTypeName`} state={state.focusOn('descTypeName')} mode={mode} label='Desc Type Name' allButtons={buttons} required={true} />
</>
}

export function OneOccupationIncomeDetails({id,state,mode,buttons}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){
const areYouGuard = state.focusOn('areYou').optJson();
const employmentTypeGuard = state.focusOn('employmentType').optJson();
const otherSourceOfIncomeGuard = state.focusOn('otherSourceOfIncome').optJson();
const owningSharesPctGuard = state.focusOn('owningSharesPct').optJson();
const ownShareOfTheCompanyGuard = state.focusOn('ownShareOfTheCompany').optJson();
  return <Layout details='[[3,3],[{"count":5,"labelWidth":70, "valueWidth":40},5],[30]]' title='Current employment details - '>
    <LabelAndDropdown id={`${id}.areYou`} state={state.focusOn('areYou')} mode={mode} label='Are {~/mainOrJoint|you|they}... ' allButtons={buttons} enums={{"X":"","E":"Employed","S":"Self Employed","C":"Currently not earning","R":"Retired","T":"Student","U":"Unknown","H":"Home Family Responsibilities"}} />
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.occupation`} state={state.focusOn('occupation')} mode={mode} label='What is {~/mainOrJoint|your|their} occupation? ' allButtons={buttons} required={true} buttons={["list"]} /></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.customerDescription`} state={state.focusOn('customerDescription')} mode={mode} label='Customers description: ' allButtons={buttons} required={true} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><LabelAndDropdown id={`${id}.ownShareOfTheCompany`} state={state.focusOn('ownShareOfTheCompany')} mode={mode} label='Do {~/mainOrJoint|you|they} own a share of the company? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={ownShareOfTheCompanyGuard} cond={["Y"]}><LabelAndDropdown id={`${id}.owningSharesPct`} state={state.focusOn('owningSharesPct')} mode={mode} label='Is this 20% or more of it? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndStringInput id={`${id}.workFor`} state={state.focusOn('workFor')} mode={mode} label='Who do {~/mainOrJoint|you|they} work for? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndDropdown id={`${id}.employmentType`} state={state.focusOn('employmentType')} mode={mode} label='Is this employment... ' allButtons={buttons} enums={{"0":"","1":"Permanent","2":"Temporary","3":"Contract"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["1"]}><LabelAndStringInput id={`${id}.empStartDate`} state={state.focusOn('empStartDate')} mode={mode} label='When did this employment start? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["2","3"]}><LabelAndStringInput id={`${id}.empEndDate`} state={state.focusOn('empEndDate')} mode={mode} label='When will it finish? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualSalaryBeforeDeduction`} state={state.focusOn('annualSalaryBeforeDeduction')} mode={mode} label='What is {~/mainOrJoint|your|their} annual salary? (before deductions) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualIncomeExcludingRent`} state={state.focusOn('annualIncomeExcludingRent')} mode={mode} label='Do {~/mainOrJoint|you|they} have any other guaranteed annual income? (excluding rent) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.regularCommissionBonus`} state={state.focusOn('regularCommissionBonus')} mode={mode} label='Do {~/mainOrJoint|you|they} have any regular commission, bonus or overtime? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatTypeOfBusiness`} state={state.focusOn('whatTypeOfBusiness')} mode={mode} label='What type of business is it? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatNameBusiness`} state={state.focusOn('whatNameBusiness')} mode={mode} label='What is its name: ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.establishedYear`} state={state.focusOn('establishedYear')} mode={mode} label='When was it established? (MM/YYYY) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndNumberInput id={`${id}.annualDrawing3Yrs`} state={state.focusOn('annualDrawing3Yrs')} mode={mode} label='What are {~/mainOrJoint|your|their} average annual drawings over the past 3 years? ' allButtons={buttons} required={true} /></Guard></Guard>
    <LabelAndDropdown id={`${id}.otherSourceOfIncome`} state={state.focusOn('otherSourceOfIncome')} mode={mode} label='Do {~/mainOrJoint|you|they} have another sources of income (e.g. rental income) ? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["otherSourcesOfIncome"]} />
    <LabelAndStringInput id={`${id}.createdBy`} state={state.focusOn('createdBy')} mode={mode} label='Entry created by: ' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.createdDate`} state={state.focusOn('createdDate')} mode={mode} label='on ' allButtons={buttons} required={true} />
</Layout>
}

export function OtherIncomeResponse({id,state,mode,buttons}: FocusedProps<FState, OtherIncomeResponseDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.clientOtherIncomeSeq`} state={state.focusOn('clientOtherIncomeSeq')} mode={mode} label='Client Other Income Seq' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.otherIncomeType`} state={state.focusOn('otherIncomeType')} mode={mode} label='Other Income Type' allButtons={buttons} required={true} />
    <LabelAndDropdown id={`${id}.incomeFreqRef`} state={state.focusOn('incomeFreqRef')} mode={mode} label='Income Freq Ref' allButtons={buttons} enums={{"0":"","1":"Annual","2":"Monthly","3":"Quarterly","4":"Half-Yearly","5":"Fortnightly","6":"Weekly"}} />
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='Amount' allButtons={buttons} required={true} />
</>
}
