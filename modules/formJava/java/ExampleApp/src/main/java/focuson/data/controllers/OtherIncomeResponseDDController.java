package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OtherIncomeResponseDDQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OtherIncomeResponseDDController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/otherIncome", produces="application/json")
    public ResponseEntity getOtherIncomeResponseDD(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType) throws Exception{
       return Transform.result(graphQL,OtherIncomeResponseDDQueries.getOtherIncomeResponseDD(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType), "getOtherIncomeResponseDD");
    }

    @GetMapping(value="/customer/occupation/v2/otherIncome/query", produces="application/json")
    public String querygetOtherIncomeResponseDD(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType) throws Exception{
       return OtherIncomeResponseDDQueries.getOtherIncomeResponseDD(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType);
    }

  @GetMapping(value = "/customer/occupation/v2/otherIncome/sample", produces = "application/json")
    public static String sampleOtherIncomeResponseDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOtherIncomeResponseDD0);
    }
  }