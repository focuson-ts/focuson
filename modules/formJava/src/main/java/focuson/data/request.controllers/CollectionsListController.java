package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.LinkedAccountDetails.CollectionsListQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CollectionsListController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/collections/list", produces="application/json")
    public ResponseEntity getCollectionsList(@RequestParam String accountId, @RequestParam String clientRef) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),CollectionsListQueries.getCollectionItem(accountId, clientRef), "getCollectionItem");
    }

    @GetMapping(value="/api/collections/list/query", produces="application/json")
    public String querygetCollectionItem(@RequestParam String accountId, @RequestParam String clientRef) throws Exception{
       return CollectionsListQueries.getCollectionItem(accountId, clientRef);
    }

  @GetMapping(value = "/api/collections/list/sample", produces = "application/json")
    public static String sampleCollectionsList() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCollectionsList0);
    }
  }