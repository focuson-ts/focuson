package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.OtherIncomeResponseQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.OccupationAndIncomeSummary.OtherIncomeResponseAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class OtherIncomeResponseController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
  @Autowired
  OtherIncomeResponseAudit __audit;
    @GetMapping(value="/customer/occupation/v2/otherIncome", produces="application/json")
    public ResponseEntity getOtherIncomeResponse(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          //from OccupationAndIncomeSummary.rest[otherSourcesOfIncomeRD].audit["get"]
          __audit.OtherIncomeResponse_get_auditGetBusinessDetails(connection,IFetcher.mock,clientRef);
          return Transform.result(connection,graphQL.get(IFetcher.mock),OtherIncomeResponseQueries.getOtherIncomeResponse(accountId, applRef, brandRef, clientRef), "getOtherIncomeResponse");
        }
    }

    @GetMapping(value="/customer/occupation/v2/otherIncome/query", produces="application/json")
    public String querygetOtherIncomeResponse(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return OtherIncomeResponseQueries.getOtherIncomeResponse(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/customer/occupation/v2/otherIncome/sample", produces = "application/json")
    public static String sampleOtherIncomeResponse() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOtherIncomeResponse0);
    }
  }