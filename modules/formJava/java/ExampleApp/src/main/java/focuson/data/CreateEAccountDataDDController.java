package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class CreateEAccountDataDDController {

 @Autowired
 public GraphQL graphQL;
    @PostMapping(value="/api/createEAccount/{createPlanId}", produces="application/json")
    public String createCreateEAccountDataDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.createCreateEAccountDataDD(accountId, customerId), "createCreateEAccountDataDD");
    }

    @PostMapping(value="/api/createEAccount/{createPlanId}/query", produces="application/json")
    public String querycreateCreateEAccountDataDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Queries.createCreateEAccountDataDD(accountId, customerId);
    }

  @GetMapping(value = "/api/createEAccount/{createPlanId}/sample", produces = "application/json")
    public static String sampleCreateEAccountDataDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreateEAccountDataDD0);
    }
  }