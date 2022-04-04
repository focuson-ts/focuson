package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
  select ADD_TBL.postcode as ADD_TBL_postcode,ADD_TBL.zzline1 as ADD_TBL_zzline1,ADD_TBL.zzline2 as ADD_TBL_zzline2,ADD_TBL.zzline3 as ADD_TBL_zzline3,ADD_TBL.zzline4 as ADD_TBL_zzline4
  from ADD_TBL ADD_TBL
  where  ADD_TBL.postcode = ?
*/
public class PostCodeDemo_addressMaps {
  public final Object ADD_TBL_postcode;
  
  public final Map<String,Object> ADD_TBL = new HashMap<>();
  
  public PostCodeDemo_addressMaps(ResultSet rs) throws SQLException{
    this.ADD_TBL.put("line1", rs.getString("ADD_TBL_zzline1"));
    this.ADD_TBL.put("line2", rs.getString("ADD_TBL_zzline2"));
    this.ADD_TBL.put("line3", rs.getString("ADD_TBL_zzline3"));
    this.ADD_TBL.put("line4", rs.getString("ADD_TBL_zzline4"));
    
    this.ADD_TBL_postcode = rs.getInt("{ADD_TBL_postcode");
    
  }
}