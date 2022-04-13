package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface OtherIncomeResponseFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getOtherIncomeResponse();
}