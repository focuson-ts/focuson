package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface OtherIncomeResponseFFetcher extends IFetcher{
   public DataFetcher getOtherIncomeResponse();
   public DataFetcher updateOtherIncomeResponse();
}