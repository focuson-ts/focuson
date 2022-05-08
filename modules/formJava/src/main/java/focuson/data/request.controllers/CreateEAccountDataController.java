package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.CreateEAccount.CreateEAccountDataQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CreateEAccountDataController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @PostMapping(value="/api/createEAccount/", produces="application/json")
    public ResponseEntity createCreateEAccountData(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreateEAccountDataQueries.createCreateEAccountData(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class)), "createCreateEAccountData");
        }
    }

    @GetMapping(value="/api/createEAccount/", produces="application/json")
    public ResponseEntity getCreateEAccountData(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreateEAccountDataQueries.getCreateEAccountData(accountId, applRef, brandRef, clientRef, createPlanId), "getCreateEAccountData");
        }
    }

    @PostMapping(value="/api/createEAccount//query", produces="application/json")
    public String querycreateCreateEAccountData(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
       return CreateEAccountDataQueries.createCreateEAccountData(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class));
    }

    @GetMapping(value="/api/createEAccount//query", produces="application/json")
    public String querygetCreateEAccountData(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String createPlanId) throws Exception{
       return CreateEAccountDataQueries.getCreateEAccountData(accountId, applRef, brandRef, clientRef, createPlanId);
    }

  @GetMapping(value = "/api/createEAccount//sample", produces = "application/json")
    public static String sampleCreateEAccountData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreateEAccountData0);
    }
  }