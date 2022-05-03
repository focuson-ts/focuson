package focuson.data.mockfetchers.ChequeCreditbooks;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_state_cancel_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class ChequeCreditbooks_state_cancel_FFetcherMock  implements ChequeCreditbooks_state_cancel_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
  public DataFetcher stateChequeCreditbookscancel (){ return new StaticDataFetcher(true);}
}