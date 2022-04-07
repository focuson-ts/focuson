export interface HasMainOccupationDetailsPageSummaryPageDomain {   MainOccupationDetailsPageSummary?: MainOccupationDetailsPageSummaryPageDomain}

export interface MainOccupationDetailsPageSummaryPageDomain{
  fromApi?:FromApiDomain;
  tempForAdditionalInfoFirst?:AdditionalInfoFirstDomain;
  tempForAdditionalInfoSecond?:AdditionalInfoSecondDomain;
  tempForOccupationEdit?:OneOccupationIncomeDetailsDomain;
  tempForOtherSourcesOfIncome?:OtherIncomeResponseDomain;
}

export interface AdditionalInfoFirstDomain{
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  applicantName: string;
  employerName: string;
  postcode: string;
}

export interface AdditionalInfoSecondDomain{
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

export interface FromApiDomain{
  additionalInfoFirst: AdditionalInfoFirstDomain;
  additionalInfoSecond: AdditionalInfoSecondDomain;
  occupationAndIncome: OccupationAndIncomeFullDomainDomain;
  occupationsList: ListOccupationsDomain;
  otherSourcesOfIncome: OtherIncomeResponseDomain;
}

export interface ListOccupationsDomain{
  descTypeName: string;
  descTypeValue: string;
}

export interface OccupationAndIncomeFullDomainDomain{
  customerOccupationIncomeDetails: OneOccupationIncomeDetailsDomain;
  mainClientRef: number;
  mainCustomerName: string;
}

export interface OneOccupationIncomeDetailsDomain{
  accountantAppRoleSeq: number;
  annualDrawing3Yrs: number;
  annualIncomeExcludingRent: number;
  annualSalaryBeforeDeduction: number;
  areYou: string;
  createdBy: string;
  customerDescription: string;
  empEmploymentSeq: number;
  empEndDate: string;
  employmentType: string;
  empStartDate: string;
  establishedYear: string;
  occupation: string;
  otherSourceOfIncome: string;
  owningSharesPct: string;
  ownShareOfTheCompany: string;
  regularCommissionBonus: number;
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
