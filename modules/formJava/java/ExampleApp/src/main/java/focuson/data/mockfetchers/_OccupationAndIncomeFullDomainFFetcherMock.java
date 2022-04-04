package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._OccupationAndIncomeFullDomainFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _OccupationAndIncomeFullDomainFFetcherMock  implements _OccupationAndIncomeFullDomainFFetcher{
 public DataFetcher getOccupationAndIncomeFullDomain() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncomeFullDomain0;    }
 public DataFetcher updateOccupationAndIncomeFullDomain() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncomeFullDomain0;    }
}