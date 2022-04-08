package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface EAccountsSummaryFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getEAccountsSummary();
   public DataFetcher<Map<String,Object>> getAccountSummaryDescription();
   public DataFetcher<Map<String,Object>> getTotalMonthlyCost();
   public DataFetcher<Map<String,Object>> getOneAccountBalance();
   public DataFetcher<Map<String,Object>> getCurrentAccountBalance();
}