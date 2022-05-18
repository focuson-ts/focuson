import { getFromResultSet, getFromStatement, makeMutations, mockReturnStatement, returnStatement, setObjectFor, typeForParamAsInput } from "../codegen/makeMutations";
import { paramsForTest } from "./paramsForTest";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { chequeCreditBooksRestD } from "../example/chequeCreditBooks/chequeCreditBooks.restD";
import { ChequeCreditbooksPD } from "../example/chequeCreditBooks/chequeCreditBooks.pageD";
import { IntegerMutationParam, NullMutationParam, OutputForManualParam, OutputForSqlMutationParam, OutputForStoredProcMutationParam, StringMutationParam } from "../common/resolverD";

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
    expect ( getFromResultSet ( 'ss', [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( [
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
    expect ( [ stringMP, integerMP, spOutputMP, nullMP, sqlOutputMP, manOutputMp ].map ( typeForParamAsInput ) ).toEqual (
      [ "String", "Integer", "String", "Object", "String", "Integer" ] )
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
    expect ( returnStatement ( [] ) ).toEqual ( 'return;' )
  } )
  it ( "the javatype if one MP", () => {
    expect ( returnStatement ( [ spOutputMP, ] ) ).toEqual ( 'return someNameSP;' )
  } )
  it ( "A tuple if many MPs", () => {
    expect ( returnStatement ( [ spOutputMP, sqlOutputMP, manOutputMp ] ) ).toEqual ( 'return new Tuple3<>(someNameSP,someNameSql,someNameMan);' )
  } )
} )


describe ( "makeMutations", () => {
  it ( "should create an mutation class with a method for each mutation for that rest - simple", () => {
    expect ( makeMutations ( paramsForTest, EAccountsSummaryPD, eAccountsSummaryRestD, eAccountsSummaryRestD.mutations ) ).toEqual ( [
      "package focuson.data.mutator.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "//If there is a compilation issue here is it because you need to set 'maxTuples'? Currently set to 2 ",
      "import focuson.data.mutator.utils.Tuple2;",
      "@Component",
      "public class EAccountsSummaryMutation {",
      "",
      "    public void EAccountsSummary_state_invalidate_auditStuff(Connection connection, Object dbName, Object accountId, Object clientRef) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: EAccountsSummary_state_invalidate_auditStuff( {'type':'string','value':'someString'}, accountId, clientRef+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditStuff(?, ?, ?)\")) {",
      "      s.setString(1, \"someString\");",
      "      s.setObject(2, accountId);",
      "      s.setObject(3, clientRef);",
      "      if (!s.execute()) throw new SQLException(\"Error in : EAccountsSummary_state_invalidate_auditStuff\");",
      "      return;",
      "  }}",
      "",
      "}"
    ] )
  } )
  it ( "should create an mutation class with a method for each mutation for that rest - complex", () => {
    expect ( makeMutations ( paramsForTest, ChequeCreditbooksPD, chequeCreditBooksRestD, chequeCreditBooksRestD.mutations ) ).toEqual ( [
      "package focuson.data.mutator.ChequeCreditbooks;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
      "import java.sql.ResultSet;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "//added by param systemTime",
      "import focuson.data.utils.ITimeService;",
      "//If there is a compilation issue here is it because you need to set 'maxTuples'? Currently set to 2 ",
      "import focuson.data.mutator.utils.Tuple2;",
      "import java.util.Date;",
      "@Component",
      "public class ChequeCreditbooksMutation {",
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
      "      if (!s.execute()) throw new SQLException(\"Error in : ChequeCreditbooks_create_sequencename\");",
      "      Integer checkbookId = s.getInt(1);",
      "      String checkbookIdPart2 = s.getString(2);",
      "      return new Tuple2<>(checkbookId,checkbookIdPart2);",
      "  }}",
      "    public void ChequeCreditbooks_create_auditCreateCheckBook(Connection connection, Object dbName, Object brandRef, Object accountId, Object checkbookId, Object checkbookIdPart2) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: ChequeCreditbooks_create_auditCreateCheckBook( brandRef, accountId, checkbookId, checkbookIdPart2+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditCreateCheckBook(?, ?, ?, ?)\")) {",
      "      s.setObject(1, brandRef);",
      "      s.setObject(2, accountId);",
      "      s.setObject(3, checkbookId);",
      "      s.setObject(4, checkbookIdPart2);",
      "      if (!s.execute()) throw new SQLException(\"Error in : ChequeCreditbooks_create_auditCreateCheckBook\");",
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
      "    public void ChequeCreditbooks_get_auditGetCheckBook(Connection connection, Object dbName, Object brandRef, Object accountId) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: ChequeCreditbooks_get_auditGetCheckBook( brandRef, accountId+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditGetCheckBook(?, ?)\")) {",
      "      s.setObject(1, brandRef);",
      "      s.setObject(2, accountId);",
      "      if (!s.execute()) throw new SQLException(\"Error in : ChequeCreditbooks_get_auditGetCheckBook\");",
      "      return;",
      "  }}",
      "    public void ChequeCreditbooks_state_cancel_auditCancelCheckbook(Connection connection, Object dbName, Object brandRef, Object accountId) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: ChequeCreditbooks_state_cancel_auditCancelCheckbook( brandRef, accountId+ )\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditCancelCheckbook(?, ?)\")) {",
      "      s.setObject(1, brandRef);",
      "      s.setObject(2, accountId);",
      "      if (!s.execute()) throw new SQLException(\"Error in : ChequeCreditbooks_state_cancel_auditCancelCheckbook\");",
      "      return;",
      "  }}",
      "",
      "}"
    ])

  } )
} )