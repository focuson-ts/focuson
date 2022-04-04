package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._ChequeCreditbooksFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _ChequeCreditbooksFFetcherMock  implements _ChequeCreditbooksFFetcher{
 public DataFetcher getChequeCreditbooks() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooks0;    }
 public DataFetcher createChequeCreditbooks() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooks0;    }
}