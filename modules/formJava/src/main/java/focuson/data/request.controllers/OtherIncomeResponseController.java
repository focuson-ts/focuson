package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.OtherIncomeResponseQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class OtherIncomeResponseController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/customer/occupation/v2/otherIncome", produces="application/json")
    public ResponseEntity getOtherIncomeResponse(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),OtherIncomeResponseQueries.getOtherIncomeResponse(customerId), "getOtherIncomeResponse");
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