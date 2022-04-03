package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeFullDomainQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class OccupationAndIncomeFullDomainController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity getOccupationAndIncomeFullDomain(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(customerId), "getOccupationAndIncomeFullDomain");
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails", produces="application/json")
    public ResponseEntity updateOccupationAndIncomeFullDomain(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return Transform.result(graphQL,OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "updateOccupationAndIncomeFullDomain");
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String querygetOccupationAndIncomeFullDomain(@RequestParam String customerId) throws Exception{
       return OccupationAndIncomeFullDomainQueries.getOccupationAndIncomeFullDomain(customerId);
    }

    @PutMapping(value="/customer/occupation/v2/occupationIncomeDetails/query", produces="application/json")
    public String queryupdateOccupationAndIncomeFullDomain(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return OccupationAndIncomeFullDomainQueries.updateOccupationAndIncomeFullDomain(customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/customer/occupation/v2/occupationIncomeDetails/sample", produces = "application/json")
    public static String sampleOccupationAndIncomeFullDomain() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOccupationAndIncomeFullDomain0);
    }
    @PostMapping(value="/customer/occupation/v2/occupationIncomeDetails/createTable", produces="text/html")
    public String createTableOccupationAndIncomeFullDomain() throws Exception{
       return "";
    }

    @GetMapping(value="/customer/occupation/v2/occupationIncomeDetails/createTableSql", produces="text/plain")
    public String createTableSqlOccupationAndIncomeFullDomain() throws Exception{
       return new String(getClass().getResourceAsStream("/sql/OccupationAndIncomeFullDomain.createTableSql.sql").readAllBytes(), "utf-8");
    }

  }