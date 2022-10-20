import { getFromResultSetIntoVariables, getFromStatement, makeMutationResolverReturnStatement, makeMutations, mockReturnStatement, mutationCodeForFunctionCalls, preTransactionLogger, setObjectFor, typeForParamAsInput } from "../codegen/makeMutations";
import { paramsForTest } from "./paramsForTest";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { InputMutationParam, IntegerMutationParam, ManualMutation, MutationParam, NullMutationParam, OutputForManualParam, OutputForSqlMutationParam, OutputForStoredProcMutationParam, PrimaryMutationDetail, StringMutationParam } from "../common/resolverD";
import { fromCommonIds } from "../example/commonIds";
import { safeArray, safeObject } from "@focuson/utils";
import { PaymentsPageD } from "../example/payments/payments.pageD";
import { newPaymentsRD, ValidatePayeeRD } from "../example/payments/payments.restD";
import { LinkedAccountDetailsPD } from "../example/linkedAccount/linkedAccountDetails.pageD";
import { collectionHistoryListRD, collectionSummaryRD } from "../example/linkedAccount/linkedAccountDetails.restD";

const stringMP: StringMutationParam = { type: 'string', value: 'someString' }
const integerMP: IntegerMutationParam = { type: "integer", value: 123 }
const spOutputMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'String', name: "someNameSP", sqlType: 'someSqlType' }
const inputWithDateFormatMP: InputMutationParam = { type: "input", javaType: 'String', name: "someNameSP", format: { type: 'Date', pattern: 'dd/MM/yyyy' } }
const inputWithBooleanFormatMP: InputMutationParam = { type: "input", javaType: 'Boolean', name: "someNameSP", format: { type: 'Boolean', true: 'Y', false: 'N' } }
const spOutputWithDoubleFormatMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'String', name: "someNameSP", sqlType: 'someSqlType', format: { type: 'Double', pattern: '%.2f' } }
const spOutputWithIntegerFormatMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'String', name: "someNameSP", sqlType: 'someSqlType', format: { type: 'Integer', pattern: '%10i' } }
const spOutputWithStringFormatMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'String', name: "someNameSP", sqlType: 'someSqlType', format: { type: 'String', pattern: '%20s' } }
const spOutputWithDateFormatMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'String', name: "someNameSP", sqlType: 'someSqlType', format: { type: 'Date', pattern: 'dd/MM/yyyy' } }
const spOutputWithBooleanFormatMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'Boolean', name: "someNameSP", sqlType: 'someSqlType', format: { type: 'Boolean', true: 'Y', false: 'N' } }
const sqlOutputWithDoubleFormatMP: OutputForSqlMutationParam = { type: "output", javaType: 'String', name: "someNameSP", rsName: 'theRsName', format: { type: 'Double', pattern: '%.2f' } }
const sqlOutputWithIntegerFormatMP: OutputForSqlMutationParam = { type: "output", javaType: 'String', name: "someNameSP", rsName: 'theRsname', format: { type: 'Integer', pattern: '%10i' } }
const sqlOutputWithStringFormatMP: OutputForSqlMutationParam = { type: "output", javaType: 'String', name: "someNameSP", rsName: 'theRsname', format: { type: 'String', pattern: '%20s' } }
const sqlOutputWithDateFormatMP: OutputForSqlMutationParam = { type: "output", javaType: 'String', name: "someNameSP", rsName: 'theRsname', format: { type: 'Date', pattern: 'dd/MM/yyyy' } }
const sqlOutputWithBooleanFormatMP: OutputForSqlMutationParam = { type: "output", javaType: 'Boolean', name: "someNameSP", rsName: 'theRsname', format: { type: 'Boolean', true: 'Y', false: 'N' } }
const nullMP: NullMutationParam = { type: 'null' }
const sqlOutputMP: OutputForSqlMutationParam = { type: "output", rsName: 'rsName', name: "someNameSql", javaType: 'String' }
const manOutputMp: OutputForManualParam = { type: "output", javaType: 'Integer', name: 'someNameMan' }


