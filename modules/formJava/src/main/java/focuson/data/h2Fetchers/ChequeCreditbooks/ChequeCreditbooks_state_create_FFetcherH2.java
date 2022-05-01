package focuson.data.h2Fetchers.ChequeCreditbooks;

import   focuson.data.db.JointAccount_jointAccountMaps;
import   focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_state_create_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.util.Map;
import java.util.Optional;

@Component
public class ChequeCreditbooks_state_create_FFetcherH2 implements ChequeCreditbooks_state_create_FFetcher {

  @Autowired
  private DataSource dataSource;

  @SuppressWarnings("SqlResolve")
  public DataFetcher stateChequeCreditbookscreate() {
    return dataFetchingEnvironment -> {
      String customerId = dataFetchingEnvironment.getArgument("customerId");
      String accountId = dataFetchingEnvironment.getArgument("accountId");
      try (Connection c = dataSource.getConnection()) {
        try(CallableStatement s = c.prepareCall("call someProcName(?, ?)")){
          s.setObject(1,customerId);
          s.setObject(2,accountId);
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