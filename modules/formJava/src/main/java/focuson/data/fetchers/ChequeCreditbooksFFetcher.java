package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface ChequeCreditbooksFFetcher extends IFetcher{
   public DataFetcher getChequeCreditbooks();
   public DataFetcher createChequeCreditbooks();
}