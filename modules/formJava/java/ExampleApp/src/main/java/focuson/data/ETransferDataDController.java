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
       return Results.result(graphQL,Queries.createETransferDataD(customerId), "createETransferDataD");
    }

    @PostMapping(value="/api/eTransfers/query", produces="application/json")
    public String querycreateETransferDataD(@RequestParam String customerId) throws Exception{
       return Queries.createETransferDataD(customerId);
    }

  @GetMapping(value = "/api/eTransfers/sample", produces = "application/json")
    public static String sampleETransferDataD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleETransferDataD0);
    }
  }