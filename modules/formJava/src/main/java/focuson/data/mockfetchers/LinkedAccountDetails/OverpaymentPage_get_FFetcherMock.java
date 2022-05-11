package focuson.data.mockfetchers.LinkedAccountDetails;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.LinkedAccountDetails.OverpaymentPage_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class OverpaymentPage_get_FFetcherMock  implements OverpaymentPage_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getOverpaymentPage() {  return dataFetchingEnvironment -> Sample.sampleOverpaymentPage0;    }
}