package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.ChequeCreditbooksHistoryDDFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ChequeCreditbooksHistoryDDFFetcherMock  implements ChequeCreditbooksHistoryDDFFetcher{
 public DataFetcher getChequeCreditbooksHistoryLineDD() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooksHistoryDD0;    }
 public DataFetcher createChequeCreditbooksHistoryLineDD() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooksHistoryDD0;    }
}