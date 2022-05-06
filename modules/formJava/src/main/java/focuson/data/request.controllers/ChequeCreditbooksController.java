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
    public ResponseEntity getChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        //from ChequeCreditbooks.rest[chequeCreditBooks].audit["get"]
        __audit.ChequeCreditbooks_get_auditGetCheckBook(IFetcher.mock,brandRef,accountId);
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.getChequeCreditbooks(accountId, applRef, brandRef, clientRef), "getChequeCreditbooks");
    }

    @PostMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity createChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
        //from ChequeCreditbooks.rest[chequeCreditBooks].audit["create"]
        __audit.ChequeCreditbooks_create_auditCreateCheckBook(IFetcher.mock,brandRef,accountId);
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.createChequeCreditbooks(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class)), "createChequeCreditbooks");
    }

    @PostMapping(value="/api/chequeCreditBooks/cancel", produces="application/json")
    public ResponseEntity state_cancelChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        //from ChequeCreditbooks.rest[chequeCreditBooks].audit[{"state":"cancel"}]
        __audit.ChequeCreditbooks_state_cancel_auditCancelCheckbook(IFetcher.mock,brandRef,accountId);
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.state_cancelChequeCreditbooks(accountId, applRef, brandRef, clientRef), "");
    }

    @GetMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querygetChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return ChequeCreditbooksQueries.getChequeCreditbooks(accountId, applRef, brandRef, clientRef);
    }

    @PostMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querycreateChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
       return ChequeCreditbooksQueries.createChequeCreditbooks(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @PostMapping(value="/api/chequeCreditBooks/cancel/query", produces="application/json")
    public String querystate_cancelChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return ChequeCreditbooksQueries.state_cancelChequeCreditbooks(accountId, applRef, brandRef, clientRef);
    }

  @GetMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooks() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooks0);
    }
  }