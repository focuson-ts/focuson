package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.ChequeCreditbooks.ChequeCreditbooksQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.ChequeCreditbooks.ChequeCreditbooksAudit;
import focuson.data.audit.ChequeCreditbooks.ChequeCreditbooksAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class ChequeCreditbooksController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  ChequeCreditbooksAudit __audit;
    @GetMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity getChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
        __audit.ChequeCreditbooks_get_auditGetCheckBook(IFetcher.mock,brandRef,accountId);
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.getChequeCreditbooks(accountId, applRef, brandRef, customerId), "getChequeCreditbooks");
    }

    @PostMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity createChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
        __audit.ChequeCreditbooks_create_auditCreateCheckBook(IFetcher.mock,brandRef,accountId);
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.createChequeCreditbooks(accountId, applRef, brandRef, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createChequeCreditbooks");
    }

    @PostMapping(value="/api/chequeCreditBooks/cancel", produces="application/json")
    public ResponseEntity state_cancelChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.state_cancelChequeCreditbooks(accountId, applRef, brandRef, customerId), "");
    }

    @GetMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querygetChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return ChequeCreditbooksQueries.getChequeCreditbooks(accountId, applRef, brandRef, customerId);
    }

    @PostMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querycreateChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return ChequeCreditbooksQueries.createChequeCreditbooks(accountId, applRef, brandRef, customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @PostMapping(value="/api/chequeCreditBooks/cancel/query", produces="application/json")
    public String querystate_cancelChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return ChequeCreditbooksQueries.state_cancelChequeCreditbooks(accountId, applRef, brandRef, customerId);
    }

  @GetMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooks() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooks0);
    }
  }