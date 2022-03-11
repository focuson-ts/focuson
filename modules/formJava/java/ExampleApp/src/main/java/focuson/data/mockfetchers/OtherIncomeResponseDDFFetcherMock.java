package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.OtherIncomeResponseDDFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class OtherIncomeResponseDDFFetcherMock  implements OtherIncomeResponseDDFFetcher{
 public DataFetcher getOtherIncomeResponseDD() {  return dataFetchingEnvironment -> Sample.sampleOtherIncomeResponseDD0;    }
}