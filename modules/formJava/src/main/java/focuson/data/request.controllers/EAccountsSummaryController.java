package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.EAccountsSummaryQueries;
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
    public ResponseEntity getEAccountsSummary(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(dbName),EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId), "getEAccountsSummary");
    }

    @GetMapping(value="/api/accountsSummary/query", produces="application/json")
    public String querygetEAccountsSummary(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId);
    }

  @GetMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummary() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);
    }
  }