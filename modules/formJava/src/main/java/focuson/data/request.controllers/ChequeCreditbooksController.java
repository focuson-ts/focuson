package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.ChequeCreditbooksQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class ChequeCreditbooksController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity getChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.getChequeCreditbooks(accountId, applRef, brandRef, customerId), "getChequeCreditbooks");
    }

    @PostMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity createChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),ChequeCreditbooksQueries.createChequeCreditbooks(accountId, applRef, brandRef, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createChequeCreditbooks");
    }

    @GetMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querygetChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return ChequeCreditbooksQueries.getChequeCreditbooks(accountId, applRef, brandRef, customerId);
    }

    @PostMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querycreateChequeCreditbooks(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return ChequeCreditbooksQueries.createChequeCreditbooks(accountId, applRef, brandRef, customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooks() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooks0);
    }
  }