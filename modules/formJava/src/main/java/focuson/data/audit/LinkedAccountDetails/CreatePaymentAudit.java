package focuson.data.audit.LinkedAccountDetails;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class CreatePaymentAudit {

    public void CreatePayment_create_auditCreate(Connection connection, String dbName, String accountId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: CreatePayment_create_auditCreate(" + accountId+ ")");
           return;
    }
    try (CallableStatement s = connection.prepareCall("call auditCreate(?)")) {
      s.setObject(1,accountId);
    if (!s.execute()) throw new SQLException("Cannot not audit: CreatePayment_create_auditCreate");
  }}

}