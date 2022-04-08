package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface AdditionalInfoFirstFFetcher extends IFetcher{
   public DataFetcher getAdditionalInfoFirst();
   public DataFetcher updateAdditionalInfoFirst();
}