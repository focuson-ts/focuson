package focuson.data.fetchers.EAccountsSummary;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface EAccountsSummary_state_invalidate_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> stateEAccountsSummaryinvalidate();
}