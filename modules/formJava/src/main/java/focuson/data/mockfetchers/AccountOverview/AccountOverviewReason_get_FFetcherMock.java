package focuson.data.mockfetchers.AccountOverview;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewReason_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class AccountOverviewReason_get_FFetcherMock  implements AccountOverviewReason_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getAccountOverviewReason() {  return dataFetchingEnvironment -> Sample.sampleAccountOverviewReason0;    }
}