import { findResolvers, makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CombinedParams, JavaWiringParams } from "../codegen/config";

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


describe ( "findResolvers", () => {
  it ( "should find the query/mutation and the specifics", () => {
    expect ( findResolvers ( [ eAccountsSummaryRestD, createPlanRestD ] ).//
      map ( ( [ p, output, a, b ] ) => `${p?.name}/${output.name}/${a.name}/${b}` ) ).toEqual ( [
      "undefined/get/EAccountsSummaryDD/getEAccountsSummaryDD",
      "undefined/get/CreatePlanDD/getCreatePlanDD",
      "undefined/create/CreatePlanDD/createCreatePlanDD",
      "undefined/update/CreatePlanDD/updateCreatePlanDD",
      "undefined/delete/CreatePlanDD/deleteCreatePlanDD",
      "undefined/list/CreatePlanDD/listCreatePlanDD",
      "EAccountSummaryDD/getString/OneLineStringDD/getAccountSummaryDescription",
      "EAccountsSummaryDD/getString/IntegerDD/getTotalMonthlyCost",
      "EAccountsSummaryDD/getString/IntegerDD/getOneAccountBalance",
      "EAccountsSummaryDD/getString/IntegerDD/getCurrentAccountBalance"
    ] )
  } )
} )

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
      "          .type(newTypeWiring('EAccountSummaryDD').dataFetcher('getAccountSummaryDescription', fetchers.getAccountSummaryDescription()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getTotalMonthlyCost', fetchers.getTotalMonthlyCost()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('sdf', fetchers.getOneAccountBalance()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getCurrentAccountBalance', fetchers.getCurrentAccountBalance()))",
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