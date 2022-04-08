package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface RepeatingWholeDataFFetcher {
   public DataFetcher createRepeatingLine();
   public DataFetcher getRepeatingLine();
}