package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.ETransferDataDQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class ETransferDataDController {

  @Autowired
  public GraphQL graphQL;
    @PostMapping(value="/api/eTransfers", produces="application/json")
    public ResponseEntity createETransferDataD(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,ETransferDataDQueries.createETransferDataD(customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createETransferDataD");
    }

    @PostMapping(value="/api/eTransfers/query", produces="application/json")
    public String querycreateETransferDataD(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return ETransferDataDQueries.createETransferDataD(customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/api/eTransfers/sample", produces = "application/json")
    public static String sampleETransferDataD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleETransferDataD0);
    }
  }