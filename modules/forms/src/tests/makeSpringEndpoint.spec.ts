import { makeParamsForJava, makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { addressRestD } from "../example/addressSearch/addressSearch.restD";


describe ( "makeSpringEndpoint", () => {
  it ( "should makeParamsForJava", () => {
    expect ( makeParamsForJava ( createPlanRestD, 'get' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'list' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'create' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body' )
    expect ( makeParamsForJava ( createPlanRestD, 'update' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body' )
    expect ( makeParamsForJava ( createPlanRestD, 'delete' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'getOption' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
  } )
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummaryQueries;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class EAccountsSummaryController {",
      "",
      "  @Autowired",
      "  public GraphQL graphQL;",
      "    @GetMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public ResponseEntity getEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId), \"getEAccountsSummary\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String querygetEAccountsSummary(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return EAccountsSummaryQueries.getEAccountsSummary(accountId, customerId);",
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
    expect ( makeSpringEndpointsFor ( paramsForTest, createPlanRestD ).map(s=>s.replace(/"/g,"'")) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.CreatePlanQueries;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class CreatePlanController {",
      "",
      "  @Autowired",
      "  public GraphQL graphQL;",
      "    @GetMapping(value='/api/createPlan/{createPlanId}', produces='application/json')",
      "    public ResponseEntity getCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanQueries.getCreatePlan(accountId, createPlanId, customerId), 'getCreatePlan');",
      "    }",
      "",
      "    @PostMapping(value='/api/createPlan/{createPlanId}', produces='application/json')",
      "    public ResponseEntity createCreatePlan(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanQueries.createCreatePlan(accountId, customerId,   Transform.removeQuoteFromProperties(body)), 'createCreatePlan');",
      "    }",
      "",
      "    @PutMapping(value='/api/createPlan/{createPlanId}', produces='application/json')",
      "    public ResponseEntity updateCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanQueries.updateCreatePlan(accountId, createPlanId, customerId,   Transform.removeQuoteFromProperties(body)), 'updateCreatePlan');",
      "    }",
      "",
      "    @DeleteMapping(value='/api/createPlan/{createPlanId}', produces='application/json')",
      "    public ResponseEntity deleteCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanQueries.deleteCreatePlan(accountId, createPlanId, customerId), 'deleteCreatePlan');",
      "    }",
      "",
      "    @GetMapping(value='/api/createPlan/{createPlanId}/list', produces='application/json')",
      "    public ResponseEntity listCreatePlan(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanQueries.listCreatePlan(accountId, customerId), 'listCreatePlan');",
      "    }",
      "",
      "    @GetMapping(value='/api/createPlan/{createPlanId}/query', produces='application/json')",
      "    public String querygetCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanQueries.getCreatePlan(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @PostMapping(value='/api/createPlan/{createPlanId}/query', produces='application/json')",
      "    public String querycreateCreatePlan(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.createCreatePlan(accountId, customerId,   Transform.removeQuoteFromProperties(body));",
      "    }",
      "",
      "    @PutMapping(value='/api/createPlan/{createPlanId}/query', produces='application/json')",
      "    public String queryupdateCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.updateCreatePlan(accountId, createPlanId, customerId,   Transform.removeQuoteFromProperties(body));",
      "    }",
      "",
      "    @DeleteMapping(value='/api/createPlan/{createPlanId}/query', produces='application/json')",
      "    public String querydeleteCreatePlan(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanQueries.deleteCreatePlan(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @GetMapping(value='/api/createPlan/{createPlanId}/list/query', produces='application/json')",
      "    public String querylistCreatePlan(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanQueries.listCreatePlan(accountId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = '/api/createPlan/{createPlanId}/sample', produces = 'application/json')",
      "    public static String sampleCreatePlan() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlan0);",
      "    }",
      "  }"
    ])
  } )

  it ( "should make an endpoint for a repeating", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, repeatingRestRD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.RepeatingWholeDataQueries;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class RepeatingWholeDataController {",
      "",
      "  @Autowired",
      "  public GraphQL graphQL;",
      "    @PostMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity createRepeatingWholeData(@RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL,RepeatingWholeDataQueries.createRepeatingLine(customerId,   Transform.removeQuoteFromProperties(body)), 'createRepeatingLine');",
      "    }",
      "",
      "    @GetMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity getRepeatingWholeData(@RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,RepeatingWholeDataQueries.getRepeatingLine(customerId), 'getRepeatingLine');",
      "    }",
      "",
      "    @PostMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querycreateRepeatingLine(@RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return RepeatingWholeDataQueries.createRepeatingLine(customerId,   Transform.removeQuoteFromProperties(body));",
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

  it ("should make spring boot endpoints when no parameters", () =>{
    expect ( makeSpringEndpointsFor ( paramsForTest, addressRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.PostCodeMainPageQueries;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class PostCodeMainPageController {",
      "",
      "  @Autowired",
      "  public GraphQL graphQL;",
      "    @PostMapping(value='/api/address', produces='application/json')",
      "    public ResponseEntity createPostCodeMainPage(@RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL,PostCodeMainPageQueries.createPostCodeMainPage(  Transform.removeQuoteFromProperties(body)), 'createPostCodeMainPage');",
      "    }",
      "",
      "    @PostMapping(value='/api/address/query', produces='application/json')",
      "    public String querycreatePostCodeMainPage(@RequestBody String body) throws Exception{",
      "       return PostCodeMainPageQueries.createPostCodeMainPage(  Transform.removeQuoteFromProperties(body));",
      "    }",
      "",
      "  @GetMapping(value = '/api/address/sample', produces = 'application/json')",
      "    public static String samplePostCodeMainPage() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.samplePostCodeMainPage0);",
      "    }",
      "  }"
    ])

  })

} )