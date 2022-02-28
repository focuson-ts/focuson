package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class ChequeCreditbooksDDController {

 @Autowired
 public GraphQL graphQL;
    @RequestMapping(value="/api/chequeCreditBooks", produces="application/json")
    public String getChequeCreditbooksDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getChequeCreditbooksDD(accountId, applRef, brandRef, customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getChequeCreditbooksDD"));
    }

    @RequestMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String queryChequeCreditbooksDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Queries.getChequeCreditbooksDD(accountId, applRef, brandRef, customerId);
    }

  @RequestMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooksDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooksDD0);
    }
// Not yet doing action create
  }