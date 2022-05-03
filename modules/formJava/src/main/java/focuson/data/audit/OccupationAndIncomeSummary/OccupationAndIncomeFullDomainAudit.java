package focuson.data.audit.OccupationAndIncomeSummary;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class OccupationAndIncomeFullDomainAudit {
    @Autowired
    private DataSource dataSource;

    public void OccupationAndIncomeFullDomain_get_auditGetCustomerOccupation(String dbName, String customerId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: OccupationAndIncomeFullDomain_get_auditGetCustomerOccupation(" + customerId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditGetCustomerOccupation(?)")) {
      s.setObject(1,customerId);
      if (!s.execute()) throw new SQLException("Count not audit");
  }}}
    public void OccupationAndIncomeFullDomain_update_auditUpdateCustomerOccupation(String dbName, String customerId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: OccupationAndIncomeFullDomain_update_auditUpdateCustomerOccupation(" + customerId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditUpdateCustomerOccupation(?)")) {
      s.setObject(1,customerId);
      if (!s.execute()) throw new SQLException("Count not audit");
  }}}

}