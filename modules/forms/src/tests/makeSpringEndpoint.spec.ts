import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";


describe ( "makeSpringEndpoint", () => {
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest,eAccountsSummaryRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.RequestMapping;",
      "import org.springframework.web.bind.annotation.RequestParam;",
      "import org.springframework.web.bind.annotation.RestController;",
      "  @RestController",
      "  public class EAccountsSummaryDDController {",
      "",
      "    @RequestMapping(value=\"/api/accountsSummary\")",
      "    public static String Welcome(@RequestParam String accountId, @RequestParam String customerId) throws Exception{",
      "      return new ObjectMapper().writeValueAsString(sample.EAccountsSummaryDDSample0);",
      "    }",
      "",
      "  }"
    ] )
    expect ( makeSpringEndpointsFor (paramsForTest, createPlanRestD ) ).toEqual ( [
      "package packName;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.web.bind.annotation.RequestMapping;",
      "import org.springframework.web.bind.annotation.RequestParam;",
      "import org.springframework.web.bind.annotation.RestController;",
      "  @RestController",
      "  public class CreatePlanDDController {",
      "",
      "    @RequestMapping(value=\"/api/createPlan/{createPlanId}\", produces=\"application/json\")",
      "    public static String Welcome(@RequestParam String accountId, @RequestParam String createPlanId, @RequestParam String customerId) throws Exception{",
      "      return new ObjectMapper().writeValueAsString(sample.CreatePlanDDSample0);",
      "    }",
      "",
      "// Not yet doing action create",
      "// Not yet doing action update",
      "// Not yet doing action delete",
      "// Not yet doing action create",
      "// Not yet doing action list",
      "  }"
    ] )
  } )

} )