package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.JointAccountQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class JointAccountController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/api/jointAccount", produces="application/json")
    public ResponseEntity getJointAccount(@RequestParam String accountId, @RequestParam String brandId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),JointAccountQueries.getJointAccount(accountId, brandId), "getJointAccount");
    }

    @GetMapping(value="/api/jointAccount/query", produces="application/json")
    public String querygetJointAccount(@RequestParam String accountId, @RequestParam String brandId) throws Exception{
       return JointAccountQueries.getJointAccount(accountId, brandId);
    }

  @GetMapping(value = "/api/jointAccount/sample", produces = "application/json")
    public static String sampleJointAccount() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleJointAccount0);
    }
  }