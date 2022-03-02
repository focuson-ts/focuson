package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.ChequeCreditbooksDDFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ChequeCreditbooksDDFFetcherMock  implements ChequeCreditbooksDDFFetcher{
 public DataFetcher getChequeCreditbooksDD() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooksDD0;    }
 public DataFetcher createChequeCreditbooksDD() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooksDD0;    }
}