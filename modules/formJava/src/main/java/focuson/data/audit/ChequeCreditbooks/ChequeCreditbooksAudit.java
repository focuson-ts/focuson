package focuson.data.audit.ChequeCreditbooks;

import org.springframework.beans.factory.annotation.Autowired;
import focuson.data.fetchers.IFetcher;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
@Component
public class ChequeCreditbooksAudit {
    @Autowired
    private DataSource dataSource;

    public void ChequeCreditbooks_create_auditCreateCheckBook(String dbName, String brandRef, String accountId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: ChequeCreditbooks_create_auditCreateCheckBook(" + brandRef + ", " +accountId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditCreateCheckBook(?, ?)")) {
      s.setObject(1,brandRef);
      s.setObject(2,accountId);
      if (!s.execute()) throw new SQLException("Cannot not audit: ChequeCreditbooks_create_auditCreateCheckBook");
  }}}
    public void ChequeCreditbooks_get_auditGetCheckBook(String dbName, String brandRef, String accountId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: ChequeCreditbooks_get_auditGetCheckBook(" + brandRef + ", " +accountId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditGetCheckBook(?, ?)")) {
      s.setObject(1,brandRef);
      s.setObject(2,accountId);
      if (!s.execute()) throw new SQLException("Cannot not audit: ChequeCreditbooks_get_auditGetCheckBook");
  }}}
    public void ChequeCreditbooks_state_cancel_auditCancelCheckbook(String dbName, String brandRef, String accountId) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: ChequeCreditbooks_state_cancel_auditCancelCheckbook(" + brandRef + ", " +accountId+ ")");
           return;
    }
    try (Connection c = dataSource.getConnection()) {
      try (CallableStatement s = c.prepareCall("call auditCancelCheckbook(?, ?)")) {
      s.setObject(1,brandRef);
      s.setObject(2,accountId);
      if (!s.execute()) throw new SQLException("Cannot not audit: ChequeCreditbooks_state_cancel_auditCancelCheckbook");
  }}}

}