package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.ArrearsDetailsFFetcher;
import focuson.data.fetchers.IFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ArrearsDetailsFFetcherMock  implements ArrearsDetailsFFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getArrearsDetails() {  return dataFetchingEnvironment -> Sample.sampleArrearsDetails0;    }
}