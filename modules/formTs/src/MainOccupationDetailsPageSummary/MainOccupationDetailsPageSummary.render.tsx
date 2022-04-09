import * as empty from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.empty';
import * as domain from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
import { MainOccupationDetailsPageSummaryOptionals } from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.optionals";
import { LabelAndStringInput } from '@focuson/form_components';
import { LabelAndNumberInput } from '@focuson/form_components';
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
import {MainOccupationDetailsPageSummaryPageDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains";
import { HideButtonsLayout } from '@focuson/form_components';
import {AdditionalInfoFirstDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import {AdditionalInfoSecondDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import {FromApiDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import {ListOccupationsDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import {OccupationAndIncomeFullDomainDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import {OneOccupationIncomeDetailsDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
import {OtherIncomeResponseDomain} from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains"
export function MainOccupationDetailsPageSummaryPage(){
  return focusedPageWithExtraState<FState, MainOccupationDetailsPageSummaryPageDomain, OccupationAndIncomeFullDomainDomain, Context> ( s => 'Main Occupation Details Page Summary' ) ( state => state.focusOn('fromApi').focusOn('occupationAndIncome')) (
( fullState, state , full, d, mode, index) => {
const id=`root${index}`;
  const buttons =    {edit:<ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModal'  
        pageMode='edit'
        focusOn='~/tempForOccupationEdit'
        copy={[{"from":"~/fromApi/occupationAndIncome/customerOccupationIncomeDetails"}]}
        copyOnClose={[{"to":"~/fromApi/occupationAndIncome/customerOccupationIncomeDetails"}]}
      />,}

      return <HideButtonsLayout buttons={buttons} hide={["additionalInfoFirst","additionalInfoSecond","otherSourcesOfIncome","list"]}>
          <OccupationAndIncomeFullDomain id={`${id}`} state={state} mode={mode} buttons={buttons} />
      { buttons.edit } 
      </HideButtonsLayout>})}

export function AdditionalInfoFirst({id,state,mode,buttons}: FocusedProps<FState, AdditionalInfoFirstDomain,Context>){
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

export function AdditionalInfoSecond({id,state,mode,buttons}: FocusedProps<FState, AdditionalInfoSecondDomain,Context>){
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

export function FromApi({id,state,mode,buttons}: FocusedProps<FState, FromApiDomain,Context>){
  return <>
    <OccupationAndIncomeFullDomain id={`${id}.occupationAndIncome`} state={state.focusOn('occupationAndIncome')} mode={mode} buttons={buttons} />
    <AdditionalInfoFirst id={`${id}.additionalInfoFirst`} state={state.focusOn('additionalInfoFirst')} mode={mode} buttons={buttons} />
    <AdditionalInfoSecond id={`${id}.additionalInfoSecond`} state={state.focusOn('additionalInfoSecond')} mode={mode} buttons={buttons} />
    <OtherIncomeResponse id={`${id}.otherSourcesOfIncome`} state={state.focusOn('otherSourcesOfIncome')} mode={mode} buttons={buttons} />
    <ListOccupations id={`${id}.occupationsList`} state={state.focusOn('occupationsList')} mode={mode} buttons={buttons} />
</>
}

export function ListOccupations({id,state,mode,buttons}: FocusedProps<FState, ListOccupationsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.descTypeName`} state={state.focusOn('descTypeName')} mode={mode} label='Desc Type Name' allButtons={buttons} required={true} />
</>
}

export function OccupationAndIncomeFullDomain({id,state,mode,buttons}: FocusedProps<FState, OccupationAndIncomeFullDomainDomain,Context>){
  return <Layout details='[[1,1],[30]]'>
    <LabelAndStringInput id={`${id}.mainCustomerName`} state={state.focusOn('mainCustomerName')} mode={mode} label='Main Customer Name' allButtons={buttons} required={true} />
    <OneOccupationIncomeDetails id={`${id}.customerOccupationIncomeDetails`} state={state.focusOn('customerOccupationIncomeDetails')} mode={mode} buttons={buttons} />
</Layout>
}

export function OneOccupationIncomeDetails({id,state,mode,buttons}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){
const areYouGuard = state.focusOn('areYou').optJson();
const employmentTypeGuard = state.focusOn('employmentType').optJson();
const otherSourceOfIncomeGuard = state.focusOn('otherSourceOfIncome').optJson();
const owningSharesPctGuard = state.focusOn('owningSharesPct').optJson();
const ownShareOfTheCompanyGuard = state.focusOn('ownShareOfTheCompany').optJson();
  return <Layout details='[[30]]' title='Current employment details - '>
    <LabelAndDropdown id={`${id}.areYou`} state={state.focusOn('areYou')} mode={mode} label='Are you... ' allButtons={buttons} enums={{"X":"","E":"Employed","S":"Self Employed","C":"Currently not earning","R":"Retired","T":"Student","U":"Unknown","H":"Home Family Responsibilities"}} buttons={["additionalInfoFirst","additionalInfoSecond"]} />
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.occupation`} state={state.focusOn('occupation')} mode={mode} label='What is your occupation? ' allButtons={buttons} required={true} buttons={["list"]} /></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.customerDescription`} state={state.focusOn('customerDescription')} mode={mode} label='Customers description: ' allButtons={buttons} required={true} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><LabelAndDropdown id={`${id}.ownShareOfTheCompany`} state={state.focusOn('ownShareOfTheCompany')} mode={mode} label='Do you own a share of the company? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={ownShareOfTheCompanyGuard} cond={["Y"]}><LabelAndDropdown id={`${id}.owningSharesPct`} state={state.focusOn('owningSharesPct')} mode={mode} label='Is this 20% or more of it? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndStringInput id={`${id}.workFor`} state={state.focusOn('workFor')} mode={mode} label='Who do you work for? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndDropdown id={`${id}.employmentType`} state={state.focusOn('employmentType')} mode={mode} label='Is this employment... ' allButtons={buttons} enums={{"0":"","1":"Permanent","2":"Temporary","3":"Contract"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["1"]}><LabelAndStringInput id={`${id}.empStartDate`} state={state.focusOn('empStartDate')} mode={mode} label='When did this employment start? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["2","3"]}><LabelAndStringInput id={`${id}.empEndDate`} state={state.focusOn('empEndDate')} mode={mode} label='When will it finish? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualSalaryBeforeDeduction`} state={state.focusOn('annualSalaryBeforeDeduction')} mode={mode} label='What is your annual salary? (before deductions) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualIncomeExcludingRent`} state={state.focusOn('annualIncomeExcludingRent')} mode={mode} label='Do you have any other guaranteed annual income? (excluding rent) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.regularCommissionBonus`} state={state.focusOn('regularCommissionBonus')} mode={mode} label='Do you have any regular commission, bonus or overtime? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatTypeOfBusiness`} state={state.focusOn('whatTypeOfBusiness')} mode={mode} label='What type of business is it? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatNameBusiness`} state={state.focusOn('whatNameBusiness')} mode={mode} label='What is its name: ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.establishedYear`} state={state.focusOn('establishedYear')} mode={mode} label='When was it established? (MM/YYYY) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndNumberInput id={`${id}.annualDrawing3Yrs`} state={state.focusOn('annualDrawing3Yrs')} mode={mode} label='What are your average annual drawings over the past 3 years? ' allButtons={buttons} required={true} /></Guard></Guard>
    <LabelAndDropdown id={`${id}.otherSourceOfIncome`} state={state.focusOn('otherSourceOfIncome')} mode={mode} label='Do you have another sources of income (e.g. rental income) ? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["otherSourcesOfIncome"]} />
    <LabelAndStringInput id={`${id}.createdBy`} state={state.focusOn('createdBy')} mode={mode} label='Entry created by: ' allButtons={buttons} required={true} />
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
