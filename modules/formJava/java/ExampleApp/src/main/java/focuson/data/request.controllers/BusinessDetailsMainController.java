package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.BusinessDetailsMainQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class BusinessDetailsMainController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/businessDetails", produces="application/json")
    public ResponseEntity getBusinessDetailsMain(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,BusinessDetailsMainQueries.getBusinessDetailsMain(customerId), "getBusinessDetailsMain");
    }

    @GetMapping(value="/customer/occupation/v2/businessDetails/query", produces="application/json")
    public String querygetBusinessDetailsMain(@RequestParam String customerId) throws Exception{
       return BusinessDetailsMainQueries.getBusinessDetailsMain(customerId);
    }

  @GetMapping(value = "/customer/occupation/v2/businessDetails/sample", produces = "application/json")
    public static String sampleBusinessDetailsMain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleBusinessDetailsMain0);
    }
  }