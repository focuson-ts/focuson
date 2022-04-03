package focuson.data.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.PostCodeDataQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class PostCodeDataController {

  @Autowired
  public GraphQL graphQL;
    @GetMapping(value="/api/postCode", produces="application/json")
    public ResponseEntity getPostCodeData(@RequestParam String postcode) throws Exception{
       return Transform.result(graphQL,PostCodeDataQueries.getPostCodeDataLine(postcode), "getPostCodeDataLine");
    }

    @GetMapping(value="/api/postCode/query", produces="application/json")
    public String querygetPostCodeDataLine(@RequestParam String postcode) throws Exception{
       return PostCodeDataQueries.getPostCodeDataLine(postcode);
    }

  @GetMapping(value = "/api/postCode/sample", produces = "application/json")
    public static String samplePostCodeData() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeData0);
    }
    @PostMapping(value="/api/postCode/createTable", produces="text/html")
    public String createTablePostCodeDataLine() throws Exception{
       return "";
    }

    @GetMapping(value="/api/postCode/createTableSql", produces="text/plain")
    public String createTableSqlPostCodeDataLine() throws Exception{
       return new String(getClass().getResourceAsStream("/sql/PostCodeData.createTableSql.sql").readAllBytes(), "utf-8");
    }

  }