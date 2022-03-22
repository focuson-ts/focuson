import * as domain from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';
import * as empty from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.empty';
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
import { LabelAndStringInput } from '../copied/LabelAndInput';
import { LabelAndDropdown } from '../copied/Dropdown/LabelAndDropdown';
import { LabelAndNumberInput } from '../copied/LabelAndInput';
import { Table } from '../copied/table';
import { SelectedItem } from '../copied/table';
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ToggleButton} from '../copied/ToggleButton';
import {ValidationButton} from '../copied/ValidationButton';
import {OccupationAndIncomeSummaryPageDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains";
import { HideButtonsLayout } from '../copied/hideButtons';
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
import {OccupationsListDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OneOccupationIncomeDetailsDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
import {OtherIncomeResponseDomain} from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains"
export function OccupationAndIncomeSummaryPage(){
  return focusedPageWithExtraState<FState, OccupationAndIncomeSummaryPageDomain, OccupationAndIncomeFullDomainDomain, Context> ( s => 'OccupationAndIncomeSummary' ) ( s => s.focusOn('fromApi')) (
    ( fullState, state , full, d, mode) => {
  const id='root';
  const buttons =    {addEntry:<ModalButton id='addEntry' text='addEntry'  state={state} modal = 'OccupationIncomeModal'  
        pageMode='create'
        focusOn={["{basePage}","temp"]}
        copyOnClose={[{"to":["{basePage}","fromApi","customerOccupationIncomeDetails","[append]"]}]}
        createEmpty={empty.emptyOneOccupationIncomeDetails}
        setToLengthOnClose={{"array":["fromApi","customerOccupationIncomeDetails"],"variable":["selectedItem"]}}
      />,
      additionalInfo:<ModalButton id='additionalInfo' text='additionalInfo'  state={state} modal = 'AdditionalInformationModal'  
        pageMode='edit'
        focusOn={["{basePage}","additionalInformation"]}
      />,
      businessDetails:<ModalButton id='businessDetails' text='businessDetails'  state={state} modal = 'BusinessDetailsModal'  
        pageMode='edit'
        focusOn={["{basePage}","businessDetails"]}
      />,
      edit:<ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModal'  
        pageMode='edit'
        focusOn={["{basePage}","temp"]}
        copy={[{"from":["{basePage}","fromApi","customerOccupationIncomeDetails","{selectedItem}"]}]}
        copyOnClose={[{"to":["{basePage}","fromApi","customerOccupationIncomeDetails","{selectedItem}"]}]}
      />,
      list:<ModalButton id='list' text='list'  state={state} modal = 'ListOccupationsModal'  
        pageMode='edit'
        focusOn={["{basePage}","searchList"]}
        copy={[{"from":["{basePage}","fromApi","customerOccupationIncomeDetails","{selectedItem}","occupation"]}]}
        copyOnClose={[{"to":["{basePage}","fromApi","customerOccupationIncomeDetails","{selectedItem}","occupation"]}]}
      />,
      nextOccupation:<ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />,
      otherSourcesOfIncome:<ModalButton id='otherSourcesOfIncome' text='otherSourcesOfIncome'  state={state} modal = 'OtherSourcesOfIncomeModal'  
        pageMode='edit'
        focusOn={["{basePage}","otherSourcesOfIncome"]}
      />,
      prevOccupation:<ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />,}

      return <HideButtonsLayout buttons={buttons} hide={["otherSourcesOfIncome","list"]}>
          <OccupationAndIncomeFullDomain id={`${id}`} state={state} mode={mode} buttons={buttons} />
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
    <LabelAndDropdown id={`${id}.contactTitle`} state={state.focusOn('contactTitle')} mode={mode} label='contact title' allButtons={buttons} enums={{"X":"","MR":"Mr","MRS":"Mrs","MISS":"Miss","MS":"Ms","DR":"Dr","REV":"Rev","PROF":"Prof","SIR":"Sir","CAPTAIN":"Captain","LADY":"Lady","MAJOR":"Major","MASTER":"Master","LORD":"Lord","COLONEL":"Colonel","BARON":"Baron","VISCOUNT":"Viscount","BRIGADIER":"Brigadier","LIEUT_COL":"Lieut Col","FRAU":"Frau","HERR":"Herr","FATHER":"Father","MESSRS":"Messrs","MADAM":"Madam"}} />
    <LabelAndStringInput id={`${id}.contactForename`} state={state.focusOn('contactForename')} mode={mode} label='contact forename' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.contactSurname`} state={state.focusOn('contactSurname')} mode={mode} label='contact surname' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.practice`} state={state.focusOn('practice')} mode={mode} label='practice' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='address line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='address line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='address line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='address line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='postcode' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.telephone`} state={state.focusOn('telephone')} mode={mode} label='telephone' allButtons={buttons} required={true} />
</>
}

export function AdditionalInformation({id,state,mode,buttons}: FocusedProps<FState, AdditionalInformationDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.applicantName`} state={state.focusOn('applicantName')} mode={mode} label='applicant name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.employerName`} state={state.focusOn('employerName')} mode={mode} label='employer name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='address line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='address line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='address line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='address line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='postcode' allButtons={buttons} required={true} />
</>
}

export function BusinessDetails({id,state,mode,buttons}: FocusedProps<FState, BusinessDetailsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.applicantName`} state={state.focusOn('applicantName')} mode={mode} label='applicant name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.businessName`} state={state.focusOn('businessName')} mode={mode} label='business name' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine1`} state={state.focusOn('addressLine1')} mode={mode} label='address line1' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine2`} state={state.focusOn('addressLine2')} mode={mode} label='address line2' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine3`} state={state.focusOn('addressLine3')} mode={mode} label='address line3' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.addressLine4`} state={state.focusOn('addressLine4')} mode={mode} label='address line4' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.postcode`} state={state.focusOn('postcode')} mode={mode} label='postcode' allButtons={buttons} required={true} />
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
    <LabelAndStringInput id={`${id}.turnoverLastYear`} state={state.focusOn('turnoverLastYear')} mode={mode} label='turnover last year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.turnoverPenultimateYear`} state={state.focusOn('turnoverPenultimateYear')} mode={mode} label='turnover penultimate year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netProfitLastYear`} state={state.focusOn('netProfitLastYear')} mode={mode} label='net profit last year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netProfitPenultimateYear`} state={state.focusOn('netProfitPenultimateYear')} mode={mode} label='net profit penultimate year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.drawingsLastYear`} state={state.focusOn('drawingsLastYear')} mode={mode} label='drawings last year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.drawingsPenultimateYear`} state={state.focusOn('drawingsPenultimateYear')} mode={mode} label='drawings penultimate year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dividendsLastYear`} state={state.focusOn('dividendsLastYear')} mode={mode} label='dividends last year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.dividendsPenultimateYear`} state={state.focusOn('dividendsPenultimateYear')} mode={mode} label='dividends penultimate year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netAssetsLastYear`} state={state.focusOn('netAssetsLastYear')} mode={mode} label='net assets last year' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.netAssetsPenultimateYear`} state={state.focusOn('netAssetsPenultimateYear')} mode={mode} label='net assets penultimate year' allButtons={buttons} required={true} />
