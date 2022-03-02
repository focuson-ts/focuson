package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.OccupationAndIncomeFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class OccupationAndIncomeFFetcherMock  implements OccupationAndIncomeFFetcher{
 public DataFetcher createOccupationAndIncome() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncome0;    }
 public DataFetcher updateOccupationAndIncome() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncome0;    }
 public DataFetcher getOccupationAndIncome() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncome0;    }
}