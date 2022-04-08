package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.CreateEAccountDataFFetcher;
import focuson.data.fetchers.IFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CreateEAccountDataFFetcherMock  implements CreateEAccountDataFFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher createCreateEAccountData() {  return dataFetchingEnvironment -> Sample.sampleCreateEAccountData0;    }
 public DataFetcher getCreateEAccountData() {  return dataFetchingEnvironment -> Sample.sampleCreateEAccountData0;    }
}