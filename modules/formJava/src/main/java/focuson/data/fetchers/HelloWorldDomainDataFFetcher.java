package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface HelloWorldDomainDataFFetcher extends IFetcher{
   public DataFetcher getHelloWorldDomainData();
}