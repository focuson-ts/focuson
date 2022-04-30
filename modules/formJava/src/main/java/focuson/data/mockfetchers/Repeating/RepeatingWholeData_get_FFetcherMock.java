package focuson.data.mockfetchers.Repeating;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.Repeating.RepeatingWholeData_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class RepeatingWholeData_get_FFetcherMock  implements RepeatingWholeData_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getRepeatingLine() {  return dataFetchingEnvironment -> Sample.sampleRepeatingWholeData0;    }
}