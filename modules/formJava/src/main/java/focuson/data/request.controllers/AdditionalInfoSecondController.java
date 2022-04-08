package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AdditionalInfoSecondQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AdditionalInfoSecondController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/additionalInfoSecond", produces="application/json")
    public ResponseEntity getAdditionalInfoSecond(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,AdditionalInfoSecondQueries.getAdditionalInfoSecond(customerId), "getAdditionalInfoSecond");
    }

    @PutMapping(value="/customer/occupation/v2/additionalInfoSecond", produces="application/json")
    public ResponseEntity updateAdditionalInfoSecond(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,AdditionalInfoSecondQueries.updateAdditionalInfoSecond(customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "updateAdditionalInfoSecond");
    }

    @GetMapping(value="/customer/occupation/v2/additionalInfoSecond/query", produces="application/json")
    public String querygetAdditionalInfoSecond(@RequestParam String customerId) throws Exception{
       return AdditionalInfoSecondQueries.getAdditionalInfoSecond(customerId);
    }

    @PutMapping(value="/customer/occupation/v2/additionalInfoSecond/query", produces="application/json")
    public String queryupdateAdditionalInfoSecond(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return AdditionalInfoSecondQueries.updateAdditionalInfoSecond(customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/customer/occupation/v2/additionalInfoSecond/sample", produces = "application/json")
    public static String sampleAdditionalInfoSecond() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAdditionalInfoSecond0);
    }
  }