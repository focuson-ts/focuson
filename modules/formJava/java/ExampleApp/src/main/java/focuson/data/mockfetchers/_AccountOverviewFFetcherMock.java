package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._AccountOverviewFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _AccountOverviewFFetcherMock  implements _AccountOverviewFFetcher{
 public DataFetcher getAccountOverview() {  return dataFetchingEnvironment -> Sample.sampleAccountOverview0;    }
}