package focuson.data.h2Fetchers.EAccountsSummary;

import   focuson.data.db.JointAccount_jointAccountMaps;
import   focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.EAccountsSummary.EAccountsSummary_state_invalidate_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.util.Map;
import java.util.Optional;

@Component
public class EAccountsSummary_state_invalidate_FFetcherH2 implements EAccountsSummary_state_invalidate_FFetcher {

  @Autowired
  private DataSource dataSource;

  @SuppressWarnings("SqlResolve")
  public DataFetcher stateEAccountsSummaryinvalidate() {
    return dataFetchingEnvironment -> {
      String accountId = dataFetchingEnvironment.getArgument("accountId");
      String customerId = dataFetchingEnvironment.getArgument("customerId");
      try (Connection c = dataSource.getConnection()) {
        try(CallableStatement s = c.prepareCall("call sda(?, ?)")){
          s.setObject(1,accountId);
          s.setObject(2,customerId);
          return s.execute();
        }
      }
  };
}

  @Override
  public String dbName() {
    return IFetcher.h2;
  }
}