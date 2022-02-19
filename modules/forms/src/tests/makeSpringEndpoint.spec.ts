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
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "  @RestController",
      "  public class EAccountsSummaryDDController {",
      "",
      " @Autowired",
      " public GraphQL graphQL;",
      "    @RequestMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public String getEAccountsSummaryDD(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "       return graphQL.execute(Queries.EAccountsSummaryDD).getData().toString();",
      "    }",
      "",
      "    @RequestMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String queryEAccountsSummaryDD() throws Exception{",
      "      return Queries.EAccountsSummaryDD;",
      "    }",
      "",
      "    @RequestMapping(value=\"/api/accountsSummary/validate\", produces=\"application/json\")",
      "    public String validateEAccountsSummaryDD() throws Exception{",
      "      try {",
      "        return graphQL.execute(Queries.EAccountsSummaryDD).getData().toString();",
      "      } catch (Exception e) {",
      "        return e.getClass() + \" \" + e.getMessage() + \"/\" + e.getCause();",
      "      }}",
      "    ",
      "  }"
    ] )
    expect ( makeSpringEndpointsFor ( paramsForTest, createPlanRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.RequestMapping;",
      "import org.springframework.web.bind.annotation.RequestParam;",
      "import org.springframework.web.bind.annotation.RestController;",
      "import graphql.GraphQL;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "  @RestController",
      "  public class CreatePlanDDController {",
      "",
      " @Autowired",
      " public GraphQL graphQL;",
      "    @RequestMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public String getCreatePlanDD(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "       return graphQL.execute(Queries.CreatePlanDD).getData().toString();",
      "    }",
      "",
      "    @RequestMapping(value=\"/api/createPlan/{createPlanId}/query\", produces=\"application/json\")",
      "    public String queryCreatePlanDD() throws Exception{",
      "      return Queries.CreatePlanDD;",
      "    }",
      "",
      "    @RequestMapping(value=\"/api/createPlan/{createPlanId}/validate\", produces=\"application/json\")",
      "    public String validateCreatePlanDD() throws Exception{",
      "      try {",
      "        return graphQL.execute(Queries.EAccountsSummaryDD).getData().toString();",
      "      } catch (Exception e) {",
      "        return e.getClass() + \" \" + e.getMessage() + \"/\" + e.getCause();",
      "      }}",
      "    ",
      "// Not yet doing action create",
      "// Not yet doing action update",
      "// Not yet doing action delete",
      "// Not yet doing action create",
      "// Not yet doing action list",
      "  }"
    ] )
  } )

} )