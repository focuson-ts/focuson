package focuson.data.dbFetchers.EAccountsSummary;

import   focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.EAccountsSummary.EAccountsSummary_state_invalidate_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.util.Map;
import java.util.Optional;

@Component
public class EAccountsSummary_state_invalidate_FFetcherDB implements EAccountsSummary_state_invalidate_FFetcher {

  @SuppressWarnings("SqlResolve")
  public DataFetcher stateEAccountsSummaryinvalidate() {
    return dataFetchingEnvironment -> {
      String accountId = dataFetchingEnvironment.getArgument("accountId");
      String clientRef = dataFetchingEnvironment.getArgument("clientRef");
      Connection connection = dataFetchingEnvironment.getLocalContext();
      try(CallableStatement s = connection.prepareCall("call sda(?, ?)")){
          s.setObject(1,accountId);
          s.setObject(2,clientRef);
        return s.execute();
      }};
  }

  @Override
  public String dbName() {
    return IFetcher.db;
  }
}