package focuson.data.audit.EAccountsSummary;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class EAccountsSummaryAudit {
    @Autowired
    private DataSource dataSource;

    public void EAccountsSummary_state_invalidate_auditStuff(String dbName, String accountId, String clientRef) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: EAccountsSummary_state_invalidate_auditStuff(" + accountId + ", " +clientRef+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditStuff(?, ?)")) {
      s.setObject(1,accountId);
      s.setObject(2,clientRef);
      if (!s.execute()) throw new SQLException("Cannot not audit: EAccountsSummary_state_invalidate_auditStuff");
  }}}

}