package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.LinkedAccountDetails.OverpaymentPageQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class OverpaymentPageController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/payment/overpayment/history", produces="application/json")
    public ResponseEntity getOverpaymentPage(@RequestParam String accountId, @RequestParam String clientRef) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(IFetcher.mock),OverpaymentPageQueries.getOverpaymentPage(accountId, clientRef), "getOverpaymentPage");
        }
    }

    @GetMapping(value="/api/payment/overpayment/history/query", produces="application/json")
    public String querygetOverpaymentPage(@RequestParam String accountId, @RequestParam String clientRef) throws Exception{
       return OverpaymentPageQueries.getOverpaymentPage(accountId, clientRef);
    }

  @GetMapping(value = "/api/payment/overpayment/history/sample", produces = "application/json")
    public static String sampleOverpaymentPage() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleOverpaymentPage0);
    }
  }