package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._PostCodeDataFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _PostCodeDataFFetcherMock  implements _PostCodeDataFFetcher{
 public DataFetcher getPostCodeDataLine() {  return dataFetchingEnvironment -> Sample.samplePostCodeData0;    }
}