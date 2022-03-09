package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.CreateEAccountDataDDQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class CreateEAccountDataDDController {

  @Autowired
  public GraphQL graphQL;
    @PostMapping(value="/api/createEAccount/{createPlanId}", produces="application/json")
    public ResponseEntity createCreateEAccountDataDD(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,CreateEAccountDataDDQueries.createCreateEAccountDataDD(accountId, customerId,  Transform.removeQuoteFromProperties(body)), "createCreateEAccountDataDD");
    }

    @PostMapping(value="/api/createEAccount/{createPlanId}/query", produces="application/json")
    public String querycreateCreateEAccountDataDD(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return CreateEAccountDataDDQueries.createCreateEAccountDataDD(accountId, customerId,  Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/api/createEAccount/{createPlanId}/sample", produces = "application/json")
    public static String sampleCreateEAccountDataDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreateEAccountDataDD0);
    }
  }