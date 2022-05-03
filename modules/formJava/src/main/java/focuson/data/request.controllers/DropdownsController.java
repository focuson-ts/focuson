package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.OccupationAndIncomeSummary.DropdownsQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

  @RestController
  public class DropdownsController {

  @Autowired
  public IManyGraphQl graphQL;
    @GetMapping(value="/customer/occupation/v2/occupationDetails", produces="application/json")
    public ResponseEntity getDropdowns() throws Exception{
       return Transform.result(graphQL.get(IFetcher.mock),DropdownsQueries.getDropdowns(), "getDropdowns");
    }

    @GetMapping(value="/customer/occupation/v2/occupationDetails/query", produces="application/json")
    public String querygetDropdowns() throws Exception{
       return DropdownsQueries.getDropdowns();
    }

  @GetMapping(value = "/customer/occupation/v2/occupationDetails/sample", produces = "application/json")
    public static String sampleDropdowns() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleDropdowns0);
    }
  }