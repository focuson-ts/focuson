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
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CreatePlanController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity getCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.getCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId), "getCreatePlan");
        }
    }

    @PostMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity createCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.createCreatePlan(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class)), "createCreatePlan");
        }
    }

    @PutMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity updateCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.updateCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId,   Transform.removeQuoteFromProperties(body, Map.class)), "updateCreatePlan");
        }
    }

    @DeleteMapping(value="/api/createPlan", produces="application/json")
    public ResponseEntity deleteCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.deleteCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId), "");
        }
    }

    @GetMapping(value="/api/createPlan/query", produces="application/json")
    public String querygetCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId) throws Exception{
       return CreatePlanQueries.getCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId);
    }

    @PostMapping(value="/api/createPlan/query", produces="application/json")
    public String querycreateCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
       return CreatePlanQueries.createCreatePlan(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @PutMapping(value="/api/createPlan/query", produces="application/json")
    public String queryupdateCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId, @RequestBody String body) throws Exception{
       return CreatePlanQueries.updateCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @DeleteMapping(value="/api/createPlan/query", produces="application/json")
    public String querydeleteCreatePlan(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId) throws Exception{
       return CreatePlanQueries.deleteCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId);
    }

  @GetMapping(value = "/api/createPlan/sample", produces = "application/json")
    public static String sampleCreatePlan() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlan0);
    }
  }