package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AccountAllFlagsQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AccountAllFlagsController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/accountOverview/flags", produces="application/json")
    public ResponseEntity getAccountAllFlags(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,AccountAllFlagsQueries.getAccountAllFlags(accountId, customerId), "getAccountAllFlags");
    }

    @GetMapping(value="/api/accountOverview/flags/query", produces="application/json")
    public String querygetAccountAllFlags(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return AccountAllFlagsQueries.getAccountAllFlags(accountId, customerId);
    }

  @GetMapping(value = "/api/accountOverview/flags/sample", produces = "application/json")
    public static String sampleAccountAllFlags() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountAllFlags0);
    }
  }