package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface AdditionalInfoSecondFFetcher extends IFetcher{
   public DataFetcher getAdditionalInfoSecond();
   public DataFetcher updateAdditionalInfoSecond();
}