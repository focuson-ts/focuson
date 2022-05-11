package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.AccountOverview.AccountOverviewQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class AccountOverviewController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/accountOverview", produces="application/json")
    public ResponseEntity getAccountOverview(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),AccountOverviewQueries.getAccountOverview(accountId, applRef, brandRef, clientRef), "getAccountOverview");
        }
    }

    @GetMapping(value="/api/accountOverview/query", produces="application/json")
    public String querygetAccountOverview(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return AccountOverviewQueries.getAccountOverview(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/api/accountOverview/sample", produces = "application/json")
    public static String sampleAccountOverview() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverview0);
    }
  }