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

//{"customerId":{"commonLens":"accountId","testValue":"custId"},"brandId":{"commonLens":"brandId","testValue":"custId"}}
public class JointAccount_jointAccountMaps1 {
    @SuppressWarnings("SqlResolve")
  public static String sql = "select"+
  "  ACC_TBL.acc_id as ACC_TBL_acc_id,"+
  "  ACC_TBL.brand_id as ACC_TBL_brand_id,"+
  "  jointCustomer.id as jointCustomer_id,"+
  "  jointAddress.customerId as jointAddress_customerId,"+
  "  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,"+
  "  jointAddress.zzline1 as jointAddress_zzline1,"+
  "  jointAddress.zzline2 as jointAddress_zzline2"+
  " from"+
  "  ADD_TBL jointAddress"+
  " where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id";
  
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
  
  public final Object ACC_TBL_acc_id;
  public final Object ACC_TBL_brand_id;
  public final Object jointCustomer_id;
  public final Object jointAddress_customerId;
  public final Object ACC_TBL_jointCustomerId;
  
  public final Map<String,Object> _root = new HashMap<>();
  public final Map<String,Object> main = new HashMap<>();
  public final Map<String,Object> main_addresses = new HashMap<>();
  public final Map<String,Object> joint = new HashMap<>();
  public final Map<String,Object> joint_addresses = new HashMap<>();
  
  public JointAccount_jointAccountMaps1(ResultSet rs) throws SQLException{
    this.joint_addresses.put("line1", rs.getString("jointAddress_zzline1"));
    this.joint_addresses.put("line2", rs.getString("jointAddress_zzline2"));
    
    this.ACC_TBL_acc_id = rs.getInt("ACC_TBL_acc_id");
    this.ACC_TBL_brand_id = rs.getInt("ACC_TBL_brand_id");
    this.jointCustomer_id = rs.getInt("jointCustomer_id");
    this.jointAddress_customerId = rs.getInt("jointAddress_customerId");
    this.ACC_TBL_jointCustomerId = rs.getInt("ACC_TBL_jointCustomerId");
    
    _root.put("joint", joint);
    joint.put("addresses", joint_addresses);
    
  }
}