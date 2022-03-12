package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.PostCodeDataQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class PostCodeDataController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/postCode", produces="application/json")
    public ResponseEntity getPostCodeData(@RequestParam String postcode) throws Exception{
       return Transform.result(graphQL,PostCodeDataQueries.getpostCodeDataLine(postcode), "getpostCodeDataLine");
    }

    @GetMapping(value="/api/postCode/query", produces="application/json")
    public String querygetpostCodeDataLine(@RequestParam String postcode) throws Exception{
       return PostCodeDataQueries.getpostCodeDataLine(postcode);
    }

  @GetMapping(value = "/api/postCode/sample", produces = "application/json")
    public static String samplePostCodeData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeData0);
    }
  }