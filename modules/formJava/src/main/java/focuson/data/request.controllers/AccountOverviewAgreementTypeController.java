package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.AccountOverview.AccountOverviewAgreementTypeQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class AccountOverviewAgreementTypeController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview/agreementType", produces="application/json")
    public ResponseEntity getAccountOverviewAgreementType(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),AccountOverviewAgreementTypeQueries.getAccountOverviewAgreementType(accountId, applRef, brandRef, clientRef), "getAccountOverviewAgreementType");
    }

    @GetMapping(value="/api/accountOverview/agreementType/query", produces="application/json")
    public String querygetAccountOverviewAgreementType(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return AccountOverviewAgreementTypeQueries.getAccountOverviewAgreementType(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/api/accountOverview/agreementType/sample", produces = "application/json")
    public static String sampleAccountOverviewAgreementType() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewAgreementType0);
    }
  }