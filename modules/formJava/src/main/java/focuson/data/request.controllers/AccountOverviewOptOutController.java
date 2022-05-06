package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.AccountOverview.AccountOverviewOptOutQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class AccountOverviewOptOutController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview/optOut", produces="application/json")
    public ResponseEntity getAccountOverviewOptOut(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),AccountOverviewOptOutQueries.getAccountOverviewOptOut(accountId, applRef, brandRef, clientRef), "getAccountOverviewOptOut");
    }

    @GetMapping(value="/api/accountOverview/optOut/query", produces="application/json")
    public String querygetAccountOverviewOptOut(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return AccountOverviewOptOutQueries.getAccountOverviewOptOut(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/api/accountOverview/optOut/sample", produces = "application/json")
    public static String sampleAccountOverviewOptOut() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewOptOut0);
    }
  }