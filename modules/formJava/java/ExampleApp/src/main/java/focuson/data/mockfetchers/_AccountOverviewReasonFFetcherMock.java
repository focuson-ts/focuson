package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._AccountOverviewReasonFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _AccountOverviewReasonFFetcherMock  implements _AccountOverviewReasonFFetcher{
 public DataFetcher getAccountOverviewReason() {  return dataFetchingEnvironment -> Sample.sampleAccountOverviewReason0;    }
}