package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface previous_ArrearsDetailsFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getArrearsDetails();
}