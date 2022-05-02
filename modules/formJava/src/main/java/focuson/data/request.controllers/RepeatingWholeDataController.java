package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.Repeating.RepeatingWholeDataQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class RepeatingWholeDataController {

  @Autowired
  public IManyGraphQl graphQL;
    @PostMapping(value="/api/repeating", produces="application/json")
    public ResponseEntity createRepeatingWholeData(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.createRepeatingLine(customerId,   Transform.removeQuoteFromProperties(body, List.class)), "createRepeatingLine");
    }

    @GetMapping(value="/api/repeating", produces="application/json")
    public ResponseEntity getRepeatingWholeData(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.getRepeatingLine(customerId), "getRepeatingLine");
    }

    @PostMapping(value="/api/repeating/query", produces="application/json")
    public String querycreateRepeatingLine(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return RepeatingWholeDataQueries.createRepeatingLine(customerId,   Transform.removeQuoteFromProperties(body, List.class));
    }

    @GetMapping(value="/api/repeating/query", produces="application/json")
    public String querygetRepeatingLine(@RequestParam String customerId) throws Exception{
       return RepeatingWholeDataQueries.getRepeatingLine(customerId);
    }

  @GetMapping(value = "/api/repeating/sample", produces = "application/json")
    public static String sampleRepeatingWholeData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleRepeatingWholeData0);
    }
  }