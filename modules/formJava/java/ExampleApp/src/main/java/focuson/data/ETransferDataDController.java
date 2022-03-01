package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class ETransferDataDController {

 @Autowired
 public GraphQL graphQL;
    @PostMapping(value="/api/eTransfers", produces="application/json")
    public String createETransferDataD(@RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.createETransferDataD(customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("createETransferDataD"));
    }

    @GetMapping(value="/api/eTransfers/query", produces="application/json")
    public String queryETransferDataD(@RequestParam String customerId) throws Exception{
       return Queries.getETransferDataD(customerId);
    }

  @GetMapping(value = "/api/eTransfers/sample", produces = "application/json")
    public static String sampleETransferDataD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleETransferDataD0);
    }
  }