package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface RepeatingWholeDataFFetcher extends IFetcher{
   public DataFetcher createRepeatingLine();
   public DataFetcher getRepeatingLine();
}