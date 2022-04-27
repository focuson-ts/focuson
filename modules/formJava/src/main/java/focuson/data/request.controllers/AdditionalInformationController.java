package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AdditionalInformationQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AdditionalInformationController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/customer/occupation/v2/additionalInfo", produces="application/json")
    public ResponseEntity getAdditionalInformation(@RequestParam String customerId) throws Exception{
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