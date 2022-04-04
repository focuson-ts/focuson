package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._AccountOverviewExcessInfoFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _AccountOverviewExcessInfoFFetcherMock  implements _AccountOverviewExcessInfoFFetcher{
 public DataFetcher getAccountOverviewExcessInfo() {  return dataFetchingEnvironment -> Sample.sampleAccountOverviewExcessInfo0;    }
}