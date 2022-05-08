package focuson.data.mockfetchers.LinkedAccountDetails;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.LinkedAccountDetails.CreatePayment_create_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CreatePayment_create_FFetcherMock  implements CreatePayment_create_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher createCreatePayment() {  return dataFetchingEnvironment -> Sample.sampleCreatePayment0;    }
}