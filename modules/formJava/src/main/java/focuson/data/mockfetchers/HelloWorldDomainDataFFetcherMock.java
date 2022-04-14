package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.HelloWorldDomainDataFFetcher;
import focuson.data.fetchers.IFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class HelloWorldDomainDataFFetcherMock  implements HelloWorldDomainDataFFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getHelloWorldDomainData() {  return dataFetchingEnvironment -> Sample.sampleHelloWorldDomainData0;    }
}