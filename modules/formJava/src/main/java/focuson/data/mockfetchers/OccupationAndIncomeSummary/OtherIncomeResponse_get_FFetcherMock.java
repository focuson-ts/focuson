package focuson.data.mockfetchers.OccupationAndIncomeSummary;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.OtherIncomeResponse_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class OtherIncomeResponse_get_FFetcherMock  implements OtherIncomeResponse_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getOtherIncomeResponse() {  return dataFetchingEnvironment -> Sample.sampleOtherIncomeResponse0;    }
}