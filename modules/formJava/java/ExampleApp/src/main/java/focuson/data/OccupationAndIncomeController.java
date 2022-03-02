package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeController {

 @Autowired
 public GraphQL graphQL;
    @PostMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public ResponseEntity createOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.createOccupationAndIncome(customerId), "createOccupationAndIncome");
    }

    @PutMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public ResponseEntity updateOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.updateOccupationAndIncome(customerId), "updateOccupationAndIncome");
    }

    @GetMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public ResponseEntity getOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.getOccupationAndIncome(customerId), "getOccupationAndIncome");
    }

    @PostMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String querycreateOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Queries.createOccupationAndIncome(customerId);
    }

    @PutMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String queryupdateOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Queries.updateOccupationAndIncome(customerId);
    }

    @GetMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String querygetOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Queries.getOccupationAndIncome(customerId);
    }

  @GetMapping(value = "/api/oneOccupationAndIncome/sample", produces = "application/json")
    public static String sampleOccupationAndIncome() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncome0);
    }
  }