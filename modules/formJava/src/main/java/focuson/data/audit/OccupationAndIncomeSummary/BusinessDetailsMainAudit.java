package focuson.data.audit.OccupationAndIncomeSummary;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class BusinessDetailsMainAudit {
    @Autowired
    private DataSource dataSource;

    public void BusinessDetailsMain_get_auditGetBusinessDetails(String dbName, String clientRef) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: BusinessDetailsMain_get_auditGetBusinessDetails(" + clientRef+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditGetBusinessDetails(?)")) {
      s.setObject(1,clientRef);
      if (!s.execute()) throw new SQLException("Cannot not audit: BusinessDetailsMain_get_auditGetBusinessDetails");
  }}}

}