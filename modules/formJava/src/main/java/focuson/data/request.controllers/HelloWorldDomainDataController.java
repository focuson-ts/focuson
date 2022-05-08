package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.HelloWorldMainPage.HelloWorldDomainDataQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class HelloWorldDomainDataController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/helloWorld", produces="application/json")
    public ResponseEntity getHelloWorldDomainData() throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),HelloWorldDomainDataQueries.getHelloWorldDomainData(), "getHelloWorldDomainData");
        }
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