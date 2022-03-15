package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class CreateEAccountDb{
  public static class AllCreateEAccountMaps{
    public final Map<String,Object> CreateEAccountData = new HashMap<>();
  }
  public void makeCreateEAccountData(AllCreateEAccountMaps maps, ResultSet rs) throws SQLException {
    maps.CreateEAccountData.put("name", rs.getString("name"));
    maps.CreateEAccountData.put("type", rs.getString("type"));
    maps.CreateEAccountData.put("savingsStyle", rs.getString("savingsStyle"));
    maps.CreateEAccountData.put("initialAmount", rs.getInt("initialAmount"));
  }
}