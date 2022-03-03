package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeController {

 @Autowired
 public GraphQL graphQL;
    @PostMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public ResponseEntity createOccupationAndIncome(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeQueries.createOccupationAndIncome(customerId,  Transform.removeQuoteFromProperties(body)), "createOccupationAndIncome");
    }

    @PutMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public ResponseEntity updateOccupationAndIncome(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeQueries.updateOccupationAndIncome(customerId,  Transform.removeQuoteFromProperties(body)), "updateOccupationAndIncome");
    }

    @GetMapping(value="/api/oneOccupationAndIncome", produces="application/json")
    public ResponseEntity getOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeQueries.getOccupationAndIncome(customerId), "getOccupationAndIncome");
    }

    @PostMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String querycreateOccupationAndIncome(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return OccupationAndIncomeQueries.createOccupationAndIncome(customerId,  Transform.removeQuoteFromProperties(body));
    }

    @PutMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String queryupdateOccupationAndIncome(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return OccupationAndIncomeQueries.updateOccupationAndIncome(customerId,  Transform.removeQuoteFromProperties(body));
    }

    @GetMapping(value="/api/oneOccupationAndIncome/query", produces="application/json")
    public String querygetOccupationAndIncome(@RequestParam String customerId) throws Exception{
       return OccupationAndIncomeQueries.getOccupationAndIncome(customerId);
    }

  @GetMapping(value = "/api/oneOccupationAndIncome/sample", produces = "application/json")
    public static String sampleOccupationAndIncome() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncome0);
    }
  }