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

//{"accountId":{"rsSetter":"setInt","javaType":"int","javaParser":"Integer.parseInt","commonLens":"accountId","testValue":"accId"},"brandRef":{"rsSetter":"setInt","javaType":"int","javaParser":"Integer.parseInt","commonLens":"brandRef","testValue":"brandRef"},"dbName":{"rsSetter":"setString","javaType":"String","javaParser":"","commonLens":"dbName","testValue":"mock"}}
public class JointAccount_jointAccountMaps {
  @SuppressWarnings("SqlResolve")
  public static String sql = "select"+
  "  mainCustomer.nameId as mainCustomer_nameId,"+
  "  mainName.id as mainName_id,"+
  "  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,"+
  "  mainCustomer.id as mainCustomer_id,"+
  "  jointCustomer.nameId as jointCustomer_nameId,"+
  "  jointName.id as jointName_id,"+
  "  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,"+
  "  jointCustomer.id as jointCustomer_id,"+
  "  ACC_TBL.acc_id as ACC_TBL_acc_id,"+
  "  ACC_TBL.brand_id as ACC_TBL_brand_id,"+
  "  mainName.zzname as mainName_zzname,"+
  "  jointName.zzname as jointName_zzname,"+
  "  ACC_TBL.blnc as ACC_TBL_blnc"+
  " from"+
  "  ACC_TBL ACC_TBL,"+
  "  NAME_TBL mainName,"+
  "  CUST_TBL mainCustomer,"+
  "  NAME_TBL jointName,"+
  "  CUST_TBL jointCustomer"+
  " where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and 3=3 and 1=1 and ACC_TBL <> 'canceled'";
  
  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandRef) throws SQLException {
  //from JointAccount.rest[jointAccount].dataDD which is of type JointAccount
     return get(connection,accountId,brandRef,get0(connection,accountId,brandRef),get1(connection,accountId,brandRef)).map(x -> x._root);
  }
  public static String allSql="select\n"+
  "  mainCustomer.nameId as mainCustomer_nameId,\n"+
  "  mainName.id as mainName_id,\n"+
  "  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\n"+
  "  mainCustomer.id as mainCustomer_id,\n"+
  "  jointCustomer.nameId as jointCustomer_nameId,\n"+
  "  jointName.id as jointName_id,\n"+
  "  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\n"+
  "  jointCustomer.id as jointCustomer_id,\n"+
  "  ACC_TBL.acc_id as ACC_TBL_acc_id,\n"+
  "  ACC_TBL.brand_id as ACC_TBL_brand_id,\n"+
  "  mainName.zzname as mainName_zzname,\n"+
  "  jointName.zzname as jointName_zzname,\n"+
  "  ACC_TBL.blnc as ACC_TBL_blnc\n"+
  " from\n"+
  "  ACC_TBL ACC_TBL,\n"+
  "  NAME_TBL mainName,\n"+
  "  CUST_TBL mainCustomer,\n"+
  "  NAME_TBL jointName,\n"+
  "  CUST_TBL jointCustomer\n"+
  " where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and 3=3 and 1=1 and ACC_TBL <> 'canceled'\n"+
  "\n"+
  "select\n"+
  "  ACC_TBL.acc_id as ACC_TBL_acc_id,\n"+
  "  ACC_TBL.brand_id as ACC_TBL_brand_id,\n"+
  "  mainCustomer.id as mainCustomer_id,\n"+
  "  mainAddress.customerId as mainAddress_customerId,\n"+
  "  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\n"+
  "  mainAddress.zzline1 as mainAddress_zzline1,\n"+
  "  mainAddress.zzline2 as mainAddress_zzline2\n"+
  " from\n"+
  "  ACC_TBL ACC_TBL,\n"+
  "  CUST_TBL mainCustomer,\n"+
  "  ADD_TBL mainAddress\n"+
  " where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id and 2=2 and 1=1\n"+
  "\n"+
  "select\n"+
  "  ACC_TBL.acc_id as ACC_TBL_acc_id,\n"+
  "  ACC_TBL.brand_id as ACC_TBL_brand_id,\n"+
  "  jointCustomer.id as jointCustomer_id,\n"+
  "  jointAddress.customerId as jointAddress_customerId,\n"+
  "  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\n"+
  "  jointAddress.zzline1 as jointAddress_zzline1,\n"+
  "  jointAddress.zzline2 as jointAddress_zzline2\n"+
  " from\n"+
  "  ACC_TBL ACC_TBL,\n"+
  "  CUST_TBL jointCustomer,\n"+
  "  ADD_TBL jointAddress\n"+
  " where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id\n"+
  "\n";
  public static Optional<JointAccount_jointAccountMaps> get(Connection connection, int accountId, int brandRef, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);
    statement.setInt(1,accountId);
    statement.setInt(2,brandRef);
      ResultSet rs = statement.executeQuery();
      try {
        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();
      } finally {
        rs.close();
        statement.close();
      }
  }
  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandRef) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);
    statement.setInt(1,accountId);
    statement.setInt(2,brandRef);
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
  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandRef) throws SQLException {
      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);
    statement.setInt(1,accountId);
    statement.setInt(2,brandRef);
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
    
    this.main.put("addresses", list0.stream().map(m ->m.main_addresses).collect(Collectors.toList()));
    this.joint.put("addresses", list1.stream().map(m ->m.joint_addresses).collect(Collectors.toList()));
  }
}