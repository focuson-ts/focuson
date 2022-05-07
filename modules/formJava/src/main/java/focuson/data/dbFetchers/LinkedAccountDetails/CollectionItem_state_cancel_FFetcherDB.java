package focuson.data.dbFetchers.LinkedAccountDetails;

import   focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.LinkedAccountDetails.CollectionItem_state_cancel_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.util.Map;
import java.util.Optional;

@Component
public class CollectionItem_state_cancel_FFetcherDB implements CollectionItem_state_cancel_FFetcher {

  @Autowired
  private DataSource dataSource;

  @SuppressWarnings("SqlResolve")
  public DataFetcher stateCollectionItemcancel() {
    return dataFetchingEnvironment -> {
      String accountId = dataFetchingEnvironment.getArgument("accountId");
      String paymentId = dataFetchingEnvironment.getArgument("paymentId");
      try (Connection c = dataSource.getConnection()) {
        try(CallableStatement s = c.prepareCall("call cancelPayment(?, ?)")){
          s.setObject(1,accountId);
          s.setObject(2,paymentId);
          return s.execute();
        }
      }
  };
}

  @Override
  public String dbName() {
    return IFetcher.db;
  }
}