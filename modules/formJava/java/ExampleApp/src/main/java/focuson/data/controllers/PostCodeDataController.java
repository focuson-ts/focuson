package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.PostCodeDataQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class PostCodeDataController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/postCode", produces="application/json")
    public ResponseEntity getPostCodeData(@RequestParam String postcode) throws Exception{
       return Transform.result(graphQL,PostCodeDataQueries.getPostCodeDataLine(postcode), "getPostCodeDataLine");
    }

    @GetMapping(value="/api/postCode/query", produces="application/json")
    public String querygetPostCodeDataLine(@RequestParam String postcode) throws Exception{
       return PostCodeDataQueries.getPostCodeDataLine(postcode);
    }

  @GetMapping(value = "/api/postCode/sample", produces = "application/json")
    public static String samplePostCodeData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeData0);
    }
  }