package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.CreateEAccountDataDDFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CreateEAccountDataDDFFetcherMock  implements CreateEAccountDataDDFFetcher{
 public DataFetcher createCreateEAccountDataDD() {  return dataFetchingEnvironment -> Sample.sampleCreateEAccountDataDD0;    }
 public DataFetcher getCreateEAccountDataDD() {  return dataFetchingEnvironment -> Sample.sampleCreateEAccountDataDD0;    }
}