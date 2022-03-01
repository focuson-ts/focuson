package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class CreatePlanDDController {

 @Autowired
 public GraphQL graphQL;
    @GetMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public String getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getCreatePlanDD"));
    }

    @PostMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public String createCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.createCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("createCreatePlanDD"));
    }

    @PutMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public String updateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.updateCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("updateCreatePlanDD"));
    }

    @DeleteMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public String deleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.deleteCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("deleteCreatePlanDD"));
    }

    @GetMapping(value="/api/createPlan/{createPlanId}/list", produces="application/json")
    public String listCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.listCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("listCreatePlanDD"));
    }

    @GetMapping(value="/api/createPlan/{createPlanId}/query", produces="application/json")
    public String queryCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Queries.getCreatePlanDD(accountId, createPlanId, customerId);
    }

  @GetMapping(value = "/api/createPlan/{createPlanId}/sample", produces = "application/json")
    public static String sampleCreatePlanDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlanDD0);
    }
  }