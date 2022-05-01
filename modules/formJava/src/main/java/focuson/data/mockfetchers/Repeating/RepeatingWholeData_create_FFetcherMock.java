package focuson.data.mockfetchers.Repeating;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.Repeating.RepeatingWholeData_create_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class RepeatingWholeData_create_FFetcherMock  implements RepeatingWholeData_create_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher createRepeatingLine() {  return dataFetchingEnvironment -> Sample.sampleRepeatingWholeData0;    }
}