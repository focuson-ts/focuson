import { findResolvers, makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface", () => {
    expect ( makeJavaResolversInterface ( 'packName', 'intName', [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "package packName;",
      "",
      "import graphql.schema.DataFetcher;",
      "",
      "interface intName {",
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
    expect ( findResolvers ( [ eAccountsSummaryRestD, createPlanRestD ] ).map ( ( [ a, b ] ) => a.name + "/" + b ) ).toEqual ( [
      "EAccountsSummaryDD/getEAccountsSummaryDD",
      "CreatePlanDD/getCreatePlanDD",
      "CreatePlanDD/createCreatePlanDD",
      "CreatePlanDD/updateCreatePlanDD",
      "CreatePlanDD/deleteCreatePlanDD",
      "CreatePlanDD/listCreatePlanDD",
      "EAccountSummaryDD/getAccountSummaryDescription",
      "EAccountsSummaryDD/getTotalMonthlyCost",
      "EAccountsSummaryDD/getOneAccountBalance",
      "EAccountsSummaryDD/getCurrentAccountBalance"
    ] )
  } )
} )

describe ( "makeAllJavaWiring", () => {
  it ( "should make a java file which will power a graphql spring boot app", () => {
    expect ( makeAllJavaWiring ( { thePackage: 'somePackage', fetcherClass: 'someClass', schema: 'someSchema.graphql' }, [ eAccountsSummaryRestD, createPlanRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package somePackage;",
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
      "public class <class> {",
      "    @Autowired",
      "    someClass fetcher;",
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
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getEAccountsSummaryDD', fetchers.getEAccountsSummaryDD()))",
      "          .type(newTypeWiring('CreatePlanDD').dataFetcher('getCreatePlanDD', fetchers.getCreatePlanDD()))",
      "          .type(newTypeWiring('CreatePlanDD').dataFetcher('createCreatePlanDD', fetchers.createCreatePlanDD()))",
      "          .type(newTypeWiring('CreatePlanDD').dataFetcher('updateCreatePlanDD', fetchers.updateCreatePlanDD()))",
      "          .type(newTypeWiring('CreatePlanDD').dataFetcher('deleteCreatePlanDD', fetchers.deleteCreatePlanDD()))",
      "          .type(newTypeWiring('CreatePlanDD').dataFetcher('listCreatePlanDD', fetchers.listCreatePlanDD()))",
      "          .type(newTypeWiring('EAccountSummaryDD').dataFetcher('getAccountSummaryDescription', fetchers.getAccountSummaryDescription()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getTotalMonthlyCost', fetchers.getTotalMonthlyCost()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getOneAccountBalance', fetchers.getOneAccountBalance()))",
      "          .type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getCurrentAccountBalance', fetchers.getCurrentAccountBalance()))",
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