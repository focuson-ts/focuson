package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface EAccountsSummaryFFetcher extends IFetcher{
   public DataFetcher getEAccountsSummary();
   public DataFetcher getAccountSummaryDescription();
   public DataFetcher getTotalMonthlyCost();
   public DataFetcher getOneAccountBalance();
   public DataFetcher getCurrentAccountBalance();
}