package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.AdditionalInformationQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.OccupationAndIncomeSummary.AdditionalInformationAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class AdditionalInformationController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  AdditionalInformationAudit __audit;
    @GetMapping(value="/customer/occupation/v2/additionalInfo", produces="application/json")
    public ResponseEntity getAdditionalInformation(@RequestParam String customerId) throws Exception{
        __audit.AdditionalInformation_get_auditGetCustomeAdditionalInfo(IFetcher.mock,customerId);
       return Transform.result(graphQL.get(IFetcher.mock),AdditionalInformationQueries.getAdditionalInformation(customerId), "getAdditionalInformation");
    }

    @GetMapping(value="/customer/occupation/v2/additionalInfo/query", produces="application/json")
    public String querygetAdditionalInformation(@RequestParam String customerId) throws Exception{
       return AdditionalInformationQueries.getAdditionalInformation(customerId);
    }

  @GetMapping(value = "/customer/occupation/v2/additionalInfo/sample", produces = "application/json")
    public static String sampleAdditionalInformation() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAdditionalInformation0);
    }
  }