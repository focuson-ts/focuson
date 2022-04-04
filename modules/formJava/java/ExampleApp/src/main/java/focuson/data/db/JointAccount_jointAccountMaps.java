package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
  select mainCustomer.nameId as mainCustomer_nameId,mainName.id as mainName_id,ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,mainCustomer.id as mainCustomer_id,jointCustomer.nameId as jointCustomer_nameId,jointName.id as jointName_id,ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,jointCustomer.id as jointCustomer_id,ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainName.zzname as mainName_zzname,jointName.zzname as jointName_zzname,ACC_TBL.blnc as ACC_TBL_blnc
  from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL
  where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id, ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?
*/
public class JointAccount_jointAccountMaps {
  public final Object mainCustomer_nameId;
  public final Object mainName_id;
  public final Object ACC_TBL_mainCustomerId;
  public final Object mainCustomer_id;
  public final Object jointCustomer_nameId;
  public final Object jointName_id;
  public final Object ACC_TBL_jointCustomerId;
  public final Object jointCustomer_id;
  public final Object ACC_TBL_acc_id;
  public final Object ACC_TBL_brand_id;
  
  public final Map<String,Object> mainName = new HashMap<>();
  public final Map<String,Object> mainCustomer = new HashMap<>();
  public final Map<String,Object> jointName = new HashMap<>();
  public final Map<String,Object> jointCustomer = new HashMap<>();
  public final Map<String,Object> ACC_TBL = new HashMap<>();
  
  public JointAccount_jointAccountMaps(ResultSet rs,List<JointAccount_jointAccountMaps0> list0,List<JointAccount_jointAccountMaps1> list1) throws SQLException{
    this.ACC_TBL.put("balance", rs.getInt("ACC_TBL_blnc"));
    this.mainName.put("name", rs.getString("mainName_zzname"));
    this.jointName.put("name", rs.getString("jointName_zzname"));
    
    this.mainCustomer_nameId = rs.getInt("{mainCustomer_nameId");
    this.mainName_id = rs.getInt("{mainName_id");
    this.ACC_TBL_mainCustomerId = rs.getInt("{ACC_TBL_mainCustomerId");
    this.mainCustomer_id = rs.getInt("{mainCustomer_id");
    this.jointCustomer_nameId = rs.getInt("{jointCustomer_nameId");
    this.jointName_id = rs.getInt("{jointName_id");
    this.ACC_TBL_jointCustomerId = rs.getInt("{ACC_TBL_jointCustomerId");
    this.jointCustomer_id = rs.getInt("{jointCustomer_id");
    this.ACC_TBL_acc_id = rs.getInt("{ACC_TBL_acc_id");
    this.ACC_TBL_brand_id = rs.getInt("{ACC_TBL_brand_id");
    
    this.mainCustomer.put("addresses", list0);
    this.jointCustomer.put("addresses", list1);
  }
}