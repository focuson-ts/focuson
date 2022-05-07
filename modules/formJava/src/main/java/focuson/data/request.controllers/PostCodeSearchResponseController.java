package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.PostCodeMainPage.PostCodeSearchResponseQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import focuson.data.db.PostCodeMainPage_postcodeMaps ; 

  @RestController
  public class PostCodeSearchResponseController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/postCode", produces="application/json")
    public ResponseEntity getPostCodeSearchResponse(@RequestParam String dbName, @RequestParam String postcode) throws Exception{
       return Transform.result(graphQL.get(dbName),PostCodeSearchResponseQueries.getPostCodeDataLine(dbName, postcode), "getPostCodeDataLine");
    }

    @GetMapping(value="/api/postCode/query", produces="application/json")
    public String querygetPostCodeDataLine(@RequestParam String dbName, @RequestParam String postcode) throws Exception{
       return PostCodeSearchResponseQueries.getPostCodeDataLine(dbName, postcode);
    }

  @GetMapping(value = "/api/postCode/sample", produces = "application/json")
    public static String samplePostCodeSearchResponse() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeSearchResponse0);
    }
  @GetMapping(value = "/api/postCode/sql", produces = "text/html")
    public static String sqlPostCodeSearchResponse() throws Exception {
      return PostCodeMainPage_postcodeMaps.allSql;
    }
  }