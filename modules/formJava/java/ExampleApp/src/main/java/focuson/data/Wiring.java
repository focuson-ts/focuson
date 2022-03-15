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
import focuson.data.fetchers.OccupationAndIncomeDetailsFFetcher;
import focuson.data.fetchers.OtherIncomeResponseFFetcher;
import focuson.data.fetchers.CreatePlanFFetcher;
import focuson.data.fetchers.EAccountsSummaryFFetcher;
import focuson.data.fetchers.ETransferDataDFFetcher;
import focuson.data.fetchers.CreateEAccountDataFFetcher;
import focuson.data.fetchers.ChequeCreditbooksFFetcher;
import focuson.data.fetchers.RepeatingWholeDataFFetcher;
import focuson.data.fetchers.PostCodeMainPageFFetcher;
import focuson.data.fetchers.PostCodeDataFFetcher;
@Component
public class Wiring {
      @Autowired
      OccupationAndIncomeDetailsFFetcher _OccupationAndIncomeDetailsFFetcher;
      @Autowired
      OtherIncomeResponseFFetcher _OtherIncomeResponseFFetcher;
      @Autowired
      CreatePlanFFetcher _CreatePlanFFetcher;
      @Autowired
      EAccountsSummaryFFetcher _EAccountsSummaryFFetcher;
      @Autowired
      ETransferDataDFFetcher _ETransferDataDFFetcher;
      @Autowired
      CreateEAccountDataFFetcher _CreateEAccountDataFFetcher;
      @Autowired
      ChequeCreditbooksFFetcher _ChequeCreditbooksFFetcher;
      @Autowired
      RepeatingWholeDataFFetcher _RepeatingWholeDataFFetcher;
      @Autowired
      PostCodeMainPageFFetcher _PostCodeMainPageFFetcher;
      @Autowired
      PostCodeDataFFetcher _PostCodeDataFFetcher;
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
          .type(newTypeWiring("Query").dataFetcher("getOccupationAndIncomeDetails", _OccupationAndIncomeDetailsFFetcher.getOccupationAndIncomeDetails()))
          .type(newTypeWiring("Mutation").dataFetcher("updateOccupationAndIncomeDetails", _OccupationAndIncomeDetailsFFetcher.updateOccupationAndIncomeDetails()))
          .type(newTypeWiring("Query").dataFetcher("getOtherIncomeResponse", _OtherIncomeResponseFFetcher.getOtherIncomeResponse()))
          .type(newTypeWiring("Query").dataFetcher("getCreatePlan", _CreatePlanFFetcher.getCreatePlan()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreatePlan", _CreatePlanFFetcher.createCreatePlan()))
          .type(newTypeWiring("Mutation").dataFetcher("updateCreatePlan", _CreatePlanFFetcher.updateCreatePlan()))
          .type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlan", _CreatePlanFFetcher.deleteCreatePlan()))
          .type(newTypeWiring("Query").dataFetcher("listCreatePlan", _CreatePlanFFetcher.listCreatePlan()))
          .type(newTypeWiring("Query").dataFetcher("getEAccountsSummary", _EAccountsSummaryFFetcher.getEAccountsSummary()))
          .type(newTypeWiring("EAccountSummary").dataFetcher("description", _EAccountsSummaryFFetcher.getAccountSummaryDescription()))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("totalMonthlyCost", _EAccountsSummaryFFetcher.getTotalMonthlyCost()))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("oneAccountBalance", _EAccountsSummaryFFetcher.getOneAccountBalance()))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("currentAccountBalance", _EAccountsSummaryFFetcher.getCurrentAccountBalance()))
          .type(newTypeWiring("Mutation").dataFetcher("createETransferDataD", _ETransferDataDFFetcher.createETransferDataD()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreateEAccountData", _CreateEAccountDataFFetcher.createCreateEAccountData()))
          .type(newTypeWiring("Query").dataFetcher("getCreateEAccountData", _CreateEAccountDataFFetcher.getCreateEAccountData()))
          .type(newTypeWiring("Query").dataFetcher("getChequeCreditbooks", _ChequeCreditbooksFFetcher.getChequeCreditbooks()))
          .type(newTypeWiring("Mutation").dataFetcher("createChequeCreditbooks", _ChequeCreditbooksFFetcher.createChequeCreditbooks()))
          .type(newTypeWiring("Mutation").dataFetcher("createRepeatingLine", _RepeatingWholeDataFFetcher.createRepeatingLine()))
          .type(newTypeWiring("Query").dataFetcher("getRepeatingLine", _RepeatingWholeDataFFetcher.getRepeatingLine()))
          .type(newTypeWiring("Mutation").dataFetcher("createPostCodeMainPage", _PostCodeMainPageFFetcher.createPostCodeMainPage()))
          .type(newTypeWiring("Query").dataFetcher("getPostCodeDataLine", _PostCodeDataFFetcher.getPostCodeDataLine()))
          .build();
    }
    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
}