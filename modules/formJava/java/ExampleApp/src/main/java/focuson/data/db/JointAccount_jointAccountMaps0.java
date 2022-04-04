package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
  select ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainAddress.id as mainAddress_id,mainAddress.customerId as mainAddress_customerId,mainCustomer.mainCustomerId as mainCustomer_mainCustomerId,mainCustomer.id as mainCustomer_id,mainAddress.zzline1 as mainAddress_zzline1,mainAddress.zzline2 as mainAddress_zzline2
  from ADD_TBL mainAddress
  where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,mainAddress.id = mainAddress.customerId,mainCustomer.mainCustomerId = mainCustomer.id
*/
public class JointAccount_jointAccountMaps0 {
  public final Object ACC_TBL_acc_id;
  public final Object ACC_TBL_brand_id;
  public final Object mainAddress_id;
  public final Object mainAddress_customerId;
  public final Object mainCustomer_mainCustomerId;
  public final Object mainCustomer_id;
  
  public final Map<String,Object> mainAddress = new HashMap<>();
  
  public JointAccount_jointAccountMaps0(ResultSet rs) throws SQLException{
    this.mainAddress.put("line1", rs.getString("mainAddress_zzline1"));
    this.mainAddress.put("line2", rs.getString("mainAddress_zzline2"));
    
    this.ACC_TBL_acc_id = rs.getInt("{ACC_TBL_acc_id");
    this.ACC_TBL_brand_id = rs.getInt("{ACC_TBL_brand_id");
    this.mainAddress_id = rs.getInt("{mainAddress_id");
    this.mainAddress_customerId = rs.getInt("{mainAddress_customerId");
    this.mainCustomer_mainCustomerId = rs.getInt("{mainCustomer_mainCustomerId");
    this.mainCustomer_id = rs.getInt("{mainCustomer_id");
    
  }
}