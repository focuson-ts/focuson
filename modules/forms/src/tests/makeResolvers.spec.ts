import { findResolverData, makeResolvers } from "../codegen/makeResolvers";
import { paramsForTest } from "./paramsForTest";
import { ChequeCreditbooksPD } from "../example/chequeCreditBooks/chequeCreditBooks.pageD";
import { chequeCreditBooksRestD } from "../example/chequeCreditBooks/chequeCreditBooks.restD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { findChildResolvers, findQueryMutationResolver } from "../codegen/makeJavaFetchersInterface";
import { safeObject } from "@focuson/utils";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { postcodeWithResolversRestD } from "../example/postCodeDemo/addressSearch.restD";

describe ( "makeResolvers", () => {
  it ( "should make resolvers", () => {
    expect ( makeResolvers ( paramsForTest, ChequeCreditbooksPD, 'chequeCreditBooks', chequeCreditBooksRestD,
      'get', safeObject ( chequeCreditBooksRestD.resolvers ).getChequeCreditbooks,
      findQueryMutationResolver ( chequeCreditBooksRestD, 'get' )
    ) ).toEqual ( [
      "package focuson.data.resolvers.ChequeCreditbooks;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import javax.sql.DataSource;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_getChequeCreditbooks_FFetcher;",
      "//added by param systemTime",
      "import focuson.data.utils.ITimeService;",
      "import focuson.data.mutator.utils.Tuple2;",
      "import java.util.Date;",
      "@Component",
      "public class ChequeCreditbooks_getChequeCreditbooksResolver implements ChequeCreditbooks_getChequeCreditbooks_FFetcher{",
      "",
      "   @Autowired",
      "   private DataSource dataSource;",
      "    @Autowired",
      "    focuson.data.utils.ITimeService systemTime;",
      "",
      "  public DataFetcher<Map<String,Object>> getChequeCreditbooks(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName = dataFetchingEnvironment.getArgument(\"dbName\");",
      "      int brandRef = dataFetchingEnvironment.getArgument(\"brandRef\");",
      "      int applRef = dataFetchingEnvironment.getArgument(\"applRef\");",
      "      int clientRef = dataFetchingEnvironment.getArgument(\"clientRef\");",
      "      int accountId = dataFetchingEnvironment.getArgument(\"accountId\");",
      "      try(Connection connection = dataSource.getConnection()){",
      "        //from ChequeCreditbooks.rest[chequeCreditBooks].resolvers[\"getChequeCreditbooks\"]",
      "        Tuple2<Integer,String> params0 =  ChequeCreditbooks_getChequeCreditbooks_getMeMyData10(connection,dbName);",
      "        Integer val1 = params0.t1;",
      "        String val2 = params0.t2;",
      "        //from ChequeCreditbooks.rest[chequeCreditBooks].resolvers[\"getChequeCreditbooks\"]",
      "        Tuple2<Integer,String> params1 =  ChequeCreditbooks_getChequeCreditbooks_getMeMyData21(connection,dbName);",
      "        Integer val3 = params1.t1;",
      "        String val4 = params1.t2;",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put(\"val1\", val1);",
      "        result.put(\"val2\", val2);",
      "        result.put(\"val3\", val3);",
      "        result.put(\"val4\", val4);",
      "        return result;",
      "      }};",
      "    }",
      "",
      "    public Tuple2<Integer,String> ChequeCreditbooks_get_getMeMyData10(Connection connection, Object dbName) throws SQLException {",
      "    try (CallableStatement s = connection.prepareCall(\"call somePackage.getMeMyData1(?, ?, ?)\")) {",
      "      s.registerOutParameter(1,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(2,java.sql.Types.CHAR);",
      "      s.setObject(3, systemTime.now());",
      "      s.execute();",
      "      Integer val1 = s.getInt(1);",
      "      String val2 = s.getString(2);",
      "      return new Tuple2<Integer,String>(val1,val2);",
      "  }}",
      "    public Tuple2<Integer,String> ChequeCreditbooks_get_getMeMyData21(Connection connection, Object dbName) throws SQLException {",
      "    try (CallableStatement s = connection.prepareCall(\"call getMeMyData2(?, ?, ?)\")) {",
      "      s.registerOutParameter(1,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(2,java.sql.Types.CHAR);",
      "      s.setObject(3, systemTime.now());",
      "      s.execute();",
      "      Integer val3 = s.getInt(1);",
      "      String val4 = s.getString(2);",
      "      return new Tuple2<Integer,String>(val3,val4);",
      "  }}",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ] )
  } )

  it ( `should make a resolver for a 'get' that is done manually`, () => {
    expect ( makeResolvers ( paramsForTest, EAccountsSummaryPD, 'eAccountsSummary', eAccountsSummaryRestD,
      'getEAccountsSummary', safeObject ( eAccountsSummaryRestD.resolvers ).totalMonthlyCost, findQueryMutationResolver ( eAccountsSummaryRestD, 'get' )
    ) ).toEqual ( [
      "package focuson.data.resolvers.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import javax.sql.DataSource;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_getEAccountsSummary_FFetcher;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummary_getEAccountsSummaryResolver implements EAccountsSummary_getEAccountsSummary_FFetcher{",
      "",
      "   @Autowired",
      "   private DataSource dataSource;",
      "  public DataFetcher<Map<String,Object>> getEAccountsSummary(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName = dataFetchingEnvironment.getArgument(\"dbName\");",
      "      int brandRef = dataFetchingEnvironment.getArgument(\"brandRef\");",
      "      int applRef = dataFetchingEnvironment.getArgument(\"applRef\");",
      "      int clientRef = dataFetchingEnvironment.getArgument(\"clientRef\");",
      "      int accountId = dataFetchingEnvironment.getArgument(\"accountId\");",
      "      String employeeType = dataFetchingEnvironment.getArgument(\"employeeType\");",
      "      try(Connection connection = dataSource.getConnection()){",
      "        //from EAccountsSummary.rest[eAccountsSummary].resolvers[\"getEAccountsSummary\"]",
      "        Double totalMonthlyCost =  EAccountsSummary_getEAccountsSummary_totalMonthlyCost0(connection,dbName,accountId);",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put(\"totalMonthlyCost\", totalMonthlyCost);",
      "        return result;",
      "      }};",
      "    }",
      "",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public Double EAccountsSummary_getEAccountsSummary_totalMonthlyCost0(Connection connection, String dbName, int accountId) throws SQLException {",
      "      Double totalMonthlyCost = 234.0;",
      "      return totalMonthlyCost;",
      "  }",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ]);

  } )

  it ( "should make resolvers for non 'get' resolvers", () => {
    expect ( makeResolvers ( paramsForTest, EAccountsSummaryPD, 'eAccountsSummary', eAccountsSummaryRestD,
      'totalMonthlyCost', safeObject ( eAccountsSummaryRestD.resolvers ).balancesAndMonthlyCostResolver, findResolverData ( 'someError', findChildResolvers ( eAccountsSummaryRestD ), 'balancesAndMonthlyCostResolver' )
    )        .map(s => s.replace(/"/g, "'")) ).toEqual ( [
      "package focuson.data.resolvers.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import javax.sql.DataSource;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummary_balancesAndMonthlyCostResolverResolver implements EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher{",
      "",
      "   @Autowired",
      "   private DataSource dataSource;",
      "  public DataFetcher<Map<String,Object>> balancesAndMonthlyCostResolver(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName = dataFetchingEnvironment.getArgument('dbName');",
      "      int brandRef = dataFetchingEnvironment.getArgument('brandRef');",
      "      int applRef = dataFetchingEnvironment.getArgument('applRef');",
      "      int clientRef = dataFetchingEnvironment.getArgument('clientRef');",
      "      int accountId = dataFetchingEnvironment.getArgument('accountId');",
      "      String employeeType = dataFetchingEnvironment.getArgument('employeeType');",
      "      try(Connection connection = dataSource.getConnection()){",
      "        //from EAccountsSummary.rest[eAccountsSummary].resolvers['balancesAndMonthlyCostResolver']",
      "        Tuple3<Double,Double,Double> params0 =  EAccountsSummary_balancesAndMonthlyCostResolver_getTotalMonthlyCostStoredProc0(connection,dbName,accountId);",
      "        Double totalMonthlyCost = params0.t1;",
      "        Double oneAccountBalance = params0.t2;",
      "        Double currentAccountBalance = params0.t3;",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put('totalMonthlyCost', totalMonthlyCost);",
      "        result.put('oneAccountBalance', oneAccountBalance);",
      "        result.put('currentAccountBalance', currentAccountBalance);",
      "        return result;",
      "      }};",
      "    }",
      "",
      "    public Tuple3<Double,Double,Double> EAccountsSummary_totalMonthlyCost_getTotalMonthlyCostStoredProc0(Connection connection, String dbName, int accountId) throws SQLException {",
      "    try (CallableStatement s = connection.prepareCall('call getTotalMonthlyCostStoredProc(?, ?, ?, ?, ?, ?, ?, ?, ?)')) {",
      "      s.setObject(1, accountId);",
      "      s.setObject(2,null);",
      "      s.setObject(3,null);",
      "      s.setObject(4,null);",
      "      s.setObject(5,null);",
      "      s.setString(6, 'magicstring');",
      "      s.registerOutParameter(7,java.sql.Types.DOUBLE);",
      "      s.registerOutParameter(8,java.sql.Types.DOUBLE);",
      "      s.registerOutParameter(9,java.sql.Types.DOUBLE);",
      "      s.execute();",
      "      Double totalMonthlyCost = s.getDouble(7);",
      "      Double oneAccountBalance = s.getDouble(8);",
      "      Double currentAccountBalance = s.getDouble(9);",
      "      return new Tuple3<Double,Double,Double>(totalMonthlyCost,oneAccountBalance,currentAccountBalance);",
      "  }}",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ])
  } )

  it ( "should make resolvers for a sql list resolvers", () => {
    expect ( makeResolvers ( paramsForTest, PostCodeMainPage, 'postcode', postcodeWithResolversRestD,
      'getPostCodeDataLine', safeObject ( postcodeWithResolversRestD.resolvers ).getPostCodeDataLine, findQueryMutationResolver ( postcodeWithResolversRestD, 'get' )
    ) ).toEqual ( [
      "package focuson.data.resolvers.PostCodeMainPage;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import javax.sql.DataSource;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.PostCodeMainPage.PostCodeSearchResponse_getPostCodeDataLine_FFetcher;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class PostCodeSearchResponse_getPostCodeDataLineResolver implements PostCodeSearchResponse_getPostCodeDataLine_FFetcher{",
      "",
      "   @Autowired",
      "   private DataSource dataSource;",
      "  public DataFetcher<List<Map<String,Object>>> getPostCodeDataLine(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName = dataFetchingEnvironment.getArgument(\"dbName\");",
      "      String postcode = dataFetchingEnvironment.getArgument(\"postcode\");",
      "      try(Connection connection = dataSource.getConnection()){",
      "        //from PostCodeMainPage.rest[postcode].resolvers[\"getPostCodeDataLine\"]",
      "        Integer someValue =  PostCodeSearchResponse_getPostCodeDataLine_audit0(connection,dbName);",
      "        //from PostCodeMainPage.rest[postcode].resolvers[\"getPostCodeDataLine\"]",
      "        List<Map<String,Object>> params1 = PostCodeSearchResponse_getPostCodeDataLine_get1(connection,dbName,someValue);",
      "        List<Map<String,Object>> result= params1;",
      "        return result;",
      "      }};",
      "    }",
      "",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public Integer PostCodeSearchResponse_getPostCodeDataLine_audit0(Connection connection, String dbName) throws SQLException {",
      "      Integer someValue= 123;",
      "      return someValue;",
      "  }",
      "    public List<Map<String,Object>> PostCodeSearchResponse_getPostCodeDataLine_get1(Connection connection, String dbName, Object someValue) throws SQLException {",
      "    try (PreparedStatement s = connection.prepareStatement(\"select *from POSTCODE where postcode like ?'\")) {",
      "      s.setObject(1, someValue);",
      "      ResultSet rs = s.executeQuery();",
      "      List<Map<String,Object>> result = new ArrayList();",
      "      while (rs.next()){",
      "        Map<String,Object> oneLine = new HashMap();",
      "        oneLine.put(\"line1\", rs.getString(\"zzline1\"));",
      "        oneLine.put(\"line2\", rs.getString(\"zzline2\"));",
      "        oneLine.put(\"line3\", rs.getString(\"zzline3\"));",
      "        oneLine.put(\"line4\", rs.getString(\"zzline4\"));",
      "        result.add(oneLine);",
      "      }",
      "      return result;",
      "  }}",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ])
  } )


} )