package focuson.data.mockfetchers.EAccountsSummary;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_state_invalidate_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class EAccountsSummary_state_invalidate_FFetcherMock  implements EAccountsSummary_state_invalidate_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
  public DataFetcher stateEAccountsSummaryinvalidate (){ return new StaticDataFetcher(true);}
}