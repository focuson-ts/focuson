package focuson.data.mockfetchers.OccupationAndIncomeSummary;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.Dropdowns_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class Dropdowns_get_FFetcherMock  implements Dropdowns_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getDropdowns() {  return dataFetchingEnvironment -> Sample.sampleDropdowns0;    }
}