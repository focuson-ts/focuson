package focuson.data.mockfetchers.ETransfer;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.ETransfer.ETransferDataD_create_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ETransferDataD_create_FFetcherMock  implements ETransferDataD_create_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher createETransferDataD() {  return dataFetchingEnvironment -> Sample.sampleETransferDataD0;    }
}