package focuson.data.audit.OccupationAndIncomeSummary;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class AdditionalInformationAudit {
    @Autowired
    private DataSource dataSource;

    public void AdditionalInformation_get_auditGetCustomeAdditionalInfo(String dbName, String customerId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: AdditionalInformation_get_auditGetCustomeAdditionalInfo(" + customerId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditGetCustomeAdditionalInfo(?)")) {
      s.setObject(1,customerId);
      if (!s.execute()) throw new SQLException("Count not audit");
  }}}

}