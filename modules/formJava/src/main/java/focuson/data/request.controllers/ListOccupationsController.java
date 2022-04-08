package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import focuson.data.Sample;
import focuson.data.queries.ListOccupationsQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

  @RestController
  public class ListOccupationsController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationsList", produces="application/json")
    public ResponseEntity getListOccupations(@RequestParam String customerId) throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),ListOccupationsQueries.getListOccupations(customerId), "getListOccupations");
    }

    @GetMapping(value="/customer/occupation/v2/occupationsList/query", produces="application/json")
    public String querygetListOccupations(@RequestParam String customerId) throws Exception{
       return ListOccupationsQueries.getListOccupations(customerId);
    }

  @GetMapping(value = "/customer/occupation/v2/occupationsList/sample", produces = "application/json")
    public static String sampleListOccupations() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleListOccupations0);
    }
  }