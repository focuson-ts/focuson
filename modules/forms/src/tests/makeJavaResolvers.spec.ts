import { findAllResolversFor, findChildResolvers, findQueryMutationResolvers, makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CombinedParams } from "../codegen/config";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";

export const paramsForTest: CombinedParams = {
  optionalsFile: "optionals",
  pagesFile: 'pages',
  focusOnVersion: "someFocusOnVersion",
  commonParams: "CommonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  mockFetcherPackage: "mockfetchers",
  h2FetcherPackage: 'h2fetchers',
  controllerPackage: "controllers",
  restsFile: "rests",
  pactsFile: "pact.spec",
  samplesFile: "samples",
  emptyFile: "empty",
  renderFile: "render",
  guardReportFile: 'guards',
  urlparams: 'commonIds',
  queriesPackage: 'queries',
  thePackage: 'focuson.data',
  applicationName: 'ExampleApp',
  fetcherPackage: 'fetchers',
  fetcherInterface: 'FFetcher',
  wiringClass: 'Wiring',
  fetcherClass: 'MockFetchers',
  schema: 'someSchema.graphql',
  sampleClass: 'Sample',
  dbPackage: 'db',
  defaultDbName: 'mock'
};

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface when action is get", () => {
    expect ( makeJavaResolversInterface ( paramsForTest, EAccountsSummaryPD, eAccountsSummaryRestD, 'get' ) ).toEqual ( [
      "package focuson.data.fetchers.EAccountsSummary;",
      "",
      "import graphql.schema.DataFetcher;",
      "import java.util.Map;",
      "import focuson.data.fetchers.IFetcher;",
      "",
      "public interface EAccountsSummary_get_FFetcher extends IFetcher{",
      "   public DataFetcher<Map<String,Object>> getEAccountsSummary();",
      "   public DataFetcher<Map<String,Object>> getAccountSummaryDescription();",
      "   public DataFetcher<Map<String,Object>> getTotalMonthlyCost();",
      "   public DataFetcher<Map<String,Object>> getOneAccountBalance();",
      "   public DataFetcher<Map<String,Object>> getCurrentAccountBalance();",
      "}"
    ] )
  } )
  it ( "should make a java interface when action is update", () => {
    expect ( makeJavaResolversInterface ( paramsForTest, EAccountsSummaryPD, createPlanRestD, 'update' ) ).toEqual ( [
      "package focuson.data.fetchers.EAccountsSummary;",
      "",
      "import graphql.schema.DataFetcher;",
      "import java.util.Map;",
      "import focuson.data.fetchers.IFetcher;",
      "",
      "public interface CreatePlan_update_FFetcher extends IFetcher{",
      "   public DataFetcher<Map<String,Object>> updateCreatePlan();",
      "}"
    ] )
  } )

} )

