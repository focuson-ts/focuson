package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.OccupationAndIncomeDetailsFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class OccupationAndIncomeDetailsFFetcherMock  implements OccupationAndIncomeDetailsFFetcher{
 public DataFetcher getOccupationAndIncomeDetails() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncomeDetails0;    }
 public DataFetcher updateOccupationAndIncomeDetails() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncomeDetails0;    }
}