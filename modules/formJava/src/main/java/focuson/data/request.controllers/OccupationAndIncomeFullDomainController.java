package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.OccupationAndIncomeFullDomainQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class OccupationAndIncomeFullDomainController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity getOccupationAndIncomeFullDomain(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(customerId), "getOccupationAndIncomeFullDomain");
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity updateOccupationAndIncomeFullDomain(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "updateOccupationAndIncomeFullDomain");
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String querygetOccupationAndIncomeFullDomain(@RequestParam String customerId) throws Exception{
       return OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(customerId);
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String queryupdateOccupationAndIncomeFullDomain(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/customer/occupation/v2/occupationIncomeDetails/sample", produces = "application/json")
    public static String sampleOccupationAndIncomeFullDomain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncomeFullDomain0);
    }
  }