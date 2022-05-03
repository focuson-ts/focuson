package focuson.data.audit.OccupationAndIncomeSummary;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class OtherIncomeResponseAudit {
    @Autowired
    private DataSource dataSource;

    public void OtherIncomeResponse_get_auditGetBusinessDetails(String dbName, String customerId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: OtherIncomeResponse_get_auditGetBusinessDetails(" + customerId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditGetBusinessDetails(?)")) {
      s.setObject(1,customerId);
      if (!s.execute()) throw new SQLException("Count not audit");
  }}}

}