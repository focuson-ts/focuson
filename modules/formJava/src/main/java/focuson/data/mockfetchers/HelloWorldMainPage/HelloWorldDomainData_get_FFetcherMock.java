package focuson.data.mockfetchers.HelloWorldMainPage;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.HelloWorldMainPage.HelloWorldDomainData_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class HelloWorldDomainData_get_FFetcherMock  implements HelloWorldDomainData_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getHelloWorldDomainData() {  return dataFetchingEnvironment -> Sample.sampleHelloWorldDomainData0;    }
}