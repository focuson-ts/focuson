package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.HelloWorldDomainDataQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class HelloWorldDomainDataController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/helloWorld", produces="application/json")
    public ResponseEntity getHelloWorldDomainData() throws Exception{
       return Transform.result(graphQL,HelloWorldDomainDataQueries.getHelloWorldDomainData(), "getHelloWorldDomainData");
    }

    @GetMapping(value="/helloWorld/query", produces="application/json")
    public String querygetHelloWorldDomainData() throws Exception{
       return HelloWorldDomainDataQueries.getHelloWorldDomainData();
    }

  @GetMapping(value = "/helloWorld/sample", produces = "application/json")
    public static String sampleHelloWorldDomainData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleHelloWorldDomainData0);
    }
  }