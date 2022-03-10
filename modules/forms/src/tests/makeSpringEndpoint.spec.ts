import { makeParamsForJava, makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { repeatingRestRD } from "../example/repeating/repeating.restD";


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
      "import focuson.data.queries.EAccountsSummaryDDQueries;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class EAccountsSummaryDDController {",
      "",
      "  @Autowired",
      "  public GraphQL graphQL;",
      "    @GetMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public ResponseEntity getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,EAccountsSummaryDDQueries.getEAccountsSummaryDD(accountId, customerId), \"getEAccountsSummaryDD\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String querygetEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return EAccountsSummaryDDQueries.getEAccountsSummaryDD(accountId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = \"/api/accountsSummary/sample\", produces = \"application/json\")",
      "    public static String sampleEAccountsSummaryDD() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummaryDD0);",
      "    }",
      "  }"
    ] )
  } )
  it ( "should make a second endpoint for a res", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, createPlanRestD ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.CreatePlanDDQueries;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class CreatePlanDDController {",
      "",
      "  @Autowired",
      "  public GraphQL graphQL;",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public ResponseEntity getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanDDQueries.getCreatePlanDD(accountId, createPlanId, customerId), \"getCreatePlanDD\");",
      "    }",
      "",
      "    @PostMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public ResponseEntity createCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanDDQueries.createCreatePlanDD(accountId, customerId,  Transform.removeQuoteFromProperties(body)), \"createCreatePlanDD\");",
      "    }",
      "",
      "    @PutMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public ResponseEntity updateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanDDQueries.updateCreatePlanDD(accountId, createPlanId, customerId,  Transform.removeQuoteFromProperties(body)), \"updateCreatePlanDD\");",
      "    }",
      "",
      "    @DeleteMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public ResponseEntity deleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanDDQueries.deleteCreatePlanDD(accountId, createPlanId, customerId), \"deleteCreatePlanDD\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}/list\", produces=\"application/json\")",
      "    public ResponseEntity listCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,CreatePlanDDQueries.listCreatePlanDD(accountId, customerId), \"listCreatePlanDD\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String querygetCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanDDQueries.getCreatePlanDD(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @PostMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String querycreateCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return CreatePlanDDQueries.createCreatePlanDD(accountId, customerId,  Transform.removeQuoteFromProperties(body));",
      "    }",
      "",
      "    @PutMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String queryupdateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return CreatePlanDDQueries.updateCreatePlanDD(accountId, createPlanId, customerId,  Transform.removeQuoteFromProperties(body));",
      "    }",
      "",
      "    @DeleteMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String querydeleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanDDQueries.deleteCreatePlanDD(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}/list/query\", produces=\"application/json\")",
      "    public String querylistCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return CreatePlanDDQueries.listCreatePlanDD(accountId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = \"/api/createPlan/{createPlanId}/sample\", produces = \"application/json\")",
      "    public static String sampleCreatePlanDD() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlanDD0);",
      "    }",
      "  }"
    ] )
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
      "       return Transform.result(graphQL,RepeatingWholeDataQueries.createRepeatingLine(customerId,  Transform.removeQuoteFromProperties(body)), 'createRepeatingLine');",
      "    }",
      "",
      "    @GetMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity getRepeatingWholeData(@RequestParam String customerId) throws Exception{",
      "       return Transform.result(graphQL,RepeatingWholeDataQueries.getRepeatingLine(customerId), 'getRepeatingLine');",
      "    }",
      "",
      "    @PostMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querycreateRepeatingLine(@RequestParam String customerId, @RequestBody String body) throws Exception{",
      "       return RepeatingWholeDataQueries.createRepeatingLine(customerId,  Transform.removeQuoteFromProperties(body));",
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

} )