package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.AccountOverview.ArrearsDetailsQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class ArrearsDetailsController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/accountOverview/arrearsDetails", produces="application/json")
    public ResponseEntity getArrearsDetails(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String startDate) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),ArrearsDetailsQueries.getArrearsDetails(accountId, applRef, brandRef, clientRef, startDate), "getArrearsDetails");
        }
    }

    @GetMapping(value="/api/accountOverview/arrearsDetails/query", produces="application/json")
    public String querygetArrearsDetails(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String startDate) throws Exception{
       return ArrearsDetailsQueries.getArrearsDetails(accountId, applRef, brandRef, clientRef, startDate);
    }

  @GetMapping(value = "/api/accountOverview/arrearsDetails/sample", produces = "application/json")
    public static String sampleArrearsDetails() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleArrearsDetails0);
    }
  }