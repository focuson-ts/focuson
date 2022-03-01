package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeController {

 @Autowired
 public GraphQL graphQL;
    @PostMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public String createOccupationAndIncome(@RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.createOccupationAndIncome(customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("createOccupationAndIncome"));
    }

    @PutMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public String updateOccupationAndIncome(@RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.updateOccupationAndIncome(customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("updateOccupationAndIncome"));
    }

    @GetMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public String getOccupationAndIncome(@RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getOccupationAndIncome(customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getOccupationAndIncome"));
    }

    @GetMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String queryOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Queries.getOccupationAndIncome(customerId);
    }

  @GetMapping(value = "/api/oneOccupationAndIncome/sample", produces = "application/json")
    public static String sampleOccupationAndIncome() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncome0);
    }
  }