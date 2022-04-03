package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.DropdownsQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class DropdownsController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationDetails", produces="application/json")
    public ResponseEntity getDropdowns(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL,DropdownsQueries.getDropdowns(customerId), "getDropdowns");
    }

    @GetMapping(value="/customer/occupation/v2/occupationDetails/query", produces="application/json")
    public String querygetDropdowns(@RequestParam String customerId) throws Exception{
       return DropdownsQueries.getDropdowns(customerId);
    }

  @GetMapping(value = "/customer/occupation/v2/occupationDetails/sample", produces = "application/json")
    public static String sampleDropdowns() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleDropdowns0);
    }
    @PostMapping(value="/customer/occupation/v2/occupationDetails/createTable", produces="text/html")
    public String createTableDropdowns() throws Exception{
       return "";
    }

    @GetMapping(value="/customer/occupation/v2/occupationDetails/createTableSql", produces="text/plain")
    public String createTableSqlDropdowns() throws Exception{
       return new String(getClass().getResourceAsStream("/sql/Dropdowns.createTableSql.sql").readAllBytes(), "utf-8");
    }

  }