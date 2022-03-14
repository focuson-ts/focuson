package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class ChequeCreditbooksDb{
  public static class AllChequeCreditbooksMaps{
    public final Map<String,Object> ChequeCreditbooksDD = new HashMap<>();
    public final Map<String,Object> ChequeCreditbooksHistoryDD = new HashMap<>();
    public final Map<String,Object> ChequeCreditbooksHistoryLineDD = new HashMap<>();
  }
  public void makeChequeCreditbooksDD(AllChequeCreditbooksMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeChequeCreditbooksHistoryDD(AllChequeCreditbooksMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeChequeCreditbooksHistoryLineDD(AllChequeCreditbooksMaps maps, ResultSet rs) throws SQLException {
    maps.ChequeCreditbooksHistoryLineDD.put("serialNumber", rs.getInt("serialNumber"));
    maps.ChequeCreditbooksHistoryLineDD.put("howOrdered", rs.getString("howOrdered"));
    maps.ChequeCreditbooksHistoryLineDD.put("dateOrder", rs.getString("dateOrder"));
  }
}