package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface AccountOverviewFFetcher extends IFetcher{
   public DataFetcher getAccountOverview();
}