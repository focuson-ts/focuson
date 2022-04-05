package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.JointAccountQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class JointAccountController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/jointAccount", produces="application/json")
    public ResponseEntity getJointAccount(@RequestParam String brandId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,JointAccountQueries.getJointAccount(brandId, customerId), "getJointAccount");
    }

    @GetMapping(value="/api/jointAccount/query", produces="application/json")
    public String querygetJointAccount(@RequestParam String brandId, @RequestParam String customerId) throws Exception{
       return JointAccountQueries.getJointAccount(brandId, customerId);
    }

  @GetMapping(value = "/api/jointAccount/sample", produces = "application/json")
    public static String sampleJointAccount() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleJointAccount0);
    }
  }