package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class ChequeCreditbooksDDController {

 @Autowired
 public GraphQL graphQL;
    @GetMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity getChequeCreditbooksDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.getChequeCreditbooksDD(accountId, applRef, brandRef, customerId), "getChequeCreditbooksDD");
    }

    @PostMapping(value="/api/chequeCreditBooks", produces="application/json")
    public ResponseEntity createChequeCreditbooksDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Results.result(graphQL,Queries.createChequeCreditbooksDD(accountId, applRef, brandRef, customerId), "createChequeCreditbooksDD");
    }

    @GetMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querygetChequeCreditbooksDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Queries.getChequeCreditbooksDD(accountId, applRef, brandRef, customerId);
    }

    @PostMapping(value="/api/chequeCreditBooks/query", produces="application/json")
    public String querycreateChequeCreditbooksDD(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String customerId) throws Exception{
       return Queries.createChequeCreditbooksDD(accountId, applRef, brandRef, customerId);
    }

  @GetMapping(value = "/api/chequeCreditBooks/sample", produces = "application/json")
    public static String sampleChequeCreditbooksDD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleChequeCreditbooksDD0);
    }
  }