package focuson.data.db;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AllJointAccount_breakMe_1_Maps {
  Map account = new HashMap();
  Map joint = new HashMap();
  Map jointName = new HashMap();
  Map address = new HashMap();
  public AllJointAccount_breakMe_1_Maps(ResultSet rs) throws SQLException {
    address.put("line1", rs.getInt("address_zzline1"));
    address.put("line2", rs.getInt("address_zzline2"));
    account.put("id", rs.getInt("account_id"));
    account.put("joint", rs.getInt("account_joint"));
    joint.put("id", rs.getInt("joint_id"));
    jointName.put("id", rs.getInt("jointName_id"));
    address.put("id", rs.getInt("address_id"));
  }
}