package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.PostCodeMainPage.PostCodeNameAndAddressQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import focuson.data.db.PostCodeMainPage_addressMaps ; 

  @RestController
  public class PostCodeNameAndAddressController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @PostMapping(value="/api/address", produces="application/json")
    public ResponseEntity createPostCodeNameAndAddress(@RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),PostCodeNameAndAddressQueries.createPostCodeNameAndAddress(  Transform.removeQuoteFromProperties(body, Map.class)), "createPostCodeNameAndAddress");
        }
    }

    @PostMapping(value="/api/address/query", produces="application/json")
    public String querycreatePostCodeNameAndAddress(@RequestBody String body) throws Exception{
       return PostCodeNameAndAddressQueries.createPostCodeNameAndAddress(  Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/api/address/sample", produces = "application/json")
    public static String samplePostCodeNameAndAddress() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeNameAndAddress0);
    }
  @GetMapping(value = "/api/address/sql", produces = "text/html")
    public static String sqlPostCodeNameAndAddress() throws Exception {
      return PostCodeMainPage_addressMaps.allSql;
    }
  }