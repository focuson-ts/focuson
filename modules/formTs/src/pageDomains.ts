import * as domains from './domains';
export interface HasOccupationAndIncomeDetailsPageDomain {   OccupationAndIncomeDetails?: OccupationAndIncomeDetailsPageDomain}
export interface OccupationAndIncomeDetailsPageDomain{
 fromApi?: domains.OccupationAndIncomeDomain;
}
export interface HasEAccountsSummaryPageDomain {   EAccountsSummary?: EAccountsSummaryPageDomain}
export interface EAccountsSummaryPageDomain{
 createPlan?: domains.EAccountsSummaryDDDomain;
 fromApi?: domains.EAccountsSummaryDDDomain;
 temp?: domains.EAccountsSummaryDDDomain;
}
export interface HasETransferPageDomain {   ETransfer?: ETransferPageDomain}
export interface ETransferPageDomain{
 fromApi?: domains.ETransferDataDDomain;
}
export interface HasCreateEAccountPageDomain {   CreateEAccount?: CreateEAccountPageDomain}
export interface CreateEAccountPageDomain{
 editing?: domains.CreateEAccountDataDDDomain;
}