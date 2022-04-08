package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AdditionalInfoFirstQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AdditionalInfoFirstController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/additionalInfoFirst", produces="application/json")
    public ResponseEntity getAdditionalInfoFirst(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,AdditionalInfoFirstQueries.getAdditionalInfoFirst(customerId), "getAdditionalInfoFirst");
    }

    @PutMapping(value="/customer/occupation/v2/additionalInfoFirst", produces="application/json")
    public ResponseEntity updateAdditionalInfoFirst(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,AdditionalInfoFirstQueries.updateAdditionalInfoFirst(customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "updateAdditionalInfoFirst");
    }

    @GetMapping(value="/customer/occupation/v2/additionalInfoFirst/query", produces="application/json")
    public String querygetAdditionalInfoFirst(@RequestParam String customerId) throws Exception{
       return AdditionalInfoFirstQueries.getAdditionalInfoFirst(customerId);
    }

    @PutMapping(value="/customer/occupation/v2/additionalInfoFirst/query", produces="application/json")
    public String queryupdateAdditionalInfoFirst(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return AdditionalInfoFirstQueries.updateAdditionalInfoFirst(customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/customer/occupation/v2/additionalInfoFirst/sample", produces = "application/json")
    public static String sampleAdditionalInfoFirst() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAdditionalInfoFirst0);
    }
  }