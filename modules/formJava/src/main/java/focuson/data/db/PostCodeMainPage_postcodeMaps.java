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

//{"dbName":{"rsSetter":"setString","javaType":"String","javaParser":"","commonLens":"dbName","testValue":"mock"},"postcode":{"rsSetter":"setInt","javaType":"int","javaParser":"Integer.parseInt","lens":"~/postcode/search","testValue":"LW12 4RG"}}
public class PostCodeMainPage_postcodeMaps {
  @SuppressWarnings("SqlResolve")
  public static String sql = "select"+
  "  POSTCODE.PC_POSTCODE as POSTCODE_PC_POSTCODE,"+
  "  POSTCODE.zzline1 as POSTCODE_zzline1,"+
  "  POSTCODE.zzline2 as POSTCODE_zzline2,"+
  "  POSTCODE.zzline3 as POSTCODE_zzline3,"+
  "  POSTCODE.zzline4 as POSTCODE_zzline4"+
  " from"+
  "  POSTCODE POSTCODE"+
  " where  POSTCODE.PC_POSTCODE = ?";
  
  public static List<Map<String,Object>> getAll(Connection connection,int postcode) throws SQLException {
  //from PostCodeMainPage.rest[postcode].dataDD which is of type PostCodeSearchResponse
     return get(connection,postcode).stream().map(x -> x._root).collect(Collectors.toList());
  }
  public static String allSql="select\n"+
  "  POSTCODE.PC_POSTCODE as POSTCODE_PC_POSTCODE,\n"+
  "  POSTCODE.zzline1 as POSTCODE_zzline1,\n"+
  "  POSTCODE.zzline2 as POSTCODE_zzline2,\n"+
  "  POSTCODE.zzline3 as POSTCODE_zzline3,\n"+
  "  POSTCODE.zzline4 as POSTCODE_zzline4\n"+
  " from\n"+
  "  POSTCODE POSTCODE\n"+
  " where  POSTCODE.PC_POSTCODE = ?\n"+
  "\n";
  public static List<PostCodeMainPage_postcodeMaps> get(Connection connection, int postcode) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(PostCodeMainPage_postcodeMaps.sql);
    statement.setInt(1,postcode);
      ResultSet rs = statement.executeQuery();
      try {
        List<PostCodeMainPage_postcodeMaps> result = new LinkedList<>();
        while (rs.next())
          result.add(new PostCodeMainPage_postcodeMaps(rs));
        return result;
      } finally {
        rs.close();
        statement.close();
      }
  }
  
  public final Object POSTCODE_PC_POSTCODE;
  
  public final Map<String,Object> _root = new HashMap<>();
  
  public PostCodeMainPage_postcodeMaps(ResultSet rs) throws SQLException{
    this._root.put("line1", rs.getString("POSTCODE_zzline1"));
    this._root.put("line2", rs.getString("POSTCODE_zzline2"));
    this._root.put("line3", rs.getString("POSTCODE_zzline3"));
    this._root.put("line4", rs.getString("POSTCODE_zzline4"));
    
    this.POSTCODE_PC_POSTCODE = rs.getInt("POSTCODE_PC_POSTCODE");
    
    
  }
}