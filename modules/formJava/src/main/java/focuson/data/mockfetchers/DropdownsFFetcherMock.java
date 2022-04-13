package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.DropdownsFFetcher;
import focuson.data.fetchers.IFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class DropdownsFFetcherMock  implements DropdownsFFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getDropdowns() {  return dataFetchingEnvironment -> Sample.sampleDropdowns0;    }
}