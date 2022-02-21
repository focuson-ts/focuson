export interface CreateEAccountDataDDDomain{
  initialAmount: string;
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
  currentAccountBalance: string;
  eAccountsTable: EAccountSummaryDDDomain[];
  oneAccountBalance: string;
  totalMonthlyCost: string;
}
export interface EAccountSummaryDDDomain{
  accountId: string;
  description: string;
  displayType: string;
  frequency: string;
  total: string;
  virtualBankSeq: string;
}
export interface ETransferDataDDomain{
  amount: string;
  balance: string;
  dateOfETransfer: string;
  description: string;
  fromAccount: string;
  notes: string;
  toAccount: string;
  type: string;
}
export interface OccupationAndIncomeDomain{
  averageAnnualDrawings: string;
  businessName: string;
  businessType: string;
  customersDescription: string;
  dateStarted: string;
  occupation: string;
  typeOfProfession: string;
}