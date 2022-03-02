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
    @GetMapping(value="/api/createPlan", produces="application/json")
    public String getCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getCreatePlanDD(accountId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getCreatePlanDD"));
    }

    @PostMapping(value="/api/createPlan", produces="application/json")
    public String createCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.createCreatePlanDD(accountId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("createCreatePlanDD"));
    }

    @PutMapping(value="/api/createPlan", produces="application/json")
    public String updateCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.updateCreatePlanDD(accountId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("updateCreatePlanDD"));
    }

    @DeleteMapping(value="/api/createPlan", produces="application/json")
    public String deleteCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.deleteCreatePlanDD(accountId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("deleteCreatePlanDD"));
    }

    @GetMapping(value="/api/createPlan/list", produces="application/json")
    public String listCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.listCreatePlanDD(accountId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("listCreatePlanDD"));
    }

    @GetMapping(value="/api/createPlan/query", produces="application/json")
    public String queryCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Queries.getCreatePlanDD(accountId, customerId);
    }

  @GetMapping(value = "/api/createPlan/sample", produces = "application/json")
    public static String sampleCreatePlanDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlanDD0);
    }
  }