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
       return Transform.result(graphQL,ChequeCreditbooksHistoryDDQueries.getChequeCreditbooksHistoryLineDD(accountId, applRef, brandRef, customerId), "getChequeCreditbooksHistoryLineDD");
    }

    @PostMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity createChequeCreditbooksHistoryDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,ChequeCreditbooksHistoryDDQueries.createChequeCreditbooksHistoryLineDD(accountId, applRef, brandRef, customerId,  Transform.removeQuoteFromProperties(body)), "createChequeCreditbooksHistoryLineDD");
    }

    @GetMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querygetChequeCreditbooksHistoryLineDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return ChequeCreditbooksHistoryDDQueries.getChequeCreditbooksHistoryLineDD(accountId, applRef, brandRef, customerId);
    }

    @PostMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querycreateChequeCreditbooksHistoryLineDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId, @RequestBody String body) throws Exception{
       return ChequeCreditbooksHistoryDDQueries.createChequeCreditbooksHistoryLineDD(accountId, applRef, brandRef, customerId,  Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooksHistoryDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooksHistoryDD0);
    }
  }