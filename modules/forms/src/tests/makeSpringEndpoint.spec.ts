import { accessDetails, makeParamsForJava, makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { paramsForTest } from "./paramsForTest";
import { IntParam, RestD, StringParam } from "../common/restD";
import { CreatePlanDD } from "../example/eAccounts/eAccountsSummary.dataD";


describe ( "makeSpringEndpoint", () => {
  it ( "should makeParamsForJava", () => {
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'get' ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId' )
    // expect ( makeParamsForJava ( createPlanRestD, 'list' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'create' ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'update' ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'delete' ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'getOption' ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId' )
  } )
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, EAccountsSummaryPD, 'eAccountsSummary', eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummary.EAccountsSummaryQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import focuson.data.mutator.EAccountsSummary.EAccountsSummary_state_invalidateMutation;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "",
      "  @RestController",
      "  public class EAccountsSummary_EAccountsSummaryController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "  @Autowired",
      "  public DataSource dataSource;",
      "  @Autowired",
      "  EAccountsSummary_state_invalidateMutation __state_invalidateMutation;",
      "    @GetMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public ResponseEntity getEAccountsSummary(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(dbName),EAccountsSummaryQueries.getEAccountsSummary(accountId, applRef, brandRef, clientRef, dbName, employeeType), \"getEAccountsSummary\");",
      "        }",
      "    }",
      "",
      "    @PostMapping(value=\"/api/accountsSummary/invalidate\", produces=\"application/json\")",
      "    public ResponseEntity state_invalidateEAccountsSummary(@RequestParam int accountId, @RequestHeader @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "        //from EAccountsSummary.rest[eAccountsSummary.access[{\"state\":\"invalidate\"}] - if you have a compilation error here check which parameters you defined in {yourRestD}.states[invalidate]",
      "        if (!Arrays.asList(\"teamLeader\").contains(employeeType)) return new ResponseEntity(\"\", new HttpHeaders(), HttpStatus.FORBIDDEN);",
      "          //from EAccountsSummary.rest[eAccountsSummary].mutations[{\"state\":\"invalidate\"}] - if you have a compilation error here check which parameters you defined in {yourRestD}.states[invalidate]",
      "          __state_invalidateMutation.EAccountsSummary_state_invalidate_auditStuff0(connection,dbName,accountId,clientRef);",
      "          return  ResponseEntity.ok(\"{}\");",
      "        }",
      "    }",
      "",
      "    @GetMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String querygetEAccountsSummary(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType) throws Exception{",
      "       return EAccountsSummaryQueries.getEAccountsSummary(accountId, applRef, brandRef, clientRef, dbName, employeeType);",
      "    }",
      "",
      "    @PostMapping(value=\"/api/accountsSummary/invalidate/query\", produces=\"application/json\")",
      "    public String querystate_invalidateEAccountsSummary(@RequestParam int accountId, @RequestHeader @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType) throws Exception{",
      "       return EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, clientRef, dbName, employeeType);",
      "    }",
      "",
      "  @GetMapping(value = \"/api/accountsSummary/sample\", produces = \"application/json\")",
      "    public static String sampleEAccountsSummary() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);",
      "    }",
      "  }"
    ])
  } )
  it ( "should make a second endpoint for a res", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, EAccountsSummaryPD, 'createPlanRestD', createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummary.CreatePlanQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "",
      "  @RestController",
      "  public class EAccountsSummary_CreatePlanController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "  @Autowired",
      "  public DataSource dataSource;",
      "    @GetMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity getCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.getCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId), 'getCreatePlan');",
      "        }",
      "    }",
      "",
      "    @PostMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity createCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.createCreatePlan(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class)), 'createCreatePlan');",
      "        }",
      "    }",
      "",
      "    @PutMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity updateCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(IFetcher.mock),CreatePlanQueries.updateCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId,   Transform.removeQuoteFromProperties(body, Map.class)), 'updateCreatePlan');",
      "        }",
      "    }",
      "",
      "    @DeleteMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity deleteCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return  ResponseEntity.ok('{}');",
      "        }",
      "    }",
      "",
      "    @GetMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querygetCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "       return CreatePlanQueries.getCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId);",
      "    }",
      "",
      "    @PostMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querycreateCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.createCreatePlan(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "    @PutMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String queryupdateCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.updateCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "    @DeleteMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querydeleteCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestHeader @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "       return CreatePlanQueries.deleteCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId);",
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
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.Repeating.RepeatingWholeDataQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "",
      "  @RestController",
      "  public class Repeating_RepeatingWholeDataController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "  @Autowired",
      "  public DataSource dataSource;",
      "    @PostMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity createRepeatingWholeData(@RequestHeader @RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.createRepeatingLine(clientRef,   Transform.removeQuoteFromProperties(body, List.class)), 'createRepeatingLine');",
      "        }",
      "    }",
      "",
      "    @GetMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity getRepeatingWholeData(@RequestHeader @RequestParam int clientRef) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.getRepeatingLine(clientRef), 'getRepeatingLine');",
      "        }",
      "    }",
      "",
      "    @PostMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querycreateRepeatingLine(@RequestHeader @RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "       return RepeatingWholeDataQueries.createRepeatingLine(clientRef,   Transform.removeQuoteFromProperties(body, List.class));",
      "    }",
      "",
      "    @GetMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querygetRepeatingLine(@RequestHeader @RequestParam int clientRef) throws Exception{",
      "       return RepeatingWholeDataQueries.getRepeatingLine(clientRef);",
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
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.PostCodeMainPage.PostCodeNameAndAddressQueries;",
      "import focuson.data.IManyGraphQl;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "import focuson.data.db.PostCodeMainPage.PostCodeMainPage_addressMaps ; ",
      "",
      "  @RestController",
      "  public class PostCodeMainPage_PostCodeNameAndAddressController {",
      "",
      "  @Autowired",
      "  public IManyGraphQl graphQL;",
      "  @Autowired",
      "  public DataSource dataSource;",
      "    @PostMapping(value='/api/address', produces='application/json')",
      "    public ResponseEntity createPostCodeNameAndAddress(@RequestBody String body) throws Exception{",
      "        try (Connection connection = dataSource.getConnection()) {",
      "          return Transform.result(connection,graphQL.get(IFetcher.mock),PostCodeNameAndAddressQueries.createPostCodeNameAndAddress(  Transform.removeQuoteFromProperties(body, Map.class)), 'createPostCodeNameAndAddress');",
      "        }",
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

