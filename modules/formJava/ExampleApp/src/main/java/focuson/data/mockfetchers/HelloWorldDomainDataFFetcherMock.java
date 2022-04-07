package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.HelloWorldDomainDataFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class HelloWorldDomainDataFFetcherMock  implements HelloWorldDomainDataFFetcher{
 public DataFetcher getHelloWorldDomainData() {  return dataFetchingEnvironment -> Sample.sampleHelloWorldDomainData0;    }
}