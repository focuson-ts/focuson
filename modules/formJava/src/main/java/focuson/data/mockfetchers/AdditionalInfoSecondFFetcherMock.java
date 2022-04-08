package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.AdditionalInfoSecondFFetcher;
import focuson.data.fetchers.IFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class AdditionalInfoSecondFFetcherMock  implements AdditionalInfoSecondFFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getAdditionalInfoSecond() {  return dataFetchingEnvironment -> Sample.sampleAdditionalInfoSecond0;    }
 public DataFetcher updateAdditionalInfoSecond() {  return dataFetchingEnvironment -> Sample.sampleAdditionalInfoSecond0;    }
}