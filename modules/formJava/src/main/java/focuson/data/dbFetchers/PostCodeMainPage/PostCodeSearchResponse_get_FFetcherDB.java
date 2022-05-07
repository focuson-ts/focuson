 package focuson.data.dbFetchers.PostCodeMainPage;

import  focuson.data.db.PostCodeMainPage_postcodeMaps;
import  focuson.data.fetchers.IFetcher;
import  focuson.data.fetchers.PostCodeMainPage.PostCodeSearchResponse_get_FFetcher;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;
import java.util.List;
import java.util.Optional;

  @Component
public class PostCodeSearchResponse_get_FFetcherDB implements PostCodeSearchResponse_get_FFetcher {

  @Autowired
  private DataSource dataSource;

  public DataFetcher getPostCodeDataLine() {
    return dataFetchingEnvironment -> {
      String dbName = dataFetchingEnvironment.getArgument("dbName");
      String postcode = dataFetchingEnvironment.getArgument("postcode");
       Connection c = dataSource.getConnection();
       try {
         //from the data type in PostCodeMainPage.rest[postcode].dataDD which is a PostCodeSearchResponse 
         List<Map<String, Object>> list = PostCodeMainPage_postcodeMaps.getAll(c,(postcode));
         return list;
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