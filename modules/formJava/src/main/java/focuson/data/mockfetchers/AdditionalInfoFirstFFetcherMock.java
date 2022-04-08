package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.AdditionalInfoFirstFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class AdditionalInfoFirstFFetcherMock  implements AdditionalInfoFirstFFetcher{
 public DataFetcher getAdditionalInfoFirst() {  return dataFetchingEnvironment -> Sample.sampleAdditionalInfoFirst0;    }
 public DataFetcher updateAdditionalInfoFirst() {  return dataFetchingEnvironment -> Sample.sampleAdditionalInfoFirst0;    }
}