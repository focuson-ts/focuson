import { accessDetails, endpointAnnotation, makeParamsForJava, makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { paramsForTest } from "./paramsForTest";
import { IntParam, RestD, StringParam } from "../common/restD";
import { CreatePlanDD } from "../example/eAccounts/eAccountsSummary.dataD";

describe ( "endpointAnnotation", () => {
  const rdWithFields = {
    ...createPlanRestD,
    description: "We don't really know what a createPlan is",
    notes: "but we made some notes about it",
    authorisations: [ 'a1', 'a2' ]
  }
  const rdNoFields = {
    ...createPlanRestD,
    description: undefined,
    notes: undefined,
    authorisations: undefined
  }
  it ( "should return empty array if no annotations in the params", () => {
    expect ( endpointAnnotation ( { ...paramsForTest, endpointAnnotations: [] }, EAccountsSummaryPD, 'createPlanRestD', rdWithFields, 'get', 'endpoint' ) ).toEqual ( [] )
    expect ( endpointAnnotation ( { ...paramsForTest, endpointAnnotations: [] }, EAccountsSummaryPD, 'createPlanRestD', rdNoFields, 'get', 'endpoint' ) ).toEqual ( [] )
  } )
  it ( "should return endpointAnnotations without {} in them", () => {
    const expected = [ 'First', 'Second' ]
    expect ( endpointAnnotation ( { ...paramsForTest, endpointAnnotations: [ 'First', 'Second', 'Some{thing}', '{with} brackets' ] }, EAccountsSummaryPD, 'createPlanRestD', rdWithFields, 'get', 'endpoint' ) ).toEqual ( expected )
    expect ( endpointAnnotation ( { ...paramsForTest, endpointAnnotations: [ 'First', 'Second', 'Some{thing}', '{with} brackets' ] }, EAccountsSummaryPD, 'createPlanRestD', rdNoFields, 'get', 'endpoint' ) ).toEqual ( expected )
  } )
  it ( "should return endpointAnnotations that match, but hide strings that aren't in the params - purpose = endpoint", () => {
    const expected = [ 'First', 'Second' ]
    expect ( endpointAnnotation ( {
        ...paramsForTest, endpointAnnotations: [
          'Description {description}', 'Notes {notes}', 'thisvalue {isNotIn}', 'Restname {restName}', 'Url: {url}', 'RestNamne: {restName}', 'Authorisation: {authorisation}' ]
      },
      EAccountsSummaryPD, 'createPlanRestD', rdWithFields, 'get', 'endpoint' ) ).toEqual (
      [ "Description We don't really know what a createPlan is",
        "Notes but we made some notes about it",
        "Restname createPlanRestD",
        "Url: /api/createPlan?{query}",
        "RestNamne: createPlanRestD",
        "Authorisation: someAuthString",
      ] )
  } )
  // it ( "shouldn't return notes if they are not in", () => {
  //   expect ( endpointAnnotation ( {
  //       ...paramsForTest, endpointAnnotations: [
  //         'Note {note}',
  //         'Description {description}',
  //         'NoteAndDescription {note} {description}' ]
  //     },
  //     EAccountsSummaryPD, 'createPlanRestD', rdNoFields, 'get', 'endpoint' ) ).toEqual (
  //     [ "Description We don't really know what a createPlan is",
  //       "Notes but we made some notes about it",
  //       "Restname createPlanRestD",
  //       "Url: /api/createPlan?{query}"
  //     ] )
  // } )
  it ( "should return endpointAnnotations that match - purpose != endpoint", () => {
    const expected = [ 'First', 'Second' ]
    expect ( endpointAnnotation ( { ...paramsForTest, endpointAnnotations: [ 'Description {description}', 'Notes {notes}', 'Restname {restName}' ] }, EAccountsSummaryPD, 'createPlanRestD', rdNoFields, 'get', 'somethingelse' ) ).toEqual (
      [
        "Description This is a helper endpoint",
        "Notes ",
        "Restname createPlanRestD"
      ] )
  } )


} )

describe ( "makeSpringEndpoint", () => {
  it ( "should makeParamsForJava - real endpoint", () => {
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'get', true ) ).toEqual ( '@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId' )
    // expect ( makeParamsForJava ( createPlanRestD, 'list' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'create', true ) ).toEqual ( '@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'createWithoutFetch', true ) ).toEqual ( '@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'update', true ) ).toEqual ( '@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'updateWithoutFetch', true ) ).toEqual ( '@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'delete', true ) ).toEqual ( '@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId' )
  } )
  it ( "should makeParamsForJava - query endpoint", () => {
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'get', false ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId' )
    // expect ( makeParamsForJava ( createPlanRestD, 'list' ) ).toEqual ( '@RequestParam String accountId, @RequestParam String customerId' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'create', false ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'createWithoutFetch', false ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'update', false ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'updateWithoutFetch', false ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body' )
    expect ( makeParamsForJava ( 'error', createPlanRestD, 'delete', false ) ).toEqual ( '@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId' )
  } )
  it ( "should make an endpoint for a rest", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, EAccountsSummaryPD, 'eAccountsSummary', eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.controllers.EAccountsSummary;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummary.EAccountsSummaryQueries;",
      "import focuson.data.fetchers.IFetcher;",
      "import focuson.data.mutator.EAccountsSummary.EAccountsSummary_state_invalidateMutation;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.controllers.Transform;",
      "import focuson.data.wiring.EAccountsSummaryWiring;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "",
      "@RestController",
      "@CrossOrigin()",
      "public class EAccountsSummaryController {",
      "",
      "  @Autowired",
      "  public EAccountsSummaryWiring graphQL;",
      "  @Autowired",
      "  public LoggedDataSource dataSource;",
      "  @Autowired",
      "  EAccountsSummary_state_invalidateMutation __state_invalidateMutation;",
      "  @EndPointAnnotation()",
      "    @GetMapping(value=\"/api/accountsSummary\", produces=\"application/json\")",
      "    public ResponseEntity getEAccountsSummary(@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType) throws Exception{",
      "         Messages msgs = Transform.msgs();",
      "        //from EAccountsSummary.rest[eAccountsSummary].mutations[\"get\"]",
      "          return Transform.result(graphQL.get(dbName),EAccountsSummaryQueries.getEAccountsSummary(accountId, applRef, brandRef, clientRef, dbName, employeeType), \"getEAccountsSummary\", msgs);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PostMapping(value=\"/api/accountsSummary/invalidate\", produces=\"application/json\")",
      "    public ResponseEntity state_invalidateEAccountsSummary(@RequestParam int accountId, @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType, @RequestBody String body) throws Exception{",
      "         Map<String,Object> bodyAsJson = new ObjectMapper().readValue(body, Map.class);",
      "         Messages msgs = Transform.msgs();",
      "        Connection connection = dataSource.getConnection(getClass());",
      "        try  {",
      "        //from EAccountsSummary.rest[eAccountsSummary.access[{\"state\":\"invalidate\"}] - if you have a compilation error here check which parameters you defined in {yourRestD}.states[invalidate]",
      "        if (!Arrays.asList(\"teamLeader\").contains(employeeType)) return new ResponseEntity(\"\", new HttpHeaders(), HttpStatus.FORBIDDEN);",
      "        //from EAccountsSummary.rest[eAccountsSummary].mutations[{\"state\":\"invalidate\"}] - if you have a compilation error here check which parameters you defined in {yourRestD}.states[invalidate]",
      "          __state_invalidateMutation.auditStuff0(connection,msgs,dbName,accountId,clientRef);",
      "         return  ResponseEntity.ok(msgs.withEmptyData());",
      "        } finally {dataSource.close(getClass(),connection);}",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value=\"/api/accountsSummary/query\", produces=\"application/json\")",
      "    public String querygetEAccountsSummary(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType) throws Exception{",
      "       return EAccountsSummaryQueries.getEAccountsSummary(accountId, applRef, brandRef, clientRef, dbName, employeeType);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PostMapping(value=\"/api/accountsSummary/invalidate/query\", produces=\"application/json\")",
      "    public String querystate_invalidateEAccountsSummary(@RequestParam int accountId, @RequestParam int clientRef, @RequestParam String dbName, @RequestHeader @RequestParam String employeeType, @RequestBody String body) throws Exception{",
      "       return EAccountsSummaryQueries.state_invalidateEAccountsSummary(accountId, clientRef, dbName, employeeType,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value = \"/api/accountsSummary/sample\", produces = \"application/json\")",
      "    public static String sampleEAccountsSummary() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleEAccountsSummary0);",
      "    }",
      "  }"
    ] )
  } )
  it ( "should make a second endpoint for a res", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, EAccountsSummaryPD, 'createPlanRestD', createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ([
      "package focuson.data.controllers.EAccountsSummary;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.EAccountsSummary.CreatePlanQueries;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.controllers.Transform;",
      "import focuson.data.wiring.EAccountsSummaryWiring;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "",
      "@RestController",
      "@CrossOrigin()",
      "public class CreatePlanController {",
      "",
      "  @Autowired",
      "  public EAccountsSummaryWiring graphQL;",
      "  @Autowired",
      "  public LoggedDataSource dataSource;",
      "  @EndPointAnnotation()",
      "    @GetMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity getCreatePlan(@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "         Messages msgs = Transform.msgs();",
      "        //from EAccountsSummary.rest[createPlanRestD].mutations['get']",
      "          return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.getCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId), 'getCreatePlan', msgs);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PostMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity createCreatePlan(@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "         Map<String,Object> bodyAsJson = new ObjectMapper().readValue(body, Map.class);",
      "         Messages msgs = Transform.msgs();",
      "        //from EAccountsSummary.rest[createPlanRestD].mutations['create']",
      "          return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.createCreatePlan(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class)), 'createCreatePlan', msgs);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PutMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity updateCreatePlan(@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body) throws Exception{",
      "         Map<String,Object> bodyAsJson = new ObjectMapper().readValue(body, Map.class);",
      "         Messages msgs = Transform.msgs();",
      "        //from EAccountsSummary.rest[createPlanRestD].mutations['update']",
      "          return Transform.result(graphQL.get(IFetcher.mock),CreatePlanQueries.updateCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId,   Transform.removeQuoteFromProperties(body, Map.class)), 'updateCreatePlan', msgs);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @DeleteMapping(value='/api/createPlan', produces='application/json')",
      "    public ResponseEntity deleteCreatePlan(@RequestParam int accountId, @RequestHeader int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "         Messages msgs = Transform.msgs();",
      "        //from EAccountsSummary.rest[createPlanRestD].mutations['delete']",
      "         return  ResponseEntity.ok(msgs.withEmptyData());",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querygetCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "       return CreatePlanQueries.getCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PostMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querycreateCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.createCreatePlan(accountId, applRef, brandRef, clientRef,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PutMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String queryupdateCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId, @RequestBody String body) throws Exception{",
      "       return CreatePlanQueries.updateCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId,   Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @DeleteMapping(value='/api/createPlan/query', produces='application/json')",
      "    public String querydeleteCreatePlan(@RequestParam int accountId, @RequestParam int applRef, @RequestParam int brandRef, @RequestParam int clientRef, @RequestParam int createPlanId) throws Exception{",
      "       return CreatePlanQueries.deleteCreatePlan(accountId, applRef, brandRef, clientRef, createPlanId);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value = '/api/createPlan/sample', produces = 'application/json')",
      "    public static String sampleCreatePlan() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleCreatePlan0);",
      "    }",
      "  }"
    ] )
  } )

  it ( "should make an endpoint for a repeating", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, RepeatingPageD, 'repeating', repeatingRestRD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers.Repeating;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.Repeating.RepeatingWholeDataQueries;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.controllers.Transform;",
      "import focuson.data.wiring.RepeatingWiring;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "",
      "@RestController",
      "@CrossOrigin()",
      "public class RepeatingWholeDataController {",
      "",
      "  @Autowired",
      "  public RepeatingWiring graphQL;",
      "  @Autowired",
      "  public LoggedDataSource dataSource;",
      "  @EndPointAnnotation()",
      "    @PostMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity createRepeatingWholeData(@RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "         List<Map<String,Object>> bodyAsJson = new ObjectMapper().readValue(body, List.class);",
      "         Messages msgs = Transform.msgs();",
      "        //from Repeating.rest[repeating].mutations['create']",
      "          return Transform.result(graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.createRepeatingLine(clientRef,   Transform.removeQuoteFromProperties(body, List.class)), 'createRepeatingLine', msgs);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value='/api/repeating', produces='application/json')",
      "    public ResponseEntity getRepeatingWholeData(@RequestParam int clientRef) throws Exception{",
      "         Messages msgs = Transform.msgs();",
      "        //from Repeating.rest[repeating].mutations['get']",
      "          return Transform.result(graphQL.get(IFetcher.mock),RepeatingWholeDataQueries.getRepeatingLine(clientRef), 'getRepeatingLine', msgs);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PostMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querycreateRepeatingLine(@RequestParam int clientRef, @RequestBody String body) throws Exception{",
      "       return RepeatingWholeDataQueries.createRepeatingLine(clientRef,   Transform.removeQuoteFromProperties(body, List.class));",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value='/api/repeating/query', produces='application/json')",
      "    public String querygetRepeatingLine(@RequestParam int clientRef) throws Exception{",
      "       return RepeatingWholeDataQueries.getRepeatingLine(clientRef);",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value = '/api/repeating/sample', produces = 'application/json')",
      "    public static String sampleRepeatingWholeData() throws Exception {",
      "      return new ObjectMapper().writeValueAsString( Sample.sampleRepeatingWholeData0);",
      "    }",
      "  }"
    ])
  } )

  it ( "should make spring boot endpoints when no parameters", () => {
    expect ( makeSpringEndpointsFor ( paramsForTest, PostCodeMainPage, 'address', addressRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.controllers.PostCodeMainPage;",
      "",
      "import com.fasterxml.jackson.databind.ObjectMapper;",
      "import org.springframework.http.ResponseEntity;",
      "import org.springframework.web.bind.annotation.*;",
      "import org.springframework.http.HttpHeaders;",
      "import org.springframework.http.HttpStatus;",
      "import focuson.data.Sample;",
      "import focuson.data.queries.PostCodeMainPage.PostCodeNameAndAddressQueries;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import java.sql.Connection;",
      "import javax.sql.DataSource;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.controllers.Transform;",
      "import focuson.data.wiring.PostCodeMainPageWiring;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Arrays;",
      "import focuson.data.mutator.utils.Tuple2;",
      "import focuson.data.db.PostCodeMainPage.PostCodeMainPage_addressMaps ; ",
      "",
      "@RestController",
      "@CrossOrigin()",
      "public class PostCodeNameAndAddressController {",
      "",
      "  @Autowired",
      "  public PostCodeMainPageWiring graphQL;",
      "  @Autowired",
      "  public LoggedDataSource dataSource;",
      "  @EndPointAnnotation()",
      "    @PostMapping(value='/api/address', produces='application/json')",
      "    public ResponseEntity createWithoutFetchPostCodeNameAndAddress(@RequestBody String body) throws Exception{",
      "         Map<String,Object> bodyAsJson = new ObjectMapper().readValue(body, Map.class);",
      "         Messages msgs = Transform.msgs();",
      "        //from PostCodeMainPage.rest[address].mutations['createWithoutFetch']",
      "         return  ResponseEntity.ok(msgs.withEmptyData());",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @PostMapping(value='/api/address/query', produces='application/json')",
      "    public String querycreateWithoutFetchPostCodeNameAndAddress(@RequestBody String body) throws Exception{",
      "       return PostCodeNameAndAddressQueries.createWithoutFetchPostCodeNameAndAddress(  Transform.removeQuoteFromProperties(body, Map.class));",
      "    }",
      "",
      "  @EndPointAnnotation()",
      "    @GetMapping(value = '/api/address/sample', produces = 'application/json')",
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
