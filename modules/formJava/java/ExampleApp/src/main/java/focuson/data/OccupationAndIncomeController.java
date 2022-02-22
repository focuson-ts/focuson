package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeController {

 @Autowired
 public GraphQL graphQL;
// Not yet doing action create
// Not yet doing action update
    @RequestMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public String getOccupationAndIncome(@RequestParam String customerId) throws Exception{
       Map data = (Map) graphQL.execute(Queries.getOccupationAndIncome(customerId)).toSpecification().get("data");
       return new ObjectMapper().writeValueAsString(data.get("getOccupationAndIncome"));
    }

    @RequestMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String queryOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Queries.getOccupationAndIncome(customerId);
    }

  @RequestMapping(value = "/api/oneOccupationAndIncome/sample", produces = "application/json")
    public static String sampleOccupationAndIncome() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncome0);
    }
  }