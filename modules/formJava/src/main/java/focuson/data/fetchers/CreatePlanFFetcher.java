package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface CreatePlanFFetcher extends IFetcher{
   public DataFetcher getCreatePlan();
   public DataFetcher createCreatePlan();
   public DataFetcher updateCreatePlan();
   public DataFetcher deleteCreatePlan();
   public DataFetcher listCreatePlan();
}