import { findAllResolvers, findChildResolvers, findQueryMutationResolvers, makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CombinedParams } from "../codegen/config";
import { repeatingRestRD } from "../example/repeating/repeating.restD";

export const paramsForTest: CombinedParams =  {
  pagesFile: 'pages',
  focusOnVersion: "someFocusOnVersion",
  commonParams: "CommonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  mockFetcherPackage: "mockfetchers",
  controllerPackage: "controllers",
  restsFile: "rests",
  pactsFile: "pact.spec",
  samplesFile: "samples",
  emptyFile: "empty",
  renderFile: "render",
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
  sqlDirectory: 'sql'
};

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface", () => {
    expect ( makeJavaResolversInterface ( paramsForTest, eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.fetchers;",
      "",
      "import graphql.schema.DataFetcher;",
      "",
      "public interface EAccountsSummaryFFetcher {",
      "   public DataFetcher getEAccountsSummary();",
      "   public DataFetcher getAccountSummaryDescription();",
      "   public DataFetcher getTotalMonthlyCost();",
      "   public DataFetcher getOneAccountBalance();",
      "   public DataFetcher getCurrentAccountBalance();",
      "}"
    ])
  } )

} )

describe ( "makeAllJavaWiring", () => {
  it ( "should make a java file which will power a graphql spring boot app", () => {
    expect ( makeAllJavaWiring ( paramsForTest, [ eAccountsSummaryRestD, createPlanRestD,repeatingRestRD ], { main: '.', backup: '.' } ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data;",
      "import com.google.common.base.Charsets;",
      "import com.google.common.io.Resources;",
      "import graphql.GraphQL;",
      "import graphql.schema.GraphQLSchema;",
      "import graphql.schema.idl.RuntimeWiring;",
      "import graphql.schema.idl.SchemaGenerator;",
      "import graphql.schema.idl.SchemaParser;",
      "import graphql.schema.idl.TypeDefinitionRegistry;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import org.springframework.context.annotation.Bean;",
      "import org.springframework.stereotype.Component;",
      "import javax.annotation.PostConstruct;",
      "import java.io.IOException;",
      "import java.net.URL;",
      "import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;",
      "import focuson.data.fetchers.EAccountsSummaryFFetcher;",
      "import focuson.data.fetchers.CreatePlanFFetcher;",
      "import focuson.data.fetchers.RepeatingWholeDataFFetcher;",
      "@Component",
      "public class Wiring {",
      "      @Autowired",
      "      EAccountsSummaryFFetcher _EAccountsSummaryFFetcher;",
      "      @Autowired",
      "      CreatePlanFFetcher _CreatePlanFFetcher;",
      "      @Autowired",
      "      RepeatingWholeDataFFetcher _RepeatingWholeDataFFetcher;",
      "    private GraphQL graphQL;",
      "    @PostConstruct",
      "    public void init() throws IOException {",
      "        URL url = Resources.getResource('someSchema.graphql');",
      "        String sdl = Resources.toString(url, Charsets.UTF_8);",
      "        GraphQLSchema graphQLSchema = buildSchema(sdl);",
      "        this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();",
      "    }",
      "    private GraphQLSchema buildSchema(String sdl) {",
      "        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);",
      "        RuntimeWiring runtimeWiring = buildWiring();",
      "        SchemaGenerator schemaGenerator = new SchemaGenerator();",
      "        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);",
      "    }",
      "    private RuntimeWiring buildWiring() {",
      "        return RuntimeWiring.newRuntimeWiring()",
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummary', _EAccountsSummaryFFetcher.getEAccountsSummary()))",
      "          .type(newTypeWiring('EAccountSummary').dataFetcher('description', _EAccountsSummaryFFetcher.getAccountSummaryDescription()))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('totalMonthlyCost', _EAccountsSummaryFFetcher.getTotalMonthlyCost()))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('oneAccountBalance', _EAccountsSummaryFFetcher.getOneAccountBalance()))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('currentAccountBalance', _EAccountsSummaryFFetcher.getCurrentAccountBalance()))",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlan', _CreatePlanFFetcher.getCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlan', _CreatePlanFFetcher.createCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateCreatePlan', _CreatePlanFFetcher.updateCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlan', _CreatePlanFFetcher.deleteCreatePlan()))",
      "          .type(newTypeWiring('Query').dataFetcher('listCreatePlan', _CreatePlanFFetcher.listCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createRepeatingLine', _RepeatingWholeDataFFetcher.createRepeatingLine()))",
      "          .type(newTypeWiring('Query').dataFetcher('getRepeatingLine', _RepeatingWholeDataFFetcher.getRepeatingLine()))",
      "          .build();",
      "    }",
      "    @Bean",
      "    public GraphQL graphQL() {",
      "        return graphQL;",
      "    }",
      "}"
    ])
  } )



} )

