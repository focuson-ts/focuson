import { getFromResultSetIntoVariables, getFromStatement, makeMutations, mockReturnStatement, makeMutationResolverReturnStatement, setObjectFor, typeForParamAsInput } from "../codegen/makeMutations";
import { paramsForTest } from "./paramsForTest";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { chequeCreditBooksRestD } from "../example/chequeCreditBooks/chequeCreditBooks.restD";
import { ChequeCreditbooksPD } from "../example/chequeCreditBooks/chequeCreditBooks.pageD";
import { IntegerMutationParam, MutationParam, NullMutationParam, OutputForManualParam, OutputForSqlMutationParam, OutputForStoredProcMutationParam, StringMutationParam } from "../common/resolverD";
import { fromCommonIds } from "../example/commonIds";
import { safeArray } from "@focuson/utils";
import { PaymentsPageD } from "../example/payments/payments.pageD";
import { newPaymentsRD } from "../example/payments/payments.restD";

const stringMP: StringMutationParam = { type: 'string', value: 'someString' }
const integerMP: IntegerMutationParam = { type: "integer", value: 123 }
const spOutputMP: OutputForStoredProcMutationParam = { type: "output", javaType: 'String', name: "someNameSP", sqlType: 'someSqlType' }
const nullMP: NullMutationParam = { type: 'null' }
const sqlOutputMP: OutputForSqlMutationParam = { type: "output", rsName: 'rsName', name: "someNameSql", javaType: 'String' }
const manOutputMp: OutputForManualParam = { type: "output", javaType: 'Integer', name: 'someNameMan' }


