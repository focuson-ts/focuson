package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class EAccountsSummaryDDController {

 @Autowired
 public GraphQL graphQL;
    @GetMapping(value="/api/accountsSummary", produces="application/json")
    public String getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.getEAccountsSummaryDD(accountId, customerId), "getEAccountsSummaryDD");
    }

    @GetMapping(value="/api/accountsSummary/query", produces="application/json")
    public String querygetEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Queries.getEAccountsSummaryDD(accountId, customerId);
    }

  @GetMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummaryDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummaryDD0);
    }
  }