describe ( "makeAllJavaWiring", () => {
  it ( "should make a java file which will power a graphql spring boot app", () => {
    expect ( makeAllJavaWiring ( paramsForTest, [ EAccountsSummaryPD, RepeatingPageD ], { main: '.', backup: '.' } ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data;",
      "import com.google.common.base.Charsets;",
      "import com.google.common.io.Resources;",
      "import graphql.GraphQL;",
      "import graphql.schema.GraphQLSchema;",
      "import graphql.schema.DataFetcher;",
      "import graphql.schema.idl.RuntimeWiring;",
      "import graphql.schema.idl.SchemaGenerator;",
      "import graphql.schema.idl.SchemaParser;",
      "import graphql.schema.idl.TypeDefinitionRegistry;",
      "import graphql.schema.DataFetchingEnvironment;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import org.springframework.context.annotation.Bean;",
      "import org.springframework.stereotype.Component;",
      "import javax.annotation.PostConstruct;",
      "import java.io.IOException;",
      "import java.net.URL;",
      "import java.util.Collections;",
      "import java.util.HashMap;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.Optional;",
      "import focuson.data.fetchers.IFetcher;",
      "import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;",
      "import java.util.function.Function;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_get_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_create_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_update_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_delete_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_get_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_state_invalidate_FFetcher;",
      "import focuson.data.fetchers.Repeating.RepeatingWholeData_create_FFetcher;",
      "import focuson.data.fetchers.Repeating.RepeatingWholeData_get_FFetcher;",
      "@Component",
      "public class Wiring  implements IManyGraphQl{",
      "      @Autowired",
      "      List<CreatePlan_get_FFetcher> CreatePlan_get_FFetcher;",
      "      @Autowired",
      "      List<CreatePlan_create_FFetcher> CreatePlan_create_FFetcher;",
      "      @Autowired",
      "      List<CreatePlan_update_FFetcher> CreatePlan_update_FFetcher;",
      "      @Autowired",
      "      List<CreatePlan_delete_FFetcher> CreatePlan_delete_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_get_FFetcher> EAccountsSummary_get_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_state_invalidate_FFetcher> EAccountsSummary_state_invalidate_FFetcher;",
      "      @Autowired",
      "      List<RepeatingWholeData_create_FFetcher> RepeatingWholeData_create_FFetcher;",
      "      @Autowired",
      "      List<RepeatingWholeData_get_FFetcher> RepeatingWholeData_get_FFetcher;",
      "   private String sdl;",
      "   private Map<String, GraphQL> cache = Collections.synchronizedMap(new HashMap<>()); //sucks and need to improve",
      "   @PostConstruct",
      "    public void init() throws IOException {",
      "       URL url = Resources.getResource('someSchema.graphql');",
      "       sdl = Resources.toString(url, Charsets.UTF_8);",
      "    }",
      "   @Override",
      "   public GraphQL get(String dbName) {",
      "      if (dbName==null) dbName= IFetcher.mock;",
      "      if (!cache.containsKey(dbName)) {",
      "          GraphQLSchema graphQLSchema = buildSchema(dbName);",
      "          cache.put(dbName, GraphQL.newGraphQL(graphQLSchema).build());",
      "      }",
      "      return cache.get(dbName);",
      "    }",
      "   private GraphQLSchema buildSchema(String dbName) {",
      "        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);",
      "        RuntimeWiring runtimeWiring = buildWiring(dbName);",
      "        SchemaGenerator schemaGenerator = new SchemaGenerator();",
      "        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);",
      "   }",
      "   public <T extends IFetcher, Res> DataFetcher<Res> find(List<T> list, String dbName, Function<T, DataFetcher<Res>> fn) {",
      "        Optional<T> result = list.stream().filter(f -> f.dbName().equals(dbName)).findFirst();",
      "        if (result.isPresent()) return fn.apply(result.get());",
      "        return new DataFetcher<Res>() {",
      "            @Override",
      "            public Res get(DataFetchingEnvironment dataFetchingEnvironment) throws Exception {",
      "                    throw new RuntimeException('Cannot find the fetcher for ' + dbName);",
      "            }",
      "        };",
      "   }",
      "   private RuntimeWiring buildWiring(String dbName) {",
      "       return RuntimeWiring.newRuntimeWiring()",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlan', find(CreatePlan_get_FFetcher, dbName, f ->f.getCreatePlan())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlan', find(CreatePlan_create_FFetcher, dbName, f ->f.createCreatePlan())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateCreatePlan', find(CreatePlan_update_FFetcher, dbName, f ->f.updateCreatePlan())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlan', find(CreatePlan_delete_FFetcher, dbName, f ->f.deleteCreatePlan())))",
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummary', find(EAccountsSummary_get_FFetcher, dbName, f ->f.getEAccountsSummary())))",
      "          .type(newTypeWiring('EAccountSummary').dataFetcher('description', find(EAccountsSummary_get_FFetcher, dbName, f ->f.getAccountSummaryDescription())))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('totalMonthlyCost', find(EAccountsSummary_get_FFetcher, dbName, f ->f.getTotalMonthlyCost())))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('oneAccountBalance', find(EAccountsSummary_get_FFetcher, dbName, f ->f.getOneAccountBalance())))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('currentAccountBalance', find(EAccountsSummary_get_FFetcher, dbName, f ->f.getCurrentAccountBalance())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('stateEAccountsSummaryinvalidate', find(EAccountsSummary_state_invalidate_FFetcher, dbName, f ->f.stateEAccountsSummaryinvalidate())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createRepeatingLine', find(RepeatingWholeData_create_FFetcher, dbName, f ->f.createRepeatingLine())))",
      "          .type(newTypeWiring('Query').dataFetcher('getRepeatingLine', find(RepeatingWholeData_get_FFetcher, dbName, f ->f.getRepeatingLine())))",
      "       .build();",
      "    }",
      "    @Bean",
      "    public GraphQL graphQL() {",
      "        return get(IFetcher.mock);",
      "    }",
      "}"
    ] )
  } )


} )

