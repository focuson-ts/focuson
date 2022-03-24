package focuson.data.db;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AllJointAccount_jointAccount_0_Maps {
  Map account = new HashMap();
  Map main = new HashMap();
  Map mainName = new HashMap();
  Map address = new HashMap();
  public AllJointAccount_jointAccount_0_Maps(ResultSet rs) throws SQLException {
    address.put("line1", rs.getInt("address_zzline1"));
    address.put("line2", rs.getInt("address_zzline2"));
    account.put("id", rs.getInt("account_id"));
    account.put("main", rs.getInt("account_main"));
    main.put("id", rs.getInt("main_id"));
    mainName.put("id", rs.getInt("mainName_id"));
    address.put("id", rs.getInt("address_id"));
  }
}