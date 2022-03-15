export interface HasEAccountsSummaryPageDomain {   EAccountsSummary?: EAccountsSummaryPageDomain}

export interface EAccountsSummaryPageDomain{
  createPlan?:EAccountsSummaryDomain;
  fromApi?:EAccountsSummaryDomain;
  tempCreatePlan?:CreatePlanDomain;
}

export interface CreatePlanDomain{
  createPlanDate: string;
  createPlanEnd: string;
  createPlanStart: string;
}

export interface EAccountsSummaryDomain{
  createPlan: CreatePlanDomain;
  currentAccountBalance: number;
  eAccountsTable: EAccountSummaryDomain[];
  oneAccountBalance: number;
  totalMonthlyCost: number;
  useEStatements: boolean;
}

export type EAccountsSummaryTableDomain = EAccountSummaryDomain[]

export interface EAccountSummaryDomain{
  accountId: number;
  description: string;
  displayType: string;
  frequency: string;
  total: number;
  virtualBankSeq: string;
}
