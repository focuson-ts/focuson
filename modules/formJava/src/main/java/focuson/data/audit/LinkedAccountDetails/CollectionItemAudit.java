package focuson.data.audit.LinkedAccountDetails;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class CollectionItemAudit {

    public void CollectionItem_state_cancel_auditCancel(Connection connection, String dbName, String accountId, String paymentId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: CollectionItem_state_cancel_auditCancel(" + accountId + ", " +paymentId+ ")");
           return;
    }
    try (CallableStatement s = connection.prepareCall("call auditCancel(?, ?)")) {
      s.setObject(1,accountId);
      s.setObject(2,paymentId);
    if (!s.execute()) throw new SQLException("Cannot not audit: CollectionItem_state_cancel_auditCancel");
  }}
    public void CollectionItem_state_revalidate_auditrevalidate(Connection connection, String dbName, String accountId, String paymentId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: CollectionItem_state_revalidate_auditrevalidate(" + accountId + ", " +paymentId+ ")");
           return;
    }
    try (CallableStatement s = connection.prepareCall("call auditrevalidate(?, ?)")) {
      s.setObject(1,accountId);
      s.setObject(2,paymentId);
    if (!s.execute()) throw new SQLException("Cannot not audit: CollectionItem_state_revalidate_auditrevalidate");
  }}

}