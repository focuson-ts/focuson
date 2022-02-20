import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";


describe ( "makeSpringEndpoint", () => {
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, eAccountsSummaryRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.RequestMapping;",
      "import org.springframework.web.bind.annotation.RequestParam;",
      "import org.springframework.web.bind.annotation.RestController;",
      "import java.util.Map;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class EAccountsSummaryDDController {",
      "",
      " @Autowired",
      " public GraphQL graphQL;",
      "    @RequestMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public String getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       Map data = (Map) graphQL.execute(Queries.getEAccountsSummaryDD(accountId, customerId)).toSpecification().get(\"data\");",
      "       return new ObjectMapper().writeValueAsString(data.get(\"getEAccountsSummaryDD\"));",
      "    }",
      "",
      "    @RequestMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String queryEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return Queries.getEAccountsSummaryDD(accountId, customerId);",
      "    }",
      "",
      "  @RequestMapping(value = \"/api/accountsSummary/sample\", produces = \"application/json\")",
      "    public static String sampleEAccountsSummaryDD() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( sample.EAccountsSummaryDDSample0);",
      "    }",
      "  }"
    ] )
    expect ( makeSpringEndpointsFor ( paramsForTest, createPlanRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.RequestMapping;",
      "import org.springframework.web.bind.annotation.RequestParam;",
      "import org.springframework.web.bind.annotation.RestController;",
      "import java.util.Map;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "  @RestController",
      "  public class CreatePlanDDController {",
      "",
      " @Autowired",
      " public GraphQL graphQL;",
      "    @RequestMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public String getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       Map data = (Map) graphQL.execute(Queries.getCreatePlanDD(accountId, createPlanId, customerId)).toSpecification().get(\"data\");",
      "       return new ObjectMapper().writeValueAsString(data.get(\"getCreatePlanDD\"));",
      "    }",
      "",
      "    @RequestMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String queryCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return Queries.getCreatePlanDD(accountId, createPlanId, customerId);",
      "    }",
      "",
      "  @RequestMapping(value = \"/api/createPlan/{createPlanId}/sample\", produces = \"application/json\")",
      "    public static String sampleCreatePlanDD() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( sample.CreatePlanDDSample0);",
      "    }",
      "// Not yet doing action create",
      "// Not yet doing action update",
      "// Not yet doing action delete",
      "// Not yet doing action list",
      "  }"
    ] )
  } )

} )