describe ( "findAllResolvers2", () => {
  it ( "findResolvers2", () => {
    expect ( findChildResolvers ( eAccountsSummaryRestD ) ).toEqual ( [
      { "isRoot": false, needsObjectInOutput: true, "name": "description", "parent": "EAccountSummary", "resolver": "getAccountSummaryDescription", "sample": [ "This account's description" ], "samplerName": "sampleOneLineString" },
      { "isRoot": false, needsObjectInOutput: true, "name": "totalMonthlyCost", "parent": "EAccountsSummary", "resolver": "getTotalMonthlyCost", "sample": [ 1000 ], "samplerName": "sampleMoney" },
      { "isRoot": false, needsObjectInOutput: true, "name": "oneAccountBalance", "parent": "EAccountsSummary", "resolver": "getOneAccountBalance", "sample": [ 9921 ], "samplerName": "sampleMoney" },
      { "isRoot": false, needsObjectInOutput: true, "name": "currentAccountBalance", "parent": "EAccountsSummary", "resolver": "getCurrentAccountBalance", "sample": [ 12321 ], "samplerName": "sampleMoney" }
    ] )
  } )

  it ( "findQueryMutationResolvers2", () => {
    expect ( findQueryMutationResolvers ( eAccountsSummaryRestD, 'get' ) ).toEqual (
      { "isRoot": true, needsObjectInOutput: true, "name": "getEAccountsSummary", "parent": "Query", "resolver": "getEAccountsSummary", "sample": [], "samplerName": "sampleEAccountsSummary" }
    )
    expect ( findQueryMutationResolvers ( createPlanRestD, "get" ) ).toEqual (
      { "isRoot": true, needsObjectInOutput: true, "name": "getCreatePlan", "parent": "Query", "resolver": "getCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
    expect ( findQueryMutationResolvers ( createPlanRestD, "create" ) ).toEqual (
      { "isRoot": true, needsObjectInOutput: true, "name": "createCreatePlan", "parent": "Mutation", "resolver": "createCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
    expect ( findQueryMutationResolvers ( createPlanRestD, "update" ) ).toEqual (
      { "isRoot": true, needsObjectInOutput: true, "name": "updateCreatePlan", "parent": "Mutation", "resolver": "updateCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
    expect ( findQueryMutationResolvers ( createPlanRestD, "delete" ) ).toEqual (
      { "isRoot": true, needsObjectInOutput: false, "name": "deleteCreatePlan", "parent": "Mutation", "resolver": "deleteCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
    // expect ( findQueryMutationResolvers ( createPlanRestD, "list" ) ).toEqual (
    //   { "isRoot": true, needsObjectInOutput: true, "name": "listCreatePlan", "parent": "Query", "resolver": "listCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    // )
  } )

  it ( "findAllResolversFor with children - gets with children", () => {
    expect ( findAllResolversFor ( eAccountsSummaryRestD, 'get' ) ).toEqual ( [
      { "isRoot": true, needsObjectInOutput: true, "name": "getEAccountsSummary", "parent": "Query", "resolver": "getEAccountsSummary", "sample": [], "samplerName": "sampleEAccountsSummary" },
      { "isRoot": false, needsObjectInOutput: true, "name": "description", "parent": "EAccountSummary", "resolver": "getAccountSummaryDescription", "sample": [ "This account's description" ], "samplerName": "sampleOneLineString" },
      { "isRoot": false, needsObjectInOutput: true, "name": "totalMonthlyCost", "parent": "EAccountsSummary", "resolver": "getTotalMonthlyCost", "sample": [ 1000 ], "samplerName": "sampleMoney" },
      { "isRoot": false, needsObjectInOutput: true, "name": "oneAccountBalance", "parent": "EAccountsSummary", "resolver": "getOneAccountBalance", "sample": [ 9921 ], "samplerName": "sampleMoney" },
      { "isRoot": false, needsObjectInOutput: true, "name": "currentAccountBalance", "parent": "EAccountsSummary", "resolver": "getCurrentAccountBalance", "sample": [ 12321 ], "samplerName": "sampleMoney" }
    ] )
  } )
  it ( "findAllResolversFor with children - with mutations", () => {
    expect ( findAllResolversFor ( createPlanRestD, 'update' ) ).toEqual ( [
      { "isRoot": true, needsObjectInOutput: true, "name": "updateCreatePlan", "parent": "Mutation", "resolver": "updateCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    ] )
  } )
  it ( "findAllResolversFor simple", () => {
    expect ( findAllResolversFor ( createPlanRestD, 'get' ) ).toEqual ( [
      { "isRoot": true, needsObjectInOutput: true, "name": "getCreatePlan", "parent": "Query", "resolver": "getCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    ] )
  } )

  it ( "should make a resolver for repeating - get", () => {
    expect ( findAllResolversFor ( repeatingRestRD, 'get' ) ).toEqual ( [
      {
        "isRoot": true,
        needsObjectInOutput: true,
        "name": "getRepeatingLine",
        "parent": "Query",
        "resolver": "getRepeatingLine",
        "sample": [],
        "samplerName": "sampleRepeatingWholeData"
      }
    ] )
  } )
  it ( "should make a resolver for repeating - create", () => {
    expect ( findAllResolversFor ( repeatingRestRD, 'create' ) ).toEqual ( [
      {
        "isRoot": true,
        needsObjectInOutput: true,
        "name": "createRepeatingLine",
        "parent": "Mutation",
        "resolver": "createRepeatingLine",
        "sample": [],
        "samplerName": "sampleRepeatingWholeData"
      }
    ] )
  } )

} )