package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.PostCodeMainPageQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;

  @RestController
  public class PostCodeMainPageController {

  @Autowired
  public GraphQL graphQL;
    @PostMapping(value="/api/address", produces="application/json")
    public ResponseEntity createPostCodeMainPage(@RequestBody String body) throws Exception{
       return Transform.result(graphQL,PostCodeMainPageQueries.createPostCodeMainPage(  Transform.removeQuoteFromProperties(body)), "createPostCodeMainPage");
    }

    @PostMapping(value="/api/address/query", produces="application/json")
    public String querycreatePostCodeMainPage(@RequestBody String body) throws Exception{
       return PostCodeMainPageQueries.createPostCodeMainPage(  Transform.removeQuoteFromProperties(body));
    }

  @GetMapping(value = "/api/address/sample", produces = "application/json")
    public static String samplePostCodeMainPage() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeMainPage0);
    }
  }