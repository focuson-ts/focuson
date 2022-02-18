import * as domains from './domains';
export interface HasEAccountsSummaryPageDomain {   eAccountsSummary?: EAccountsSummaryPageDomain}
export interface EAccountsSummaryPageDomain{
 createPlan?: domains.EAccountsSummaryDDDomain;
 fromApi?: domains.EAccountsSummaryDDDomain;
 temp?: domains.EAccountsSummaryDDDomain;
}