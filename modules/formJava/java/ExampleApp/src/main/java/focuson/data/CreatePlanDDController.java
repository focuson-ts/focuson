package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class CreatePlanDDController {

 @Autowired
 public GraphQL graphQL;
    @RequestMapping(value="/api/createPlan/{createPlanId}", produces="application/json")
    public String getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getCreatePlanDD"));
    }

    @RequestMapping(value="/api/createPlan/{createPlanId}/query", produces="application/json")
    public String queryCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{
       return Queries.getCreatePlanDD(accountId, createPlanId, customerId);
    }

  @RequestMapping(value = "/api/createPlan/{createPlanId}/sample", produces = "application/json")
    public static String sampleCreatePlanDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.CreatePlanDDSample0);
    }
// Not yet doing action create
// Not yet doing action update
// Not yet doing action delete
// Not yet doing action list
  }