</>
}

export function ContractTypesResponse({id,state,mode,buttons}: FocusedProps<FState, ContractTypesResponseDomain,Context>){
  return <>
</>
}

export function DetailsOfNonRecurringItems({id,state,mode,buttons}: FocusedProps<FState, DetailsOfNonRecurringItemsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.nonRecurringItems`} state={state.focusOn('nonRecurringItems')} mode={mode} label='non recurring items' allButtons={buttons} required={true} />
</>
}

export function DetailsOfReevaluationOfAssets({id,state,mode,buttons}: FocusedProps<FState, DetailsOfReevaluationOfAssetsDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.revaluationOfAssets`} state={state.focusOn('revaluationOfAssets')} mode={mode} label='revaluation of assets' allButtons={buttons} required={true} />
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

export function OccupationAndIncomeFullDomain({id,state,mode,buttons}: FocusedProps<FState, OccupationAndIncomeFullDomainDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.mainCustomerName`} state={state.focusOn('mainCustomerName')} mode={mode} label='main customer name' allButtons={buttons} required={true} />
    <SelectedItem id={`${id}.customerOccupationIncomeDetails`} state={state.focusOn('customerOccupationIncomeDetails')} mode={mode} buttons={buttons} index={pageState(state)<any>().focusOn('selectedItem').json()} display={OneOccupationIncomeDetails} />
</>
}

export function OccupationDescriptionResponse({id,state,mode,buttons}: FocusedProps<FState, OccupationDescriptionResponseDomain,Context>){
  return <>
</>
}

export function OneOccupationIncomeDetails({id,state,mode,buttons}: FocusedProps<FState, OneOccupationIncomeDetailsDomain,Context>){
const areYouGuard = state.chainLens(Lenses.fromPath(["areYou"])).optJsonOr([]);
const employmentTypeGuard = state.chainLens(Lenses.fromPath(["employmentType"])).optJsonOr([]);
const otherSourceOfIncomeGuard = state.chainLens(Lenses.fromPath(["otherSourceOfIncome"])).optJsonOr([]);
const owningSharesPctGuard = state.chainLens(Lenses.fromPath(["owningSharesPct"])).optJsonOr([]);
const ownShareOfTheCompanyGuard = state.chainLens(Lenses.fromPath(["ownShareOfTheCompany"])).optJsonOr([]);
  return <>
    <LabelAndDropdown id={`${id}.areYou`} state={state.focusOn('areYou')} mode={mode} label='Are you... ' allButtons={buttons} enums={{"X":"","E":"Employed","S":"Self Employed","C":"Currently not earning","R":"Retired","T":"Student","U":"Unknown","H":"Home Family Responsibilities"}} />
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.occupation`} state={state.focusOn('occupation')} mode={mode} label='What is your occupation? ' allButtons={buttons} required={true} buttons={["list"]} /></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><LabelAndStringInput id={`${id}.customerDescription`} state={state.focusOn('customerDescription')} mode={mode} label='Customers description: ' allButtons={buttons} required={true} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><LabelAndDropdown id={`${id}.ownShareOfTheCompany`} state={state.focusOn('ownShareOfTheCompany')} mode={mode} label='Do you own a share of the company? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={ownShareOfTheCompanyGuard} cond={["Y"]}><LabelAndDropdown id={`${id}.owningSharesPct`} state={state.focusOn('owningSharesPct')} mode={mode} label='Is this 20% or more of it? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><LabelAndStringInput id={`${id}.workFor`} state={state.focusOn('workFor')} mode={mode} label='Who do you work for? ' allButtons={buttons} required={true} /></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualSalaryBeforeDeduction`} state={state.focusOn('annualSalaryBeforeDeduction')} mode={mode} label='What is your annual salary? (before deductions) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.annualIncomeExcludingRent`} state={state.focusOn('annualIncomeExcludingRent')} mode={mode} label='Do you have any other guaranteed annual income? (excluding rent) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndNumberInput id={`${id}.regularCommissionBonus`} state={state.focusOn('regularCommissionBonus')} mode={mode} label='Do you have any regular commission, bonus or overtime? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatTypeOfBusiness`} state={state.focusOn('whatTypeOfBusiness')} mode={mode} label='What type of business is it? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.whatNameBusiness`} state={state.focusOn('whatNameBusiness')} mode={mode} label='What is its name: ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndStringInput id={`${id}.establishedYear`} state={state.focusOn('establishedYear')} mode={mode} label='When was it established? (MM/YYYY) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E","S"]}><Guard value={owningSharesPctGuard} cond={["Y"]}><LabelAndNumberInput id={`${id}.annualDrawing3Yrs`} state={state.focusOn('annualDrawing3Yrs')} mode={mode} label='What are your average annual drawings over the past 3 years? ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndDropdown id={`${id}.employmentType`} state={state.focusOn('employmentType')} mode={mode} label='Is this employment... ' allButtons={buttons} enums={{"0":"","1":"Permanent","2":"Temporary","3":"Contract"}} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["1"]}><LabelAndStringInput id={`${id}.empStartDate`} state={state.focusOn('empStartDate')} mode={mode} label='When did the contract start? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["2","3"]}><LabelAndStringInput id={`${id}.empEndDate`} state={state.focusOn('empEndDate')} mode={mode} label='When will it finish? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard>
    <Guard value={areYouGuard} cond={["E"]}><Guard value={employmentTypeGuard} cond={["2","3"]}><Guard value={owningSharesPctGuard} cond={["N"]}><LabelAndStringInput id={`${id}.dateOfEmploymentStart`} state={state.focusOn('dateOfEmploymentStart')} mode={mode} label='When did this employment start? (mm/yyyy) ' allButtons={buttons} required={true} /></Guard></Guard></Guard>
    <LabelAndDropdown id={`${id}.otherSourceOfIncome`} state={state.focusOn('otherSourceOfIncome')} mode={mode} label='Do you have another sources of income (e.g. rental income) ? ' allButtons={buttons} enums={{"X":"","N":"No","Y":"Yes"}} buttons={["otherSourcesOfIncome"]} />
</>
}

export function OtherIncomeResponse({id,state,mode,buttons}: FocusedProps<FState, OtherIncomeResponseDomain,Context>){
  return <>
    <LabelAndStringInput id={`${id}.clientOtherIncomeSeq`} state={state.focusOn('clientOtherIncomeSeq')} mode={mode} label='client other income seq' allButtons={buttons} required={true} />
    <LabelAndStringInput id={`${id}.otherIncomeType`} state={state.focusOn('otherIncomeType')} mode={mode} label='other income type' allButtons={buttons} required={true} />
    <LabelAndDropdown id={`${id}.incomeFreqRef`} state={state.focusOn('incomeFreqRef')} mode={mode} label='income freq ref' allButtons={buttons} enums={{"0":"","1":"Annual","2":"Monthly","3":"Quarterly","4":"Half-Yearly","5":"Fortnightly","6":"Weekly"}} />
    <LabelAndNumberInput id={`${id}.amount`} state={state.focusOn('amount')} mode={mode} label='amount' allButtons={buttons} required={true} />
</>
}
