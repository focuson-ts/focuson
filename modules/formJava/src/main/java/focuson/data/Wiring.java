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
import focuson.data.fetchers.HelloWorldDomainDataFFetcher;
import focuson.data.fetchers.AccountAllFlagsFFetcher;
import focuson.data.fetchers.ArrearsDetailsFFetcher;
import focuson.data.fetchers.previous_ArrearsDetailsFFetcher;
import focuson.data.fetchers.AccountOverviewHistoryFFetcher;
import focuson.data.fetchers.AccountOverviewExcessInfoFFetcher;
import focuson.data.fetchers.AccountOverviewFFetcher;
import focuson.data.fetchers.AccountOverviewReasonFFetcher;
import focuson.data.fetchers.JointAccountFFetcher;
import focuson.data.fetchers.AdditionalInfoFirstFFetcher;
import focuson.data.fetchers.AdditionalInfoSecondFFetcher;
import focuson.data.fetchers.OccupationAndIncomeFullDomainFFetcher;
import focuson.data.fetchers.ListOccupationsFFetcher;
import focuson.data.fetchers.OtherIncomeResponseFFetcher;
import focuson.data.fetchers.CreatePlanFFetcher;
import focuson.data.fetchers.EAccountsSummaryFFetcher;
import focuson.data.fetchers.ETransferDataDFFetcher;
import focuson.data.fetchers.CreateEAccountDataFFetcher;
import focuson.data.fetchers.ChequeCreditbooksFFetcher;
import focuson.data.fetchers.RepeatingWholeDataFFetcher;
import focuson.data.fetchers.PostCodeNameAndAddressFFetcher;
import focuson.data.fetchers.PostCodeDataFFetcher;
@Component
public class Wiring {
      @Autowired
      HelloWorldDomainDataFFetcher _HelloWorldDomainDataFFetcher;
      @Autowired
      AccountAllFlagsFFetcher _AccountAllFlagsFFetcher;
      @Autowired
      ArrearsDetailsFFetcher _ArrearsDetailsFFetcher;
      @Autowired
      previous_ArrearsDetailsFFetcher _previous_ArrearsDetailsFFetcher;
      @Autowired
      AccountOverviewHistoryFFetcher _AccountOverviewHistoryFFetcher;
      @Autowired
      AccountOverviewExcessInfoFFetcher _AccountOverviewExcessInfoFFetcher;
      @Autowired
      AccountOverviewFFetcher _AccountOverviewFFetcher;
      @Autowired
      AccountOverviewReasonFFetcher _AccountOverviewReasonFFetcher;
      @Autowired
      JointAccountFFetcher _JointAccountFFetcher;
      @Autowired
      AdditionalInfoFirstFFetcher _AdditionalInfoFirstFFetcher;
      @Autowired
      AdditionalInfoSecondFFetcher _AdditionalInfoSecondFFetcher;
      @Autowired
      OccupationAndIncomeFullDomainFFetcher _OccupationAndIncomeFullDomainFFetcher;
      @Autowired
      ListOccupationsFFetcher _ListOccupationsFFetcher;
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
      PostCodeNameAndAddressFFetcher _PostCodeNameAndAddressFFetcher;
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
          .type(newTypeWiring("Query").dataFetcher("getHelloWorldDomainData", _HelloWorldDomainDataFFetcher.getHelloWorldDomainData()))
          .type(newTypeWiring("Query").dataFetcher("getAccountAllFlags", _AccountAllFlagsFFetcher.getAccountAllFlags()))
          .type(newTypeWiring("Query").dataFetcher("getArrearsDetails", _ArrearsDetailsFFetcher.getArrearsDetails()))
          .type(newTypeWiring("Query").dataFetcher("getArrearsDetails", _previous_ArrearsDetailsFFetcher.getArrearsDetails()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewHistory", _AccountOverviewHistoryFFetcher.getAccountOverviewHistory()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewExcessInfo", _AccountOverviewExcessInfoFFetcher.getAccountOverviewExcessInfo()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverview", _AccountOverviewFFetcher.getAccountOverview()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewReason", _AccountOverviewReasonFFetcher.getAccountOverviewReason()))
          .type(newTypeWiring("Query").dataFetcher("getJointAccount", _JointAccountFFetcher.getJointAccount()))
          .type(newTypeWiring("Query").dataFetcher("getAdditionalInfoFirst", _AdditionalInfoFirstFFetcher.getAdditionalInfoFirst()))
          .type(newTypeWiring("Mutation").dataFetcher("updateAdditionalInfoFirst", _AdditionalInfoFirstFFetcher.updateAdditionalInfoFirst()))
          .type(newTypeWiring("Query").dataFetcher("getAdditionalInfoSecond", _AdditionalInfoSecondFFetcher.getAdditionalInfoSecond()))
          .type(newTypeWiring("Mutation").dataFetcher("updateAdditionalInfoSecond", _AdditionalInfoSecondFFetcher.updateAdditionalInfoSecond()))
          .type(newTypeWiring("Query").dataFetcher("getOccupationAndIncomeFullDomain", _OccupationAndIncomeFullDomainFFetcher.getOccupationAndIncomeFullDomain()))
          .type(newTypeWiring("Mutation").dataFetcher("updateOccupationAndIncomeFullDomain", _OccupationAndIncomeFullDomainFFetcher.updateOccupationAndIncomeFullDomain()))
          .type(newTypeWiring("Query").dataFetcher("getListOccupations", _ListOccupationsFFetcher.getListOccupations()))
          .type(newTypeWiring("Query").dataFetcher("getOtherIncomeResponse", _OtherIncomeResponseFFetcher.getOtherIncomeResponse()))
          .type(newTypeWiring("Mutation").dataFetcher("updateOtherIncomeResponse", _OtherIncomeResponseFFetcher.updateOtherIncomeResponse()))
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
          .type(newTypeWiring("Mutation").dataFetcher("createPostCodeNameAndAddress", _PostCodeNameAndAddressFFetcher.createPostCodeNameAndAddress()))
          .type(newTypeWiring("Query").dataFetcher("getPostCodeDataLine", _PostCodeDataFFetcher.getPostCodeDataLine()))
          .build();
    }
    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
}