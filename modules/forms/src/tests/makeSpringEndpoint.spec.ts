import { makeParamsForJava, makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";


describe ( "makeSpringEndpoint", () => {
  it ( "should makeParamsForJava", () => {
    expect ( makeParamsForJava ( createPlanRestD, 'get' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'list' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'create' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'update' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'delete' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( createPlanRestD, 'getOption' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId' )
  } )
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, eAccountsSummaryRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.*;",
      "import java.util.Map;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class EAccountsSummaryDDController {",
      "",
      " @Autowired",
      " public GraphQL graphQL;",
      "    @GetMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public String getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Results.result(graphQL,Queries.getEAccountsSummaryDD(accountId, customerId), \"getEAccountsSummaryDD\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String querygetEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Queries.getEAccountsSummaryDD(accountId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = \"/api/accountsSummary/sample\", produces = \"application/json\")",
      "    public static String sampleEAccountsSummaryDD() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( sample.sampleEAccountsSummaryDD0);",
      "    }",
      "  }"
    ])
    expect ( makeSpringEndpointsFor ( paramsForTest, createPlanRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.*;",
      "import java.util.Map;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class CreatePlanDDController {",
      "",
      " @Autowired",
      " public GraphQL graphQL;",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public String getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Results.result(graphQL,Queries.getCreatePlanDD(accountId, createPlanId, customerId), \"getCreatePlanDD\");",
      "    }",
      "",
      "    @PostMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public String createCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Results.result(graphQL,Queries.createCreatePlanDD(accountId, customerId), \"createCreatePlanDD\");",
      "    }",
      "",
      "    @PutMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public String updateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Results.result(graphQL,Queries.updateCreatePlanDD(accountId, createPlanId, customerId), \"updateCreatePlanDD\");",
      "    }",
      "",
      "    @DeleteMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public String deleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Results.result(graphQL,Queries.deleteCreatePlanDD(accountId, createPlanId, customerId), \"deleteCreatePlanDD\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}/list\", produces=\"application/json\")",
      "    public String listCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Results.result(graphQL,Queries.listCreatePlanDD(accountId, customerId), \"listCreatePlanDD\");",
      "    }",
      "",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String querygetCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Queries.getCreatePlanDD(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @PostMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String querycreateCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Queries.createCreatePlanDD(accountId, customerId);",
      "    }",
      "",
      "    @PutMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String queryupdateCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Queries.updateCreatePlanDD(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @DeleteMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String querydeleteCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Queries.deleteCreatePlanDD(accountId, createPlanId, customerId);",
      "    }",
      "",
      "    @GetMapping(value=\"/api/createPlan/{createPlanId}/list/query\", produces=\"application/json\")",
      "    public String querylistCreatePlanDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Queries.listCreatePlanDD(accountId, customerId);",
      "    }",
      "",
      "  @GetMapping(value = \"/api/createPlan/{createPlanId}/sample\", produces = \"application/json\")",
      "    public static String sampleCreatePlanDD() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( sample.sampleCreatePlanDD0);",
      "    }",
      "  }"
    ])
  } )

} )