describe ( "getFromStatement", () => {
  it ( "generate the code to get the mp from a CallableStatement", () => {
    expect ( getFromStatement ( `somePrefix`, 'ss', [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( [
      "String someNameSP = ss.getString(3);",
      "String someNameSql = ss.getString(5);",
      "Integer someNameMan = ss.getInt(6);"
    ] )
  } )
} )
describe ( 'preTransactionLogger', () => {
  const inputb: InputMutationParam = { type: 'input', javaType: "String", name: 'b' }
  const inputbodyb: InputMutationParam = { type: 'body', javaType: "String", path: 'b' }
  const inputd: InputMutationParam = { type: 'input', javaType: "String", name: 'd' }
  const inputbodyd: InputMutationParam = { type: 'body', javaType: "String", path: 'd' }
  const inputBodyAsJson: InputMutationParam = { type: 'input', javaType: "Map<String,Object>", name: 'bodyAsJson' }
  const output: OutputForSqlMutationParam = { type: 'output', javaType: "Map<String,Object>", name: 'bodyAsJson', rsName: 'someRsName' }

  it ( "should make a log statement when no body parameters", () => {
    expect ( preTransactionLogger ( paramsForTest, 'TheResultType', [ 'a', output ] ) ).toEqual ( [
      "      logger.debug(MessageFormat.format(\"TheResultType: {0},a: {1}\",TheResultType,a));"
    ] )
    expect ( preTransactionLogger ( paramsForTest, 'TheResultType', [ inputb, output ] ) ).toEqual ( [
      "      logger.debug(MessageFormat.format(\"TheResultType: {0},b: {1}\",TheResultType,b));"
    ] )
    expect ( preTransactionLogger ( paramsForTest, 'TheResultType', [ 'a', 'c', 'e', output ] ) ).toEqual ( [
      "      logger.debug(MessageFormat.format(\"TheResultType: {0},a: {1},c: {2},e: {3}\",TheResultType,a,c,e));"
    ] )
    expect ( preTransactionLogger ( paramsForTest, 'TheResultType', [ 'a', inputb, 'c', inputd, 'e', output ] ) ).toEqual ( [
      "      logger.debug(MessageFormat.format(\"TheResultType: {0},a: {1},b: {2},c: {3},d: {4},e: {5}\",TheResultType,a,b,c,d,e));"
    ] )
  } )
  it ( "should make a log statement when body parameters", () => {
    expect ( preTransactionLogger ( paramsForTest, 'TheResultType', [ inputbodyb, output ] ) ).toEqual ( [
      "      logger.debug(MessageFormat.format(\"TheResultType: {0},bodyAsJson: {1}\",TheResultType,bodyAsJson));"
    ] )
    expect ( preTransactionLogger ( paramsForTest, 'TheResultType', [ 'a', inputbodyb, 'c', inputbodyd, 'e', output ] ) ).toEqual ( [
      "      logger.debug(MessageFormat.format(\"TheResultType: {0},a: {1},c: {2},e: {3},bodyAsJson: {4}\",TheResultType,a,c,e,bodyAsJson));"
    ] )
  } )

} )
describe ( "getFromResultSet", () => {
  it ( "generate the code to get the mp from a ResultSet", () => {
    expect ( getFromResultSetIntoVariables ( `somePrefix`, 'ss', [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( [
      "String someNameSql = ss.getString(\"rsName\");"
    ] )
  } )
  it ( "generate the code to get the mp from a ResultSet with patterns", () => {
    expect ( getFromResultSetIntoVariables ( `somePrefix`, 'ss', [ sqlOutputWithDoubleFormatMP, sqlOutputWithIntegerFormatMP, sqlOutputWithStringFormatMP, sqlOutputWithDateFormatMP, sqlOutputWithBooleanFormatMP ] )
      .map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "String someNameSP = String.format('%.2f', ss.getDouble('theRsName'));",
      "String someNameSP = String.format('%10i', ss.getInt('theRsname'));",
      "String someNameSP = String.format('%20s', ss.getString('theRsname'));",
      "String someNameSP = DateFormatter.formatDate('dd/MM/yyyy', ss.getDate('theRsname'));",
      "Boolean someNameSP = ss.getString('theRsname').equals('Y');"
    ] )
  } )
} )
describe ( "setObjectFor", () => {
  it ( "generate the code to get the mp from a ResultSet", () => {
    expect ( [ stringMP, integerMP, spOutputMP, nullMP ].map ( setObjectFor ( 'errorPrefix' ) ) ).toEqual ( [
      "s.setString(1, \"someString\");",
      "s.setInt(2, 123);",
      "s.registerOutParameter(3,java.sql.Types.someSqlType);",
      "s.setObject(4,null);",
    ] )
  } )
  it ( "should handle formats for strings - outputs", () => {
    expect ( [ spOutputWithDoubleFormatMP, spOutputWithIntegerFormatMP, spOutputWithStringFormatMP, spOutputWithDateFormatMP ].map ( setObjectFor ( 'errorPrefix' ) ) ).toEqual ( [
      "s.registerOutParameter(1,java.sql.Types.someSqlType);",
      "s.registerOutParameter(2,java.sql.Types.someSqlType);",
      "s.registerOutParameter(3,java.sql.Types.someSqlType);",
      "s.registerOutParameter(4,java.sql.Types.someSqlType);"
    ] )
  } )
  it ( "should handle formats for booleans - outputs", () => {
    expect ( [ spOutputWithBooleanFormatMP ].map ( setObjectFor ( 'errorPrefix' ) ) ).toEqual ( [
      "s.registerOutParameter(1,java.sql.Types.someSqlType);", ] )

  } )
  it ( "should handle formats for date - inputs", () => {
    expect ( [ inputWithDateFormatMP ].map ( setObjectFor ( 'errorPrefix' ) ) ).toEqual ( [
      "s.setDate(1, DateFormatter.parseDate(\"dd/MM/yyyy\", someNameSP));"
    ] )
  } )
  it ( "should handle formats for boolean - inputs", () => {
    expect ( [ inputWithBooleanFormatMP ].map ( setObjectFor ( 'errorPrefix' ) ) ).toEqual ( [
      "s.setString(1,someNameSP? \"Y\":\"N\");"
    ] )

  } )

} )

describe ( "typeForParamAsInput", () => {
  it ( "the java type if the MutationParam was an input", () => {
    expect ( [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ].map ( typeForParamAsInput ( 'someError', {} ) ) ).toEqual (
      [ "String", "Integer", "String", "Object", "String", "Integer" ] )
  } )
  it ( "the java type of the input param if it's an input param or string, or the javaType", () => {
    let params: MutationParam[] = [ { type: "input", name: 'someName' }, { type: "input", name: 'someName', javaType: 'String' }, { type: "input", name: 'notIn' } ];
    expect ( params.map ( typeForParamAsInput ( 'someError', { someName: fromCommonIds ( 'accountId' )[ 'accountId' ] } ) ) ).toEqual (
      [ "int", "String", "Object" ] )
  } )
} )
describe ( "mockReturnStatement", () => {
  it ( "void if no MPs", () => {
    expect ( mockReturnStatement ( [] ) ).toEqual ( 'return;' )
  } )
  it ( "the javatype if one MP", () => {
    expect ( mockReturnStatement ( [ manOutputMp ] ) ).toEqual ( "return 0;" )
    expect ( mockReturnStatement ( [ spOutputMP ] ) ).toEqual ( 'return "0";' )
  } )
  it ( "A tuple if many MPs", () => {
    expect ( mockReturnStatement ( [ spOutputMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( 'return new Tuple3<>("0","1",2);' )
  } )
} )
describe ( "returnStatement", () => {
  // @ts-ignore
  const pretendsToBeMutationDetail: PrimaryMutationDetail = {}
  // @ts-ignore
  const manualMutationWithThrowsException: ManualMutation = { type: "manual", throwsException: true }

  it ( "returns empty string if manual with throwsException", () => {
    expect ( makeMutationResolverReturnStatement ( manualMutationWithThrowsException, [] ) ).toEqual ( '//No return statement because it throws an exception' )
  } )
  it ( "void if no MPs", () => {
    expect ( makeMutationResolverReturnStatement ( pretendsToBeMutationDetail, [] ) ).toEqual ( 'return;' )
  } )
  it ( "the javatype if one MP", () => {
    expect ( makeMutationResolverReturnStatement ( pretendsToBeMutationDetail, [ spOutputMP, ] ) ).toEqual ( 'return someNameSP;//{"type":"output","javaType":"String","name":"someNameSP","sqlType":"someSqlType"} from {}' )
  } )
  it ( "A tuple if many MPs", () => {
    expect ( makeMutationResolverReturnStatement ( pretendsToBeMutationDetail, [ spOutputMP, sqlOutputMP, manOutputMp ] ) ).toEqual (
      'return new Tuple3<String,String,Integer>(someNameSP,someNameSql,someNameMan);' )
  } )
} )

describe ( "sql functions", () => {
  it ( "should make resolver for a sqlfunction", () => {
    let sqlFunctionMutation: any = safeObject ( collectionSummaryRD.resolvers ).getAccountType;
    expect ( mutationCodeForFunctionCalls ( paramsForTest, 'errorPrefix', LinkedAccountDetailsPD, collectionSummaryRD,
      'getAccountType', sqlFunctionMutation, "I", false ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    public Integer getAccountTypeI(Connection connection, Messages msgs, Object dbName) throws SQLException {",
      "      String sqlFunction = '{? = call b00.getAccountType()}';",
      "      try (CallableStatement s = connection.prepareCall(sqlFunction)) {",
      "            logger.debug(MessageFormat.format('sqlFunction: {0}', sqlFunction));",
      "      s.registerOutParameter(1,java.sql.Types.INTEGER);",
      "            long start = System.nanoTime();",
      "            s.execute();",
      "      Integer accountType = s.getInt(1);",
      "      logger.debug(MessageFormat.format('Duration: {0,number,#.##}, accountType: {1}', (System.nanoTime() - start) / 1000000.0, accountType));",
      "      return accountType;//{'type':'output','name':'accountType','javaType':'Integer','sqlType':'INTEGER'} from {'type':'sqlFunction','name':'getAccountType','package':'b00','schema':{'name':'TheSchema'},'params':[{'type':'output','name':'accountType','javaType':'Integer','sqlType':'INTEGER'}]}",
      "    }}"
    ] )
  } )


} )


describe ( "makeMutations", () => {


  it ( "should create an mutation class with a method for each mutation for that rest - simple", () => {
    expect ( makeMutations ( paramsForTest, EAccountsSummaryPD, 'theRestName', eAccountsSummaryRestD, safeArray ( eAccountsSummaryRestD.mutations )[ 0 ] ) ).toEqual ( [
      "package focuson.data.mutator.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import focuson.data.utils.FocusonBadRequest400Exception;",
      "import focuson.data.utils.DateFormatter;",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.*;",
      "import java.sql.*;",
      "import focuson.data.utils.IOGNL;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.fetchers.EAccountsSummary.*;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummary_state_invalidateMutation {",
      "",
      "Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "    @Autowired IOGNL ognlForBodyAsJson;",
      "    public void auditStuff0(Connection connection, Messages msgs, String dbName, int accountId, int clientRef) throws SQLException {",
      "      String storedProc = \"call auditStuff(?, ?, ?)\";",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: auditStuff0( {'type':'string','value':'someString'}, accountId, clientRef+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(storedProc)) {",
      "      logger.debug(MessageFormat.format(\"storedProc: {0},accountId: {1},clientRef: {2}\",storedProc,accountId,clientRef));",
      "      s.setString(1, \"someString\");",
      "      s.setObject(2, accountId);",
      "      s.setObject(3, clientRef);",
      "      long start = System.nanoTime();",
      "      s.execute();",
      "      logger.debug(MessageFormat.format(\"Duration: {0,number,#.##}\", (System.nanoTime() - start) / 1000000.0));",
      "return;",
      "}",
      "  }",
      "",
      "}"
    ] )

  } )

  it ( "should make mutations for cases: i.e. where only one of several mutations will happen depending on the situation", () => {
    expect ( makeMutations ( paramsForTest, PaymentsPageD, 'newPayments', newPaymentsRD, safeArray ( newPaymentsRD.mutations )[ 0 ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.mutator.Payments;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import focuson.data.utils.FocusonBadRequest400Exception;",
      "import focuson.data.utils.DateFormatter;",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.*;",
      "import java.sql.*;",
      "import focuson.data.utils.IOGNL;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.fetchers.Payments.*;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class oneLine_Payment_createMutation {",
      "",
      "Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "    @Autowired IOGNL ognlForBodyAsJson;",
      "  @Autowired",
      "  public focuson.data.utils.IOGNL ognl;",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public Tuple2<String,Integer> create0(Connection connection, Messages msgs, Object dbName, int brandRef, int accountId) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println('Mock audit: create0( brandRef, accountId, {'type':'output','name':'one','javaType':'String'}, {'type':'output','name':'two','javaType':'Integer'}+ )');",
      "           return new Tuple2<>('0',1);",
      "    }",
      "      if (true && brandRef==3){",
      "        Tuple15<String,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer> params0 = one0_0(connection,msgs,dbName,accountId);",
      "        //If you get a compilation in the following variables because of a name conflict: check the output params. Each output param can only be defined once.",
      "        String one = params0.t1;",
      "        Integer two = params0.t2;",
      "        Integer three = params0.t3;",
      "        Integer four = params0.t4;",
      "        Integer five = params0.t5;",
      "        Integer six = params0.t6;",
      "        Integer seven = params0.t7;",
      "        Integer eight = params0.t8;",
      "        Integer nine = params0.t9;",
      "        Integer ten = params0.t10;",
      "        Integer eleven = params0.t11;",
      "        Integer twelve = params0.t12;",
      "        Integer thirteen = params0.t13;",
      "        Integer fourteen = params0.t14;",
      "        Integer fiveteen = params0.t15;",
      "      // If you have a compilation error here: do the output params match the output params in the 'case'?",
      "      return new Tuple2<String,Integer>(one,two);",
      "      }",
      "      if (true){",
      "        Tuple2<Integer,String> params1 = two0_1(connection,msgs,dbName,accountId);",
      "        //If you get a compilation in the following variables because of a name conflict: check the output params. Each output param can only be defined once.",
      "        Integer two = params1.t1;",
      "        String one = params1.t2;",
      "      // If you have a compilation error here: do the output params match the output params in the 'case'?",
      "      return new Tuple2<String,Integer>(one,two);",
      "      }",
      "      throw new RuntimeException('No guard condition executed');",
      "  }",
      "    public Tuple15<String,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer> one0_0(Connection connection, Messages msgs, Object dbName, int accountId) throws SQLException {",
      "      String storedProc = 'call bo11.one(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println('Mock audit: one0_0( {'type':'string','value':'first'}, accountId, {'type':'output','name':'one','javaType':'String','sqlType':'CHAR'}, {'type':'output','name':'two','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'three','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'four','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'five','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'six','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'seven','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'eight','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'nine','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'ten','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'eleven','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'twelve','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'thirteen','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'fourteen','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'fiveteen','javaType':'Integer','sqlType':'INTEGER'}+ )');",
      "           return new Tuple15<>('0',1,2,3,4,5,6,7,8,9,10,11,12,13,14);",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(storedProc)) {",
      "      logger.debug(MessageFormat.format('storedProc: {0},accountId: {1}',storedProc,accountId));",
      "      s.setString(1, 'first');",
      "      s.setObject(2, accountId);",
      "      s.registerOutParameter(3,java.sql.Types.CHAR);",
      "      s.registerOutParameter(4,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(5,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(6,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(7,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(8,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(9,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(10,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(11,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(12,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(13,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(14,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(15,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(16,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(17,java.sql.Types.INTEGER);",
      "      long start = System.nanoTime();",
      "      s.execute();",
      "      String one = s.getString(3);",
      "      Integer two = s.getInt(4);",
      "      Integer three = s.getInt(5);",
      "      Integer four = s.getInt(6);",
      "      Integer five = s.getInt(7);",
      "      Integer six = s.getInt(8);",
      "      Integer seven = s.getInt(9);",
      "      Integer eight = s.getInt(10);",
      "      Integer nine = s.getInt(11);",
      "      Integer ten = s.getInt(12);",
      "      Integer eleven = s.getInt(13);",
      "      Integer twelve = s.getInt(14);",
      "      Integer thirteen = s.getInt(15);",
      "      Integer fourteen = s.getInt(16);",
      "      Integer fiveteen = s.getInt(17);",
      "      logger.debug(MessageFormat.format('Duration: {0,number,#.##}, one: {1}, two: {2}, three: {3}, four: {4}, five: {5}, six: {6}, seven: {7}, eight: {8}, nine: {9}, ten: {10}, eleven: {11}, twelve: {12}, thirteen: {13}, fourteen: {14}, fiveteen: {15}', (System.nanoTime() - start) / 1000000.0, one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fiveteen));",
      "return new Tuple15<String,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer>(one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fiveteen);",
      "}",
      "  }",
      "    public Tuple2<Integer,String> two0_1(Connection connection, Messages msgs, Object dbName, int accountId) throws SQLException {",
      "      String storedProc = 'call bo11.two(?, ?, ?, ?)';",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println('Mock audit: two0_1( {'type':'string','value':'second'}, {'type':'output','name':'two','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'one','javaType':'String','sqlType':'CHAR'}, accountId+ )');",
      "           return new Tuple2<>(0,'1');",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(storedProc)) {",
      "      logger.debug(MessageFormat.format('storedProc: {0},accountId: {1}',storedProc,accountId));",
      "      s.setString(1, 'second');",
      "      s.registerOutParameter(2,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(3,java.sql.Types.CHAR);",
      "      s.setObject(4, accountId);",
      "      long start = System.nanoTime();",
      "      s.execute();",
      "      Integer two = s.getInt(2);",
      "      String one = s.getString(3);",
      "      logger.debug(MessageFormat.format('Duration: {0,number,#.##}, two: {1}, one: {2}', (System.nanoTime() - start) / 1000000.0, two,one));",
      "return new Tuple2<Integer,String>(two,one);",
      "}",
      "  }",
      "",
      "}"
    ] )
  } )

  it ( "shouldn't make mock in message types when makeMock false selected", () => {
    expect ( makeMutations ( paramsForTest, PaymentsPageD, 'newPayments', ValidatePayeeRD, safeArray ( ValidatePayeeRD.mutations )[ 0 ] ) ).toEqual ( [
      "package focuson.data.mutator.Payments;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import focuson.data.utils.FocusonBadRequest400Exception;",
      "import focuson.data.utils.DateFormatter;",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.*;",
      "import java.sql.*;",
      "import focuson.data.utils.IOGNL;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.fetchers.Payments.*;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class ValidatedPayeeDetails_state_validateMutation {",
      "",
      "Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "    @Autowired IOGNL ognlForBodyAsJson;",
      "//If you have a compilation error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "//If you have a compilation error because of a 'cannot resolve symbol' you may need to add the class to the 'imports'",
      "    public String ValidatedPayeeDetails_state_validate_undefined0(Connection connection, Messages msgs, Object dbName) throws SQLException {",
      "      String payeeStatus= \"SUCCEEDED!!!!!\";",
      "      return payeeStatus;//{\"type\":\"output\",\"name\":\"payeeStatus\",\"javaType\":\"String\"} from {\"type\":\"manual\",\"code\":\"String payeeStatus= \\\"SUCCEEDED!!!!!\\\";\",\"makeMock\":false,\"params\":[{\"type\":\"output\",\"name\":\"payeeStatus\",\"javaType\":\"String\"}]}",
      "  }",
      "",
      "}"
    ] )


  } )

  it ( "should make mutations for the formats", () => {
    expect ( makeMutations ( paramsForTest, LinkedAccountDetailsPD, 'collectionHistoryList', collectionHistoryListRD,
      safeArray ( collectionHistoryListRD.mutations )[ 0 ] ).map ( l => l.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data.mutator.LinkedAccountDetails;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import focuson.data.utils.FocusonBadRequest400Exception;",
      "import focuson.data.utils.DateFormatter;",
      "import org.slf4j.Logger;",
      "import org.slf4j.LoggerFactory;",
      "import java.text.MessageFormat;",
      "import java.util.*;",
      "import java.sql.*;",
      "import focuson.data.utils.IOGNL;",
      "import focuson.data.utils.DateFormatter;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.fetchers.LinkedAccountDetails.*;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class CollectionsList_getMutation {",
      "",
      "Logger logger = LoggerFactory.getLogger(getClass());",
      "",
      "    @Autowired IOGNL ognlForBodyAsJson;",
      "    public Tuple3<String,String,String> CollectionsList_get_undefined0(Connection connection, Messages msgs, Object dbName) throws SQLException {",
      "    String sql = 'select amount as amountd, id, amount as amounts '+\n      'from Collection_History ';",
      "    try (PreparedStatement s = connection.prepareStatement(sql)) {",
      "      logger.debug(MessageFormat.format('sql: {0}', sql));",
      "      long start = System.nanoTime();",
      "      ResultSet rs = s.executeQuery();",
      "      if (!rs.next())throw new SQLException('Error in : CollectionsList_get_undefined0. Cannot get first item. Index was 0 Sql was select amount as amountd, id, amount as amounts                                             from Collection_History\\nLinkedAccountDetails.rest[collectionHistoryList]. Making mutations for get. Mutation get undefined');",
      "      String amtDouble = String.format('%,2f', rs.getDouble('amountd'));",
      "      String id = String.format('%d', rs.getInt('id'));",
      "      String amtString = String.format('%s', rs.getString('amounts'));",
      "      logger.debug(MessageFormat.format('Duration: {0,number,#.##}, amtDouble: {1}, id: {2}, amtString: {3}', (System.nanoTime() - start) / 1000000.0, amtDouble,id,amtString));",
      "      return new Tuple3<String,String,String>(amtDouble,id,amtString);",
      "  }}",
      "",
      "}"
    ] )

  } )
} )