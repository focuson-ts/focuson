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
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class RepeatingWholeDataController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @PostMapping(value="/api/repeating", produces="application/json")
    public ResponseEntity createRepeatingWholeData(@RequestParam String clientRef, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.createRepeatingLine(clientRef,   Transform.removeQuoteFromProperties(body, List.class)), "createRepeatingLine");
        }
    }

    @GetMapping(value="/api/repeating", produces="application/json")
    public ResponseEntity getRepeatingWholeData(@RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.getRepeatingLine(clientRef), "getRepeatingLine");
        }
    }

    @PostMapping(value="/api/repeating/query", produces="application/json")
    public String querycreateRepeatingLine(@RequestParam String clientRef, @RequestBody String body) throws Exception{
       return RepeatingWholeDataQueries.createRepeatingLine(clientRef,   Transform.removeQuoteFromProperties(body, List.class));
    }

    @GetMapping(value="/api/repeating/query", produces="application/json")
    public String querygetRepeatingLine(@RequestParam String clientRef) throws Exception{
       return RepeatingWholeDataQueries.getRepeatingLine(clientRef);
    }

  @GetMapping(value = "/api/repeating/sample", produces = "application/json")
    public static String sampleRepeatingWholeData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleRepeatingWholeData0);
    }
  }