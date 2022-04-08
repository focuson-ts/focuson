package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface RepeatingWholeDataFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> createRepeatingLine();
   public DataFetcher<Map<String,Object>> getRepeatingLine();
}