describe ( "findAllResolvers2", () => {
  it ( "findResolvers2", () => {
    expect ( findChildResolvers ( eAccountsSummaryRestD ) ).toEqual ( [
      { "isRoot": false, "name": "description", "parent": "EAccountSummary", "resolver": "getAccountSummaryDescription", "sample": [ "This account has a description", "This is a one line string", "another one line string" ], "samplerName": "sampleOneLineString" },
      { "isRoot": false, "name": "totalMonthlyCost", "parent": "EAccountsSummary", "resolver": "getTotalMonthlyCost", "sample": [ 1000 ], "samplerName": "sampleMoney" },
      { "isRoot": false, "name": "oneAccountBalance", "parent": "EAccountsSummary", "resolver": "getOneAccountBalance", "sample": [ 9921 ], "samplerName": "sampleMoney" },
      { "isRoot": false, "name": "currentAccountBalance", "parent": "EAccountsSummary", "resolver": "getCurrentAccountBalance", "sample": [ 12321 ], "samplerName": "sampleMoney" }
    ] )
  } )

  it ( "findQueryMutationResolvers2", () => {
    expect ( findQueryMutationResolvers ( eAccountsSummaryRestD ) ).toEqual ( [
      { "isRoot": true, "name": "getEAccountsSummary", "parent": "Query", "resolver": "getEAccountsSummary", "sample": [], "samplerName": "sampleEAccountsSummary" }
    ] )
    expect ( findQueryMutationResolvers ( createPlanRestD ) ).toEqual ( [
      { "isRoot": true, "name": "getCreatePlan", "parent": "Query", "resolver": "getCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "createCreatePlan", "parent": "Mutation", "resolver": "createCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "updateCreatePlan", "parent": "Mutation", "resolver": "updateCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "deleteCreatePlan", "parent": "Mutation", "resolver": "deleteCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "listCreatePlan", "parent": "Query", "resolver": "listCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    ] )
  } )

  it ( "findAllResolvers2", () => {
    expect ( findAllResolvers ( [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      { "isRoot": true, "name": "getEAccountsSummary", "parent": "Query", "resolver": "getEAccountsSummary", "sample": [], "samplerName": "sampleEAccountsSummary" },
      { "isRoot": true, "name": "getCreatePlan", "parent": "Query", "resolver": "getCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "createCreatePlan", "parent": "Mutation", "resolver": "createCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "updateCreatePlan", "parent": "Mutation", "resolver": "updateCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "deleteCreatePlan", "parent": "Mutation", "resolver": "deleteCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": true, "name": "listCreatePlan", "parent": "Query", "resolver": "listCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
      { "isRoot": false, "name": "description", "parent": "EAccountSummary", "resolver": "getAccountSummaryDescription", "sample": [ "This account has a description", "This is a one line string", "another one line string" ], "samplerName": "sampleOneLineString" },
      { "isRoot": false, "name": "totalMonthlyCost", "parent": "EAccountsSummary", "resolver": "getTotalMonthlyCost", "sample": [ 1000 ], "samplerName": "sampleMoney" },
      { "isRoot": false, "name": "oneAccountBalance", "parent": "EAccountsSummary", "resolver": "getOneAccountBalance", "sample": [ 9921 ], "samplerName": "sampleMoney" },
      { "isRoot": false, "name": "currentAccountBalance", "parent": "EAccountsSummary", "resolver": "getCurrentAccountBalance", "sample": [ 12321 ], "samplerName": "sampleMoney" }
    ] )
  } )

  it ("should make a resolver for repeating", () =>{
    expect (findAllResolvers([repeatingRestRD])).toEqual([
      {
        "isRoot": true,
        "name": "createRepeatingLine",
        "parent": "Mutation",
        "resolver": "createRepeatingLine",
        "sample": [],
        "samplerName": "sampleRepeatingWholeData"
      },
      {
        "isRoot": true,
        "name": "getRepeatingLine",
        "parent": "Query",
        "resolver": "getRepeatingLine",
        "sample": [],
        "samplerName": "sampleRepeatingWholeData"
      }
    ])
  })

} )