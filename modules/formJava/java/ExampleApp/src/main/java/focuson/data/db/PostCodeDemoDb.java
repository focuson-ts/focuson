package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class PostCodeDemoDb{
  public static class AllPostCodeDemoMaps{
    public final Map<String,Object> PostCodeData = new HashMap<>();
    public final Map<String,Object> PostCodeDataLine = new HashMap<>();
    public final Map<String,Object> PostCodeMainPage = new HashMap<>();
    public final Map<String,Object> PostCodeSearch = new HashMap<>();
  }
  public void makePostCodeData(AllPostCodeDemoMaps maps, ResultSet rs) throws SQLException {
  }
  public void makePostCodeDataLine(AllPostCodeDemoMaps maps, ResultSet rs) throws SQLException {
    maps.PostCodeDataLine.put("line1", rs.getString("line1"));
    maps.PostCodeDataLine.put("line2", rs.getString("line2"));
    maps.PostCodeDataLine.put("line3", rs.getString("line3"));
    maps.PostCodeDataLine.put("line4", rs.getString("line4"));
  }
  public void makePostCodeMainPage(AllPostCodeDemoMaps maps, ResultSet rs) throws SQLException {
    maps.PostCodeMainPage.put("name", rs.getString("name"));
    maps.PostCodeMainPage.put("line1", rs.getString("line1"));
    maps.PostCodeMainPage.put("line2", rs.getString("line2"));
    maps.PostCodeMainPage.put("line3", rs.getString("line3"));
    maps.PostCodeMainPage.put("line4", rs.getString("line4"));
    maps.PostCodeMainPage.put("postcode", rs.getString("postcode"));
  }
  public void makePostCodeSearch(AllPostCodeDemoMaps maps, ResultSet rs) throws SQLException {
    maps.PostCodeSearch.put("search", rs.getString("search"));
  }
}