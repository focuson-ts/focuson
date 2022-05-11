package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.ListOfPaymentsPage.PrintRecordHistoryQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class PrintRecordHistoryController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/printrecordhistory", produces="application/json")
    public ResponseEntity getPrintRecordHistory(@RequestParam String accountId) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),PrintRecordHistoryQueries.getPrintRecordItem(accountId), "getPrintRecordItem");
        }
    }

    @GetMapping(value="/api/printrecordhistory/query", produces="application/json")
    public String querygetPrintRecordItem(@RequestParam String accountId) throws Exception{
       return PrintRecordHistoryQueries.getPrintRecordItem(accountId);
    }

  @GetMapping(value = "/api/printrecordhistory/sample", produces = "application/json")
    public static String samplePrintRecordHistory() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.samplePrintRecordHistory0);
    }
  }