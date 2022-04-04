package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._RepeatingWholeDataFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _RepeatingWholeDataFFetcherMock  implements _RepeatingWholeDataFFetcher{
 public DataFetcher createRepeatingLine() {  return dataFetchingEnvironment -> Sample.sampleRepeatingWholeData0;    }
 public DataFetcher getRepeatingLine() {  return dataFetchingEnvironment -> Sample.sampleRepeatingWholeData0;    }
}