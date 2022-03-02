package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class CreatePlanDDController {

 @Autowired
 public GraphQL graphQL;
    @GetMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public ResponseEntity getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.getCreatePlanDD(accountId, createPlanId, customerId), "getCreatePlanDD");
    }

    @PostMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public ResponseEntity createCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.createCreatePlanDD(accountId, customerId), "createCreatePlanDD");
    }

    @PutMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public ResponseEntity updateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.updateCreatePlanDD(accountId, createPlanId, customerId), "updateCreatePlanDD");
    }

    @DeleteMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public ResponseEntity deleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.deleteCreatePlanDD(accountId, createPlanId, customerId), "deleteCreatePlanDD");
    }

    @GetMapping(value="/api/createPlan/{createPlanId}/list", produces="application/json")
    public ResponseEntity listCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.listCreatePlanDD(accountId, customerId), "listCreatePlanDD");
    }

    @GetMapping(value="/api/createPlan/{createPlanId}/query", produces="application/json")
    public String querygetCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Queries.getCreatePlanDD(accountId, createPlanId, customerId);
    }

    @PostMapping(value="/api/createPlan/{createPlanId}/query", produces="application/json")
    public String querycreateCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Queries.createCreatePlanDD(accountId, customerId);
    }

    @PutMapping(value="/api/createPlan/{createPlanId}/query", produces="application/json")
    public String queryupdateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Queries.updateCreatePlanDD(accountId, createPlanId, customerId);
    }

    @DeleteMapping(value="/api/createPlan/{createPlanId}/query", produces="application/json")
    public String querydeleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Queries.deleteCreatePlanDD(accountId, createPlanId, customerId);
    }

    @GetMapping(value="/api/createPlan/{createPlanId}/list/query", produces="application/json")
    public String querylistCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Queries.listCreatePlanDD(accountId, customerId);
    }

  @GetMapping(value = "/api/createPlan/{createPlanId}/sample", produces = "application/json")
    public static String sampleCreatePlanDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlanDD0);
    }
  }