package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface ChequeCreditbooksFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getChequeCreditbooks();
   public DataFetcher<Map<String,Object>> createChequeCreditbooks();
}