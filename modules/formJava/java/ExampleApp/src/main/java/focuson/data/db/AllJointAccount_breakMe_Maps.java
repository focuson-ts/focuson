package focuson.data.db;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AllJointAccount_breakMe_Maps {
  Map account = new HashMap();
  Map main = new HashMap();
  Map mainName = new HashMap();
  Map joint = new HashMap();
  Map jointName = new HashMap();
  public AllJointAccount_breakMe_Maps(ResultSet rs, List<AllJointAccount_breakMe_0_Maps> aggMap0s, List<AllJointAccount_breakMe_1_Maps> aggMap1s) throws SQLException {
    account.put("balance", rs.getInt("account_blnc"));
    mainName.put("name", rs.getInt("mainName_zzname"));
    jointName.put("name", rs.getInt("jointName_zzname"));
    account.put("id", rs.getInt("account_id"));
    account.put("main", rs.getInt("account_main"));
    main.put("id", rs.getInt("main_id"));
    mainName.put("id", rs.getInt("mainName_id"));
    account.put("joint", rs.getInt("account_joint"));
    joint.put("id", rs.getInt("joint_id"));
    jointName.put("id", rs.getInt("jointName_id"));
  //found: 0 - JointAccountAddresses - JointAccountAddresses - [object Object]
  //found: 1 - JointAccountAddresses - JointAccountAddresses - [object Object]
  }
}