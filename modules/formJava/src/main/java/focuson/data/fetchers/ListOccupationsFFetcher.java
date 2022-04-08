package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface ListOccupationsFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getListOccupations();
}