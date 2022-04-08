package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface CreateEAccountDataFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> createCreateEAccountData();
   public DataFetcher<Map<String,Object>> getCreateEAccountData();
}