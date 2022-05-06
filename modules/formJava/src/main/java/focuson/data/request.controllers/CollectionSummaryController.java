package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.LinkedAccountDetails.CollectionSummaryQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CollectionSummaryController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/collections/summary", produces="application/json")
    public ResponseEntity getCollectionSummary(@RequestParam String accountId, @RequestParam String clientRef) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),CollectionSummaryQueries.getCollectionSummary(accountId, clientRef), "getCollectionSummary");
    }

    @GetMapping(value="/api/collections/summary/query", produces="application/json")
    public String querygetCollectionSummary(@RequestParam String accountId, @RequestParam String clientRef) throws Exception{
       return CollectionSummaryQueries.getCollectionSummary(accountId, clientRef);
    }

  @GetMapping(value = "/api/collections/summary/sample", produces = "application/json")
    public static String sampleCollectionSummary() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCollectionSummary0);
    }
  }