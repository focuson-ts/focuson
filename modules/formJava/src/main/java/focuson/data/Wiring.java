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
import focuson.data.fetchers.HelloWorldMainPage.HelloWorldDomainData_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountAllFlags_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewAgreementType_get_FFetcher;
import focuson.data.fetchers.AccountOverview.ArrearsDetails_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewHistory_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewExcessInfo_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverview_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewOptOut_get_FFetcher;
import focuson.data.fetchers.AccountOverview.AccountOverviewReason_get_FFetcher;
import focuson.data.fetchers.JointAccount.pre_JointAccount_get_FFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.AdditionalInformation_get_FFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.BusinessDetailsMain_get_FFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.Dropdowns_get_FFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.OccupationAndIncomeFullDomain_get_FFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.OccupationAndIncomeFullDomain_update_FFetcher;
import focuson.data.fetchers.OccupationAndIncomeSummary.OtherIncomeResponse_get_FFetcher;
import focuson.data.fetchers.EAccountsSummary.CreatePlan_get_FFetcher;
import focuson.data.fetchers.EAccountsSummary.CreatePlan_create_FFetcher;
import focuson.data.fetchers.EAccountsSummary.CreatePlan_update_FFetcher;
import focuson.data.fetchers.EAccountsSummary.CreatePlan_delete_FFetcher;
import focuson.data.fetchers.EAccountsSummary.CreatePlan_list_FFetcher;
import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_get_FFetcher;
import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_state_invalidate_FFetcher;
import focuson.data.fetchers.ETransfer.ETransferDataD_create_FFetcher;
import focuson.data.fetchers.CreateEAccount.CreateEAccountData_create_FFetcher;
import focuson.data.fetchers.CreateEAccount.CreateEAccountData_get_FFetcher;
import focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_get_FFetcher;
import focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_create_FFetcher;
import focuson.data.fetchers.Repeating.RepeatingWholeData_create_FFetcher;
import focuson.data.fetchers.Repeating.RepeatingWholeData_get_FFetcher;
import focuson.data.fetchers.PostCodeMainPage.PostCodeNameAndAddress_create_FFetcher;
import focuson.data.fetchers.PostCodeMainPage.PostCodeData_get_FFetcher;
@Component
public class Wiring  implements IManyGraphQl{
      @Autowired
      List<HelloWorldDomainData_get_FFetcher> HelloWorldDomainData_get_FFetcher;
      @Autowired
      List<AccountAllFlags_get_FFetcher> AccountAllFlags_get_FFetcher;
      @Autowired
      List<AccountOverviewAgreementType_get_FFetcher> AccountOverviewAgreementType_get_FFetcher;
      @Autowired
      List<ArrearsDetails_get_FFetcher> ArrearsDetails_get_FFetcher;
      @Autowired
      List<AccountOverviewHistory_get_FFetcher> AccountOverviewHistory_get_FFetcher;
      @Autowired
      List<AccountOverviewExcessInfo_get_FFetcher> AccountOverviewExcessInfo_get_FFetcher;
      @Autowired
      List<AccountOverview_get_FFetcher> AccountOverview_get_FFetcher;
      @Autowired
      List<AccountOverviewOptOut_get_FFetcher> AccountOverviewOptOut_get_FFetcher;
      @Autowired
      List<AccountOverviewReason_get_FFetcher> AccountOverviewReason_get_FFetcher;
      @Autowired
      List<pre_JointAccount_get_FFetcher> pre_JointAccount_get_FFetcher;
      @Autowired
      List<AdditionalInformation_get_FFetcher> AdditionalInformation_get_FFetcher;
      @Autowired
      List<BusinessDetailsMain_get_FFetcher> BusinessDetailsMain_get_FFetcher;
      @Autowired
      List<Dropdowns_get_FFetcher> Dropdowns_get_FFetcher;
      @Autowired
      List<OccupationAndIncomeFullDomain_get_FFetcher> OccupationAndIncomeFullDomain_get_FFetcher;
      @Autowired
      List<OccupationAndIncomeFullDomain_update_FFetcher> OccupationAndIncomeFullDomain_update_FFetcher;
      @Autowired
      List<OtherIncomeResponse_get_FFetcher> OtherIncomeResponse_get_FFetcher;
      @Autowired
      List<CreatePlan_get_FFetcher> CreatePlan_get_FFetcher;
      @Autowired
      List<CreatePlan_create_FFetcher> CreatePlan_create_FFetcher;
      @Autowired
      List<CreatePlan_update_FFetcher> CreatePlan_update_FFetcher;
      @Autowired
      List<CreatePlan_delete_FFetcher> CreatePlan_delete_FFetcher;
      @Autowired
      List<CreatePlan_list_FFetcher> CreatePlan_list_FFetcher;
      @Autowired
      List<EAccountsSummary_get_FFetcher> EAccountsSummary_get_FFetcher;
      @Autowired
      List<EAccountsSummary_state_invalidate_FFetcher> EAccountsSummary_state_invalidate_FFetcher;
      @Autowired
      List<ETransferDataD_create_FFetcher> ETransferDataD_create_FFetcher;
      @Autowired
      List<CreateEAccountData_create_FFetcher> CreateEAccountData_create_FFetcher;
      @Autowired
      List<CreateEAccountData_get_FFetcher> CreateEAccountData_get_FFetcher;
      @Autowired
      List<ChequeCreditbooks_get_FFetcher> ChequeCreditbooks_get_FFetcher;
      @Autowired
      List<ChequeCreditbooks_create_FFetcher> ChequeCreditbooks_create_FFetcher;
      @Autowired
      List<RepeatingWholeData_create_FFetcher> RepeatingWholeData_create_FFetcher;
      @Autowired
      List<RepeatingWholeData_get_FFetcher> RepeatingWholeData_get_FFetcher;
      @Autowired
      List<PostCodeNameAndAddress_create_FFetcher> PostCodeNameAndAddress_create_FFetcher;
      @Autowired
      List<PostCodeData_get_FFetcher> PostCodeData_get_FFetcher;
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
          .type(newTypeWiring("Query").dataFetcher("getHelloWorldDomainData", find(HelloWorldDomainData_get_FFetcher, dbName, f ->f.getHelloWorldDomainData())))
          .type(newTypeWiring("Query").dataFetcher("getAccountAllFlags", find(AccountAllFlags_get_FFetcher, dbName, f ->f.getAccountAllFlags())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewAgreementType", find(AccountOverviewAgreementType_get_FFetcher, dbName, f ->f.getAccountOverviewAgreementType())))
          .type(newTypeWiring("Query").dataFetcher("getArrearsDetails", find(ArrearsDetails_get_FFetcher, dbName, f ->f.getArrearsDetails())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewHistory", find(AccountOverviewHistory_get_FFetcher, dbName, f ->f.getAccountOverviewHistory())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewExcessInfo", find(AccountOverviewExcessInfo_get_FFetcher, dbName, f ->f.getAccountOverviewExcessInfo())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverview", find(AccountOverview_get_FFetcher, dbName, f ->f.getAccountOverview())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewOptOut", find(AccountOverviewOptOut_get_FFetcher, dbName, f ->f.getAccountOverviewOptOut())))
          .type(newTypeWiring("Query").dataFetcher("getAccountOverviewReason", find(AccountOverviewReason_get_FFetcher, dbName, f ->f.getAccountOverviewReason())))
          .type(newTypeWiring("Query").dataFetcher("getpreJointAccount", find(pre_JointAccount_get_FFetcher, dbName, f ->f.getpreJointAccount())))
          .type(newTypeWiring("Query").dataFetcher("getAdditionalInformation", find(AdditionalInformation_get_FFetcher, dbName, f ->f.getAdditionalInformation())))
          .type(newTypeWiring("Query").dataFetcher("getBusinessDetailsMain", find(BusinessDetailsMain_get_FFetcher, dbName, f ->f.getBusinessDetailsMain())))
          .type(newTypeWiring("Query").dataFetcher("getDropdowns", find(Dropdowns_get_FFetcher, dbName, f ->f.getDropdowns())))
          .type(newTypeWiring("Query").dataFetcher("getOccupationAndIncomeFullDomain", find(OccupationAndIncomeFullDomain_get_FFetcher, dbName, f ->f.getOccupationAndIncomeFullDomain())))
          .type(newTypeWiring("Mutation").dataFetcher("updateOccupationAndIncomeFullDomain", find(OccupationAndIncomeFullDomain_update_FFetcher, dbName, f ->f.updateOccupationAndIncomeFullDomain())))
          .type(newTypeWiring("Query").dataFetcher("getOtherIncomeResponse", find(OtherIncomeResponse_get_FFetcher, dbName, f ->f.getOtherIncomeResponse())))
          .type(newTypeWiring("Query").dataFetcher("getCreatePlan", find(CreatePlan_get_FFetcher, dbName, f ->f.getCreatePlan())))
          .type(newTypeWiring("Mutation").dataFetcher("createCreatePlan", find(CreatePlan_create_FFetcher, dbName, f ->f.createCreatePlan())))
          .type(newTypeWiring("Mutation").dataFetcher("updateCreatePlan", find(CreatePlan_update_FFetcher, dbName, f ->f.updateCreatePlan())))
          .type(newTypeWiring("Mutation").dataFetcher("deleteCreatePlan", find(CreatePlan_delete_FFetcher, dbName, f ->f.deleteCreatePlan())))
          .type(newTypeWiring("Query").dataFetcher("listCreatePlan", find(CreatePlan_list_FFetcher, dbName, f ->f.listCreatePlan())))
          .type(newTypeWiring("Query").dataFetcher("getEAccountsSummary", find(EAccountsSummary_get_FFetcher, dbName, f ->f.getEAccountsSummary())))
          .type(newTypeWiring("EAccountSummary").dataFetcher("description", find(EAccountsSummary_get_FFetcher, dbName, f ->f.getAccountSummaryDescription())))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("totalMonthlyCost", find(EAccountsSummary_get_FFetcher, dbName, f ->f.getTotalMonthlyCost())))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("oneAccountBalance", find(EAccountsSummary_get_FFetcher, dbName, f ->f.getOneAccountBalance())))
          .type(newTypeWiring("EAccountsSummary").dataFetcher("currentAccountBalance", find(EAccountsSummary_get_FFetcher, dbName, f ->f.getCurrentAccountBalance())))
          .type(newTypeWiring("Mutation").dataFetcher("stateEAccountsSummaryinvalidate", find(EAccountsSummary_state_invalidate_FFetcher, dbName, f ->f.stateEAccountsSummaryinvalidate())))
          .type(newTypeWiring("Mutation").dataFetcher("createETransferDataD", find(ETransferDataD_create_FFetcher, dbName, f ->f.createETransferDataD())))
          .type(newTypeWiring("Mutation").dataFetcher("createCreateEAccountData", find(CreateEAccountData_create_FFetcher, dbName, f ->f.createCreateEAccountData())))
          .type(newTypeWiring("Query").dataFetcher("getCreateEAccountData", find(CreateEAccountData_get_FFetcher, dbName, f ->f.getCreateEAccountData())))
          .type(newTypeWiring("Query").dataFetcher("getChequeCreditbooks", find(ChequeCreditbooks_get_FFetcher, dbName, f ->f.getChequeCreditbooks())))
          .type(newTypeWiring("Mutation").dataFetcher("createChequeCreditbooks", find(ChequeCreditbooks_create_FFetcher, dbName, f ->f.createChequeCreditbooks())))
          .type(newTypeWiring("Mutation").dataFetcher("createRepeatingLine", find(RepeatingWholeData_create_FFetcher, dbName, f ->f.createRepeatingLine())))
          .type(newTypeWiring("Query").dataFetcher("getRepeatingLine", find(RepeatingWholeData_get_FFetcher, dbName, f ->f.getRepeatingLine())))
          .type(newTypeWiring("Mutation").dataFetcher("createPostCodeNameAndAddress", find(PostCodeNameAndAddress_create_FFetcher, dbName, f ->f.createPostCodeNameAndAddress())))
          .type(newTypeWiring("Query").dataFetcher("getPostCodeDataLine", find(PostCodeData_get_FFetcher, dbName, f ->f.getPostCodeDataLine())))
       .build();
    }
    @Bean
    public GraphQL graphQL() {
        return get(IFetcher.mock);
    }
}