package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class EAccountsSummaryDDController {

 @Autowired
 public GraphQL graphQL;
    @RequestMapping(value="/api/accountsSummary", produces="application/json")
    public String getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getEAccountsSummaryDD(accountId, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getEAccountsSummaryDD"));
    }

    @RequestMapping(value="/api/accountsSummary/query", produces="application/json")
    public String queryEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Queries.getEAccountsSummaryDD(accountId, customerId);
    }

  @RequestMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummaryDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummaryDD0);
    }
  }