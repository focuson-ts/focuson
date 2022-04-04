package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
  select ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,jointAddress.id as jointAddress_id,jointAddress.customerId as jointAddress_customerId,jointCustomer.jointCustomerId as jointCustomer_jointCustomerId,jointCustomer.id as jointCustomer_id,jointAddress.zzline1 as jointAddress_zzline1,jointAddress.zzline2 as jointAddress_zzline2
  from ADD_TBL jointAddress
  where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,jointAddress.id = jointAddress.customerId,jointCustomer.jointCustomerId = jointCustomer.id
*/
public class JointAccount_jointAccountMaps1 {
  public final Object ACC_TBL_acc_id;
  public final Object ACC_TBL_brand_id;
  public final Object jointAddress_id;
  public final Object jointAddress_customerId;
  public final Object jointCustomer_jointCustomerId;
  public final Object jointCustomer_id;
  
  public final Map<String,Object> jointAddress = new HashMap<>();
  
  public JointAccount_jointAccountMaps1(ResultSet rs) throws SQLException{
    this.jointAddress.put("line1", rs.getString("jointAddress_zzline1"));
    this.jointAddress.put("line2", rs.getString("jointAddress_zzline2"));
    
    this.ACC_TBL_acc_id = rs.getInt("{ACC_TBL_acc_id");
    this.ACC_TBL_brand_id = rs.getInt("{ACC_TBL_brand_id");
    this.jointAddress_id = rs.getInt("{jointAddress_id");
    this.jointAddress_customerId = rs.getInt("{jointAddress_customerId");
    this.jointCustomer_jointCustomerId = rs.getInt("{jointCustomer_jointCustomerId");
    this.jointCustomer_id = rs.getInt("{jointCustomer_id");
    
  }
}