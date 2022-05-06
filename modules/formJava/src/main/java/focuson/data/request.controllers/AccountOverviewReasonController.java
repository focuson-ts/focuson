package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.AccountOverview.AccountOverviewReasonQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class AccountOverviewReasonController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview/reason", produces="application/json")
    public ResponseEntity getAccountOverviewReason(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),AccountOverviewReasonQueries.getAccountOverviewReason(accountId, applRef, brandRef, clientRef), "getAccountOverviewReason");
    }

    @GetMapping(value="/api/accountOverview/reason/query", produces="application/json")
    public String querygetAccountOverviewReason(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return AccountOverviewReasonQueries.getAccountOverviewReason(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/api/accountOverview/reason/sample", produces = "application/json")
    public static String sampleAccountOverviewReason() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewReason0);
    }
  }