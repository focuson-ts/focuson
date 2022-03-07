package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeDetailsDDQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeDetailsDDController {

 @Autowired
 public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity getOccupationAndIncomeDetailsDD(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeDetailsDDQueries.getOccupationAndIncomeDetailsDD(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType), "getOccupationAndIncomeDetailsDD");
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity updateOccupationAndIncomeDetailsDD(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeDetailsDDQueries.updateOccupationAndIncomeDetailsDD(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType,  Transform.removeQuoteFromProperties(body)), "updateOccupationAndIncomeDetailsDD");
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String querygetOccupationAndIncomeDetailsDD(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType) throws Exception{
       return OccupationAndIncomeDetailsDDQueries.getOccupationAndIncomeDetailsDD(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType);
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String queryupdateOccupationAndIncomeDetailsDD(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType, @RequestBody String body) throws Exception{
       return OccupationAndIncomeDetailsDDQueries.updateOccupationAndIncomeDetailsDD(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType,  Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/customer/occupation/v2/occupationIncomeDetails/sample", produces = "application/json")
    public static String sampleOccupationAndIncomeDetailsDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncomeDetailsDD0);
    }
  }