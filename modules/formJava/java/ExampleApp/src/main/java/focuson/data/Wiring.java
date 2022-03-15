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
import focuson.data.fetchers.OccupationAndIncomeDetailsDDFFetcher;
import focuson.data.fetchers.OtherIncomeResponseDDFFetcher;
import focuson.data.fetchers.CreatePlanDDFFetcher;
import focuson.data.fetchers.EAccountsSummaryDDFFetcher;
import focuson.data.fetchers.ETransferDataDFFetcher;
import focuson.data.fetchers.CreateEAccountDataDDFFetcher;
import focuson.data.fetchers.ChequeCreditbooksDDFFetcher;
import focuson.data.fetchers.RepeatingWholeDataFFetcher;
import focuson.data.fetchers.PostCodeMainPageFFetcher;
import focuson.data.fetchers.PostCodeDataFFetcher;
@Component
public class Wiring {
      @Autowired
      OccupationAndIncomeDetailsDDFFetcher _OccupationAndIncomeDetailsDDFFetcher;
      @Autowired
      OtherIncomeResponseDDFFetcher _OtherIncomeResponseDDFFetcher;
      @Autowired
      CreatePlanDDFFetcher _CreatePlanDDFFetcher;
      @Autowired
      EAccountsSummaryDDFFetcher _EAccountsSummaryDDFFetcher;
      @Autowired
      ETransferDataDFFetcher _ETransferDataDFFetcher;
      @Autowired
      CreateEAccountDataDDFFetcher _CreateEAccountDataDDFFetcher;
      @Autowired
      ChequeCreditbooksDDFFetcher _ChequeCreditbooksDDFFetcher;
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
          .type(newTypeWiring("Query").dataFetcher("getOccupationAndIncomeDetailsDD", _OccupationAndIncomeDetailsDDFFetcher.getOccupationAndIncomeDetailsDD()))
          .type(newTypeWiring("Mutation").dataFetcher("updateOccupationAndIncomeDetailsDD", _OccupationAndIncomeDetailsDDFFetcher.updateOccupationAndIncomeDetailsDD()))
          .type(newTypeWiring("Query").dataFetcher("getOtherIncomeResponseDD", _OtherIncomeResponseDDFFetcher.getOtherIncomeResponseDD()))
          .type(newTypeWiring("Query").dataFetcher("getCreatePlanDD", _CreatePlanDDFFetcher.getCreatePlanDD()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreatePlanDD", _CreatePlanDDFFetcher.createCreatePlanDD()))
          .type(newTypeWiring("Mutation").dataFetcher("updateCreatePlanDD", _CreatePlanDDFFetcher.updateCreatePlanDD()))
          .type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlanDD", _CreatePlanDDFFetcher.deleteCreatePlanDD()))
          .type(newTypeWiring("Query").dataFetcher("listCreatePlanDD", _CreatePlanDDFFetcher.listCreatePlanDD()))
          .type(newTypeWiring("Query").dataFetcher("getEAccountsSummaryDD", _EAccountsSummaryDDFFetcher.getEAccountsSummaryDD()))
          .type(newTypeWiring("EAccountSummaryDD").dataFetcher("description", _EAccountsSummaryDDFFetcher.getAccountSummaryDescription()))
          .type(newTypeWiring("EAccountsSummaryDD").dataFetcher("totalMonthlyCost", _EAccountsSummaryDDFFetcher.getTotalMonthlyCost()))
          .type(newTypeWiring("EAccountsSummaryDD").dataFetcher("oneAccountBalance", _EAccountsSummaryDDFFetcher.getOneAccountBalance()))
          .type(newTypeWiring("EAccountsSummaryDD").dataFetcher("currentAccountBalance", _EAccountsSummaryDDFFetcher.getCurrentAccountBalance()))
          .type(newTypeWiring("Mutation").dataFetcher("createETransferDataD", _ETransferDataDFFetcher.createETransferDataD()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreateEAccountDataDD", _CreateEAccountDataDDFFetcher.createCreateEAccountDataDD()))
          .type(newTypeWiring("Query").dataFetcher("getCreateEAccountDataDD", _CreateEAccountDataDDFFetcher.getCreateEAccountDataDD()))
          .type(newTypeWiring("Query").dataFetcher("getChequeCreditbooksDD", _ChequeCreditbooksDDFFetcher.getChequeCreditbooksDD()))
          .type(newTypeWiring("Mutation").dataFetcher("createChequeCreditbooksDD", _ChequeCreditbooksDDFFetcher.createChequeCreditbooksDD()))
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