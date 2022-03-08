export interface HasEAccountsSummaryPageDomain {   EAccountsSummary?: EAccountsSummaryPageDomain}

export interface EAccountsSummaryPageDomain{
 createPlan?:EAccountsSummaryDDDomain;
 fromApi?:EAccountsSummaryDDDomain;
 tempCreatePlan?:CreatePlanDDDomain;
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
