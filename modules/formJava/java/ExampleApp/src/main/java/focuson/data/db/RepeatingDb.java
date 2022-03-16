package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class RepeatingDb{
  public static class AllRepeatingMaps{
    public final Map<String,Object> RepeatingLine = new HashMap<>();
    public final Map<String,Object> RepeatingWholeData = new HashMap<>();
  }
  public void makeRepeatingLine(AllRepeatingMaps maps, ResultSet rs) throws SQLException {
    maps.RepeatingLine.put("name", rs.getString("name"));
    maps.RepeatingLine.put("age", rs.getInt("age"));
  }
  public void makeRepeatingWholeData(AllRepeatingMaps maps, ResultSet rs) throws SQLException {
  }
}