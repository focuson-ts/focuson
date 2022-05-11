import { makeAudit } from "../codegen/makeAudit";
import { paramsForTest } from "./paramsForTest";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";

describe ( "makeAudit", () => {
  it ( "should create an audit class with a method for each audit for that rest", () => {
    expect ( makeAudit ( paramsForTest, EAccountsSummaryPD, eAccountsSummaryRestD ) ).toEqual ( [
      "package focuson.data.audit.EAccountsSummary;",
      "",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import focuson.data.fetchers.IFetcher;",
      "import org.springframework.stereotype.Component;",
      "",
      "import javax.sql.DataSource;",
      "import java.sql.CallableStatement;",
      "import java.sql.Connection;",
      "import java.sql.SQLException;",
      "@Component",
      "public class EAccountsSummaryAudit {",
      "",
      "    public void EAccountsSummary_state_invalidate_auditStuff(Connection connection, String dbName, String accountId, String clientRef) throws SQLException {",
      "        if (dbName.equals(IFetcher.mock)) {",
      "           System.out.println(\"Mock audit: EAccountsSummary_state_invalidate_auditStuff(\" + accountId + \", \" +clientRef+ \")\");",
      "           return;",
      "    }",
      "    try (CallableStatement s = connection.prepareCall(\"call auditStuff(?, ?)\")) {",
      "      s.setObject(1,accountId);",
      "      s.setObject(2,clientRef);",
      "    if (!s.execute()) throw new SQLException(\"Cannot not audit: EAccountsSummary_state_invalidate_auditStuff\");",
      "  }}",
      "",
      "}"
    ])
  } )

} )