package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AccountOverviewReasonQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AccountOverviewReasonController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview/reason", produces="application/json")
    public ResponseEntity getAccountOverviewReason(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),AccountOverviewReasonQueries.getAccountOverviewReason(accountId, customerId), "getAccountOverviewReason");
    }

    @GetMapping(value="/api/accountOverview/reason/query", produces="application/json")
    public String querygetAccountOverviewReason(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return AccountOverviewReasonQueries.getAccountOverviewReason(accountId, customerId);
    }

  @GetMapping(value = "/api/accountOverview/reason/sample", produces = "application/json")
    public static String sampleAccountOverviewReason() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewReason0);
    }
  }