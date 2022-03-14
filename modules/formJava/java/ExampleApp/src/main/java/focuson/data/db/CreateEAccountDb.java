package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class CreateEAccountDb{
  public static class AllCreateEAccountMaps{
    public final Map<String,Object> CreateEAccountDataDD = new HashMap<>();
  }
  public void makeCreateEAccountDataDD(AllCreateEAccountMaps maps, ResultSet rs) throws SQLException {
    maps.CreateEAccountDataDD.put("name", rs.getString("name"));
    maps.CreateEAccountDataDD.put("type", rs.getString("type"));
    maps.CreateEAccountDataDD.put("savingsStyle", rs.getString("savingsStyle"));
    maps.CreateEAccountDataDD.put("initialAmount", rs.getInt("initialAmount"));
  }
}