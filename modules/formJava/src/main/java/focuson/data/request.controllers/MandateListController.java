package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.LinkedAccountDetails.MandateListQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class MandateListController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/mandates/allForClient", produces="application/json")
    public ResponseEntity getMandateList(@RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),MandateListQueries.getMandate(clientRef), "getMandate");
        }
    }

    @GetMapping(value="/api/mandates/allForClient/query", produces="application/json")
    public String querygetMandate(@RequestParam String clientRef) throws Exception{
       return MandateListQueries.getMandate(clientRef);
    }

  @GetMapping(value = "/api/mandates/allForClient/sample", produces = "application/json")
    public static String sampleMandateList() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleMandateList0);
    }
  }