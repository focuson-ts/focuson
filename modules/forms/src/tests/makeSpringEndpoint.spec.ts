import { makeParamsForJava, makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";


describe ( "makeSpringEndpoint", () => {
  it ( "should makeParamsForJava", () => {
    expect ( makeParamsForJava ( createPlanRestD, 'get' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    // expect ( makeParamsForJava ( createPlanRestD, 'list' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'create' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body' )
    expect ( makeParamsForJava ( createPlanRestD, 'update' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body' )
    expect ( makeParamsForJava ( createPlanRestD, 'delete' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'getOption' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
  } )
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, EAccountsSummaryPD, 'eAccountsSummary', eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummary.EAccountsSummaryQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.util.List;",
      "import java.util.Map;",
      "",
      "  @RestController",
      "  public class EAccountsSummaryController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "    @GetMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public ResponseEntity getEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId), \"getEAccountsSummary\");",
      "    }",
      "",
      "    @PostMapping(value=\"/api/accountsSummary/invalidate\", produces=\"application/json\")",
      "    public ResponseEntity state_invalidateEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, customerId), \"\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String querygetEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId);",
      "    }",
      "",
      "    @PostMapping(value=\"/api/accountsSummary/invalidate/query\", produces=\"application/json\")",
      "    public String querystate_invalidateEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = \"/api/accountsSummary/sample\", produces = \"application/json\")",
      "    public static String sampleEAccountsSummary() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);",
      "    }",
      "  }"
    ] )
  } )
  it ( "should make a second endpoint for a res", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, EAccountsSummaryPD, 'createPlanRestD', createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummary.CreatePlanQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.util.List;",
      "import java.util.Map;",
      "",
      "  @RestController",
      "  public class CreatePlanController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "    @GetMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity getCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.getCreatePlan(accountId, createPlanId, customerId), 'getCreatePlan');",
      "    }",
      "",
      "    @PostMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity createCreatePlan(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.createCreatePlan(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), 'createCreatePlan');",
      "    }",
      "",
      "    @PutMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity updateCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.updateCreatePlan(accountId, createPlanId, customerId,   Transform.removeQuoteFromProperties(body, Map.class)), 'updateCreatePlan');",
      "    }",
      "",
      "    @DeleteMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity deleteCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.deleteCreatePlan(accountId, createPlanId, customerId), '');",
      "    }",
      "",
      "    @GetMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querygetCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanQueries.getCreatePlan(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @PostMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querycreateCreatePlan(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.createCreatePlan(accountId, customerId,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "    @PutMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String queryupdateCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.updateCreatePlan(accountId, createPlanId, customerId,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "    @DeleteMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querydeleteCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanQueries.deleteCreatePlan(accountId, createPlanId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = '/api/createPlan/sample', produces = 'application/json')",
      "    public static String sampleCreatePlan() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlan0);",
      "    }",
      "  }"
    ] )
  } )

  it ( "should make an endpoint for a repeating", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, RepeatingPageD, 'repeating', repeatingRestRD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.Repeating.RepeatingWholeDataQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.util.List;",
      "import java.util.Map;",
      "",
      "  @RestController",
      "  public class RepeatingWholeDataController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "    @PostMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity createRepeatingWholeData(@RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.createRepeatingLine(customerId,   Transform.removeQuoteFromProperties(body, List.class)), 'createRepeatingLine');",
      "    }",
      "",
      "    @GetMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity getRepeatingWholeData(@RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.getRepeatingLine(customerId), 'getRepeatingLine');",
      "    }",
      "",
      "    @PostMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querycreateRepeatingLine(@RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return RepeatingWholeDataQueries.createRepeatingLine(customerId,   Transform.removeQuoteFromProperties(body, List.class));",
      "    }",
      "",
      "    @GetMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querygetRepeatingLine(@RequestParam String customerId) throws Exception{",
      "       return RepeatingWholeDataQueries.getRepeatingLine(customerId);",
      "    }",
      "",
      "  @GetMapping(value = '/api/repeating/sample', produces = 'application/json')",
      "    public static String sampleRepeatingWholeData() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleRepeatingWholeData0);",
      "    }",
      "  }"
    ] )

  } )

  it ( "should make spring boot endpoints when no parameters", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, PostCodeMainPage, 'address', addressRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.PostCodeMainPage.PostCodeNameAndAddressQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.util.List;",
      "import java.util.Map;",
      "import focuson.data.db.PostCodeMainPage_addressMaps ; ",
      "",
      "  @RestController",
      "  public class PostCodeNameAndAddressController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "    @PostMapping(value='/api/address', produces='application/json')",
      "    public ResponseEntity createPostCodeNameAndAddress(@RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL.get(IFetcher.mock),PostCodeNameAndAddressQueries.createPostCodeNameAndAddress(  Transform.removeQuoteFromProperties(body, Map.class)), 'createPostCodeNameAndAddress');",
      "    }",
      "",
      "    @PostMapping(value='/api/address/query', produces='application/json')",
      "    public String querycreatePostCodeNameAndAddress(@RequestBody String body) throws Exception{",
      "       return PostCodeNameAndAddressQueries.createPostCodeNameAndAddress(  Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "  @GetMapping(value = '/api/address/sample', produces = 'application/json')",
      "    public static String samplePostCodeNameAndAddress() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeNameAndAddress0);",
      "    }",
      "  @GetMapping(value = '/api/address/sql', produces = 'text/html')",
      "    public static String sqlPostCodeNameAndAddress() throws Exception {",
      "      return PostCodeMainPage_addressMaps.allSql;",
      "    }",
      "  }"
    ] )

  } )


} )