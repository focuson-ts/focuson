package focuson.data.db;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.LinkedList;
import java.util.Optional;
import java.util.Map;
import java.util.stream.Collectors;

//{}
public class PostCodeMainPage_addressMaps {
  @SuppressWarnings("SqlResolve")
  public static String sql = "select"+
  "  ADD_TBL.zzline1 as ADD_TBL_zzline1,"+
  "  ADD_TBL.zzline2 as ADD_TBL_zzline2,"+
  "  ADD_TBL.zzline3 as ADD_TBL_zzline3,"+
  "  ADD_TBL.zzline4 as ADD_TBL_zzline4"+
  " from"+
  "  ADD_TBL ADD_TBL"+
  " where ";
  
  public static Optional<Map<String,Object>> getAll(Connection connection) throws SQLException {
     return getRoot(connection).map(x -> x._root);
  }
  public static String allSql="select\n"+
  "  ADD_TBL.zzline1 as ADD_TBL_zzline1,\n"+
  "  ADD_TBL.zzline2 as ADD_TBL_zzline2,\n"+
  "  ADD_TBL.zzline3 as ADD_TBL_zzline3,\n"+
  "  ADD_TBL.zzline4 as ADD_TBL_zzline4\n"+
  " from\n"+
  "  ADD_TBL ADD_TBL\n"+
  " where \n"+
  "\n";
  public static Optional<PostCodeMainPage_addressMaps> getRoot(Connection connection) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(PostCodeMainPage_addressMaps.sql);
      ResultSet rs = statement.executeQuery();
      try {
        return rs.next() ? Optional.of(new PostCodeMainPage_addressMaps(rs)) : Optional.empty();
      } finally {
        rs.close();
        statement.close();
      }
  }
  
  
  public final Map<String,Object> _root = new HashMap<>();
  
  public PostCodeMainPage_addressMaps(ResultSet rs) throws SQLException{
    this._root.put("line1", rs.getString("ADD_TBL_zzline1"));
    this._root.put("line2", rs.getString("ADD_TBL_zzline2"));
    this._root.put("line3", rs.getString("ADD_TBL_zzline3"));
    this._root.put("line4", rs.getString("ADD_TBL_zzline4"));
    
    
    
  }
}