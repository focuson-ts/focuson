package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.OccupationAndIncomeDetailsDDFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class OccupationAndIncomeDetailsDDFFetcherMock  implements OccupationAndIncomeDetailsDDFFetcher{
 public DataFetcher getOccupationAndIncomeDetailsDD() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncomeDetailsDD0;    }
 public DataFetcher updateOccupationAndIncomeDetailsDD() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncomeDetailsDD0;    }
}