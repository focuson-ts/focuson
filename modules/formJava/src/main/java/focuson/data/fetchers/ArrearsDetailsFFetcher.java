package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface ArrearsDetailsFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getArrearsDetails();
}