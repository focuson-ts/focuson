package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.LinkedAccountDetails.CreatePaymentQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.LinkedAccountDetails.CreatePaymentAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CreatePaymentController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
  @Autowired
  CreatePaymentAudit __audit;
    @PostMapping(value="/api/payment/create", produces="application/json")
    public ResponseEntity createCreatePayment(@RequestParam String accountId, @RequestParam String clientRef, @RequestParam String paymentId, @RequestBody String body) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          //from LinkedAccountDetails.rest[createPayment].audit["create"]
          __audit.CreatePayment_create_auditCreate(connection,IFetcher.mock,accountId);
          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePaymentQueries.createCreatePayment(accountId, clientRef, paymentId,   Transform.removeQuoteFromProperties(body, Map.class)), "createCreatePayment");
        }
    }

    @PostMapping(value="/api/payment/create/query", produces="application/json")
    public String querycreateCreatePayment(@RequestParam String accountId, @RequestParam String clientRef, @RequestParam String paymentId, @RequestBody String body) throws Exception{
       return CreatePaymentQueries.createCreatePayment(accountId, clientRef, paymentId,   Transform.removeQuoteFromProperties(body, Map.class));
    }

  @GetMapping(value = "/api/payment/create/sample", produces = "application/json")
    public static String sampleCreatePayment() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePayment0);
    }
  }