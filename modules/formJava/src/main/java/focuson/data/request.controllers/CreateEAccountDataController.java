package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.CreateEAccountDataQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class CreateEAccountDataController {

  @Autowired
  public IManyGraphQl graphQL;
    @PostMapping(value="/api/createEAccount/", produces="application/json")
    public ResponseEntity createCreateEAccountData(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String customerId,@RequestBody String body) throws Exception{
       return Transform.result(graphQL.get(dbName),CreateEAccountDataQueries.createCreateEAccountData(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createCreateEAccountData");
    }

    @GetMapping(value="/api/createEAccount/", produces="application/json")
    public ResponseEntity getCreateEAccountData(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(dbName),CreateEAccountDataQueries.getCreateEAccountData(accountId, createPlanId, customerId), "getCreateEAccountData");
    }

    @PostMapping(value="/api/createEAccount//query", produces="application/json")
    public String querycreateCreateEAccountData(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String customerId,@RequestBody String body) throws Exception{
       return CreateEAccountDataQueries.createCreateEAccountData(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @GetMapping(value="/api/createEAccount//query", produces="application/json")
    public String querygetCreateEAccountData(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return CreateEAccountDataQueries.getCreateEAccountData(accountId, createPlanId, customerId);
    }

  @GetMapping(value = "/api/createEAccount//sample", produces = "application/json")
    public static String sampleCreateEAccountData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreateEAccountData0);
    }
  }