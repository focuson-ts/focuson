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
  accountId: string;
  description: string;
  displayType: string;
  frequency: string;
  total: number;
  virtualBankSeq: string;
}
export interface ETransferDataDDomain{
  amount: string;
  balance: number;
  dateOfETransfer: string;
  description: string;
  fromAccount: string;
  monitoringAccount: string;
  notes: string;
  toAccount: string;
  type: string;
}
export interface OccupationAndIncomeDomain{
  averageAnnualDrawings: number;
  businessName: string;
  businessType: string;
  customersDescription: string;
  dateStarted: string;
  occupation: string;
  typeOfProfession: string;
}