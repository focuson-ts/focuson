import { findAllResolversFor, findChildResolvers, findJavaType, findQueryMutationResolver, makeAllJavaWiring, makeJavaFetcherInterfaceForResolver } from "../codegen/makeJavaFetchersInterface";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { paramsForTest } from "./paramsForTest";
import { resolverName } from "../codegen/names";

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface when action is get", () => {
    expect ( makeJavaFetcherInterfaceForResolver ( paramsForTest, EAccountsSummaryPD, eAccountsSummaryRestD, resolverName ( eAccountsSummaryRestD, 'get' ), findJavaType ( eAccountsSummaryRestD.dataDD ) ) ).toEqual ( [
      "package focuson.data.fetchers.EAccountsSummary;",
      "",
      "import graphql.schema.DataFetcher;",
      "import java.util.Map;",
      "import java.util.List;",
      "import focuson.data.fetchers.IFetcher;",
      "",
      "public interface EAccountsSummary_getEAccountsSummary_FFetcher extends IFetcher{",
      "   public DataFetcher<Map<String,Object>> getEAccountsSummary();",
      "}"
    ] )
  } )
  it ( "should make a java interface for a resolver", () => {
    expect ( makeJavaFetcherInterfaceForResolver ( paramsForTest, EAccountsSummaryPD, eAccountsSummaryRestD, 'resolverName', 'someJavaType' ) ).toEqual ( [
      "package focuson.data.fetchers.EAccountsSummary;",
      "",
      "import graphql.schema.DataFetcher;",
      "import java.util.Map;",
      "import java.util.List;",
      "import focuson.data.fetchers.IFetcher;",
      "",
      "public interface EAccountsSummary_resolverName_FFetcher extends IFetcher{",
      "   public DataFetcher<someJavaType> resolverName();",
      "}"
    ] )
  } )
  it ( "should make a java interface when action is update", () => {
    expect ( makeJavaFetcherInterfaceForResolver ( paramsForTest, EAccountsSummaryPD, createPlanRestD, resolverName ( createPlanRestD, 'update' ), 'update' ) ).toEqual ( [
      "package focuson.data.fetchers.EAccountsSummary;",
      "",
      "import graphql.schema.DataFetcher;",
      "import java.util.Map;",
      "import java.util.List;",
      "import focuson.data.fetchers.IFetcher;",
      "",
      "public interface CreatePlan_updateWithoutFetchCreatePlan_FFetcher extends IFetcher{",
      "   public DataFetcher<update> updateWithoutFetchCreatePlan();",
      "}"
    ] )
  } )

} )