const restD: RestD<any> = {
  actions: [],
  dataDD: CreatePlanDD,
  params: {
    p1: { ...StringParam, lens: 'someLens', testValue: 'p1V' },
    p2: { ...IntParam, lens: 'someLens', testValue: 'p2v' },
  },
  url: "/some/url",
  access: [
    { restAction: 'get', condition: { type: 'in', param: "p1", values: [ 'a', 'b' ] } },
    { restAction: { state: 'hi' }, condition: { type: 'in', param: "p1", values: [ 'c' ] } },
    { restAction: { state: 'hi' }, condition: { type: 'in', param: "p2", values: [ 'd' ] } },
    { restAction: { state: 'lo' }, condition: { type: 'in', param: "p3", values: [ 'e' ] } },
  ]
}
describe ( "accessDetails", () => {
  it ( "should check that the correct end point has the correct access - zero requirements", () => {
    expect ( accessDetails ( paramsForTest, EAccountsSummaryPD, 'createPlanRestD', restD, 'update' ) ).toEqual ( [] )
  } )
  it ( "should check that the correct end point has the correct access - one requirement", () => {
    expect ( accessDetails ( paramsForTest, EAccountsSummaryPD, 'createPlanRestD', restD, 'get' ) ).toEqual ( [
      "//from EAccountsSummary.rest[createPlanRestD.access[\"get\"]",
      "if (!Arrays.asList(\"a\",\"b\").contains(p1)) return new ResponseEntity(\"\", new HttpHeaders(), HttpStatus.FORBIDDEN);"
    ] )
  } )
  it ( "should check that the correct end point has the correct access - many requirement", () => {
    expect ( accessDetails ( paramsForTest, EAccountsSummaryPD, 'createPlanRestD', restD, { state: 'hi' } ) ).toEqual ( [
      "//from EAccountsSummary.rest[createPlanRestD.access[{\"state\":\"hi\"}] - if you have a compilation error here check which parameters you defined in {yourRestD}.states[hi]",
      "if (!Arrays.asList(\"c\").contains(p1)) return new ResponseEntity(\"\", new HttpHeaders(), HttpStatus.FORBIDDEN);",
      "//from EAccountsSummary.rest[createPlanRestD.access[{\"state\":\"hi\"}] - if you have a compilation error here check which parameters you defined in {yourRestD}.states[hi]",
      "if (!Arrays.asList(\"d\").contains(p2)) return new ResponseEntity(\"\", new HttpHeaders(), HttpStatus.FORBIDDEN);"
    ] )
  } )
} )
