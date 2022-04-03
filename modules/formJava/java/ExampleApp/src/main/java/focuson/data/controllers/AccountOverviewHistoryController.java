package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.AccountOverviewHistoryQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class AccountOverviewHistoryController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/accountOverview/excessHistory", produces="application/json")
    public ResponseEntity getAccountOverviewHistory(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,AccountOverviewHistoryQueries.getAccountOverviewHistory(accountId, customerId), "getAccountOverviewHistory");
    }

    @GetMapping(value="/api/accountOverview/excessHistory/query", produces="application/json")
    public String querygetAccountOverviewHistory(@RequestParam String accountId, @RequestParam String customerId) throws Exception{
       return AccountOverviewHistoryQueries.getAccountOverviewHistory(accountId, customerId);
    }

  @GetMapping(value = "/api/accountOverview/excessHistory/sample", produces = "application/json")
    public static String sampleAccountOverviewHistory() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleAccountOverviewHistory0);
    }
    @PostMapping(value="/api/accountOverview/excessHistory/createTable", produces="text/html")
    public String createTableAccountOverviewHistory() throws Exception{
       return "";
    }

    @GetMapping(value="/api/accountOverview/excessHistory/createTableSql", produces="text/plain")
    public String createTableSqlAccountOverviewHistory() throws Exception{
       return new String(getClass().getResourceAsStream("/sql/AccountOverviewHistory.createTableSql.sql").readAllBytes(), "utf-8");
    }

  }