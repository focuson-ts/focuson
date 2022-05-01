package focuson.data.mockfetchers.AccountOverview;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.AccountOverview.AccountAllFlags_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class AccountAllFlags_get_FFetcherMock  implements AccountAllFlags_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getAccountAllFlags() {  return dataFetchingEnvironment -> Sample.sampleAccountAllFlags0;    }
}