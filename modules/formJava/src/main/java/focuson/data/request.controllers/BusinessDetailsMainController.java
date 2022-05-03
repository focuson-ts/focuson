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
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class BusinessDetailsMainController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  BusinessDetailsMainAudit __audit;
    @GetMapping(value="/customer/occupation/v2/businessDetails", produces="application/json")
    public ResponseEntity getBusinessDetailsMain(@RequestParam String customerId) throws Exception{
        __audit.BusinessDetailsMain_get_auditGetBusinessDetails(IFetcher.mock,customerId);
       return Transform.result(graphQL.get(IFetcher.mock),BusinessDetailsMainQueries.getBusinessDetailsMain(customerId), "getBusinessDetailsMain");
    }

    @GetMapping(value="/customer/occupation/v2/businessDetails/query", produces="application/json")
    public String querygetBusinessDetailsMain(@RequestParam String customerId) throws Exception{
       return BusinessDetailsMainQueries.getBusinessDetailsMain(customerId);
    }

  @GetMapping(value = "/customer/occupation/v2/businessDetails/sample", produces = "application/json")
    public static String sampleBusinessDetailsMain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleBusinessDetailsMain0);
    }
  }