describe ( "getFromStatement", () => {
  it ( "generate the code to get the mp from a CallableStatement", () => {
    expect ( getFromStatement ( 'ss', [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( [
      "String someNameSP = ss.getString(3);",
      "String someNameSql = ss.getString(5);",
      "Integer someNameMan = ss.getInt(6);"
    ] )
  } )
} )
describe ( "getFromResultSet", () => {
  it ( "generate the code to get the mp from a ResultSet", () => {
    expect ( getFromResultSetIntoVariables ( 'ss', [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( [
      "String someNameSql = ss.getString(\"rsName\");"
    ] )
  } )
} )
describe ( "setObjectFor", () => {
  it ( "generate the code to get the mp from a ResultSet", () => {
    expect ( [ stringMP, integerMP, spOutputMP, nullMP ].map ( setObjectFor ) ).toEqual ( [
      "s.setString(1, \"someString\");",
      "s.setInt(2, 123);",
      "s.registerOutParameter(3,java.sql.Types.someSqlType);",
      "s.setObject(4,null);",
    ] )
  } )
} )

describe ( "typeForParamAsInput", () => {
  it ( "the java type if the MutationParam was an input", () => {
    expect ( [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ].map ( typeForParamAsInput ( 'someError', {} ) ) ).toEqual (
      [ "String", "Integer", "String", "Object", "String", "Integer" ] )
  } )
  it ( "the java type of the input param if it's an input param or string, or the javaType", () => {
    let params: MutationParam[] = [ { type: "input", name: 'someName' }, { type: "input", name: 'someName', javaType: 'someJavaType' }, { type: "input", name: 'notIn' } ];
    expect ( params.map ( typeForParamAsInput ( 'someError', { someName: fromCommonIds ( 'accountId' )[ 'accountId' ] } ) ) ).toEqual (
      [ "int", "someJavaType", "Object" ] )
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
  it ( "void if no MPs", () => {
    expect ( makeMutationResolverReturnStatement ( [] ) ).toEqual ( 'return;' )
  } )
  it ( "the javatype if one MP", () => {
    expect ( makeMutationResolverReturnStatement ( [ spOutputMP, ] ) ).toEqual ( 'return someNameSP;' )
  } )
  it ( "A tuple if many MPs", () => {
    expect ( makeMutationResolverReturnStatement ( [ spOutputMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( 'return new Tuple3<>(someNameSP,someNameSql,someNameMan);' )
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
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.ArrayList;",
      "import java.util.List;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummary_state_invalidateMutation {",
      "",
      "    public void EAccountsSummary_state_invalidate_auditStuff(Connection connection, String dbName, int accountId, int clientRef) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: EAccountsSummary_state_invalidate_auditStuff( {'type':'string','value':'someString'}, accountId, clientRef+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditStuff(?, ?, ?)\")) {",
      "      s.setString(1, \"someString\");",
      "      s.setObject(2, accountId);",
      "      s.setObject(3, clientRef);",
      "      s.execute();",
      "      return;",
      "  }}",
      "",
      "}"
    ] )
  } )
  it ( "should create an mutation class with a method for each mutation for that rest - complex", () => {
    expect ( makeMutations ( paramsForTest, ChequeCreditbooksPD, 'theRestName', chequeCreditBooksRestD, safeArray ( chequeCreditBooksRestD.mutations )[ 0 ] ) ).toEqual ( [
      "package focuson.data.mutator.ChequeCreditbooks;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.ArrayList;",
      "import java.util.List;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "//added by param systemTime",
      "import focuson.data.utils.ITimeService;",
      "import focuson.data.mutator.utils.Tuple2;",
      "import java.util.Date;",
      "import java.util.Date;",
      "@Component",
      "public class ChequeCreditbooks_createMutation {",
      "",
      "    @Autowired",
      "    focuson.data.utils.ITimeService systemTime;",
      "",
      "    public Tuple2<Integer,String> ChequeCreditbooks_create_sequencename(Connection connection, Object dbName) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: ChequeCreditbooks_create_sequencename( {'type':'output','name':'checkbookId','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'checkbookIdPart2','javaType':'String','sqlType':'CHAR'}, {'type':'autowired','name':'systemTime','class':'{thePackage}.utils.ITimeService','method':'now','import':true}+ )\");",
      "           return new Tuple2<>(0,\"1\");",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call sequencename(?, ?, ?)\")) {",
      "      s.registerOutParameter(1,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(2,java.sql.Types.CHAR);",
      "      s.setObject(3, systemTime.now());",
      "      s.execute();",
      "      Integer checkbookId = s.getInt(1);",
      "      String checkbookIdPart2 = s.getString(2);",
      "      return new Tuple2<>(checkbookId,checkbookIdPart2);",
      "  }}",
      "    public void ChequeCreditbooks_create_auditCreateCheckBook(Connection connection, Object dbName, int brandRef, int accountId, Object checkbookId, Object checkbookIdPart2) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: ChequeCreditbooks_create_auditCreateCheckBook( brandRef, accountId, checkbookId, checkbookIdPart2+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditCreateCheckBook(?, ?, ?, ?)\")) {",
      "      s.setObject(1, brandRef);",
      "      s.setObject(2, accountId);",
      "      s.setObject(3, checkbookId);",
      "      s.setObject(4, checkbookIdPart2);",
      "      s.execute();",
      "      return;",
      "  }}",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public void ChequeCreditbooks_create_manualLog(Connection connection, Object dbName, Object checkbookId, Object checkbookIdPart2) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: ChequeCreditbooks_create_manualLog( checkbookId, checkbookIdPart2+ )\");",
      "           return;",
      "    }",
      "      String now = new Date().toString(); // just showing we can return values and use them. Also demonstrates import",
      "      System.out.println(now + \" checkbookid: \" + checkbookId + \" part2: \" + checkbookIdPart2);",
      "      return;",
      "  }",
      "",
      "}"
    ] )

  } )

  it ( "should make mutations for cases: i.e. where only one of several mutations will happen depending on the situation", () => {
    expect ( makeMutations ( paramsForTest, PaymentsPageD, 'newPayments', newPaymentsRD, safeArray ( newPaymentsRD.mutations )[ 0 ] ) ).toEqual ( [
      "package focuson.data.mutator.Payments;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.util.Map;",
      "import java.util.HashMap;",
      "import java.util.ArrayList;",
      "import java.util.List;",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class SummaryOfPaymentsTable_createMutation {",
      "",
      "//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?",
      "    public Tuple2<String,Integer> SummaryOfPaymentsTable_create_create0(Connection connection, Object dbName, int brandRef, int accountId) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: SummaryOfPaymentsTable_create_create0( brandRef, accountId, {'type':'output','name':'one','javaType':'String'}, {'type':'output','name':'two','javaType':'Integer'}+ )\");",
      "           return new Tuple2<>(\"0\",1);",
      "    }",
      "      if (true && brandRef==3) {",
      "        Tuple2<String,Integer> params0 = SummaryOfPaymentsTable_create_one0_0(connection,dbName,accountId);",
      "        String one = params0.t1;",
      "        Integer two = params0.t2;",
      "        // If you have a compilation error here: do the output params match the output params in the 'case'?",
      "        return new Tuple2<>(one,two);",
      "      }",
      "      if (true) {",
      "        Tuple2<Integer,String> params1 = SummaryOfPaymentsTable_create_two0_1(connection,dbName,accountId);",
      "        Integer two = params1.t1;",
      "        String one = params1.t2;",
      "        // If you have a compilation error here: do the output params match the output params in the 'case'?",
      "        return new Tuple2<>(one,two);",
      "      }",
      "      throw new RuntimeException(\"No guard condition executed\");",
      "  }",
      "    public Tuple2<String,Integer> SummaryOfPaymentsTable_create_one0_0(Connection connection, Object dbName, int accountId) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: SummaryOfPaymentsTable_create_one0_0( {'type':'string','value':'first'}, accountId, {'type':'output','name':'one','javaType':'String','sqlType':'CHAR'}, {'type':'output','name':'two','javaType':'Integer','sqlType':'INTEGER'}+ )\");",
      "           return new Tuple2<>(\"0\",1);",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call bo11.one(?, ?, ?, ?)\")) {",
      "      s.setString(1, \"first\");",
      "      s.setObject(2, accountId);",
      "      s.registerOutParameter(3,java.sql.Types.CHAR);",
      "      s.registerOutParameter(4,java.sql.Types.INTEGER);",
      "      s.execute();",
      "      String one = s.getString(3);",
      "      Integer two = s.getInt(4);",
      "      return new Tuple2<>(one,two);",
      "  }}",
      "    public Tuple2<Integer,String> SummaryOfPaymentsTable_create_two0_1(Connection connection, Object dbName, int accountId) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: SummaryOfPaymentsTable_create_two0_1( {'type':'string','value':'second'}, {'type':'output','name':'two','javaType':'Integer','sqlType':'INTEGER'}, {'type':'output','name':'one','javaType':'String','sqlType':'CHAR'}, accountId+ )\");",
      "           return new Tuple2<>(0,\"1\");",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call bo11.two(?, ?, ?, ?)\")) {",
      "      s.setString(1, \"second\");",
      "      s.registerOutParameter(2,java.sql.Types.INTEGER);",
      "      s.registerOutParameter(3,java.sql.Types.CHAR);",
      "      s.setObject(4, accountId);",
      "      s.execute();",
      "      Integer two = s.getInt(2);",
      "      String one = s.getString(3);",
      "      return new Tuple2<>(two,one);",
      "  }}",
      "",
      "}"
    ] )
  } )
} )