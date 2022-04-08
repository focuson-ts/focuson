package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AccountOverviewQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AccountOverviewController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview", produces="application/json")
    public ResponseEntity getAccountOverview(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),AccountOverviewQueries.getAccountOverview(accountId, customerId), "getAccountOverview");
    }

    @GetMapping(value="/api/accountOverview/query", produces="application/json")
    public String querygetAccountOverview(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return AccountOverviewQueries.getAccountOverview(accountId, customerId);
    }

  @GetMapping(value = "/api/accountOverview/sample", produces = "application/json")
    public static String sampleAccountOverview() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverview0);
    }
  }