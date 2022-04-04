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
import focuson.data.fetchers._AccountAllFlagsFFetcher;
import focuson.data.fetchers._ArrearsDetailsFFetcher;
import focuson.data.fetchers.previous_ArrearsDetailsFFetcher;
import focuson.data.fetchers._AccountOverviewHistoryFFetcher;
import focuson.data.fetchers._AccountOverviewExcessInfoFFetcher;
import focuson.data.fetchers._AccountOverviewFFetcher;
import focuson.data.fetchers._AccountOverviewReasonFFetcher;
import focuson.data.fetchers._JointAccountFFetcher;
import focuson.data.fetchers._AdditionalInformationFFetcher;
import focuson.data.fetchers._BusinessDetailsMainFFetcher;
import focuson.data.fetchers._DropdownsFFetcher;
import focuson.data.fetchers._OccupationAndIncomeFullDomainFFetcher;
import focuson.data.fetchers._OtherIncomeResponseFFetcher;
import focuson.data.fetchers._CreatePlanFFetcher;
import focuson.data.fetchers._EAccountsSummaryFFetcher;
import focuson.data.fetchers._ETransferDataDFFetcher;
import focuson.data.fetchers._CreateEAccountDataFFetcher;
import focuson.data.fetchers._ChequeCreditbooksFFetcher;
import focuson.data.fetchers._RepeatingWholeDataFFetcher;
import focuson.data.fetchers._PostCodeNameAndAddressFFetcher;
import focuson.data.fetchers._PostCodeDataFFetcher;
@Component
public class Wiring {
      @Autowired
      _AccountAllFlagsFFetcher __AccountAllFlagsFFetcher;
      @Autowired
      _ArrearsDetailsFFetcher __ArrearsDetailsFFetcher;
      @Autowired
      previous_ArrearsDetailsFFetcher _previous_ArrearsDetailsFFetcher;
      @Autowired
      _AccountOverviewHistoryFFetcher __AccountOverviewHistoryFFetcher;
      @Autowired
      _AccountOverviewExcessInfoFFetcher __AccountOverviewExcessInfoFFetcher;
      @Autowired
      _AccountOverviewFFetcher __AccountOverviewFFetcher;
      @Autowired
      _AccountOverviewReasonFFetcher __AccountOverviewReasonFFetcher;
      @Autowired
      _JointAccountFFetcher __JointAccountFFetcher;
      @Autowired
      _AdditionalInformationFFetcher __AdditionalInformationFFetcher;
      @Autowired
      _BusinessDetailsMainFFetcher __BusinessDetailsMainFFetcher;
      @Autowired
      _DropdownsFFetcher __DropdownsFFetcher;
      @Autowired
      _OccupationAndIncomeFullDomainFFetcher __OccupationAndIncomeFullDomainFFetcher;
      @Autowired
      _OtherIncomeResponseFFetcher __OtherIncomeResponseFFetcher;
      @Autowired
      _CreatePlanFFetcher __CreatePlanFFetcher;
      @Autowired
      _EAccountsSummaryFFetcher __EAccountsSummaryFFetcher;
      @Autowired
      _ETransferDataDFFetcher __ETransferDataDFFetcher;
      @Autowired
      _CreateEAccountDataFFetcher __CreateEAccountDataFFetcher;
      @Autowired
      _ChequeCreditbooksFFetcher __ChequeCreditbooksFFetcher;
      @Autowired
      _RepeatingWholeDataFFetcher __RepeatingWholeDataFFetcher;
      @Autowired
      _PostCodeNameAndAddressFFetcher __PostCodeNameAndAddressFFetcher;
      @Autowired
      _PostCodeDataFFetcher __PostCodeDataFFetcher;
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
          .type(newTypeWiring("Query").dataFetcher("getAccountAllFlags", __AccountAllFlagsFFetcher.getAccountAllFlags()))
          .type(newTypeWiring("Query").dataFetcher("getArrearsDetails", __ArrearsDetailsFFetcher.getArrearsDetails()))
          .type(newTypeWiring("Query").dataFetcher("getArrearsDetails", _previous_ArrearsDetailsFFetcher.getArrearsDetails()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewHistory", __AccountOverviewHistoryFFetcher.getAccountOverviewHistory()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewExcessInfo", __AccountOverviewExcessInfoFFetcher.getAccountOverviewExcessInfo()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverview", __AccountOverviewFFetcher.getAccountOverview()))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewReason", __AccountOverviewReasonFFetcher.getAccountOverviewReason()))
          .type(newTypeWiring("Query").dataFetcher("getJointAccount", __JointAccountFFetcher.getJointAccount()))
          .type(newTypeWiring("Query").dataFetcher("getAdditionalInformation", __AdditionalInformationFFetcher.getAdditionalInformation()))
          .type(newTypeWiring("Query").dataFetcher("getBusinessDetailsMain", __BusinessDetailsMainFFetcher.getBusinessDetailsMain()))
          .type(newTypeWiring("Query").dataFetcher("getDropdowns", __DropdownsFFetcher.getDropdowns()))
          .type(newTypeWiring("Query").dataFetcher("getOccupationAndIncomeFullDomain", __OccupationAndIncomeFullDomainFFetcher.getOccupationAndIncomeFullDomain()))
          .type(newTypeWiring("Mutation").dataFetcher("updateOccupationAndIncomeFullDomain", __OccupationAndIncomeFullDomainFFetcher.updateOccupationAndIncomeFullDomain()))
          .type(newTypeWiring("Query").dataFetcher("getOtherIncomeResponse", __OtherIncomeResponseFFetcher.getOtherIncomeResponse()))
          .type(newTypeWiring("Query").dataFetcher("getCreatePlan", __CreatePlanFFetcher.getCreatePlan()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreatePlan", __CreatePlanFFetcher.createCreatePlan()))
          .type(newTypeWiring("Mutation").dataFetcher("updateCreatePlan", __CreatePlanFFetcher.updateCreatePlan()))
          .type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlan", __CreatePlanFFetcher.deleteCreatePlan()))
          .type(newTypeWiring("Query").dataFetcher("listCreatePlan", __CreatePlanFFetcher.listCreatePlan()))
          .type(newTypeWiring("Query").dataFetcher("getEAccountsSummary", __EAccountsSummaryFFetcher.getEAccountsSummary()))
          .type(newTypeWiring("EAccountSummary").dataFetcher("description", __EAccountsSummaryFFetcher.getAccountSummaryDescription()))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("totalMonthlyCost", __EAccountsSummaryFFetcher.getTotalMonthlyCost()))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("oneAccountBalance", __EAccountsSummaryFFetcher.getOneAccountBalance()))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("currentAccountBalance", __EAccountsSummaryFFetcher.getCurrentAccountBalance()))
          .type(newTypeWiring("Mutation").dataFetcher("createETransferDataD", __ETransferDataDFFetcher.createETransferDataD()))
          .type(newTypeWiring("Mutation").dataFetcher("createCreateEAccountData", __CreateEAccountDataFFetcher.createCreateEAccountData()))
          .type(newTypeWiring("Query").dataFetcher("getCreateEAccountData", __CreateEAccountDataFFetcher.getCreateEAccountData()))
          .type(newTypeWiring("Query").dataFetcher("getChequeCreditbooks", __ChequeCreditbooksFFetcher.getChequeCreditbooks()))
          .type(newTypeWiring("Mutation").dataFetcher("createChequeCreditbooks", __ChequeCreditbooksFFetcher.createChequeCreditbooks()))
          .type(newTypeWiring("Mutation").dataFetcher("createRepeatingLine", __RepeatingWholeDataFFetcher.createRepeatingLine()))
          .type(newTypeWiring("Query").dataFetcher("getRepeatingLine", __RepeatingWholeDataFFetcher.getRepeatingLine()))
          .type(newTypeWiring("Mutation").dataFetcher("createPostCodeNameAndAddress", __PostCodeNameAndAddressFFetcher.createPostCodeNameAndAddress()))
          .type(newTypeWiring("Query").dataFetcher("getPostCodeDataLine", __PostCodeDataFFetcher.getPostCodeDataLine()))
          .build();
    }
    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
}