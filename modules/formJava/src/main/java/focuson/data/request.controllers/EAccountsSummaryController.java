package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.EAccountsSummary.EAccountsSummaryQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.EAccountsSummary.EAccountsSummaryAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class EAccountsSummaryController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
  @Autowired
  EAccountsSummaryAudit __audit;
    @GetMapping(value="/api/accountsSummary", produces="application/json")
    public ResponseEntity getEAccountsSummary(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String customerId, @RequestParam String employeeType) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),EAccountsSummaryQueries.getEAccountsSummary(accountId, applRef, brandRef, clientRef, customerId, employeeType), "getEAccountsSummary");
        }
    }

    @PostMapping(value="/api/accountsSummary/invalidate", produces="application/json")
    public ResponseEntity state_invalidateEAccountsSummary(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String customerId, @RequestParam String employeeType) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
        //from EAccountsSummary.rest[eAccountsSummary.access[{"state":"invalidate"}]]
        if (!Arrays.asList("teamLeader").contains(employeeType)) return new ResponseEntity("", new HttpHeaders(), HttpStatus.FORBIDDEN);
          //from EAccountsSummary.rest[eAccountsSummary].audit[{"state":"invalidate"}]
          __audit.EAccountsSummary_state_invalidate_auditStuff(connection,IFetcher.mock,accountId,clientRef);
          return Transform.result(connection,graphQL.get(IFetcher.mock),EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, applRef, brandRef, clientRef, customerId, employeeType), "");
        }
    }

    @GetMapping(value="/api/accountsSummary/query", produces="application/json")
    public String querygetEAccountsSummary(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String customerId, @RequestParam String employeeType) throws Exception{
       return EAccountsSummaryQueries.getEAccountsSummary(accountId, applRef, brandRef, clientRef, customerId, employeeType);
    }

    @PostMapping(value="/api/accountsSummary/invalidate/query", produces="application/json")
    public String querystate_invalidateEAccountsSummary(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestParam String customerId, @RequestParam String employeeType) throws Exception{
       return EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, applRef, brandRef, clientRef, customerId, employeeType);
    }

  @GetMapping(value = "/api/accountsSummary/sample", produces = "application/json")
    public static String sampleEAccountsSummary() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);
    }
  }