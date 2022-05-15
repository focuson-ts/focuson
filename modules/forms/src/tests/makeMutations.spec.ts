import { makeMutations } from "../codegen/makeMutations";
import { paramsForTest } from "./paramsForTest";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";

describe ( "makeAudit", () => {
  it ( "should create an audit class with a method for each audit for that rest", () => {
    expect ( makeMutations ( paramsForTest, EAccountsSummaryPD, eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.mutator.EAccountsSummary;",
      "",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "",
      "import java.sql.CallableStatement;",
      "import java.sql.PreparedStatement;",
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
    ])
  } )

} )