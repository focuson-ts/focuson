package focuson.data.mockfetchers.PostCodeMainPage;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.PostCodeMainPage.PostCodeNameAndAddress_create_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class PostCodeNameAndAddress_create_FFetcherMock  implements PostCodeNameAndAddress_create_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher createPostCodeNameAndAddress() {  return dataFetchingEnvironment -> Sample.samplePostCodeNameAndAddress0;    }
}