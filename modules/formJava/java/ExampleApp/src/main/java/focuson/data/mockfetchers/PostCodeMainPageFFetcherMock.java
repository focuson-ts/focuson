package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.PostCodeMainPageFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class PostCodeMainPageFFetcherMock  implements PostCodeMainPageFFetcher{
 public DataFetcher createPostCodeMainPage() {  return dataFetchingEnvironment -> Sample.samplePostCodeMainPage0;    }
}