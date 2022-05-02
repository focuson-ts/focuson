package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.EAccountsSummary.CreatePlanQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CreatePlanController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity getCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.getCreatePlan(accountId, createPlanId, customerId), "getCreatePlan");
    }

    @PostMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity createCreatePlan(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.createCreatePlan(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createCreatePlan");
    }

    @PutMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity updateCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.updateCreatePlan(accountId, createPlanId, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "updateCreatePlan");
    }

    @DeleteMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity deleteCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.deleteCreatePlan(accountId, createPlanId, customerId), "");
    }

    @GetMapping(value="/api/createPlan/query", produces="application/json")
    public String querygetCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return CreatePlanQueries.getCreatePlan(accountId, createPlanId, customerId);
    }

    @PostMapping(value="/api/createPlan/query", produces="application/json")
    public String querycreateCreatePlan(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return CreatePlanQueries.createCreatePlan(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @PutMapping(value="/api/createPlan/query", produces="application/json")
    public String queryupdateCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return CreatePlanQueries.updateCreatePlan(accountId, createPlanId, customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @DeleteMapping(value="/api/createPlan/query", produces="application/json")
    public String querydeleteCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return CreatePlanQueries.deleteCreatePlan(accountId, createPlanId, customerId);
    }

  @GetMapping(value = "/api/createPlan/sample", produces = "application/json")
    public static String sampleCreatePlan() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlan0);
    }
  }