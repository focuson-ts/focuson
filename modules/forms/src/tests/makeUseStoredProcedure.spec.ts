import { makeUseStoredProcedure } from "../codegen/makeUseStoredProcedure";
import { ChequeCreditbooksPD } from "../example/chequeCreditBooks/chequeCreditBooks.pageD";
import { chequeCreditBooksRestD } from "../example/chequeCreditBooks/chequeCreditBooks.restD";
import { paramsForTest } from "./paramsForTest";

describe ( "makeUseStoredProcedure", () => {
  it ( "should generate the java that will call a stored procedure with the given values, with parameters in the order given", () => {
    expect ( makeUseStoredProcedure ( paramsForTest, ChequeCreditbooksPD, 'restName', chequeCreditBooksRestD, { state: 'cancel' } ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ([
      "package focuson.data.dbfetchers.ChequeCreditbooks;",
      "",
      "import   focuson.data.fetchers.IFetcher;",
      "import  focuson.data.fetchers.ChequeCreditbooks.ChequeCreditbooks_state_cancel_FFetcher;",
      "import graphql.schema.DataFetcher;",
      "import org.springframework.stereotype.Component;",
      "",
      "import java.sql.Connection;",
      "import java.sql.CallableStatement;",
      "import java.util.Map;",
      "import java.util.Optional;",
      "",
      "@Component",
      "public class ChequeCreditbooks_state_cancel_FFetcherDB implements ChequeCreditbooks_state_cancel_FFetcher {",
      "",
      "  @SuppressWarnings('SqlResolve')",
      "  public DataFetcher stateChequeCreditbookscancel() {",
      "    return dataFetchingEnvironment -> {",
      "      String clientRef = dataFetchingEnvironment.getArgument('clientRef');",
      "      String accountId = dataFetchingEnvironment.getArgument('accountId');",
      "      Connection connection = dataFetchingEnvironment.getLocalContext();",
      "      try(CallableStatement s = connection.prepareCall('call cancelCheckBook(?, ?)')){",
      "          s.setObject(1,clientRef);",
      "          s.setObject(2,accountId);",
      "        return s.execute();",
      "      }};",
      "  }",
      "",
      "  @Override",
      "  public String dbName() {",
      "    return IFetcher.db;",
      "  }",
      "}"
    ])

  } )

} )