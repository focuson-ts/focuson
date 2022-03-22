package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class JointAccountDb{
  public static class AllJointAccountMaps{
    public final Map<String,Object> JointAccount = new HashMap<>();
    public final Map<String,Object> JointAccountAddress = new HashMap<>();
    public final Map<String,Object> JointAccountAddresses = new HashMap<>();
    public final Map<String,Object> JointAccountCustomer = new HashMap<>();
  }
  public void makeJointAccount(AllJointAccountMaps maps, ResultSet rs) throws SQLException {
    maps.JointAccount.put("balance", rs.getInt("blnc"));
  }
  public void makeJointAccountAddress(AllJointAccountMaps maps, ResultSet rs) throws SQLException {
    maps.JointAccountAddress.put("line1", rs.getString("zzline1"));
    maps.JointAccountAddress.put("line2", rs.getString("zzline2"));
  }
  public void makeJointAccountAddresses(AllJointAccountMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeJointAccountCustomer(AllJointAccountMaps maps, ResultSet rs) throws SQLException {
    maps.JointAccountCustomer.put("name", rs.getString("[object Object]zzname"));
  }
}