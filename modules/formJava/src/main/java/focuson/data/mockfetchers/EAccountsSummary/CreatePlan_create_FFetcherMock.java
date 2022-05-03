package focuson.data.mockfetchers.EAccountsSummary;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.EAccountsSummary.CreatePlan_create_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CreatePlan_create_FFetcherMock  implements CreatePlan_create_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher createCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }
}