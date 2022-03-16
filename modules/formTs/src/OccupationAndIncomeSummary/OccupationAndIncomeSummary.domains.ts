export interface HasOccupationAndIncomeSummaryPageDomain {   OccupationAndIncomeSummary?: OccupationAndIncomeSummaryPageDomain}

export interface OccupationAndIncomeSummaryPageDomain{
  additionalInformation?:AdditionalInformationDomain;
  businessDetails?:BusinessDetailsMainDomain;
  dropdowns?:DropdownsDomain;
  fromApi?:OccupationAndIncomeFullDomainDomain;
  otherSourcesOfIncome?:OtherIncomeResponseDomain;
  searchList?:ListOccupationsDomain;
  selectedItem?:number;
  temp?:OneOccupationIncomeDetailsDomain;
}

export interface AccountDetailsDomain{
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  contactForename: string;
  contactSurname: string;
  contactTitle: string;
  postcode: string;
  practice: string;
  telephone: string;
}

export interface AdditionalInformationDomain{
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  applicantName: string;
  employerName: string;
  postcode: string;
}

export interface BusinessDetailsDomain{
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  applicantName: string;
  businessName: string;
  postcode: string;
}

export interface BusinessDetailsMainDomain{
  accountantDetails: AccountDetailsDomain;
  businessDetails: BusinessDetailsDomain;
  businessFinancialDetails: BusinessFinancialDetailsDomain;
  detailsOfNonRecurringItems: DetailsOfNonRecurringItemsDomain;
  detailsOfReevaluationOfAssets: DetailsOfReevaluationOfAssetsDomain;
}

export interface BusinessFinancialDetailsDomain{
  dividendsLastYear: string;
  dividendsPenultimateYear: string;
  drawingsLastYear: string;
  drawingsPenultimateYear: string;
  netAssetsLastYear: string;
  netAssetsPenultimateYear: string;
  netProfitLastYear: string;
  netProfitPenultimateYear: string;
  turnoverLastYear: string;
  turnoverPenultimateYear: string;
}

export interface ContractTypesResponseDomain{
  contractTypeId: number;
  description: string;
}

export type CustomerOccupationIncomeDetailsDomain = OneOccupationIncomeDetailsDomain[]

export interface DetailsOfNonRecurringItemsDomain{
  nonRecurringItems: string;
}

export interface DetailsOfReevaluationOfAssetsDomain{
  revaluationOfAssets: string;
}

export interface DropdownsDomain{
  contractTypesResponse: ContractTypesResponseDomain;
  employmentStatus: EmploymentStatusDomain;
  frequenciesResponse: FrequenciesResponseDomain;
  occupationDescriptionResponse: OccupationDescriptionResponseDomain;
}

export interface EmploymentStatusDomain{
  employmentName: string;
  employmentValue: string;
}

export interface FrequenciesResponseDomain{
  annualMultiple: number;
  frequencyDescription: string;
  frequencyId: number;
}

export interface ListOccupationsDomain{
  occupationsList: OccupationDescriptionResponseDomain[];
}

export interface OccupationAndIncomeFullDomainDomain{
  customerOccupationIncomeDetails: OneOccupationIncomeDetailsDomain[];
  jointClientRef: number;
  jointCustomerName: string;
  mainClientRef: number;
  mainCustomerName: string;
}

export interface OccupationDescriptionResponseDomain{
  descTypeName: string;
  descTypeValue: string;
}

export type OccupationsListDomain = OccupationDescriptionResponseDomain[]

export interface OneOccupationIncomeDetailsDomain{
  accountantAppRoleSeq: number;
  annualDrawing3Yrs: number;
  annualIncomeExcludingRent: number;
  annualSalaryBeforeDeduction: number;
  areYou: string;
  createdBy: string;
  createdDate: string;
  currentEmployment: string;
  customerDescription: string;
  dateOfEmploymentStart: string;
  empAppRoleSeq: number;
  empEmploymentSeq: number;
  empEndDate: string;
  employerName: string;
  employmentType: string;
  empStartDate: string;
  establishedYear: string;
  occupation: string;
  occupationCategory: string;
  otherSourceOfIncome: string;
  owningSharesPct: string;
  ownShareOfTheCompany: string;
  regularCommissionBonus: number;
  sePositionHeld: string;
  whatNameBusiness: string;
  whatTypeOfBusiness: string;
  workFor: string;
}

export interface OtherIncomeResponseDomain{
  amount: number;
  clientOtherIncomeSeq: string;
  incomeFreqRef: string;
  otherIncomeType: string;
}
