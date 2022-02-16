import { makeAllJavaWiring, makeJavaResolversInterface, makeJavaWiring, makeOneJavaWiring } from "../codegen/makeJavaResolvers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";
import { CreatePlanDD, EAccountsSummaryDD } from "../example/eAccountsSummary.dataD";
import { defaultRestAction } from "../common/restD";

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
      "}"
    ] )
  } )
} )

describe ( "makeOneJavaWiring", () => {
  it ( "should make the java code for wiring", () => {
    expect ( makeOneJavaWiring ( [ EAccountsSummaryDD, defaultRestAction.get ] ) ).toEqual ( '.type(newTypeWiring("EAccountsSummaryDD").dataFetcher("getEAccountsSummaryDD", fetchers.getEAccountsSummaryDD()))' )
    expect ( makeOneJavaWiring ( [ EAccountsSummaryDD, defaultRestAction.list ] ) ).toEqual ( '.type(newTypeWiring("EAccountsSummaryDD").dataFetcher("listEAccountsSummaryDD", fetchers.listEAccountsSummaryDD()))' )
    expect ( makeOneJavaWiring ( [ CreatePlanDD, defaultRestAction.delete ] ) ).toEqual ( '.type(newTypeWiring("CreatePlanDD").dataFetcher("deleteCreatePlanDD", fetchers.deleteCreatePlanDD()))' )
  } )
} )
describe ( "makeJavaWiring", () => {
  it ( "should make the java code for wiring", () => {
    expect ( makeJavaWiring ( [ eAccountsSummaryRestD, createPlanRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      ".type(newTypeWiring('EAccountsSummaryDD').dataFetcher('getEAccountsSummaryDD', fetchers.getEAccountsSummaryDD()))",
      ".type(newTypeWiring('CreatePlanDD').dataFetcher('getCreatePlanDD', fetchers.getCreatePlanDD()))",
      ".type(newTypeWiring('CreatePlanDD').dataFetcher('createCreatePlanDD', fetchers.createCreatePlanDD()))",
      ".type(newTypeWiring('CreatePlanDD').dataFetcher('updateCreatePlanDD', fetchers.updateCreatePlanDD()))",
      ".type(newTypeWiring('CreatePlanDD').dataFetcher('deleteCreatePlanDD', fetchers.deleteCreatePlanDD()))",
      ".type(newTypeWiring('CreatePlanDD').dataFetcher('listCreatePlanDD', fetchers.listCreatePlanDD()))"
    ] )
  } )
} )
describe ( "makeAllJavaWiring", () => {
  it ( "should make a java file which will power a graphql spring boot app", () => {
    expect ( makeAllJavaWiring ( { thePackage: 'somePackage', fetcherClass: 'someClass' }, [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ([
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
      "        URL url = Resources.getResource(<schema>);",
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
      ".type(newTypeWiring(\"EAccountsSummaryDD\").dataFetcher(\"getEAccountsSummaryDD\", fetchers.getEAccountsSummaryDD()))",
      ".type(newTypeWiring(\"CreatePlanDD\").dataFetcher(\"getCreatePlanDD\", fetchers.getCreatePlanDD()))",
      ".type(newTypeWiring(\"CreatePlanDD\").dataFetcher(\"createCreatePlanDD\", fetchers.createCreatePlanDD()))",
      ".type(newTypeWiring(\"CreatePlanDD\").dataFetcher(\"updateCreatePlanDD\", fetchers.updateCreatePlanDD()))",
      ".type(newTypeWiring(\"CreatePlanDD\").dataFetcher(\"deleteCreatePlanDD\", fetchers.deleteCreatePlanDD()))",
      ".type(newTypeWiring(\"CreatePlanDD\").dataFetcher(\"listCreatePlanDD\", fetchers.listCreatePlanDD()))",
      "                .build();",
      "    }",
      "    @Bean",
      "    public GraphQL graphQL() {",
      "        return graphQL;",
      "    }",
      "}"
    ] )
  } )

} )