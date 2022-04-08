package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.ArrearsDetailsQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class previous_ArrearsDetailsController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/accountOverview/arrearsDetails/previous", produces="application/json")
    public ResponseEntity getArrearsDetails(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String customerId, @RequestParam String startDate) throws Exception{
       return Transform.result(graphQL.get(dbName),ArrearsDetailsQueries.getArrearsDetails(accountId, customerId, startDate), "getArrearsDetails");
    }

    @GetMapping(value="/api/accountOverview/arrearsDetails/previous/query", produces="application/json")
    public String querygetArrearsDetails(@RequestParam(required=false) String dbName, @RequestParam String accountId, @RequestParam String customerId, @RequestParam String startDate) throws Exception{
       return ArrearsDetailsQueries.getArrearsDetails(accountId, customerId, startDate);
    }

  @GetMapping(value = "/api/accountOverview/arrearsDetails/previous/sample", produces = "application/json")
    public static String sampleArrearsDetails() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleArrearsDetails0);
    }
  }