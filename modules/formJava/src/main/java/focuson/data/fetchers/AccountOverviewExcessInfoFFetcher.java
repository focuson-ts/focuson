package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface AccountOverviewExcessInfoFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getAccountOverviewExcessInfo();
}