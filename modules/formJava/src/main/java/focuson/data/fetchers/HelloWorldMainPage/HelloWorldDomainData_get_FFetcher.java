package focuson.data.fetchers.HelloWorldMainPage;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface HelloWorldDomainData_get_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getHelloWorldDomainData();
}