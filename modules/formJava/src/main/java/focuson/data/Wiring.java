package focuson.data;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.DataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import focuson.data.fetchers.IFetcher;
import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;
import java.util.function.Function;
import focuson.data.fetchers.HelloWorldDomainDataFFetcher;
import focuson.data.fetchers.AccountAllFlagsFFetcher;
import focuson.data.fetchers.AccountOverviewAgreementTypeFFetcher;
import focuson.data.fetchers.ArrearsDetailsFFetcher;
import focuson.data.fetchers.AccountOverviewHistoryFFetcher;
import focuson.data.fetchers.AccountOverviewExcessInfoFFetcher;
import focuson.data.fetchers.AccountOverviewFFetcher;
import focuson.data.fetchers.AccountOverviewOptOutFFetcher;
import focuson.data.fetchers.AccountOverviewReasonFFetcher;
import focuson.data.fetchers.JointAccountFFetcher;
import focuson.data.fetchers.AdditionalInformationFFetcher;
import focuson.data.fetchers.BusinessDetailsMainFFetcher;
import focuson.data.fetchers.DropdownsFFetcher;
import focuson.data.fetchers.OccupationAndIncomeFullDomainFFetcher;
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
public class Wiring  implements IManyGraphQl{
      @Autowired
      List<HelloWorldDomainDataFFetcher> _HelloWorldDomainDataFFetcher;
      @Autowired
      List<AccountAllFlagsFFetcher> _AccountAllFlagsFFetcher;
      @Autowired
      List<AccountOverviewAgreementTypeFFetcher> _AccountOverviewAgreementTypeFFetcher;
      @Autowired
      List<ArrearsDetailsFFetcher> _ArrearsDetailsFFetcher;
      @Autowired
      List<AccountOverviewHistoryFFetcher> _AccountOverviewHistoryFFetcher;
      @Autowired
      List<AccountOverviewExcessInfoFFetcher> _AccountOverviewExcessInfoFFetcher;
      @Autowired
      List<AccountOverviewFFetcher> _AccountOverviewFFetcher;
      @Autowired
      List<AccountOverviewOptOutFFetcher> _AccountOverviewOptOutFFetcher;
      @Autowired
      List<AccountOverviewReasonFFetcher> _AccountOverviewReasonFFetcher;
      @Autowired
      List<JointAccountFFetcher> _JointAccountFFetcher;
      @Autowired
      List<AdditionalInformationFFetcher> _AdditionalInformationFFetcher;
      @Autowired
      List<BusinessDetailsMainFFetcher> _BusinessDetailsMainFFetcher;
      @Autowired
      List<DropdownsFFetcher> _DropdownsFFetcher;
      @Autowired
      List<OccupationAndIncomeFullDomainFFetcher> _OccupationAndIncomeFullDomainFFetcher;
      @Autowired
      List<OtherIncomeResponseFFetcher> _OtherIncomeResponseFFetcher;
      @Autowired
      List<CreatePlanFFetcher> _CreatePlanFFetcher;
      @Autowired
      List<EAccountsSummaryFFetcher> _EAccountsSummaryFFetcher;
      @Autowired
      List<ETransferDataDFFetcher> _ETransferDataDFFetcher;
      @Autowired
      List<CreateEAccountDataFFetcher> _CreateEAccountDataFFetcher;
      @Autowired
      List<ChequeCreditbooksFFetcher> _ChequeCreditbooksFFetcher;
      @Autowired
      List<RepeatingWholeDataFFetcher> _RepeatingWholeDataFFetcher;
      @Autowired
      List<PostCodeNameAndAddressFFetcher> _PostCodeNameAndAddressFFetcher;
      @Autowired
      List<PostCodeDataFFetcher> _PostCodeDataFFetcher;
   private String sdl;
   private Map<String, GraphQL> cache = Collections.synchronizedMap(new HashMap<>()); //sucks and need to improve
   @PostConstruct
    public void init() throws IOException {
       URL url = Resources.getResource("someSchema.graphql");
       sdl = Resources.toString(url, Charsets.UTF_8);
    }
   @Override
   public GraphQL get(String dbName) {
      if (dbName==null) dbName= IFetcher.mock;
      if (!cache.containsKey(dbName)) {
          GraphQLSchema graphQLSchema = buildSchema(dbName);
          cache.put(dbName, GraphQL.newGraphQL(graphQLSchema).build());
      }
      return cache.get(dbName);
    }
   private GraphQLSchema buildSchema(String dbName) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring(dbName);
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
   }
   public <T extends IFetcher, Res> DataFetcher<Res> find(List<T> list, String dbName, Function<T, DataFetcher<Res>> fn) {
        Optional<T> result = list.stream().filter(f -> f.dbName().equals(dbName)).findFirst();
        if (result.isPresent()) return fn.apply(result.get());
        return new DataFetcher<Res>() {
            @Override
            public Res get(DataFetchingEnvironment dataFetchingEnvironment) throws Exception {
                    throw new RuntimeException("Cannot find the fetcher for " + dbName);
            }
        };
   }
   private RuntimeWiring buildWiring(String dbName) {
       return RuntimeWiring.newRuntimeWiring()
          .type(newTypeWiring("Query").dataFetcher("getHelloWorldDomainData", find(_HelloWorldDomainDataFFetcher, dbName, f ->f.getHelloWorldDomainData())))
          .type(newTypeWiring("Query").dataFetcher("getAccountAllFlags", find(_AccountAllFlagsFFetcher, dbName, f ->f.getAccountAllFlags())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewAgreementType", find(_AccountOverviewAgreementTypeFFetcher, dbName, f ->f.getAccountOverviewAgreementType())))
          .type(newTypeWiring("Query").dataFetcher("getArrearsDetails", find(_ArrearsDetailsFFetcher, dbName, f ->f.getArrearsDetails())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewHistory", find(_AccountOverviewHistoryFFetcher, dbName, f ->f.getAccountOverviewHistory())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewExcessInfo", find(_AccountOverviewExcessInfoFFetcher, dbName, f ->f.getAccountOverviewExcessInfo())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverview", find(_AccountOverviewFFetcher, dbName, f ->f.getAccountOverview())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewOptOut", find(_AccountOverviewOptOutFFetcher, dbName, f ->f.getAccountOverviewOptOut())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewReason", find(_AccountOverviewReasonFFetcher, dbName, f ->f.getAccountOverviewReason())))
          .type(newTypeWiring("Query").dataFetcher("getJointAccount", find(_JointAccountFFetcher, dbName, f ->f.getJointAccount())))
          .type(newTypeWiring("Query").dataFetcher("getAdditionalInformation", find(_AdditionalInformationFFetcher, dbName, f ->f.getAdditionalInformation())))
          .type(newTypeWiring("Query").dataFetcher("getBusinessDetailsMain", find(_BusinessDetailsMainFFetcher, dbName, f ->f.getBusinessDetailsMain())))
          .type(newTypeWiring("Query").dataFetcher("getDropdowns", find(_DropdownsFFetcher, dbName, f ->f.getDropdowns())))
          .type(newTypeWiring("Query").dataFetcher("getOccupationAndIncomeFullDomain", find(_OccupationAndIncomeFullDomainFFetcher, dbName, f ->f.getOccupationAndIncomeFullDomain())))
          .type(newTypeWiring("Mutation").dataFetcher("updateOccupationAndIncomeFullDomain", find(_OccupationAndIncomeFullDomainFFetcher, dbName, f ->f.updateOccupationAndIncomeFullDomain())))
          .type(newTypeWiring("Query").dataFetcher("getOtherIncomeResponse", find(_OtherIncomeResponseFFetcher, dbName, f ->f.getOtherIncomeResponse())))
          .type(newTypeWiring("Query").dataFetcher("getCreatePlan", find(_CreatePlanFFetcher, dbName, f ->f.getCreatePlan())))
          .type(newTypeWiring("Mutation").dataFetcher("createCreatePlan", find(_CreatePlanFFetcher, dbName, f ->f.createCreatePlan())))
          .type(newTypeWiring("Mutation").dataFetcher("updateCreatePlan", find(_CreatePlanFFetcher, dbName, f ->f.updateCreatePlan())))
          .type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlan", find(_CreatePlanFFetcher, dbName, f ->f.deleteCreatePlan())))
          .type(newTypeWiring("Query").dataFetcher("listCreatePlan", find(_CreatePlanFFetcher, dbName, f ->f.listCreatePlan())))
          .type(newTypeWiring("Query").dataFetcher("getEAccountsSummary", find(_EAccountsSummaryFFetcher, dbName, f ->f.getEAccountsSummary())))
          .type(newTypeWiring("EAccountSummary").dataFetcher("description", find(_EAccountsSummaryFFetcher, dbName, f ->f.getAccountSummaryDescription())))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("totalMonthlyCost", find(_EAccountsSummaryFFetcher, dbName, f ->f.getTotalMonthlyCost())))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("oneAccountBalance", find(_EAccountsSummaryFFetcher, dbName, f ->f.getOneAccountBalance())))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("currentAccountBalance", find(_EAccountsSummaryFFetcher, dbName, f ->f.getCurrentAccountBalance())))
          .type(newTypeWiring("Mutation").dataFetcher("createETransferDataD", find(_ETransferDataDFFetcher, dbName, f ->f.createETransferDataD())))
          .type(newTypeWiring("Mutation").dataFetcher("createCreateEAccountData", find(_CreateEAccountDataFFetcher, dbName, f ->f.createCreateEAccountData())))
          .type(newTypeWiring("Query").dataFetcher("getCreateEAccountData", find(_CreateEAccountDataFFetcher, dbName, f ->f.getCreateEAccountData())))
          .type(newTypeWiring("Query").dataFetcher("getChequeCreditbooks", find(_ChequeCreditbooksFFetcher, dbName, f ->f.getChequeCreditbooks())))
          .type(newTypeWiring("Mutation").dataFetcher("createChequeCreditbooks", find(_ChequeCreditbooksFFetcher, dbName, f ->f.createChequeCreditbooks())))
          .type(newTypeWiring("Mutation").dataFetcher("createRepeatingLine", find(_RepeatingWholeDataFFetcher, dbName, f ->f.createRepeatingLine())))
          .type(newTypeWiring("Query").dataFetcher("getRepeatingLine", find(_RepeatingWholeDataFFetcher, dbName, f ->f.getRepeatingLine())))
          .type(newTypeWiring("Mutation").dataFetcher("createPostCodeNameAndAddress", find(_PostCodeNameAndAddressFFetcher, dbName, f ->f.createPostCodeNameAndAddress())))
          .type(newTypeWiring("Query").dataFetcher("getPostCodeDataLine", find(_PostCodeDataFFetcher, dbName, f ->f.getPostCodeDataLine())))
       .build();
    }
    @Bean
    public GraphQL graphQL() {
        return get(IFetcher.mock);
    }
}