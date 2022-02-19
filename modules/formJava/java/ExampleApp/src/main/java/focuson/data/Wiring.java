package focuson.data;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;
import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;
@Component
public class Wiring {
    @Autowired
    FFetcher fetchers;
    private GraphQL graphQL;
    @PostConstruct
    public void init() throws IOException {
        URL url = Resources.getResource("someSchema.graphql");
        String sdl = Resources.toString(url, Charsets.UTF_8);
        GraphQLSchema graphQLSchema = buildSchema(sdl);
        this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }
    private GraphQLSchema buildSchema(String sdl) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring();
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
    }
    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
          .type(newTypeWiring("Query").dataFetcher("getCreatePlanDD", fetchers.getCreatePlanDD()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreatePlanDD", fetchers.createCreatePlanDD()))
          .type(newTypeWiring("Mutation").dataFetcher("updateCreatePlanDD", fetchers.updateCreatePlanDD()))
          .type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlanDD", fetchers.deleteCreatePlanDD()))
          .type(newTypeWiring("Query").dataFetcher("listCreatePlanDD", fetchers.listCreatePlanDD()))
          .type(newTypeWiring("Query").dataFetcher("getEAccountsSummaryDD", fetchers.getEAccountsSummaryDD()))
          .type(newTypeWiring("OneLineStringDD").dataFetcher("getAccountSummaryDescription", fetchers.getAccountSummaryDescription()))
          .type(newTypeWiring("IntegerDD").dataFetcher("getTotalMonthlyCost", fetchers.getTotalMonthlyCost()))
          .type(newTypeWiring("IntegerDD").dataFetcher("getOneAccountBalance", fetchers.getOneAccountBalance()))
          .type(newTypeWiring("IntegerDD").dataFetcher("getCurrentAccountBalance", fetchers.getCurrentAccountBalance()))
          .build();
    }
    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
}