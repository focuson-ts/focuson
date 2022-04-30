package focuson.data.mockfetchers.AccountOverview;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewExcessInfo_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class AccountOverviewExcessInfo_get_FFetcherMock  implements AccountOverviewExcessInfo_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getAccountOverviewExcessInfo() {  return dataFetchingEnvironment -> Sample.sampleAccountOverviewExcessInfo0;    }
}