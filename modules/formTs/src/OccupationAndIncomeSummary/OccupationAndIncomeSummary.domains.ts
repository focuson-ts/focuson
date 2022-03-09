export interface HasOccupationAndIncomeSummaryPageDomain {   OccupationAndIncomeSummary?: OccupationAndIncomeSummaryPageDomain}

export interface OccupationAndIncomeSummaryPageDomain{
 fromApi?:OccupationAndIncomeDetailsDDDomain;
 selectedItem?:number;
 temp?:OccupationIncomeDetailsDDDomain;
 validationDebug?:boolean;
}

export interface OccupationAndIncomeDetailsDDDomain{
  customerOccupationIncomeDetails: OccupationIncomeDetailsDDDomain[];
  jointClientRef: number;
  jointCustomerName: string;
  mainClientRef: number;
  mainCustomerName: string;
  regulatoryReport: string;
}

export interface OccupationIncomeDetailsDDDomain{
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
