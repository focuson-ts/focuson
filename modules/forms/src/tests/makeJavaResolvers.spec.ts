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
  sampleClass: 'Sample'
};

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface", () => {
    expect ( makeJavaResolversInterface ( paramsForTest, eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.fetchers;",
      "",
      "import graphql.schema.DataFetcher;",
      "",
      "public interface EAccountsSummaryDDFFetcher {",
      "   public DataFetcher getEAccountsSummaryDD();",
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
      "import focuson.data.fetchers.EAccountsSummaryDDFFetcher;",
      "import focuson.data.fetchers.CreatePlanDDFFetcher;",
      "import focuson.data.fetchers.RepeatingWholeDataFFetcher;",
      "@Component",
      "public class Wiring {",
      "      @Autowired",
      "      EAccountsSummaryDDFFetcher _EAccountsSummaryDDFFetcher;",
      "      @Autowired",
      "      CreatePlanDDFFetcher _CreatePlanDDFFetcher;",
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
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummaryDD', _EAccountsSummaryDDFFetcher.getEAccountsSummaryDD()))",
      "          .type(newTypeWiring('EAccountSummaryDD').dataFetcher('description', _EAccountsSummaryDDFFetcher.getAccountSummaryDescription()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('totalMonthlyCost', _EAccountsSummaryDDFFetcher.getTotalMonthlyCost()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('oneAccountBalance', _EAccountsSummaryDDFFetcher.getOneAccountBalance()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('currentAccountBalance', _EAccountsSummaryDDFFetcher.getCurrentAccountBalance()))",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlanDD', _CreatePlanDDFFetcher.getCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlanDD', _CreatePlanDDFFetcher.createCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateCreatePlanDD', _CreatePlanDDFFetcher.updateCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlanDD', _CreatePlanDDFFetcher.deleteCreatePlanDD()))",
      "          .type(newTypeWiring('Query').dataFetcher('listCreatePlanDD', _CreatePlanDDFFetcher.listCreatePlanDD()))",
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
      { "isRoot": false, "name": "description", "parent": "EAccountSummaryDD", "resolver": "getAccountSummaryDescription", "sample": [ "This account has a description", "This is a one line string", "another one line string" ], "samplerName": "sampleOneLineStringDD" },
      { "isRoot": false, "name": "totalMonthlyCost", "parent": "EAccountsSummaryDD", "resolver": "getTotalMonthlyCost", "sample": [ 1000 ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "oneAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getOneAccountBalance", "sample": [ 9921 ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "currentAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getCurrentAccountBalance", "sample": [ 12321 ], "samplerName": "sampleIntegerDD" }
    ] )
  } )

  it ( "findQueryMutationResolvers2", () => {
    expect ( findQueryMutationResolvers ( eAccountsSummaryRestD ) ).toEqual ( [
      { "isRoot": true, "name": "getEAccountsSummaryDD", "parent": "Query", "resolver": "getEAccountsSummaryDD", "sample": [], "samplerName": "sampleEAccountsSummaryDD" }
    ] )
    expect ( findQueryMutationResolvers ( createPlanRestD ) ).toEqual ( [
      { "isRoot": true, "name": "getCreatePlanDD", "parent": "Query", "resolver": "getCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "createCreatePlanDD", "parent": "Mutation", "resolver": "createCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "updateCreatePlanDD", "parent": "Mutation", "resolver": "updateCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "deleteCreatePlanDD", "parent": "Mutation", "resolver": "deleteCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "listCreatePlanDD", "parent": "Query", "resolver": "listCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
    ] )
  } )

  it ( "findAllResolvers2", () => {
    expect ( findAllResolvers ( [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      { "isRoot": true, "name": "getEAccountsSummaryDD", "parent": "Query", "resolver": "getEAccountsSummaryDD", "sample": [], "samplerName": "sampleEAccountsSummaryDD" },
      { "isRoot": true, "name": "getCreatePlanDD", "parent": "Query", "resolver": "getCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "createCreatePlanDD", "parent": "Mutation", "resolver": "createCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "updateCreatePlanDD", "parent": "Mutation", "resolver": "updateCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "deleteCreatePlanDD", "parent": "Mutation", "resolver": "deleteCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "listCreatePlanDD", "parent": "Query", "resolver": "listCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": false, "name": "description", "parent": "EAccountSummaryDD", "resolver": "getAccountSummaryDescription", "sample": [ "This account has a description", "This is a one line string", "another one line string" ], "samplerName": "sampleOneLineStringDD" },
      { "isRoot": false, "name": "totalMonthlyCost", "parent": "EAccountsSummaryDD", "resolver": "getTotalMonthlyCost", "sample": [ 1000 ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "oneAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getOneAccountBalance", "sample": [ 9921 ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "currentAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getCurrentAccountBalance", "sample": [ 12321 ], "samplerName": "sampleIntegerDD" }
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