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

    public void AdditionalInformation_get_auditGetCustomeAdditionalInfo(Connection connection, String dbName, String clientRef) throws SQLException {
        if (dbName.equals(IFetcher.mock)) {
           System.out.println("Mock audit: AdditionalInformation_get_auditGetCustomeAdditionalInfo(" + clientRef+ ")");
           return;
    }
    try (CallableStatement s = connection.prepareCall("call auditGetCustomeAdditionalInfo(?)")) {
      s.setObject(1,clientRef);
    if (!s.execute()) throw new SQLException("Cannot not audit: AdditionalInformation_get_auditGetCustomeAdditionalInfo");
  }}

}