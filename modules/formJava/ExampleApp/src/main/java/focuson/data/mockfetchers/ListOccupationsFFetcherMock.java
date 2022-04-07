package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.ListOccupationsFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ListOccupationsFFetcherMock  implements ListOccupationsFFetcher{
 public DataFetcher getListOccupations() {  return dataFetchingEnvironment -> Sample.sampleListOccupations0;    }
}