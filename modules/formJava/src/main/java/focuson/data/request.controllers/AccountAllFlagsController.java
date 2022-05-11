package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.AccountOverview.AccountAllFlagsQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class AccountAllFlagsController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/accountOverview/flags", produces="application/json")
    public ResponseEntity getAccountAllFlags(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),AccountAllFlagsQueries.getAccountAllFlags(accountId, applRef, brandRef, clientRef), "getAccountAllFlags");
        }
    }

    @GetMapping(value="/api/accountOverview/flags/query", produces="application/json")
    public String querygetAccountAllFlags(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return AccountAllFlagsQueries.getAccountAllFlags(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/api/accountOverview/flags/sample", produces = "application/json")
    public static String sampleAccountAllFlags() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountAllFlags0);
    }
  }