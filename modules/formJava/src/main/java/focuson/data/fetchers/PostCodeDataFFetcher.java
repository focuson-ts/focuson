package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface PostCodeDataFFetcher extends IFetcher{
   public DataFetcher getPostCodeDataLine();
}