describe ( "makeAllJavaWiring", () => {
  it ( "should make a java file which will power a graphql spring boot app", () => {
    expect ( makeAllJavaWiring ( paramsForTest, [ EAccountsSummaryPD, RepeatingPageD ], { main: '.', backup: '.' } ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.utils;",
      "import com.google.common.base.Charsets;",
      "import com.google.common.io.Resources;",
      "import graphql.GraphQL;",
      "import graphql.schema.GraphQLSchema;",
      "import graphql.schema.DataFetcher;",
      "import graphql.schema.idl.RuntimeWiring;",
      "import graphql.schema.idl.SchemaGenerator;",
      "import graphql.schema.idl.SchemaParser;",
      "import graphql.schema.idl.TypeDefinitionRegistry;",
      "import graphql.schema.DataFetchingEnvironment;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import org.springframework.context.annotation.Bean;",
      "import org.springframework.stereotype.Component;",
      "import javax.annotation.PostConstruct;",
      "import java.io.IOException;",
      "import java.net.URL;",
      "import java.util.Collections;",
      "import java.util.HashMap;",
      "import java.util.List;",
      "import java.util.Map;",
      "import java.util.Optional;",
      "import focuson.data.fetchers.IFetcher;",
      "import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;",
      "import java.util.function.Function;",
      "import java.util.stream.Collectors;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_getCreatePlan_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_createCreatePlan_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_updateWithoutFetchCreatePlan_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.CreatePlan_deleteCreatePlan_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_getEAccountsSummary_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_stateinvalidateEAccountsSummary_FFetcher;",
      "import focuson.data.fetchers.Repeating.RepeatingWholeData_createRepeatingLine_FFetcher;",
      "import focuson.data.fetchers.Repeating.RepeatingWholeData_getRepeatingLine_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_getAccountSummaryDescription_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_totalMonthlyCost_FFetcher;",
      "@Component",
      "public class Wiring  implements IManyGraphQl{",
      "      @Autowired",
      "      List<CreatePlan_getCreatePlan_FFetcher> CreatePlan_get_FFetcher;",
      "      @Autowired",
      "      List<CreatePlan_createCreatePlan_FFetcher> CreatePlan_create_FFetcher;",
      "      @Autowired",
      "      List<CreatePlan_updateWithoutFetchCreatePlan_FFetcher> CreatePlan_update_FFetcher;",
      "      @Autowired",
      "      List<CreatePlan_deleteCreatePlan_FFetcher> CreatePlan_delete_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_getEAccountsSummary_FFetcher> EAccountsSummary_get_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_stateinvalidateEAccountsSummary_FFetcher> EAccountsSummary_state_invalidate_FFetcher;",
      "      @Autowired",
      "      List<RepeatingWholeData_createRepeatingLine_FFetcher> RepeatingWholeData_create_FFetcher;",
      "      @Autowired",
      "      List<RepeatingWholeData_getRepeatingLine_FFetcher> RepeatingWholeData_get_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_getAccountSummaryDescription_FFetcher> EAccountsSummary_getAccountSummaryDescription_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher> EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher;",
      "      @Autowired",
      "      List<EAccountsSummary_totalMonthlyCost_FFetcher> EAccountsSummary_totalMonthlyCost_FFetcher;",
      "   private String sdl;",
      "   private Map<String, GraphQL> cache = Collections.synchronizedMap(new HashMap<>()); //sucks and need to improve",
      "   @PostConstruct",
      "    public void init() throws IOException {",
      "       URL url = Resources.getResource('someSchema.graphql');",
      "       sdl = Resources.toString(url, Charsets.UTF_8);",
      "    }",
      "   @Override",
      "   public GraphQL get(String dbName) {",
      "      if (dbName==null) dbName= IFetcher.mock;",
      "      if (!cache.containsKey(dbName)) {",
      "          GraphQLSchema graphQLSchema = buildSchema(dbName);",
      "          cache.put(dbName, GraphQL.newGraphQL(graphQLSchema).build());",
      "      }",
      "      return cache.get(dbName);",
      "    }",
      "   private GraphQLSchema buildSchema(String dbName) {",
      "        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);",
      "        RuntimeWiring runtimeWiring = buildWiring(dbName);",
      "        SchemaGenerator schemaGenerator = new SchemaGenerator();",
      "        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);",
      "   }",
      "   public<T extends IFetcher, Res> DataFetcher<Res> find(List<T> list,String dbName,Function<T, DataFetcher<Res>>fn){",
      "        List<T> result=list.stream().filter(f->f.dbName().equals(dbName)).collect(Collectors.toList());",
      "        if(result.size()==1)return fn.apply(result.get(0));",
      "        String names='. Had '+result.stream().map(s->s.getClass().getName()).collect(Collectors.joining(','));",
      "        return new DataFetcher<Res>(){",
      "            @Override",
      "            public Res get(DataFetchingEnvironment dataFetchingEnvironment)throws Exception{",
      "                throw new RuntimeException('Cannot find the unique fetcher for '+dbName+names);",
      "            }",
      "        };",
      "   }",
      "   private RuntimeWiring buildWiring(String dbName) {",
      "       return RuntimeWiring.newRuntimeWiring()",
      "          .type(newTypeWiring('Query').dataFetcher('getCreatePlan', find(CreatePlan_get_FFetcher, dbName, f ->f.getCreatePlan())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createCreatePlan', find(CreatePlan_create_FFetcher, dbName, f ->f.createCreatePlan())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('updateWithoutFetchCreatePlan', find(CreatePlan_update_FFetcher, dbName, f ->f.updateWithoutFetchCreatePlan())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('deleteCreatePlan', find(CreatePlan_delete_FFetcher, dbName, f ->f.deleteCreatePlan())))",
      "          .type(newTypeWiring('Query').dataFetcher('getEAccountsSummary', find(EAccountsSummary_get_FFetcher, dbName, f ->f.getEAccountsSummary())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('stateinvalidateEAccountsSummary', find(EAccountsSummary_state_invalidate_FFetcher, dbName, f ->f.stateinvalidateEAccountsSummary())))",
      "          .type(newTypeWiring('Mutation').dataFetcher('createRepeatingLine', find(RepeatingWholeData_create_FFetcher, dbName, f ->f.createRepeatingLine())))",
      "          .type(newTypeWiring('Query').dataFetcher('getRepeatingLine', find(RepeatingWholeData_get_FFetcher, dbName, f ->f.getRepeatingLine())))",
      "          .type(newTypeWiring('EAccountSummary').dataFetcher('description', find(EAccountsSummary_getAccountSummaryDescription_FFetcher, dbName, f ->f.getAccountSummaryDescription())))",
      "          .type(newTypeWiring('EAccountsSummary').dataFetcher('balancesAndMonthlyCost', find(EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher, dbName, f ->f.balancesAndMonthlyCostResolver())))",
      "          .type(newTypeWiring('BalancesAndMonthlyCost').dataFetcher('totalMonthlyCost', find(EAccountsSummary_totalMonthlyCost_FFetcher, dbName, f ->f.totalMonthlyCost())))",
      "       .build();",
      "    }",
      "    @Bean",
      "    public GraphQL graphQL() {",
      "        return get(IFetcher.mock);",
      "    }",
      "}"
    ] )
  } )


} )

