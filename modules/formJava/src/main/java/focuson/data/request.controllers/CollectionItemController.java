package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.LinkedAccountDetails.CollectionItemQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import focuson.data.audit.LinkedAccountDetails.CollectionItemAudit;
import focuson.data.audit.LinkedAccountDetails.CollectionItemAudit;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class CollectionItemController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  CollectionItemAudit __audit;
    @PostMapping(value="/api/payment/cancel", produces="application/json")
    public ResponseEntity state_cancelCollectionItem(@RequestParam String accountId, @RequestParam String clientRef, @RequestParam String paymentId) throws Exception{
        //from LinkedAccountDetails.rest[payments].audit[{"state":"cancel"}]
        __audit.CollectionItem_state_cancel_auditCancel(IFetcher.mock,accountId,paymentId);
       return Transform.result(graphQL.get(IFetcher.mock),CollectionItemQueries.state_cancelCollectionItem(accountId, clientRef, paymentId), "");
    }

    @PostMapping(value="/api/payment/revalidate", produces="application/json")
    public ResponseEntity state_revalidateCollectionItem(@RequestParam String accountId, @RequestParam String clientRef, @RequestParam String paymentId) throws Exception{
        //from LinkedAccountDetails.rest[payments].audit[{"state":"revalidate"}]
        __audit.CollectionItem_state_revalidate_auditrevalidate(IFetcher.mock,accountId,paymentId);
       return Transform.result(graphQL.get(IFetcher.mock),CollectionItemQueries.state_revalidateCollectionItem(accountId, clientRef, paymentId), "");
    }

    @PostMapping(value="/api/payment/cancel/query", produces="application/json")
    public String querystate_cancelCollectionItem(@RequestParam String accountId, @RequestParam String clientRef, @RequestParam String paymentId) throws Exception{
       return CollectionItemQueries.state_cancelCollectionItem(accountId, clientRef, paymentId);
    }

    @PostMapping(value="/api/payment/revalidate/query", produces="application/json")
    public String querystate_revalidateCollectionItem(@RequestParam String accountId, @RequestParam String clientRef, @RequestParam String paymentId) throws Exception{
       return CollectionItemQueries.state_revalidateCollectionItem(accountId, clientRef, paymentId);
    }

  @GetMapping(value = "/api/payment/sample", produces = "application/json")
    public static String sampleCollectionItem() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleCollectionItem0);
    }
  }