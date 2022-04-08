package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.CreateEAccountDataQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class CreateEAccountDataController {

  @Autowired
  public GraphQL graphQL;
    @PostMapping(value="/api/createEAccount/", produces="application/json")
    public ResponseEntity createCreateEAccountData(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,CreateEAccountDataQueries.createCreateEAccountData(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createCreateEAccountData");
    }

    @GetMapping(value="/api/createEAccount/", produces="application/json")
    public ResponseEntity getCreateEAccountData(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,CreateEAccountDataQueries.getCreateEAccountData(accountId, createPlanId, customerId), "getCreateEAccountData");
    }

    @PostMapping(value="/api/createEAccount//query", produces="application/json")
    public String querycreateCreateEAccountData(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return CreateEAccountDataQueries.createCreateEAccountData(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @GetMapping(value="/api/createEAccount//query", produces="application/json")
    public String querygetCreateEAccountData(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return CreateEAccountDataQueries.getCreateEAccountData(accountId, createPlanId, customerId);
    }

  @GetMapping(value = "/api/createEAccount//sample", produces = "application/json")
    public static String sampleCreateEAccountData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreateEAccountData0);
    }
  }