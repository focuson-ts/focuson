package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.ChequeCreditbooksFFetcher;
import focuson.data.fetchers.IFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ChequeCreditbooksFFetcherMock  implements ChequeCreditbooksFFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getChequeCreditbooks() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooks0;    }
 public DataFetcher createChequeCreditbooks() {  return dataFetchingEnvironment -> Sample.sampleChequeCreditbooks0;    }
}