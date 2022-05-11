package focuson.data.mockfetchers.PostCodeMainPage;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.PostCodeMainPage.PostCodeSearchResponse_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class PostCodeSearchResponse_get_FFetcherMock  implements PostCodeSearchResponse_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getPostCodeDataLine() {  return dataFetchingEnvironment -> Sample.samplePostCodeSearchResponse0;    }
}