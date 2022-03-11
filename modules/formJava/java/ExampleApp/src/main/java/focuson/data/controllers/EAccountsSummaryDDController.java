package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.EAccountsSummaryDDQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class EAccountsSummaryDDController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/accountsSummary", produces="application/json")
    public ResponseEntity getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,EAccountsSummaryDDQueries.getEAccountsSummaryDD(accountId, customerId), "getEAccountsSummaryDD");
    }

    @GetMapping(value="/api/accountsSummary/query", produces="application/json")
    public String querygetEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return EAccountsSummaryDDQueries.getEAccountsSummaryDD(accountId, customerId);
    }

  @GetMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummaryDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummaryDD0);
    }
  }