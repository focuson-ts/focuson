package focuson.data.dbFetchers.LinkedAccountDetails;

import   focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.LinkedAccountDetails.CollectionItem_state_cancel_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.util.Map;
import java.util.Optional;

@Component
public class CollectionItem_state_cancel_FFetcherDB implements CollectionItem_state_cancel_FFetcher {

  @SuppressWarnings("SqlResolve")
  public DataFetcher stateCollectionItemcancel() {
    return dataFetchingEnvironment -> {
      String accountId = dataFetchingEnvironment.getArgument("accountId");
      String paymentId = dataFetchingEnvironment.getArgument("paymentId");
      Connection connection = dataFetchingEnvironment.getLocalContext();
      try(PreparedStatement s = connection.prepareStatement("write ")){
          s.setObject(1,accountId);
          s.setObject(2,paymentId);
        return s.execute();
      }};
  }

  @Override
  public String dbName() {
    return IFetcher.db;
  }
}