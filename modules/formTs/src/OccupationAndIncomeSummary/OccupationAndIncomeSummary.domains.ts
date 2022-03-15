export interface HasOccupationAndIncomeSummaryPageDomain {   OccupationAndIncomeSummary?: OccupationAndIncomeSummaryPageDomain}

export interface OccupationAndIncomeSummaryPageDomain{
  fromApi?:OccupationAndIncomeDetailsDomain;
  other?:OtherIncomeResponseDomain;
  searchList?:ListOccupationsDomain;
  selectedItem?:number;
  temp?:OccupationIncomeDetailsDomain;
  validationDebug?:boolean;
}

export type CustomerOccupationIncomeDetailsDomain = OccupationDescriptionResponseDomain[]

export interface ListOccupationsDomain{
  occupationsList: OccupationDescriptionResponseDomain[];
  searchField: string;
}

export interface OccupationAndIncomeDetailsDomain{
  customerOccupationIncomeDetails: OccupationIncomeDetailsDomain[];
  jointClientRef: number;
  jointCustomerName: string;
  mainClientRef: number;
  mainCustomerName: string;
  regulatoryReport: string;
}

export interface OccupationDescriptionResponseDomain{
  descTypeName: string;
  descTypeValue: string;
}

export interface OccupationIncomeDetailsDomain{
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
