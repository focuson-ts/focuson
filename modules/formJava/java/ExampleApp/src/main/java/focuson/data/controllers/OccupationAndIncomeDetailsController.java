package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeDetailsQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeDetailsController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity getOccupationAndIncomeDetails(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeDetailsQueries.getOccupationAndIncomeDetails(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType), "getOccupationAndIncomeDetails");
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity updateOccupationAndIncomeDetails(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeDetailsQueries.updateOccupationAndIncomeDetails(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType,   Transform.removeQuoteFromProperties(body)), "updateOccupationAndIncomeDetails");
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String querygetOccupationAndIncomeDetails(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType) throws Exception{
       return OccupationAndIncomeDetailsQueries.getOccupationAndIncomeDetails(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType);
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String queryupdateOccupationAndIncomeDetails(@RequestParam String accountSeq, @RequestParam String applicationRef, @RequestParam String brandRef, @RequestParam String vbAccountSeq, @RequestParam String vbAccountType, @RequestBody String body) throws Exception{
       return OccupationAndIncomeDetailsQueries.updateOccupationAndIncomeDetails(accountSeq, applicationRef, brandRef, vbAccountSeq, vbAccountType,   Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/customer/occupation/v2/occupationIncomeDetails/sample", produces = "application/json")
    public static String sampleOccupationAndIncomeDetails() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncomeDetails0);
    }
  }