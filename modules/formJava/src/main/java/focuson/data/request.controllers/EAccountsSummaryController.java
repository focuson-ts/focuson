package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.EAccountsSummary.EAccountsSummaryQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class EAccountsSummaryController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountsSummary", produces="application/json")
    public ResponseEntity getEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId), "getEAccountsSummary");
    }

    @PostMapping(value="/api/accountsSummary/invalidate", produces="application/json")
    public ResponseEntity state_invalidateEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, customerId), "");
    }

    @GetMapping(value="/api/accountsSummary/query", produces="application/json")
    public String querygetEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId);
    }

    @PostMapping(value="/api/accountsSummary/invalidate/query", produces="application/json")
    public String querystate_invalidateEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, customerId);
    }

  @GetMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummary() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);
    }
  }