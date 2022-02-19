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