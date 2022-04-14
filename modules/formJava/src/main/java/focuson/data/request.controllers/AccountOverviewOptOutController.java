package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AccountOverviewOptOutQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AccountOverviewOptOutController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview/optOut", produces="application/json")
    public ResponseEntity getAccountOverviewOptOut(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),AccountOverviewOptOutQueries.getAccountOverviewOptOut(accountId, customerId), "getAccountOverviewOptOut");
    }

    @GetMapping(value="/api/accountOverview/optOut/query", produces="application/json")
    public String querygetAccountOverviewOptOut(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return AccountOverviewOptOutQueries.getAccountOverviewOptOut(accountId, customerId);
    }

  @GetMapping(value = "/api/accountOverview/optOut/sample", produces = "application/json")
    public static String sampleAccountOverviewOptOut() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewOptOut0);
    }
  }