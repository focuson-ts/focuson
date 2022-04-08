package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface AdditionalInfoFirstFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getAdditionalInfoFirst();
   public DataFetcher<Map<String,Object>> updateAdditionalInfoFirst();
}