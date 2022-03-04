import * as domains from './domains';
export interface HasOccupationAndIncomeSummaryPageDomain {   OccupationAndIncomeSummary?: OccupationAndIncomeSummaryPageDomain}
export interface OccupationAndIncomeSummaryPageDomain{
 fromApi?:domains.OccupationAndIncomeDetailsDDDomain;
 selectedItem?:number;
 temp?:domains.OccupationIncomeDetailsDDDomain;
}
export interface HasEAccountsSummaryPageDomain {   EAccountsSummary?: EAccountsSummaryPageDomain}
export interface EAccountsSummaryPageDomain{
 createPlan?:domains.EAccountsSummaryDDDomain;
 fromApi?:domains.EAccountsSummaryDDDomain;
 tempCreatePlan?:domains.CreatePlanDDDomain;
}
export interface HasETransferPageDomain {   ETransfer?: ETransferPageDomain}
export interface ETransferPageDomain{
 fromApi?:domains.ETransferDataDDomain;
}
export interface HasCreateEAccountPageDomain {   CreateEAccount?: CreateEAccountPageDomain}
export interface CreateEAccountPageDomain{
 editing?:domains.CreateEAccountDataDDDomain;
}
export interface HasChequeCreditbooksPageDomain {   ChequeCreditbooks?: ChequeCreditbooksPageDomain}
export interface ChequeCreditbooksPageDomain{
 chequeBookOrPayingIn?:number;
 fromApi?:domains.ChequeCreditbooksDDDomain;
 tempCreatePlan?:domains.ChequeCreditbooksHistoryLineDDDomain;
}