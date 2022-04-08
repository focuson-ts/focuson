package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface CreatePlanFFetcher {
   public DataFetcher getCreatePlan();
   public DataFetcher createCreatePlan();
   public DataFetcher updateCreatePlan();
   public DataFetcher deleteCreatePlan();
   public DataFetcher listCreatePlan();
}