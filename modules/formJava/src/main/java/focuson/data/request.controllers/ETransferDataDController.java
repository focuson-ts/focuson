package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.ETransfer.ETransferDataDQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class ETransferDataDController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @PostMapping(value="/api/eTransfers", produces="application/json")
    public ResponseEntity createETransferDataD(@RequestParam String customerId, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),ETransferDataDQueries.createETransferDataD(customerId,   Transform.removeQuoteFromProperties(body, Map.class)), "createETransferDataD");
        }
    }

    @PostMapping(value="/api/eTransfers/query", produces="application/json")
    public String querycreateETransferDataD(@RequestParam String customerId, @RequestBody String body) throws Exception{
       return ETransferDataDQueries.createETransferDataD(customerId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/api/eTransfers/sample", produces = "application/json")
    public static String sampleETransferDataD() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleETransferDataD0);
    }
  }