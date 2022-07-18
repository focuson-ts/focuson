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
import { ListOfPaymentsPagePD } from "../example/ListOfPayments/listOfPayements.pageD";
import { accountAndAddressDetailsRD } from "../example/ListOfPayments/listOfPayements.restD";

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
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Date;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_getChequeCreditbooks_FFetcher;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import static focuson.data.utils.GraphQlUtils.getData;",
      "import focuson.data.utils.DateFormatter;",
      "//added by param systemTime",
      "import focuson.data.utils.ITimeService;",
      "import focuson.data.mutator.utils.Tuple2;",
      "import java.util.Date;",
      "@Component",
      "public class ChequeCreditbooks_getChequeCreditbooksResolver implements ChequeCreditbooks_getChequeCreditbooks_FFetcher{",
      "",
      "   Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "   @Autowired",
      "   private LoggedDataSource dataSource;",
      "    @Autowired",
      "    focuson.data.utils.ITimeService systemTime;",
      "",
      "  public DataFetcher<Map<String,Object>> getChequeCreditbooks(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName =  getData(dataFetchingEnvironment, \"dbName\");",
      "      int brandRef =  getData(dataFetchingEnvironment, \"brandRef\");",
      "      int applRef =  getData(dataFetchingEnvironment, \"applRef\");",
      "      int clientRef =  getData(dataFetchingEnvironment, \"clientRef\");",
      "      int accountId =  getData(dataFetchingEnvironment, \"accountId\");",
      "      Messages msgs=dataFetchingEnvironment.getLocalContext();",
      "      Connection connection = dataSource.getConnection(getClass());",
      "      try  {",
      "        //from ChequeCreditbooks.rest[chequeCreditBooks].resolvers[\"getChequeCreditbooks\"]",
      "        Tuple2<Integer,String> params0 =  getMeMyData10(connection,msgs,dbName);",
      "        Integer val1 = params0.t1;",
      "        String val2 = params0.t2;",
      "        //from ChequeCreditbooks.rest[chequeCreditBooks].resolvers[\"getChequeCreditbooks\"]",
      "        Tuple2<String,String> params1 =  getMeMyData21(connection,msgs,dbName);",
      "        String val3 = params1.t1;",
      "        String val4 = params1.t2;",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put(\"val1\", val1);",
      "        result.put(\"val2\", val2);",
      "        result.put(\"val3\", val3);",
      "        result.put(\"val4\", val4);",
      "        return result;",
      "       } finally {dataSource.close(getClass(),connection);}",
      "    };}",
      "",
      "    public Tuple2<Integer,String> getMeMyData10(Connection connection, Messages msgs, Object dbName) throws SQLException {",
      "      String storedProc = \"call somePackage.getMeMyData1(?, ?, ?)\";",
      "    try (CallableStatement s = connection.prepareCall(storedProc)) {",
      "      logger.debug(MessageFormat.format(\"storedProc: {0}\", storedProc));",
      "      s.registerOutParameter(1,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(2,java.sql.Types.DATE);",
      "      s.setObject(3, systemTime.now());",
      "      long start = System.nanoTime();",
      "      s.execute();",
      "      Integer val1 = s.getInt(1);",
      "      String val2 = DateFormatter.formatDate(\"dd-MM-yyyy\", s.getDate(2));",
      "      logger.debug(MessageFormat.format(\"Duration: {0,number,#.##}, val1: {1}, val2: {2}\", (System.nanoTime() - start) / 1000000.0, val1,val2));",
      "      return new Tuple2<Integer,String>(val1,val2);",
      "  }}",
      "    public Tuple2<String,String> getMeMyData21(Connection connection, Messages msgs, Object dbName) throws SQLException {",
      "      String storedProc = \"call getMeMyData2(?, ?, ?)\";",
      "    try (CallableStatement s = connection.prepareCall(storedProc)) {",
      "      logger.debug(MessageFormat.format(\"storedProc: {0}\", storedProc));",
      "      s.registerOutParameter(1,java.sql.Types.DATE);",
      "      s.registerOutParameter(2,java.sql.Types.CHAR);",
      "      s.setObject(3, systemTime.now());",
      "      long start = System.nanoTime();",
      "      s.execute();",
      "      String val3 = DateFormatter.formatDate(\"dd-MM-yyyy\", s.getDate(1));",
      "      String val4 = s.getString(2);",
      "      logger.debug(MessageFormat.format(\"Duration: {0,number,#.##}, val3: {1}, val4: {2}\", (System.nanoTime() - start) / 1000000.0, val3,val4));",
      "      return new Tuple2<String,String>(val3,val4);",
      "  }}",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ])
  } )

  it ( `should make a resolver for a 'get' that is done manually`, () => {
    expect ( makeResolvers ( paramsForTest, EAccountsSummaryPD, 'eAccountsSummary', eAccountsSummaryRestD,
      'getEAccountsSummary', safeObject ( eAccountsSummaryRestD.resolvers ).totalMonthlyCost, findQueryMutationResolver ( eAccountsSummaryRestD, 'get' )
    ) ).toEqual ([
      "package focuson.data.resolvers.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Date;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_getEAccountsSummary_FFetcher;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import static focuson.data.utils.GraphQlUtils.getData;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummary_getEAccountsSummaryResolver implements EAccountsSummary_getEAccountsSummary_FFetcher{",
      "",
      "   Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "   @Autowired",
      "   private LoggedDataSource dataSource;",
      "  public DataFetcher<Map<String,Object>> getEAccountsSummary(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName =  getData(dataFetchingEnvironment, \"dbName\");",
      "      int brandRef =  getData(dataFetchingEnvironment, \"brandRef\");",
      "      int applRef =  getData(dataFetchingEnvironment, \"applRef\");",
      "      int clientRef =  getData(dataFetchingEnvironment, \"clientRef\");",
      "      int accountId =  getData(dataFetchingEnvironment, \"accountId\");",
      "      String employeeType =  getData(dataFetchingEnvironment, \"employeeType\");",
      "      Messages msgs=dataFetchingEnvironment.getLocalContext();",
      "      Connection connection = dataSource.getConnection(getClass());",
      "      try  {",
      "        //from EAccountsSummary.rest[eAccountsSummary].resolvers[\"getEAccountsSummary\"]",
      "        Double totalMonthlyCost =  totalMonthlyCost0(connection,msgs,dbName,accountId);",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put(\"totalMonthlyCost\", totalMonthlyCost);",
      "        return result;",
      "       } finally {dataSource.close(getClass(),connection);}",
      "    };}",
      "",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public Double totalMonthlyCost0(Connection connection, Messages msgs, String dbName, int accountId) throws SQLException {",
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
    ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ([
      "package focuson.data.resolvers.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Date;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.EAccountsSummary.EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import static focuson.data.utils.GraphQlUtils.getData;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummary_balancesAndMonthlyCostResolverResolver implements EAccountsSummary_balancesAndMonthlyCostResolver_FFetcher{",
      "",
      "   Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "   @Autowired",
      "   private LoggedDataSource dataSource;",
      "  public DataFetcher<Map<String,Object>> balancesAndMonthlyCostResolver(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName =  getData(dataFetchingEnvironment, 'dbName');",
      "      int brandRef =  getData(dataFetchingEnvironment, 'brandRef');",
      "      int applRef =  getData(dataFetchingEnvironment, 'applRef');",
      "      int clientRef =  getData(dataFetchingEnvironment, 'clientRef');",
      "      int accountId =  getData(dataFetchingEnvironment, 'accountId');",
      "      String employeeType =  getData(dataFetchingEnvironment, 'employeeType');",
      "      Messages msgs=dataFetchingEnvironment.getLocalContext();",
      "      Connection connection = dataSource.getConnection(getClass());",
      "      try  {",
      "        //from EAccountsSummary.rest[eAccountsSummary].resolvers['balancesAndMonthlyCostResolver']",
      "        Tuple3<Double,Double,Double> params0 =  getTotalMonthlyCostStoredProc0(connection,msgs,dbName,accountId);",
      "        Double totalMonthlyCost = params0.t1;",
      "        Double oneAccountBalance = params0.t2;",
      "        Double currentAccountBalance = params0.t3;",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put('totalMonthlyCost', totalMonthlyCost);",
      "        result.put('oneAccountBalance', oneAccountBalance);",
      "        result.put('currentAccountBalance', currentAccountBalance);",
      "        return result;",
      "       } finally {dataSource.close(getClass(),connection);}",
      "    };}",
      "",
      "    public Tuple3<Double,Double,Double> getTotalMonthlyCostStoredProc0(Connection connection, Messages msgs, String dbName, int accountId) throws SQLException {",
      "      String storedProc = 'call getTotalMonthlyCostStoredProc(?, ?, ?, ?, ?, ?, ?, ?, ?)';",
      "    try (CallableStatement s = connection.prepareCall(storedProc)) {",
      "      logger.debug(MessageFormat.format('storedProc: {0},accountId: {1},', storedProc,accountId));",
      "      s.setObject(1, accountId);",
      "      s.setObject(2,null);",
      "      s.setObject(3,null);",
      "      s.setObject(4,null);",
      "      s.setObject(5,null);",
      "      s.setString(6, 'magicstring');",
      "      s.registerOutParameter(7,java.sql.Types.DOUBLE);",
      "      s.registerOutParameter(8,java.sql.Types.DOUBLE);",
      "      s.registerOutParameter(9,java.sql.Types.DOUBLE);",
      "      long start = System.nanoTime();",
      "      s.execute();",
      "      Double totalMonthlyCost = s.getDouble(7);",
      "      Double oneAccountBalance = s.getDouble(8);",
      "      Double currentAccountBalance = s.getDouble(9);",
      "      logger.debug(MessageFormat.format('Duration: {0,number,#.##}, totalMonthlyCost: {1}, oneAccountBalance: {2}, currentAccountBalance: {3}', (System.nanoTime() - start) / 1000000.0, totalMonthlyCost,oneAccountBalance,currentAccountBalance));",
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
    ) ).toEqual ([
      "package focuson.data.resolvers.PostCodeMainPage;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Date;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.PostCodeMainPage.PostCodeSearchResponse_getPostCodeDataLine_FFetcher;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import static focuson.data.utils.GraphQlUtils.getData;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class PostCodeSearchResponse_getPostCodeDataLineResolver implements PostCodeSearchResponse_getPostCodeDataLine_FFetcher{",
      "",
      "   Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "   @Autowired",
      "   private LoggedDataSource dataSource;",
      "  public DataFetcher<List<Map<String,Object>>> getPostCodeDataLine(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName =  getData(dataFetchingEnvironment, \"dbName\");",
      "      String postcode =  getData(dataFetchingEnvironment, \"postcode\");",
      "       Messages msgs=dataFetchingEnvironment.getLocalContext();",
      "      Connection connection = dataSource.getConnection(getClass());",
      "      try  {",
      "        //from PostCodeMainPage.rest[postcode].resolvers[\"getPostCodeDataLine\"]",
      "        Integer someValue =  audit0(connection,msgs,dbName);",
      "        //from PostCodeMainPage.rest[postcode].resolvers[\"getPostCodeDataLine\"]",
      "        List<Map<String,Object>> params1 = get1(connection,msgs,dbName,someValue);",
      "        List<Map<String,Object>> result= params1;",
      "        return result;",
      "       } finally {dataSource.close(getClass(),connection);}",
      "    };}",
      "",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public Integer audit0(Connection connection, Messages msgs, String dbName) throws SQLException {",
      "      Integer someValue= 123;",
      "      return someValue;",
      "  }",
      "    public List<Map<String,Object>> get1(Connection connection, Messages msgs, String dbName, Object someValue) throws SQLException {",
      "    String sql = \"select *from POSTCODE where postcode like ?\";",
      "    try (PreparedStatement s = connection.prepareStatement(sql)) {",
      "      logger.debug(MessageFormat.format(\"sql: {0},someValue: {1},\", sql,someValue));",
      "      s.setObject(1, someValue);",
      "      long start = System.nanoTime();",
      "      ResultSet rs = s.executeQuery();",
      "      List<Map<String,Object>> result = new ArrayList();",
      "      while (rs.next()){",
      "        Map<String,Object> oneLine = new HashMap();",
      "        oneLine.put(\"line1\", DateFormatter.formatDate(\"dd-MM-yyyy\", rs.getDate(\"zzline1\")));",
      "        oneLine.put(\"line2\", rs.getString(\"zzline2\"));",
      "        oneLine.put(\"line3\", rs.getString(\"zzline3\"));",
      "        oneLine.put(\"line4\", rs.getString(\"zzline4\"));",
      "        result.add(oneLine);",
      "      }",
      "      if (result.isEmpty()) msgs.error(\"There was no result\");",
      "      logger.debug(MessageFormat.format(\"Duration: {0,number,#.##}, line1: {1}, line2: {2}, line3: {3}, line4: {4}\", (System.nanoTime() - start) / 1000000.0, line1,line2,line3,line4));",
      "      return result;",
      "  }}",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ])
  } )

  it ( 'should make a resolver for using fromParent types', () => {
    expect ( makeResolvers ( paramsForTest, ListOfPaymentsPagePD, 'accountDetails', accountAndAddressDetailsRD,
      'getFullName', safeObject ( accountAndAddressDetailsRD.resolvers ).getFullName,
      findQueryMutationResolver ( accountAndAddressDetailsRD, 'get' ) ) ).toEqual ( [
      "package focuson.data.resolvers.ListOfPaymentsPage;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.List;",
      "import java.util.ArrayList;",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.Date;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import graphql.schema.DataFetcher;",
      "import focuson.data.fetchers.ListOfPaymentsPage.AccountDetailsForListOfPayments_getAccountDetailsForListOfPayments_FFetcher;",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import static focuson.data.utils.GraphQlUtils.getData;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class AccountDetailsForListOfPayments_getAccountDetailsForListOfPaymentsResolver implements AccountDetailsForListOfPayments_getAccountDetailsForListOfPayments_FFetcher{",
      "",
      "   Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "   @Autowired",
      "   private LoggedDataSource dataSource;",
      "  public DataFetcher<Map<String,Object>> getAccountDetailsForListOfPayments(){",
      "    return dataFetchingEnvironment -> {",
      "      String dbName =  getData(dataFetchingEnvironment, \"dbName\");",
      "      int accountId =  getData(dataFetchingEnvironment, \"accountId\");",
      "      int vbAcountSeq =  getData(dataFetchingEnvironment, \"vbAcountSeq\");",
      "      int employeeId =  getData(dataFetchingEnvironment, \"employeeId\");",
      "      int clientRef =  getData(dataFetchingEnvironment, \"clientRef\");",
      "      Map<String,Object> paramsFromParent = dataFetchingEnvironment.getSource();",
      "      String title = (String)paramsFromParent.get(\"title\");",
      "      String forename = (String)paramsFromParent.get(\"forename\");",
      "      String surname = (String)paramsFromParent.get(\"surname\");",
      "      Messages msgs=dataFetchingEnvironment.getLocalContext();",
      "      Connection connection = dataSource.getConnection(getClass());",
      "      try  {",
      "        //from ListOfPaymentsPage.rest[accountDetails].resolvers[\"getAccountDetailsForListOfPayments\"]",
      "        String fullname =  AccountDetailsForListOfPayments_getAccountDetailsForListOfPayments_undefined0(connection,msgs,dbName,title,forename,surname);",
      "        Map<String,Object> result=new HashMap<>();",
      "        result.put(\"fullname\", fullname);",
      "        return result;",
      "       } finally {dataSource.close(getClass(),connection);}",
      "    };}",
      "",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public String AccountDetailsForListOfPayments_getFullName_undefined0(Connection connection, Messages msgs, Object dbName, String title, String forename, String surname) throws SQLException {",
      "      String fullname = title + \" \" + forename + \" \" + surname;",
      "      return fullname;",
      "  }",
      "",
      "public String dbName() {return IFetcher.db; }",
      "}"
    ])
  } )
} )