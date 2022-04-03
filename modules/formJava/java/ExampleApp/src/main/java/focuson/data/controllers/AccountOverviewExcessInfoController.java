package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AccountOverviewExcessInfoQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AccountOverviewExcessInfoController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/accountOverview/excessInfo", produces="application/json")
    public ResponseEntity getAccountOverviewExcessInfo(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,AccountOverviewExcessInfoQueries.getAccountOverviewExcessInfo(accountId, customerId), "getAccountOverviewExcessInfo");
    }

    @GetMapping(value="/api/accountOverview/excessInfo/query", produces="application/json")
    public String querygetAccountOverviewExcessInfo(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return AccountOverviewExcessInfoQueries.getAccountOverviewExcessInfo(accountId, customerId);
    }

  @GetMapping(value = "/api/accountOverview/excessInfo/sample", produces = "application/json")
    public static String sampleAccountOverviewExcessInfo() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewExcessInfo0);
    }
    @PostMapping(value="/api/accountOverview/excessInfo/createTable", produces="text/html")
    public String createTableAccountOverviewExcessInfo() throws Exception{
       return "";
    }

    @GetMapping(value="/api/accountOverview/excessInfo/createTableSql", produces="text/plain")
    public String createTableSqlAccountOverviewExcessInfo() throws Exception{
       return new String(getClass().getResourceAsStream("/sql/AccountOverviewExcessInfo.createTableSql.sql").readAllBytes(), "utf-8");
    }

  }