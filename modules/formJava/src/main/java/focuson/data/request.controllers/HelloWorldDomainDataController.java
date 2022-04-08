package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.HelloWorldDomainDataQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class HelloWorldDomainDataController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/helloWorld", produces="application/json")
    public ResponseEntity getHelloWorldDomainData(@RequestParam(required=false) String dbName) throws Exception{
       return Transform.result(graphQL.get(dbName),HelloWorldDomainDataQueries.getHelloWorldDomainData(), "getHelloWorldDomainData");
    }

    @GetMapping(value="/helloWorld/query", produces="application/json")
    public String querygetHelloWorldDomainData(@RequestParam(required=false) String dbName) throws Exception{
       return HelloWorldDomainDataQueries.getHelloWorldDomainData();
    }

  @GetMapping(value = "/helloWorld/sample", produces = "application/json")
    public static String sampleHelloWorldDomainData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleHelloWorldDomainData0);
    }
  }