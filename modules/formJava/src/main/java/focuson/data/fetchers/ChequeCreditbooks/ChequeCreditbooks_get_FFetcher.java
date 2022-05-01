package focuson.data.fetchers.ChequeCreditbooks;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface ChequeCreditbooks_get_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getChequeCreditbooks();
}