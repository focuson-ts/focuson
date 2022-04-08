import { findAllResolvers, findChildResolvers, findQueryMutationResolvers, makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CombinedParams } from "../codegen/config";
import { repeatingRestRD } from "../example/repeating/repeating.restD";

export const paramsForTest: CombinedParams =  {
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
  dbPackage: 'db'
};

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface", () => {
    expect ( makeJavaResolversInterface ( paramsForTest, eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.fetchers;",
      "",
      "import graphql.schema.DataFetcher;",
      "",
      "public interface EAccountsSummaryFFetcher extends IFetcher{",
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
      "import graphql.schema.DataFetcher;",
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
      "import java.util.Collections;",
      "import java.util.HashMap;",
      "import java.util.List;",
      "import java.util.Map;",
      "import focuson.data.fetchers.IFetcher;",
      "import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;",
      "import focuson.data.fetchers.EAccountsSummaryFFetcher;",
      "import focuson.data.fetchers.CreatePlanFFetcher;",
      "import focuson.data.fetchers.RepeatingWholeDataFFetcher;",
      "@Component",
      "public class Wiring  implements IManyGraphQl{",
      "      @Autowired",
      "      List<EAccountsSummaryFFetcher> _EAccountsSummaryFFetcher;",
      "      @Autowired",
      "      List<CreatePlanFFetcher> _CreatePlanFFetcher;",
      "      @Autowired",
      "      List<RepeatingWholeDataFFetcher> _RepeatingWholeDataFFetcher;",
      "   private String sdl;",
      "   private Map<String, GraphQL> cache = Collections.synchronizedMap(new HashMap<>()); //sucks and need to improve",
      "   @PostConstruct",
      "    public void init() throws IOException {",
      "       URL url = Resources.getResource('someSchema.graphql');",
      "       sdl = Resources.toString(url, Charsets.UTF_8);",
      "    }",
      "   @Override",
      "   public GraphQL get(String dbName) {",
      "        if (!cache.containsKey(dbName)) {",
      "        GraphQLSchema graphQLSchema = buildSchema(dbName);",
      "        cache.put(dbName, GraphQL.newGraphQL(graphQLSchema).build());",
      "        }",
      "        return cache.get(dbName);",
      "    }",
      "   private GraphQLSchema buildSchema(String dbName) {",
      "        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);",
      "        RuntimeWiring runtimeWiring = buildWiring(dbName);",
      "        SchemaGenerator schemaGenerator = new SchemaGenerator();",
      "        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);",
      "   }",
      "   public <T extends IFetcher> T find(List<T> list, String dbName) {",
      "        return list.stream().filter(f -> f.dbName() == dbName).findFirst().get();",
      "   }",
      "   private RuntimeWiring buildWiring(String dbName) {",
      "       return RuntimeWiring.newRuntimeWiring()",
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummary', find(_EAccountsSummaryFFetcher, dbName).getEAccountsSummary()))",
      "          .type(newTypeWiring('EAccountSummary').dataFetcher('description', find(_EAccountsSummaryFFetcher, dbName).getAccountSummaryDescription()))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('totalMonthlyCost', find(_EAccountsSummaryFFetcher, dbName).getTotalMonthlyCost()))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('oneAccountBalance', find(_EAccountsSummaryFFetcher, dbName).getOneAccountBalance()))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('currentAccountBalance', find(_EAccountsSummaryFFetcher, dbName).getCurrentAccountBalance()))",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlan', find(_CreatePlanFFetcher, dbName).getCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlan', find(_CreatePlanFFetcher, dbName).createCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateCreatePlan', find(_CreatePlanFFetcher, dbName).updateCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlan', find(_CreatePlanFFetcher, dbName).deleteCreatePlan()))",
      "          .type(newTypeWiring('Query').dataFetcher('listCreatePlan', find(_CreatePlanFFetcher, dbName).listCreatePlan()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createRepeatingLine', find(_RepeatingWholeDataFFetcher, dbName).createRepeatingLine()))",
      "          .type(newTypeWiring('Query').dataFetcher('getRepeatingLine', find(_RepeatingWholeDataFFetcher, dbName).getRepeatingLine()))",
      "       .build();",
      "    }",
      "    @Bean",
      "    public GraphQL graphQL() {",
      "        return get(IFetcher.mock);",
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