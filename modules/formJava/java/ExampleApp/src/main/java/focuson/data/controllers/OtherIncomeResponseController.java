package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OtherIncomeResponseQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class OtherIncomeResponseController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/otherIncome", produces="application/json")
    public ResponseEntity getOtherIncomeResponse(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,OtherIncomeResponseQueries.getOtherIncomeResponse(customerId), "getOtherIncomeResponse");
    }

    @GetMapping(value="/customer/occupation/v2/otherIncome/query", produces="application/json")
    public String querygetOtherIncomeResponse(@RequestParam String customerId) throws Exception{
       return OtherIncomeResponseQueries.getOtherIncomeResponse(customerId);
    }

  @GetMapping(value = "/customer/occupation/v2/otherIncome/sample", produces = "application/json")
    public static String sampleOtherIncomeResponse() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOtherIncomeResponse0);
    }
  }