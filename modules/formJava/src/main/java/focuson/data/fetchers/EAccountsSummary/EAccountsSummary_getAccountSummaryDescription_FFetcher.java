package focuson.data.fetchers.EAccountsSummary;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface EAccountsSummary_getAccountSummaryDescription_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getAccountSummaryDescription();
}