package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface EAccountsSummaryDDFFetcher {
   public DataFetcher getEAccountsSummaryDD();
   public DataFetcher getAccountSummaryDescription();
   public DataFetcher getTotalMonthlyCost();
   public DataFetcher getOneAccountBalance();
   public DataFetcher getCurrentAccountBalance();
}