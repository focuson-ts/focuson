package focuson.data.mockfetchers.CreateEAccount;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.CreateEAccount.CreateEAccountData_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CreateEAccountData_get_FFetcherMock  implements CreateEAccountData_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getCreateEAccountData() {  return dataFetchingEnvironment -> Sample.sampleCreateEAccountData0;    }
}