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

    public void OccupationAndIncomeFullDomain_get_auditGetCustomerOccupation(Connection connection, String dbName, String clientRef) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: OccupationAndIncomeFullDomain_get_auditGetCustomerOccupation(" + clientRef+ ")");
           return;
    }
    try (CallableStatement s = connection.prepareCall("call auditGetCustomerOccupation(?)")) {
      s.setObject(1,clientRef);
    if (!s.execute()) throw new SQLException("Cannot not audit: OccupationAndIncomeFullDomain_get_auditGetCustomerOccupation");
  }}
    public void OccupationAndIncomeFullDomain_update_auditUpdateCustomerOccupation(Connection connection, String dbName, String clientRef) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: OccupationAndIncomeFullDomain_update_auditUpdateCustomerOccupation(" + clientRef+ ")");
           return;
    }
    try (CallableStatement s = connection.prepareCall("call auditUpdateCustomerOccupation(?)")) {
      s.setObject(1,clientRef);
    if (!s.execute()) throw new SQLException("Cannot not audit: OccupationAndIncomeFullDomain_update_auditUpdateCustomerOccupation");
  }}

}