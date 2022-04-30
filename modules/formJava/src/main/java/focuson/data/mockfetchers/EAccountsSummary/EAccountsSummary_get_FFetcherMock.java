package focuson.data.mockfetchers.EAccountsSummary;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class EAccountsSummary_get_FFetcherMock  implements EAccountsSummary_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getEAccountsSummary() {  return dataFetchingEnvironment -> Sample.sampleEAccountsSummary0;    }
  public DataFetcher getAccountSummaryDescription (){ return new StaticDataFetcher("This account has a description");}
  public DataFetcher getTotalMonthlyCost (){ return new StaticDataFetcher(1000);}
  public DataFetcher getOneAccountBalance (){ return new StaticDataFetcher(9921);}
  public DataFetcher getCurrentAccountBalance (){ return new StaticDataFetcher(12321);}
}