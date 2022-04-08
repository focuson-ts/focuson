package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface AccountOverviewHistoryFFetcher extends IFetcher{
   public DataFetcher getAccountOverviewHistory();
}