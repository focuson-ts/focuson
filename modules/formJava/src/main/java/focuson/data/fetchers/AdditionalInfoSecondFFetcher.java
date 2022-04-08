package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface AdditionalInfoSecondFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getAdditionalInfoSecond();
   public DataFetcher<Map<String,Object>> updateAdditionalInfoSecond();
}