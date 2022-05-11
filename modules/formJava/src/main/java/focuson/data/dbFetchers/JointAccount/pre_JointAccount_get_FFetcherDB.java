 package focuson.data.dbFetchers.JointAccount;

import  focuson.data.db.JointAccount_jointAccountMaps;
import  focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.JointAccount.pre_JointAccount_get_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;
import java.util.List;
import java.util.Optional;

  @Component
public class pre_JointAccount_get_FFetcherDB implements pre_JointAccount_get_FFetcher {

  @Autowired
  private DataSource dataSource;

  public DataFetcher getpreJointAccount() {
    return dataFetchingEnvironment -> {
      String accountId = dataFetchingEnvironment.getArgument("accountId");
      String brandRef = dataFetchingEnvironment.getArgument("brandRef");
      String dbName = dataFetchingEnvironment.getArgument("dbName");
       Connection c = dataSource.getConnection();
       try {
         //from the data type in JointAccount.rest[jointAccount].dataDD which is a JointAccount 
         Optional<Map<String, Object>> opt = JointAccount_jointAccountMaps.getAll(c,Integer.parseInt(accountId),Integer.parseInt(brandRef));
         Map json = opt.get();
         return json;
       } finally {
         c.close();
       }
    };
  }

  @Override
  public String dbName() {
      return IFetcher.db;
  }
}