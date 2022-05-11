package focuson.data.mockfetchers.ListOfPaymentsPage;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.ListOfPaymentsPage.PrintRecordHistory_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class PrintRecordHistory_get_FFetcherMock  implements PrintRecordHistory_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getPrintRecordItem() {  return dataFetchingEnvironment -> Sample.samplePrintRecordHistory0;    }
}