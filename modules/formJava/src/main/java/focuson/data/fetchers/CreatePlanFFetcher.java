package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface CreatePlanFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getCreatePlan();
   public DataFetcher<Map<String,Object>> createCreatePlan();
   public DataFetcher<Map<String,Object>> updateCreatePlan();
   public DataFetcher<Map<String,Object>> deleteCreatePlan();
   public DataFetcher<Map<String,Object>> listCreatePlan();
}