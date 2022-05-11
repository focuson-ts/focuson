package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.BusinessDetailsMainQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.OccupationAndIncomeSummary.BusinessDetailsMainAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class BusinessDetailsMainController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
  @Autowired
  BusinessDetailsMainAudit __audit;
    @GetMapping(value="/customer/occupation/v2/businessDetails", produces="application/json")
    public ResponseEntity getBusinessDetailsMain(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          //from OccupationAndIncomeSummary.rest[businessDetailsRD].audit["get"]
          __audit.BusinessDetailsMain_get_auditGetBusinessDetails(connection,IFetcher.mock,clientRef);
          return Transform.result(connection,graphQL.get(IFetcher.mock),BusinessDetailsMainQueries.getBusinessDetailsMain(accountId, applRef, brandRef, clientRef), "getBusinessDetailsMain");
        }
    }

    @GetMapping(value="/customer/occupation/v2/businessDetails/query", produces="application/json")
    public String querygetBusinessDetailsMain(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return BusinessDetailsMainQueries.getBusinessDetailsMain(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/customer/occupation/v2/businessDetails/sample", produces = "application/json")
    public static String sampleBusinessDetailsMain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleBusinessDetailsMain0);
    }
  }