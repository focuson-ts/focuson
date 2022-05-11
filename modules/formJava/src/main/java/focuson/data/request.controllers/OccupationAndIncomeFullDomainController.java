package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.OccupationAndIncomeFullDomainQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.OccupationAndIncomeSummary.OccupationAndIncomeFullDomainAudit;
import focuson.data.audit.OccupationAndIncomeSummary.OccupationAndIncomeFullDomainAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class OccupationAndIncomeFullDomainController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
  @Autowired
  OccupationAndIncomeFullDomainAudit __audit;
    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity getOccupationAndIncomeFullDomain(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          //from OccupationAndIncomeSummary.rest[occupationAndIncomeRD].audit["get"]
          __audit.OccupationAndIncomeFullDomain_get_auditGetCustomerOccupation(connection,IFetcher.mock,clientRef);
          return Transform.result(connection,graphQL.get(IFetcher.mock),OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(accountId, applRef, brandRef, clientRef), "getOccupationAndIncomeFullDomain");
        }
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity updateOccupationAndIncomeFullDomain(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          //from OccupationAndIncomeSummary.rest[occupationAndIncomeRD].audit["update"]
          __audit.OccupationAndIncomeFullDomain_update_auditUpdateCustomerOccupation(connection,IFetcher.mock,clientRef);
          return Transform.result(connection,graphQL.get(IFetcher.mock),OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class)), "updateOccupationAndIncomeFullDomain");
        }
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String querygetOccupationAndIncomeFullDomain(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef) throws Exception{
       return OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(accountId, applRef, brandRef, clientRef);
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String queryupdateOccupationAndIncomeFullDomain(@RequestParam String accountId, @RequestParam String applRef, @RequestParam String brandRef, @RequestParam String clientRef, @RequestBody String body) throws Exception{
       return OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/customer/occupation/v2/occupationIncomeDetails/sample", produces = "application/json")
    public static String sampleOccupationAndIncomeFullDomain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncomeFullDomain0);
    }
  }