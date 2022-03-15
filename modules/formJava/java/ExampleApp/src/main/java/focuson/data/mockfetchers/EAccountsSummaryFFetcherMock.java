package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.EAccountsSummaryFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class EAccountsSummaryFFetcherMock  implements EAccountsSummaryFFetcher{
 public DataFetcher getEAccountsSummary() {  return dataFetchingEnvironment -> Sample.sampleEAccountsSummary0;    }
  public DataFetcher getAccountSummaryDescription (){ return new StaticDataFetcher("This account has a description");}
  public DataFetcher getTotalMonthlyCost (){ return new StaticDataFetcher(1000);}
  public DataFetcher getOneAccountBalance (){ return new StaticDataFetcher(9921);}
  public DataFetcher getCurrentAccountBalance (){ return new StaticDataFetcher(12321);}
}