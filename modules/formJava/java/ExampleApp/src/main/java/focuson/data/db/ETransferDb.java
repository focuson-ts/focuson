package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class ETransferDb{
  public static class AllETransferMaps{
    public final Map<String,Object> ETransferDataD = new HashMap<>();
  }
  public void makeETransferDataD(AllETransferMaps maps, ResultSet rs) throws SQLException {
    maps.ETransferDataD.put("account", rs.getInt("account"));
    maps.ETransferDataD.put("dateOfETransfer", rs.getString("dateOfETransfer"));
    maps.ETransferDataD.put("description", rs.getString("description"));
    maps.ETransferDataD.put("fromAccount", rs.getInt("fromAccount"));
    maps.ETransferDataD.put("toAccount", rs.getInt("toAccount"));
    maps.ETransferDataD.put("monitoringAccount", rs.getInt("monitoringAccount"));
    maps.ETransferDataD.put("type", rs.getString("type"));
    maps.ETransferDataD.put("balance", rs.getInt("balance"));
    maps.ETransferDataD.put("notes", rs.getString("notes"));
  }
}