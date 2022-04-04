package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._AccountAllFlagsFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _AccountAllFlagsFFetcherMock  implements _AccountAllFlagsFFetcher{
 public DataFetcher getAccountAllFlags() {  return dataFetchingEnvironment -> Sample.sampleAccountAllFlags0;    }
}