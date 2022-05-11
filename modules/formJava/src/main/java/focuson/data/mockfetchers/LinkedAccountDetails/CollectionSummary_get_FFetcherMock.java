package focuson.data.mockfetchers.LinkedAccountDetails;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.LinkedAccountDetails.CollectionSummary_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CollectionSummary_get_FFetcherMock  implements CollectionSummary_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getCollectionSummary() {  return dataFetchingEnvironment -> Sample.sampleCollectionSummary0;    }
}