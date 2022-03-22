package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class ChequeCreditbooksDb{
  public static class AllChequeCreditbooksMaps{
    public final Map<String,Object> ChequeCreditbooks = new HashMap<>();
    public final Map<String,Object> ChequeCreditbooksHistory = new HashMap<>();
    public final Map<String,Object> ChequeCreditbooksHistoryLine = new HashMap<>();
  }
  public void makeChequeCreditbooks(AllChequeCreditbooksMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeChequeCreditbooksHistory(AllChequeCreditbooksMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeChequeCreditbooksHistoryLine(AllChequeCreditbooksMaps maps, ResultSet rs) throws SQLException {
    maps.ChequeCreditbooksHistoryLine.put("serialNumber", rs.getInt("serialNumber"));
    maps.ChequeCreditbooksHistoryLine.put("howOrdered", rs.getString("howOrdered"));
    maps.ChequeCreditbooksHistoryLine.put("dateOrder", rs.getString("dateOrder"));
  }
}