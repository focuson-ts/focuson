import { makeAllJavaWiring, makeJavaResolversInterface, makeJavaWiringForAllDataDs, makeJavaWiringForDataD, makeJavaWiringForQueryAndMutation, makeOneJavaWiringForQueryAndMutation } from "../codegen/makeJavaResolvers";
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

describe ( "makeOneJavaWiringForQueryAndMutation", () => {
  it ( "should make the java code for wiring", () => {
    expect ( makeOneJavaWiringForQueryAndMutation ( [ EAccountsSummaryDD, defaultRestAction.get ] ) ).toEqual ( '.type(newTypeWiring("Query").dataFetcher("getEAccountsSummaryDD", fetchers.getEAccountsSummaryDD()))' )
    expect ( makeOneJavaWiringForQueryAndMutation ( [ EAccountsSummaryDD, defaultRestAction.list ] ) ).toEqual ( '.type(newTypeWiring("Query").dataFetcher("listEAccountsSummaryDD", fetchers.listEAccountsSummaryDD()))' )
    expect ( makeOneJavaWiringForQueryAndMutation ( [ CreatePlanDD, defaultRestAction.delete ] ) ).toEqual ( '.type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlanDD", fetchers.deleteCreatePlanDD()))' )
  } )
} )
describe ( "makeJavaWiringForQueryAndMutation", () => {
  it ( "should make the java code for wiring", () => {
    expect ( makeJavaWiringForQueryAndMutation ( [ eAccountsSummaryRestD, createPlanRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      ".type(newTypeWiring('Query').dataFetcher('getEAccountsSummaryDD', fetchers.getEAccountsSummaryDD()))",
      ".type(newTypeWiring('Query').dataFetcher('getCreatePlanDD', fetchers.getCreatePlanDD()))",
      ".type(newTypeWiring('Mutation').dataFetcher('createCreatePlanDD', fetchers.createCreatePlanDD()))",
      ".type(newTypeWiring('Mutation').dataFetcher('updateCreatePlanDD', fetchers.updateCreatePlanDD()))",
      ".type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlanDD', fetchers.deleteCreatePlanDD()))",
      ".type(newTypeWiring('Query').dataFetcher('listCreatePlanDD', fetchers.listCreatePlanDD()))"
    ] )
  } )
} )
describe ( "makeJavaWiringForDataD", () => {
  it ( "should make a wiring if there is a resolver in the DataD", () => {
    expect ( makeJavaWiringForDataD ( 'name' ) ( EAccountsSummaryDD ) ).toEqual ( [] )
    expect ( makeJavaWiringForDataD ( 'name' ) ( EAccountsSummaryDD.structure.totalMonthlyCost.dataDD ) ).toEqual ( [
      ".type(newTypeWiring(\"name\").dataFetcher(\"getTotalMonthlyCost\", fetchers.getTotalMonthlyCost()))"
    ] )
  } )
} )
describe ( "makeJavaWiringForAllDataDs", () => {
  it ( "should make a wiring for all the resolvers in the DataDs", () => {
    expect ( makeJavaWiringForAllDataDs ( [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      ".type(newTypeWiring(\"eAccountsTable\").dataFetcher(\"accountId\", fetchers.accountId()))",
      ".type(newTypeWiring(\"eAccountsTable\").dataFetcher(\"displayType\", fetchers.displayType()))",
      ".type(newTypeWiring(\"eAccountsTable\").dataFetcher(\"description\", fetchers.description()))",
      ".type(newTypeWiring(\"eAccountsTable\").dataFetcher(\"virtualBankSeq\", fetchers.virtualBankSeq()))",
      ".type(newTypeWiring(\"eAccountsTable\").dataFetcher(\"total\", fetchers.total()))",
      ".type(newTypeWiring(\"eAccountsTable\").dataFetcher(\"frequency\", fetchers.frequency()))",
      ".type(newTypeWiring(\"createPlan\").dataFetcher(\"createPlanStart\", fetchers.createPlanStart()))",
      ".type(newTypeWiring(\"createPlan\").dataFetcher(\"createPlanDate\", fetchers.createPlanDate()))",
      ".type(newTypeWiring(\"createPlan\").dataFetcher(\"createPlanEnd\", fetchers.createPlanEnd()))"
    ])
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
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummaryDD', fetchers.getEAccountsSummaryDD()))",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlanDD', fetchers.getCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlanDD', fetchers.createCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateCreatePlanDD', fetchers.updateCreatePlanDD()))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlanDD', fetchers.deleteCreatePlanDD()))",
      "          .type(newTypeWiring('Query').dataFetcher('listCreatePlanDD', fetchers.listCreatePlanDD()))",
      "          .type(newTypeWiring('eAccountsTable').dataFetcher('accountId', fetchers.accountId()))",
      "          .type(newTypeWiring('eAccountsTable').dataFetcher('displayType', fetchers.displayType()))",
      "          .type(newTypeWiring('eAccountsTable').dataFetcher('description', fetchers.description()))",
      "          .type(newTypeWiring('eAccountsTable').dataFetcher('virtualBankSeq', fetchers.virtualBankSeq()))",
      "          .type(newTypeWiring('eAccountsTable').dataFetcher('total', fetchers.total()))",
      "          .type(newTypeWiring('eAccountsTable').dataFetcher('frequency', fetchers.frequency()))",
      "          .type(newTypeWiring('createPlan').dataFetcher('createPlanStart', fetchers.createPlanStart()))",
      "          .type(newTypeWiring('createPlan').dataFetcher('createPlanDate', fetchers.createPlanDate()))",
      "          .type(newTypeWiring('createPlan').dataFetcher('createPlanEnd', fetchers.createPlanEnd()))",
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