import { findAllResolvers2, findChildResolvers2, findQueryMutationResolvers2, makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CombinedParams } from "../codegen/config";

export const paramsForTest: CombinedParams = {
  focusOnVersion: "^0.4.5",
  commonParams: "commonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  pactsFile: "pact",
  samplesFile: "samples",
  renderFile: "render",
  urlparams: 'commonIds',
  sampleClass: "sample",
  applicationName: "SomeApp",
  fetcherInterface: "intName",
  schema: "someSchema.graphql",
  queriesClass: "Queries",
  thePackage: "packName",
  pagesFile: 'pages',
  wiringClass: "someClass",
  fetcherClass: "fetcherClass"
}
describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface", () => {
    expect ( makeJavaResolversInterface ( paramsForTest, [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "package packName;",
      "",
      "import graphql.schema.DataFetcher;",
      "",
      "public interface intName {",
      "   public DataFetcher getEAccountsSummaryDD();",
      "   public DataFetcher getCreatePlanDD();",
      "   public DataFetcher createCreatePlanDD();",
      "   public DataFetcher updateCreatePlanDD();",
      "   public DataFetcher deleteCreatePlanDD();",
      "   public DataFetcher listCreatePlanDD();",
      "   public DataFetcher getAccountSummaryDescription();",
      "   public DataFetcher getTotalMonthlyCost();",
      "   public DataFetcher getOneAccountBalance();",
      "   public DataFetcher getCurrentAccountBalance();",
      "}"
    ] )
  } )
} )

//
// describe ( "findResolvers", () => {
//   it ( "should find the query/mutation and the specifics", () => {
//     expect ( findResolvers ( [ eAccountsSummaryRestD, createPlanRestD ] ).//
//       map ( ( [ p, output, a, b ] ) => `${p?.name}/${output.name}/${a.name}/${b}` ) ).toEqual ( [
//       "undefined/get/EAccountsSummaryDD/EAccountsSummaryDD",
//       "undefined/get/CreatePlanDD/CreatePlanDD",
//       "undefined/create/CreatePlanDD/CreatePlanDD",
//       "undefined/update/CreatePlanDD/CreatePlanDD",
//       "undefined/delete/CreatePlanDD/CreatePlanDD",
//       "undefined/list/CreatePlanDD/CreatePlanDD",
//       "EAccountSummaryDD/getString/OneLineStringDD/description",
//       "EAccountsSummaryDD/getString/IntegerDD/totalMonthlyCost",
//       "EAccountsSummaryDD/getString/IntegerDD/oneAccountBalance",
//       "EAccountsSummaryDD/getString/IntegerDD/currentAccountBalance"
//     ] )
//   } )
// } )

describe ( "makeAllJavaWiring", () => {
  it ( "should make a java file which will power a graphql spring boot app", () => {
    expect ( makeAllJavaWiring ( paramsForTest, [ eAccountsSummaryRestD, createPlanRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package packName;",
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
      "@Component",
      "public class someClass {",
      "    @Autowired",
      "    intName fetchers;",
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
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummaryDD', fetchers.getEAccountsSummaryDD()))",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlanDD', fetchers.getCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlanDD', fetchers.createCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateCreatePlanDD', fetchers.updateCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlanDD', fetchers.deleteCreatePlanDD()))",
      "          .type(newTypeWiring('Query').dataFetcher('listCreatePlanDD', fetchers.listCreatePlanDD()))",
      "          .type(newTypeWiring('EAccountSummaryDD').dataFetcher('description', fetchers.getAccountSummaryDescription()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('totalMonthlyCost', fetchers.getTotalMonthlyCost()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('oneAccountBalance', fetchers.getOneAccountBalance()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('currentAccountBalance', fetchers.getCurrentAccountBalance()))",
      "          .build();",
      "    }",
      "    @Bean",
      "    public GraphQL graphQL() {",
      "        return graphQL;",
      "    }",
      "}"
    ] )
  } )

} )

describe ( "findAllResolvers2", () => {
  it ( "findResolvers2", () => {
    expect ( findChildResolvers2 ( [ eAccountsSummaryRestD ] ) ).toEqual ( [
      { "isRoot": false, "name": "description", "parent": "EAccountSummaryDD", "resolver": "getAccountSummaryDescription", "sample": [ "This account has a description", "This is a one line string", "another one line string" ], "samplerName": "sampleOneLineStringDD" },
      { "isRoot": false, "name": "totalMonthlyCost", "parent": "EAccountsSummaryDD", "resolver": "getTotalMonthlyCost", "sample": [ "1000" ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "oneAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getOneAccountBalance", "sample": [ "9921" ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "currentAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getCurrentAccountBalance", "sample": [ "12321" ], "samplerName": "sampleIntegerDD" }
    ] )
  } )

  it ( "findQueryMutationResolvers2", () => {
    expect ( findQueryMutationResolvers2 ( eAccountsSummaryRestD ) ).toEqual ( [
      { "isRoot": true, "name": "getEAccountsSummaryDD", "parent": "Query", "resolver": "getEAccountsSummaryDD", "sample": [], "samplerName": "sampleEAccountsSummaryDD" }
    ] )
    expect ( findQueryMutationResolvers2 ( createPlanRestD ) ).toEqual ( [
      { "isRoot": true, "name": "getCreatePlanDD", "parent": "Query", "resolver": "getCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "createCreatePlanDD", "parent": "Mutation", "resolver": "createCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "updateCreatePlanDD", "parent": "Mutation", "resolver": "updateCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "deleteCreatePlanDD", "parent": "Mutation", "resolver": "deleteCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "listCreatePlanDD", "parent": "Query", "resolver": "listCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
    ] )
  } )

  it ( "findAllResolvers2", () => {
    expect ( findAllResolvers2 ( [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      { "isRoot": true, "name": "getEAccountsSummaryDD", "parent": "Query", "resolver": "getEAccountsSummaryDD", "sample": [], "samplerName": "sampleEAccountsSummaryDD" },
      { "isRoot": true, "name": "getCreatePlanDD", "parent": "Query", "resolver": "getCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "createCreatePlanDD", "parent": "Mutation", "resolver": "createCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "updateCreatePlanDD", "parent": "Mutation", "resolver": "updateCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "deleteCreatePlanDD", "parent": "Mutation", "resolver": "deleteCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": true, "name": "listCreatePlanDD", "parent": "Query", "resolver": "listCreatePlanDD", "sample": [], "samplerName": "sampleCreatePlanDD" },
      { "isRoot": false, "name": "description", "parent": "EAccountSummaryDD", "resolver": "getAccountSummaryDescription", "sample": [ "This account has a description", "This is a one line string", "another one line string" ], "samplerName": "sampleOneLineStringDD" },
      { "isRoot": false, "name": "totalMonthlyCost", "parent": "EAccountsSummaryDD", "resolver": "getTotalMonthlyCost", "sample": [ "1000" ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "oneAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getOneAccountBalance", "sample": [ "9921" ], "samplerName": "sampleIntegerDD" },
      { "isRoot": false, "name": "currentAccountBalance", "parent": "EAccountsSummaryDD", "resolver": "getCurrentAccountBalance", "sample": [ "12321" ], "samplerName": "sampleIntegerDD" }
    ] )
  } )

} )