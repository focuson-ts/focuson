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

public class JointAccount_jointAccountMaps {
  public static String sql = "select mainCustomer.nameId as mainCustomer_nameId,mainName.id as mainName_id,ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,mainCustomer.id as mainCustomer_id,jointCustomer.nameId as jointCustomer_nameId,jointName.id as jointName_id,ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,jointCustomer.id as jointCustomer_id,ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainName.zzname as mainName_zzname,jointName.zzname as jointName_zzname,ACC_TBL.blnc as ACC_TBL_blnc "+
  "from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL "+
  "where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id, ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?";
  
  public static Optional<Map<String,Object>> getAll(Connection connection) throws SQLException {
     return getRoot(connection,get0(connection),get1(connection)).map(x -> x._root);
  }
  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);
      //set params needed
      ResultSet rs = statement.executeQuery();
      try {
        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();
      } finally {
        rs.close();
        statement.close();
      }
  }
  public static List<JointAccount_jointAccountMaps0> get0(Connection connection) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);
      //set params needed
      ResultSet rs = statement.executeQuery();
      try {
        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();
        while (rs.next())
          result.add(new JointAccount_jointAccountMaps0(rs));
        return result;
      } finally {
        rs.close();
        statement.close();
      }
  }
  public static List<JointAccount_jointAccountMaps1> get1(Connection connection) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);
      //set params needed
      ResultSet rs = statement.executeQuery();
      try {
        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();
        while (rs.next())
          result.add(new JointAccount_jointAccountMaps1(rs));
        return result;
      } finally {
        rs.close();
        statement.close();
      }
  }
  
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
  
  public final Map<String,Object> _root = new HashMap<>();
  public final Map<String,Object> main = new HashMap<>();
  public final Map<String,Object> main_addresses = new HashMap<>();
  public final Map<String,Object> joint = new HashMap<>();
  public final Map<String,Object> joint_addresses = new HashMap<>();
  
  public JointAccount_jointAccountMaps(ResultSet rs,List<JointAccount_jointAccountMaps0> list0,List<JointAccount_jointAccountMaps1> list1) throws SQLException{
    this._root.put("balance", rs.getInt("ACC_TBL_blnc"));
    this.main.put("name", rs.getString("mainName_zzname"));
    this.joint.put("name", rs.getString("jointName_zzname"));
    
    this.mainCustomer_nameId = rs.getInt("mainCustomer_nameId");
    this.mainName_id = rs.getInt("mainName_id");
    this.ACC_TBL_mainCustomerId = rs.getInt("ACC_TBL_mainCustomerId");
    this.mainCustomer_id = rs.getInt("mainCustomer_id");
    this.jointCustomer_nameId = rs.getInt("jointCustomer_nameId");
    this.jointName_id = rs.getInt("jointName_id");
    this.ACC_TBL_jointCustomerId = rs.getInt("ACC_TBL_jointCustomerId");
    this.jointCustomer_id = rs.getInt("jointCustomer_id");
    this.ACC_TBL_acc_id = rs.getInt("ACC_TBL_acc_id");
    this.ACC_TBL_brand_id = rs.getInt("ACC_TBL_brand_id");
    
    _root.put("main", main);
    main.put("addresses", main_addresses);
    _root.put("joint", joint);
    joint.put("addresses", joint_addresses);
    
    this.main.put("addresses", list0.stream().map(m ->m.main).collect(Collectors.toList()));
    this.joint.put("addresses", list1.stream().map(m ->m.joint).collect(Collectors.toList()));
  }
}