describe ( "findAllResolvers2", () => {
  it ( "findResolvers2", () => {
    expect ( findChildResolvers ( eAccountsSummaryRestD ) ).toEqual ( [
      {
        "isRoot": false,
        "javaType": "String",
        "name": "description",
        "needsObjectInOutput": true,
        "parent": "EAccountSummary",
        "resolver": "getAccountSummaryDescription",
        "sample": [
          "This account's description"
        ],
        "samplerName": "sampleOneLineString"
      },
      {
        "isRoot": false,
        "javaType": "Map<String,Object>",
        "name": "balancesAndMonthlyCost",
        "needsObjectInOutput": true,
        "parent": "EAccountsSummary",
        "resolver": "balancesAndMonthlyCostResolver",
        "sample": [],
        "samplerName": "sampleBalancesAndMonthlyCost"
      },
      {
        "isRoot": false,
        "javaType": "Double",
        "name": "totalMonthlyCost",
        "needsObjectInOutput": true,
        "parent": "BalancesAndMonthlyCost",
        "resolver": "totalMonthlyCost",
        "sample": [
          1000
        ],
        "samplerName": "sampleMoney"
      }
    ] )
  } )

  it ( "findQueryMutationResolvers2", () => {
    expect ( findQueryMutationResolver ( eAccountsSummaryRestD, 'get' ) ).toEqual (
      { "isRoot": true, "javaType": "Map<String,Object>", needsObjectInOutput: true, "name": "getEAccountsSummary", "parent": "Query", "resolver": "getEAccountsSummary", "sample": [], "samplerName": "sampleEAccountsSummary" }
    )
    expect ( findQueryMutationResolver ( createPlanRestD, "get" ) ).toEqual (
      { "isRoot": true, "javaType": "Map<String,Object>", needsObjectInOutput: true, "name": "getCreatePlan", "parent": "Query", "resolver": "getCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
    expect ( findQueryMutationResolver ( createPlanRestD, "create" ) ).toEqual (
      { "isRoot": true, "javaType": "Map<String,Object>", needsObjectInOutput: true, "name": "createCreatePlan", "parent": "Mutation", "resolver": "createCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
    expect ( findQueryMutationResolver ( createPlanRestD, "update" ) ).toEqual (
      { "isRoot": true, "javaType": "Map<String,Object>", "name": "updateWithoutFetchCreatePlan", "needsObjectInOutput": true, "parent": "Mutation", "resolver": "updateWithoutFetchCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" }, )
    expect ( findQueryMutationResolver ( createPlanRestD, "delete" ) ).toEqual (
      { "isRoot": true, "javaType": "Map<String,Object>", needsObjectInOutput: false, "name": "deleteCreatePlan", "parent": "Mutation", "resolver": "deleteCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" },
    )
  } )

  it ( "findAllResolversFor with children - gets with children", () => {
    expect ( findAllResolversFor ( eAccountsSummaryRestD, 'get' ) ).toEqual ( [
      {
        "isRoot": true,
        "javaType": "Map<String,Object>",
        "name": "getEAccountsSummary",
        "needsObjectInOutput": true,
        "parent": "Query",
        "resolver": "getEAccountsSummary",
        "sample": [],
        "samplerName": "sampleEAccountsSummary"
      },
      {
        "isRoot": false,
        "javaType": "String",
        "name": "description",
        "needsObjectInOutput": true,
        "parent": "EAccountSummary",
        "resolver": "getAccountSummaryDescription",
        "sample": [
          "This account's description"
        ],
        "samplerName": "sampleOneLineString"
      },
      {
        "isRoot": false,
        "javaType": "Map<String,Object>",
        "name": "balancesAndMonthlyCost",
        "needsObjectInOutput": true,
        "parent": "EAccountsSummary",
        "resolver": "balancesAndMonthlyCostResolver",
        "sample": [],
        "samplerName": "sampleBalancesAndMonthlyCost"
      },
      {
        "isRoot": false,
        "javaType": "Double",
        "name": "totalMonthlyCost",
        "needsObjectInOutput": true,
        "parent": "BalancesAndMonthlyCost",
        "resolver": "totalMonthlyCost",
        "sample": [
          1000
        ],
        "samplerName": "sampleMoney"
      }
    ] )
  } )
  it ( "findAllResolversFor with children - with mutations", () => {
    expect ( findAllResolversFor ( createPlanRestD, 'update' ) ).toEqual ( [
      { "isRoot": true, "javaType": "Map<String,Object>", "name": "updateWithoutFetchCreatePlan", "needsObjectInOutput": true, "parent": "Mutation", "resolver": "updateWithoutFetchCreatePlan", "sample": [], "samplerName": "sampleCreatePlan" } ] )
  } )
  it ( "findAllResolversFor simple", () => {
    expect ( findAllResolversFor ( createPlanRestD, 'get' ) ).toEqual ( [
      {
        "isRoot": true,
        "javaType": "Map<String,Object>",
        "name": "getCreatePlan",
        "needsObjectInOutput": true,
        "parent": "Query",
        "resolver": "getCreatePlan",
        "sample": [],
        "samplerName": "sampleCreatePlan"
      }
    ] )
  } )

  it ( "should make a resolver for repeating - get", () => {
    expect ( findAllResolversFor ( repeatingRestRD, 'get' ) ).toEqual ( [
      {
        "isRoot": true,
        needsObjectInOutput: true,
        "name": "getRepeatingLine",
        "parent": "Query",
        "resolver": "getRepeatingLine",
        "javaType": "List<Map<String,Object>>",
        "sample": [],
        "samplerName": "sampleRepeatingWholeData"
      }
    ] )
  } )
  it ( "should make a resolver for repeating - create", () => {
    expect ( findAllResolversFor ( repeatingRestRD, 'create' ) ).toEqual ( [
      {
        "isRoot": true,
        needsObjectInOutput: true,
        "name": "createRepeatingLine",
        "parent": "Mutation",
        "javaType": "List<Map<String,Object>>",
        "resolver": "createRepeatingLine",
        "sample": [],
        "samplerName": "sampleRepeatingWholeData"
      }
    ] )
  } )

} )