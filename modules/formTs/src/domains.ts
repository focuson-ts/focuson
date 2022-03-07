export interface ChequeCreditbooksDDDomain{
  history: ChequeCreditbooksHistoryLineDDDomain[];
}
export interface ChequeCreditbooksHistoryLineDDDomain{
  dateOrder: string;
  howOrdered: string;
  serialNumber: number;
}
export interface CreateEAccountDataDDDomain{
  initialAmount: number;
  name: string;
  savingsStyle: string;
  type: string;
}
export interface CreatePlanDDDomain{
  createPlanDate: string;
  createPlanEnd: string;
  createPlanStart: string;
}
export interface EAccountsSummaryDDDomain{
  createPlan: CreatePlanDDDomain;
  currentAccountBalance: number;
  eAccountsTable: EAccountSummaryDDDomain[];
  oneAccountBalance: number;
  totalMonthlyCost: number;
  useEStatements: boolean;
}
export interface EAccountSummaryDDDomain{
  accountId: number;
  description: string;
  displayType: string;
  frequency: string;
  total: number;
  virtualBankSeq: string;
}
export interface ETransferDataDDomain{
  account: number;
  balance: number;
  dateOfETransfer: string;
  description: string;
  fromAccount: number;
  monitoringAccount: number;
  notes: string;
  toAccount: number;
  type: string;
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