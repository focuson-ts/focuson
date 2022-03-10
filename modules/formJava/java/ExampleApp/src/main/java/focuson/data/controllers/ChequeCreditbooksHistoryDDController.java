package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.ChequeCreditbooksHistoryDDQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class ChequeCreditbooksHistoryDDController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity getChequeCreditbooksHistoryDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,ChequeCreditbooksHistoryDDQueries.getChequeCreditbooksHistoryDD(accountId, applRef, brandRef, customerId), "getChequeCreditbooksHistoryDD");
    }

    @PostMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity createChequeCreditbooksHistoryDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,ChequeCreditbooksHistoryDDQueries.createChequeCreditbooksHistoryDD(accountId, applRef, brandRef, customerId,  Transform.removeQuoteFromProperties(body)), "createChequeCreditbooksHistoryDD");
    }

    @GetMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querygetChequeCreditbooksHistoryDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return ChequeCreditbooksHistoryDDQueries.getChequeCreditbooksHistoryDD(accountId, applRef, brandRef, customerId);
    }

    @PostMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querycreateChequeCreditbooksHistoryDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return ChequeCreditbooksHistoryDDQueries.createChequeCreditbooksHistoryDD(accountId, applRef, brandRef, customerId,  Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooksHistoryDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooksHistoryDD0);
    }
  }