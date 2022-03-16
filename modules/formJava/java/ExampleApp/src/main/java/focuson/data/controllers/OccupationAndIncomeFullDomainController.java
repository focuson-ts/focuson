package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeFullDomainQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class OccupationAndIncomeFullDomainController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity getOccupationAndIncomeFullDomain(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(customerId), "getOccupationAndIncomeFullDomain");
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity updateOccupationAndIncomeFullDomain(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(customerId,   Transform.removeQuoteFromProperties(body)), "updateOccupationAndIncomeFullDomain");
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String querygetOccupationAndIncomeFullDomain(@RequestParam String customerId) throws Exception{
       return OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(customerId);
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String queryupdateOccupationAndIncomeFullDomain(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(customerId,   Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/customer/occupation/v2/occupationIncomeDetails/sample", produces = "application/json")
    public static String sampleOccupationAndIncomeFullDomain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncomeFullDomain0);
    }
  }