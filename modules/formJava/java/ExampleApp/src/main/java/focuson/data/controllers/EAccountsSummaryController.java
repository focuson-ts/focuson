package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.EAccountsSummaryQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class EAccountsSummaryController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/accountsSummary", produces="application/json")
    public ResponseEntity getEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId), "getEAccountsSummary");
    }

    @GetMapping(value="/api/accountsSummary/query", produces="application/json")
    public String querygetEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId);
    }

  @GetMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummary() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);
    }
  }